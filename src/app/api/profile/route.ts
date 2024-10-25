import { prisma } from '@/lib/prisma';

import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
    const user = await currentUser();
    let profileUsername;
    if (user){
        profileUsername = user.username;
    }
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
    const friends = await prisma.friend.findMany({
      where: {
        username: profileUsername   // Assuming `username` is a field in your `Friend` model
      },
      include: {
        user: true
      }
    });
    //sent requests
    const sentFriendRequests = await prisma.friendRequests.findMany({
      where: {senderUserName: profileUsername}
    })
    //recieved requests
    const  recievedFriendRequests = await prisma.friendRequests.findMany({
      where: {receiverUserName: profileUsername}
    })
    
    return NextResponse.json({ user,sentFriendRequests,recievedFriendRequests,friends }, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { message: 'Error while fetching user data', status: 500 },
      { status: 500 }
    );
  }
}