import { Entry } from '@/lib/interfaces';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function WatchHistory() {
    const {isSignedIn} = useUser();
    const [view, setView] = useState("All");
    const [watchHistory, setWatchHistory] = useState<Entry[]>([]);

    const [loading, setLoading] = useState(true);

    const fetchWatchHistory = async () => {
        try {
            const response = await axios.get('/app/api/upload/csv');
            setWatchHistory(response.data.watchHistoryData);
        } catch (error) {
            console.error('Error fetching watch history:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(()=>{
      if (isSignedIn){
        fetchWatchHistory();
      }
    }, [isSignedIn]);

    const filteredHistory = watchHistory.filter((entry) => {
        if (view === "All") return true;
        if (view === "Movies") return !entry.isTvShow;
        if (view === "TV") return entry.isTvShow;
    });

    return (
        <div>
            <div>
                <button onClick={() => setView("All")}>All</button>
                <button onClick={() => setView("Movies")}>Movies</button>
                <button onClick={() => setView("TV")}>TV</button>
            </div>
            <p>{view}</p>

            {loading ? (
                <p>Loading data...</p>
            ) : (
                <ul>
                    {filteredHistory.map((entry) => (
                        <li key={entry.id} className='flex flex-row p-10 m-5 bg-slate-900 rounded-xl justify-around items-center'>
                            {entry.isTvShow ? (
                                <div>
                                    
                                    <img src={`https://image.tmdb.org/t/p/w185${entry.posterPath}`} alt={entry.title} />
                                    <p>"{entry.title} : Season {entry.season}: {entry.episodeName}" Watched At: {new Date(entry.watchedAt).toLocaleDateString()}</p>
                                </div>
                            ) : (
                                <div>
                                    <img src={`https://image.tmdb.org/t/p/w185${entry.posterPath}`} alt={entry.title} />
                                    <p>"{entry.title}" Watched At: {new Date(entry.watchedAt).toLocaleDateString()}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
