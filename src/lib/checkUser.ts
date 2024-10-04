// app/api/connect/route.ts (API route for server-side logic)
import { currentUser } from "@clerk/nextjs/server";  // Clerk server-side import
import prisma from "./prisma";  // Prisma import

export async function checkUser() {
    const user = await currentUser();
    console.log(user);
    if (!user) {
        return null;
    }

    const loggedInUser = await prisma.user.findUnique({
        where: { clerkId: user.id, email: user.emailAddresses[0].emailAddress }
    });

    if (!loggedInUser) {
        await prisma.user.create({
            data: {
                clerkId: user.id,
                username: user.username || 'No username available.',
                email: user.emailAddresses[0].emailAddress
            }
        });
    }

    return user;
};