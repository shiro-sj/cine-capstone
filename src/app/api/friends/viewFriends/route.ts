import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request:Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const friends = await prisma.friend.findMany({
      where: {
        userId,
      },
      include: {
        friend: true, // Include friend user details
      },
    });

    return NextResponse.json({ friends }, { status: 200 });
  } catch (error) {
    console.error('Error fetching friends:', error);
    return new Response(
      JSON.stringify({ message: 'Error while fetching friends', status: 500 }),
      { status: 500 }
    );
  }
}
