import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    try {

        const userRecord = await prisma.user.findUnique({
            where: {
                clerkId: user.id,
            },
        });

        if (!userRecord) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const totalWatchTime = await prisma.watchHistory.aggregate({
            _sum: {
                runtime: true,
            },
            where: {
                userId: userRecord.id, 
            },
        });

        return NextResponse.json({ totalWatchTime: totalWatchTime._sum.runtime || 0 }); 
    } catch (error) {
        console.error("Error fetching total watch time:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
