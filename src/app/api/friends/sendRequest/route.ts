import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { senderId, receiverId } = await request.json();

  if (!senderId || !receiverId) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  if(senderId === receiverId){
    return NextResponse.json({ error: 'sender cannot be reciever' }, { status: 400 });
  }

  try {
    // Check if a friend request already exists
    const existingRequest = await prisma.friendRequests.findFirst({
      where: {
        AND:[
        {senderId:senderId},
        {receiverId: receiverId},
      ]},
    });   

    if (existingRequest) {
      return NextResponse.json({ error: 'Friend request already sent' }, { status: 400 });
    }

    // Create a new friend request
    const friendRequest = await prisma.friendRequests.create({
      data: {
        senderId: senderId,
        receiverId: receiverId,
      },
    });
      


    return NextResponse.json({ message: 'Friend request sent successfully', friendRequest }, { status: 200 });
  } catch (error) {
    console.error('Error sending friend request:', error);
    return new Response(
      JSON.stringify({ message: 'Error sending friend request', status: 500 }),
      { status: 500 }
    );
  }
}

