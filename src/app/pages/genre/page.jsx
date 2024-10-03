'use client';
import { useCsv } from '../../context/CsvContext';
import { useState, useEffect } from 'react';

export default function Genre() {
  const { csvData } = useCsv(); 
  const [genreData, setGenreData] = useState([]);
  const [loading, setLoading] = useState(false);  // Loading state to show loading spinner/message
  const [error, setError] = useState(null);  // Error state for error handling

  const fetchMovieGenre = async (title) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=b0620182&t=${encodeURIComponent(title)}`);
      const movieData = await response.json();

      if (movieData.Response === 'False') {
        throw new Error(movieData.Error);
      }

      return movieData.Genre;  // Return genre data
    } catch (error) {
      console.error(`Failed to fetch genre for ${title}:`, error);
      return null;  // Return null if there's an error
    }
  };

  useEffect(() => {
    const getTopGenres = async () => {
      setLoading(true);  // Set loading state to true when starting the API request

      const filteredData = csvData.slice(0, 20);  // Slice top 20 movies
      let genreCount = {};

      // Use Promise.all to fetch genres concurrently for better performance
      const genrePromises = filteredData.map(async (movie) => {
        const genre = await fetchMovieGenre(movie.Title);
        if (genre) {
          const genreList = genre.split(', ').map(g => g.trim());
          genreList.forEach(g => {
            genreCount[g] = (genreCount[g] || 0) + 1;  // Count genre occurrences
          });
        }
      });

      // Wait for all API calls to finish
      await Promise.all(genrePromises);

      // Sort and get the top 10 genres
      const sortedGenres = Object.entries(genreCount)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 10);

      setGenreData(sortedGenres);  // Set the genre data
      setLoading(false);  // Set loading to false once the data is fetched
    };

    if (csvData.length > 0) {
      getTopGenres();
    }
  }, [csvData]);

  // Show error message if something went wrong
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Show loading message while data is being fetched
  if (loading) {
    return <h1>Loading genres...</h1>;
  }

  return (
    <div>
      <h1>Top Genres of the Year</h1>
      {genreData.length > 0 ? (
        genreData.map(([genre, count], index) => (
          <div key={index}>
            <p>{genre}: {count} movies</p>
          </div>
        ))
      ) : (
        <p>No genres found.</p>
      )}
    </div>
  );
}
