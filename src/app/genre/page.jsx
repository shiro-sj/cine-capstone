'use client'
import { useCsv } from '../context/CsvContext';
import QuickMovie from '../components/quickMovie';
import { useState, useEffect } from 'react';

export default function Genre() {
  const { csvData } = useCsv(); 
  const [genreData, setGenreData] = useState([]);

  const fetchMovieGenre = async (title) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=b0620182&t=${encodeURIComponent(title)}`);
    const movieData = await response.json();
    return movieData.Genre;
  };

  useEffect(() => {
    const getTopGenres = async () => {
      // Filter by top 20 movies for the current year
      const filteredData = csvData.slice(0, 20);
      
      let genreCount = {};

      for (const movie of filteredData) {
      console.log(movie.Title)
        const genre = await fetchMovieGenre(movie.Title);
        
        if (genre) {
          const genreList = genre.split(', ').map(g => g.trim());

          genreList.forEach(g => {
            genreCount[g] = (genreCount[g] || 0) + 1;
          });
        }
      }

      const sortedGenres = Object.entries(genreCount)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 10);

      setGenreData(sortedGenres);
    };

    if (csvData.length > 0) {
      getTopGenres();
    }
  }, [csvData]);

  return (
    <div>
      <h1>Top Genres of the Year</h1>
      {genreData.length > 0 && genreData.map(([genre, count], index) => (
        <div key={index}>
          <p>{genre}: {count} movies</p>
        </div>
      ))}
    </div>
  );
}
