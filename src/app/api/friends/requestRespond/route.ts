import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
  const { requestId, action } = await request.json();

  try {
    const friendRequest = await prisma.friendRequest.findUnique({
      where: { id: requestId },
    });

    if (!friendRequest) {
      return NextResponse.json({ error: 'Friend request not found' }, { status: 404 });
    }

    //accepting friend request
    if (action === 'ACCEPT') {
      await prisma.friend.createMany({
        data: [
          { userId: friendRequest.senderId, friendId: friendRequest.receiverId },
          { userId: friendRequest.receiverId, friendId: friendRequest.senderId },
        ],
      });
      await prisma.friendRequest.delete({
        where: { id: requestId },
      });

      return NextResponse.json({ message: 'Friend request accepted :)' }, { status: 200 });
    }

    //rejecting friend request
    if (action === 'REJECT') {
      await prisma.friendRequest.delete({
        where: { id: requestId },
      });

      return NextResponse.json({ message: 'Friend request rejected :(' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    console.error('Error responding to friend request:', error);
    return new Response(
      JSON.stringify({ message: 'Error responding to friend request', status: 500 }),
      { status: 500 }
    );
  }
}