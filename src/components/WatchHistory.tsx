"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface WatchHistoryItem {
  id: number; // Adjust according to your actual schema
  title: string;
  watchedAt: string; // or Date
}

export default function WatchHistory() {
  const [watchHistory, setWatchHistory] = useState<WatchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        const response = await axios.get('/api/watchHistory');
        setWatchHistory(response.data);
      } catch (error) {
        console.error('Error fetching watch history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col'>
      <h2>History</h2>
      <div className="scrollable-container">
        <ul>
          {watchHistory.map((item) => (
            <li key={item.id}>
            <p> {new Date(item.watchedAt).toLocaleDateString()} ====== {item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
