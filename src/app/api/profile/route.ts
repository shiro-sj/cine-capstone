import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const profileUsername = searchParams.get('username');

  if (!profileUsername) {
    return NextResponse.json({ error: 'Invalid or missing username' }, { status: 400 });
  }

  //user info
  try {
    const user = await prisma.user.findFirst({
      where: { username: profileUsername },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    //sent requests
    const sentFriendRequests = await prisma.friendRequests.findMany({
      where: {senderId: user.clerkId},
    })

    //recieved requests
    const  recievedFriendRequests = await prisma.friendRequests.findMany({
      where:{receiverId : user.clerkId}
    })

    console.log('user: ',user,', sent ', sentFriendRequests, ', recieved: ',recievedFriendRequests)

    return NextResponse.json({ user,sentFriendRequests,recievedFriendRequests }, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { message: 'Error while fetching user data', status: 500 },
      { status: 500 }
    );
  }
}
