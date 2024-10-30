import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
  const { user,friend} = await request.json();

    try {

        console
        if (!user || !friend){
            console.log('Null user or friend');
            return NextResponse.json({message: 'Null user or friend'}, {status:500})
        }
    
        const deleteFriend = await prisma.friend.deleteMany({
            where: {
              AND: [
                { username: user },
                { friendname: friend },
              ],
            },
          });
      
          const deleteUserFriend = await prisma.friend.deleteMany({
            where: {
              AND: [
                { username: friend },
                { friendname: user },
              ],
            },
          });
        
        return NextResponse.json({ message: 'Friend Deleted' }, { status: 200 });
        }

    catch (error) {
        console.error('Error deleting friend: ', error);
        return new Response(
        JSON.stringify({ message: `Error deleting friend: ${error}` , status: 500 }),
        { status: 500 }
        );
  }
}