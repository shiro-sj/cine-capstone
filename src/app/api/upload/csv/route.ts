// import { prisma } from '@/lib/prisma';
import { useAuth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    // Parse the incoming JSON body (use request.json() for App Router)
    const csvData: { title: string; season: string; episode:string; watchedAt: string; tmdbDetails: {}}[] = await request.json();
    console.log('Received CSV Data:', csvData); 

    // const {userId, isLoaded} = useAuth();

    // Adding data to clerk
    

    // if (isSignedIn){
    //     const clerkId = user.id     
    //     const userRecord = await prisma.user.findUnique({
    //         where: { clerkId: clerkId },  
    //       });

    //       if (!userRecord) {
    //         return NextResponse.json({ error: 'User not found in the database' }, { status: 404 });
    //       }
      
    //       const userId = userRecord.id; 

    //       // Validate the CSV data structure
    //     if (!Array.isArray(csvData) || csvData.length === 0) {
    //         return NextResponse.json({ error: 'Invalid CSV format or empty CSV data' }, { status: 400 });
    //     }
  
    //     // map data from csv
    //     const watchHistoryData = await Promise.all(
    //         csvData.map(async (row) => {
    //         const { title, watchedAt } = row;
    
    //         if (!title || !watchedAt) {
    //             throw new Error('Missing title or watchedAt field');
    //         }
    
    //         return {
    //             title: title,
    //             watchedAt: new Date(watchedAt),  
    //             userId: userId, 
    //         };
    //         })
    //     ); 
    // }
    // return new Response(JSON.stringify({message: 'No user signed in', status: 500}))
} catch{

};

};

// export async function GET() {
//     try {
//       const watchHistoryData = await prisma.watchHistory.findMany();
//       return NextResponse.json({ watchHistoryData });
//     } catch (e) {
//       console.error('Error fetching data:', e);
//       return new Response(JSON.stringify({message:'Error while fetching data', status:500})
//       );
//     }
//   };