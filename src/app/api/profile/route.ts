import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const profileUsername = searchParams.get('username');

  if (!profileUsername) {
    return NextResponse.json({ error: 'Invalid or missing username' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { username: profileUsername },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { message: 'Error while fetching user data', status: 500 },
      { status: 500 }
    );
  }
}
