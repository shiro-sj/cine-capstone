"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export default function MovieDetails({ params }) {
  const [details, setDetails] = useState(null);
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      const response = await fetch('https://www.omdbapi.com/?apikey=b0620182&t=2+Fast+2+Furious&plot=full');
      const posterResponce = await fetch ('http://img.omdbapi.com/?apikey=b0620182&t=2+Fast+2+Furious&plot=full');
      const movieData = await response.json();
      setDetails(movieData);
      setPoster(posterResponce);
    };

    fetchMovieData();
  }, []);

  return (
    <div>
      {details ? (
        <>
          <h1>{details.Title}</h1>

          <div>
            <Image 
              src={'https://m.media-amazon.com/images/I/81THF8MjUzL._AC_UF1000,1000_QL80_.jpg'} 
              alt={`${details.Title} Poster`} 
              width={300} 
              height={450} 
            />
          </div>

          <p>Directed by: {details.Director}</p>
          <p>Genre: {details.Genre}</p>
          <p>Release Date: {details.Released}</p>
          <p>Rating: {details.imdbRating}</p>

          {/* Movie Description */}
          <div>
            <h2>Description</h2>
            <p>{details.Plot}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
