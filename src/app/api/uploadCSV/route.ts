// app/api/uploadCSV/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';  // Assuming Prisma is set up
import { checkUser } from '../../../lib/checkUser';  // Assuming this function checks if the user is authenticated

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON body (use request.json() for App Router)
    const csvData: { title: string; watchedAt: string }[] = await request.json();
    console.log('Received CSV Data:', csvData);  // Log for debugging purposes

    // Get the logged-in user (from Clerk or your auth system)
    const user = await checkUser();
    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const clerkId = user.id;  // Get the Clerk `clerkId` of the logged-in user

    // Fetch the `userId` from the `User` model based on the `clerkId`
    const userRecord = await prisma.user.findUnique({
      where: { clerkId: clerkId },  // Find the user by `clerkId`
    });

    if (!userRecord) {
      return NextResponse.json({ error: 'User not found in the database' }, { status: 404 });
    }

    const userId = userRecord.id;  // Get the `userId` from your User model

    // Validate the CSV data structure
    if (!Array.isArray(csvData) || csvData.length === 0) {
      return NextResponse.json({ error: 'Invalid CSV format or empty CSV data' }, { status: 400 });
    }

    // Map through CSV data and prepare the `WatchHistory` records
    const watchHistoryData = await Promise.all(
      csvData.map(async (row) => {
        const { title, watchedAt } = row;

        if (!title || !watchedAt) {
          throw new Error('Missing title or watchedAt field');
        }

        return {
          title: title,
          watchedAt: new Date(watchedAt),  // Convert watchedAt to Date
          userId: userId,  // Use the `userId` from the User model
        };
      })
    );

    // Insert the `WatchHistory` records into the database
    await prisma.watchHistory.createMany({
      data: watchHistoryData,  // Bulk insert the prepared data
    });

    return NextResponse.json({ message: 'CSV data uploaded successfully!' });

  } catch (error) {
    console.error('Error saving CSV data:', error);
    return NextResponse.json({ error: 'Error saving CSV data' }, { status: 500 });
  }
}
