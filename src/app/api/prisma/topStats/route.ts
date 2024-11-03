import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await currentUser();

    async function getTopTVShow(userID: number) {
        try {
            const titlesCount = await prisma.watchHistory.groupBy({
                by: ['title'],
                _count: {
                    title: true,
                },
                where: {
                    userId: userID, 
                    isTvShow: true,
                },
                orderBy: {
                    _count: {
                        title: 'desc',
                    },
                },
                take: 1,
            });

            return titlesCount[0];
        } catch (error) {
            console.error("Error fetching most popular title:", error);
            throw new Error("Failed to fetch the most popular title");
        }
    }
    async function getTopMovie(userID: number) {
        try {
            const titlesCount = await prisma.watchHistory.groupBy({
                by: ['title'],
                _count: {
                    title: true,
                },
                where: {
                    userId: userID, 
                    isTvShow: false,
                },
                orderBy: {
                    _count: {
                        title: 'desc',
                    },
                },
                take: 1,
            });

            return titlesCount[0];
        } catch (error) {
            console.error("Error fetching most popular movie:", error);
            throw new Error("Failed to fetch the most popular movie");
        }
    }
    async function getTopTitle(userID: number) {
        try {
            const titlesCount = await prisma.watchHistory.groupBy({
                by: ['title'],
                _count: {
                    title: true,
                },
                where: {
                    userId: userID, 
                },
                orderBy: {
                    _count: {
                        title: 'desc',
                    },
                },
                take: 1,
            });

            return titlesCount[0];
        } catch (error) {
            console.error("Error fetching most popular movie:", error);
            throw new Error("Failed to fetch the most popular movie");
        }
    }

    async function  getTopGenre(userId: number){
        try {
            const genreList = await prisma.watchHistory.findMany({
                select:{genres: true}
            })

            const genreMapped = genreList.flatMap((genre)=>genre.genres);

            return genreMapped;
        }catch{

        }

    }

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


        const topGenre = await getTopGenre(userRecord.id)
        const topTVShow = await getTopTVShow(userRecord.id);
        const topMovie = await getTopMovie(userRecord.id)
        const topTitle = await getTopTitle(userRecord.id)

        return NextResponse.json({ topGenre, topTVShow, topMovie, topTitle }); 
    } catch (error) {
        console.error("Error fetching user details:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
