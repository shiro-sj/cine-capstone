// pages/api/uploadCSV.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import  prisma  from '../../../lib/prisma';  // Assuming you have prisma set up

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const csvData = req.body;  // Get CSV data from the request body

      // Process the CSV data
      for (const row of csvData) {
        const { title, watchedAt } = row;  // Destructure the row to get title and date

        // Save each row in the database
        await prisma.watchHistory.create({
          data: {
            title,
            watchedAt: new Date(watchedAt),  // Convert date string to a Date object
          },
        });
      }

      return res.status(200).json({ message: 'CSV data uploaded successfully!' });
    } catch (error) {
      console.error('Error saving CSV data:', error);
      return res.status(500).json({ error: 'Error saving CSV data' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
