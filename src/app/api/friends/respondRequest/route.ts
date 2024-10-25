import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
  const { requestSender, requestResponder, action } = await request.json();

  try {
    
    const friendRequest = await prisma.friendRequests.findFirst({
      where: {
        AND: [
          { senderUserName: requestSender },
          { receiverUserName: requestResponder },
        ],
      },
    });
    if (!friendRequest) {
      return NextResponse.json({ error: 'Friend request not found' }, { status: 404 });
    }
    console.log(friendRequest)
    //accepting friend request

    const sender = await prisma.user.findFirst({
      where:{username: requestSender}
    })

    const reciver = await prisma.user.findFirst({
      where:{username: requestResponder}
    })

    if(!sender || !reciver){
      return NextResponse.json({ error: 'user not found' }, { status: 404 });
    }

    if (action === 'ACCEPT') {
      await prisma.friend.createMany({
        data: [
          { username: friendRequest.senderUserName,userId:sender.id, friendname: friendRequest.receiverUserName, friendId:reciver.id },
          { username: friendRequest.receiverUserName, userId:reciver.id, friendname: friendRequest.senderUserName, friendId: sender.id },
        ],
      });

    console.log('created friends')
      await prisma.friendRequests.delete({
        where: { id: friendRequest.id },
      });
      console.log('deleted')
      return NextResponse.json({ message: 'Friend request accepted :)' }, { status: 200 });
    }

    //rejecting friend request
    if (action === 'REJECT') {
      await prisma.friendRequests.delete({
        where: { id: friendRequest.id },
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