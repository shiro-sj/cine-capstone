// src/app/api/watchHistory/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    const watchHistory = await prisma.watchHistory.findMany({
      include: { user: true }, // Include user data if needed
    });

    return NextResponse.json(watchHistory);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
};
