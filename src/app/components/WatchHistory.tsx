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
  const [filteredHistory, setFilteredHistory] = useState<WatchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        const response = await axios.get('/api/watchHistory');
        setWatchHistory(response.data);
        setFilteredHistory(response.data); // Initially show all watch history
      } catch (error) {
        console.error('Error fetching watch history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchHistory();
  }, []);

  // Function to handle search
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredHistory(watchHistory); // Reset to full history if search is empty
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = watchHistory.filter(item =>
        item.title.toLowerCase().includes(lowercasedSearchTerm) ||
        new Date(item.watchedAt).toLocaleDateString().includes(lowercasedSearchTerm)
      );
      setFilteredHistory(filtered);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col'>
      <h2>History</h2>
      
      {/* Search input and button */}
      <div className="search-container flex items-center gap-2 mb-4">
        <input 
          type="text" 
          placeholder="Search history..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="border p-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
          Search
        </button>
      </div>

      <div className="scrollable-container">
        <ul>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <li key={item.id}>
                <p>{new Date(item.watchedAt).toLocaleDateString()} ====== {item.title}</p>
              </li>
            ))
          ) : (
            <p>No results found</p>
          )}
        </ul>
      </div>
    </div>
  );
}
