import { prisma } from '@/lib/prisma';
import { Data } from "@/lib/interfaces";
import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';


export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON body (use request.json() for App Router)
    const csvData: Data[] = await request.json();
    console.log('Received CSV Data:', csvData); 


    const user = await currentUser();
    const userId = user?.id;

    if (user) {
      const userRecord = await prisma.user.findUnique({
        where: { clerkId: userId},  
      });

      if (!userRecord) {
        return NextResponse.json({ error: 'User not found in the database' }, { status: 404 });
      }
  
      const currentUserID = userRecord.id; 

      // Validate the CSV data structure
    if (!Array.isArray(csvData) || csvData.length === 0) {
        return NextResponse.json({ error: 'Invalid CSV format or empty CSV data' }, { status: 400 });
    }

    // map data from csv
    const watchHistoryData = await Promise.all(
        csvData.filter(row => row !== null).map(async (row) => {
        const { title, watchedAt, isTvShow, runtime, tmdbID, genres, posterPath, episodeName, season, releaseDate, isUploaded, uploadDate } = row;
    
          return {
            title: title,
            watchedAt: new Date(watchedAt), 
            isTvShow: isTvShow,
            runtime: runtime,
            tmdbID: tmdbID as string, 
            genres: genres,
            posterPath: posterPath,
            releaseDate: releaseDate,
            isUploaded: isUploaded,
            episodeName: episodeName,
            season: season,
            uploadDate: new Date(uploadDate),
            userId: currentUserID, 
          };
     
      })
    ); 

    await prisma.watchHistory.deleteMany({});
     
    await prisma.watchHistory.createMany({data: watchHistoryData})
      
    }
    

    return new Response(JSON.stringify({ message: 'CSV data processed successfully', status: 200 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error processing CSV data:', error);

    return new Response(JSON.stringify({ message: 'Error processing CSV data', status: 500 }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET() {
  const user = await currentUser();
  const userId = user?.id;
  const userRecord = await prisma.user.findUnique({
    where: { clerkId: userId},  
  });

  if (userRecord){
    const currentUserID = userRecord.id; 

    if(currentUserID){
      try {
        const watchHistoryData = await prisma.watchHistory.findMany({
          where:{
            userId: currentUserID
          }
        });
        return NextResponse.json({ watchHistoryData });
      } catch (e) {
        console.error('Error fetching data:', e);
        return new Response(JSON.stringify({message:'Error while fetching data', status:500})
        );
      }
  
    }
  }


  
    
  };