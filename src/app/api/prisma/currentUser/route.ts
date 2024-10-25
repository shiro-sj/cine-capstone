import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse, userAgent } from 'next/server';

export async function GET(request: Request) {

  const user = await currentUser();


  if (!user) {
    return NextResponse.json({ error: 'Invalid or missing username' }, { status: 400 });
  }
  
  if (user){
    try {    
        const currentUser = await prisma.user.findUnique({
          where: { 
            clerkId: user.id
        },
        });

        if (!user) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const friends = await prisma.friend.findMany({
          where: {
            username: user.username as string
          },
          include: {
            user: true
          }
        });
        //sent requests
        const sentFriendRequests = await prisma.friendRequests.findMany({
          where: {senderUserName: user.username as string}
        })
        //recieved requests
        const  recievedFriendRequests = await prisma.friendRequests.findMany({
          where: {receiverUserName: user.username as string}
        })
        
        return NextResponse.json({ currentUser,sentFriendRequests,recievedFriendRequests,friends }, { status: 200 });
      } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json(
          { message: 'Error while fetching user data', status: 500 },
          { status: 500 }
        );
      }

  }
  
}