import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request:Request) {
  const { requestid } = await request.json();

    try {
        const receivedFriendRequests = await prisma.friendRequests.findMany({
            where: {receiverId : requestid}
        })

        const sentFriendRequests = await prisma.friendRequests.findMany({
            where: {senderId : requestid}
        })


    return NextResponse.json({sentRequests:sentFriendRequests ,recievedRequests:receivedFriendRequests},{status:200});
    }catch(e){
        console.error('an error has occured ',e)
        return new Response(
            JSON.stringify({ message: 'Error while fetching friends', status: 500 }),
            { status: 500 }
          );
    }
}
