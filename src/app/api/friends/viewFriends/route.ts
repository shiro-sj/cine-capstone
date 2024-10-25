import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const { senderName, receiverName } = await request.json();
  // Validate the input
  if (!senderName || !receiverName) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
  // Ensure the sender and receiver are not the same
  if (senderName === receiverName) {
    return NextResponse.json({ error: 'Sender cannot be receiver' }, { status: 400 });
  }
  try {
    // Check if a friend request already exists
    const existingRequest = await prisma.friendRequests.findFirst({
      where: {
        AND: [
          { senderUserName: senderName },
          { receiverUserName: receiverName },
        ],
      },
    });
    // If a request already exists, return an error
    if (existingRequest) {
      return NextResponse.json({ error: 'Friend request already sent' }, { status: 400 });
    }
    // Create a new friend request
    const friendRequest = await prisma.friendRequests.create({
      data: {
        senderUserName: senderName,
        receiverUserName: receiverName,
      },
    });
    // Return success response
    return NextResponse.json({ message: 'Friend request sent successfully', friendRequest }, { status: 200 });
  } catch (error) {
    console.error('Error sending friend request:', error);
    // Return a server error response
    return NextResponse.json({ error: 'Error sending friend request' }, { status: 500 });
  }
}