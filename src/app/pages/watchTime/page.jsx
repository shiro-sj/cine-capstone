'use client';
import { useState, useEffect } from "react";
import { useCsv } from '../../context/CsvContext';

export default function WatchTime() {
  const [watchTime, setWatchTime] = useState(null);  // State for watch time
  const [loading, setLoading] = useState(false);  // Loading state
  const { csvData } = useCsv();

  const fetchMovieTime = async (title) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=b0620182&t=${encodeURIComponent(title)}`);
      const movieData = await response.json();
      if (movieData.Response === 'False') {
        throw new Error(`Movie not found: ${title}`);
      }
      return movieData.Runtime;  // Return runtime
    } catch (error) {
      console.log(error)
      return null;  // Return null if there's an error
    }
  };

  useEffect(() => {
    const getWatchTime = async () => {
      setLoading(true);  // Set loading to true before fetching

      let totalTime = 0;
      const filteredData = csvData.slice(0, 20);  // Only consider top 20 movies

      // Use Promise.all to fetch all movie runtimes concurrently
      const timePromises = filteredData.map(async (movie) => {
        const time = await fetchMovieTime(movie.Title);

        if (time && time !== 'N/A') {
          const runtimeInt = parseInt(time.replace(' mins', ''));
          if (!isNaN(runtimeInt)) {
            totalTime += runtimeInt;  // Add the runtime to the total time
          }
        }
      });

      await Promise.all(timePromises);  // Wait for all requests to finish
      setWatchTime(totalTime);  // Update state with total time
      setLoading(false);  // Set loading to false after fetching
    };

    if (csvData.length > 0) {
      getWatchTime();
    }
  }, [csvData]);

  // Show loading message while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle errors gracefully
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {watchTime !== null ? (
        <p>You have watched a total of {watchTime} minutes.</p>
      ) : (
        <p>Unable to calculate watch time.</p>
      )}
    </div>
  );
}
