'use client';

import React, { useState, useEffect } from 'react';
import { useCsv } from '../../context/CsvContext';  // If needed, keep it, otherwise remove.
import Link from 'next/link';  // Use Link for client-side navigation
import Image from 'next/image';  // For optimized image loading

export default function MovieDetails({ params }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=b0620182&t=${params.id}&plot=full`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const movieData = await response.json();
        setDetails(movieData);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, [params.id]);

  // Show loading message while data is being fetched
  if (details == null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Link href="/watchHistory">
        <a>
          <p>Back to Watch History</p>
        </a>
      </Link>

      <h1>{details.Title}</h1>

      <div>
        {/* Optimized image with Next.js Image component */}
        <Image
          src={details.Poster}
          alt={`${details.Title} Poster`}
          width={300}
          height={450}
          layout="intrinsic"  // This helps to keep the aspect ratio and responsive
        />
      </div>

      <p>Directed by: {details.Director}</p>
      <p>Genre: {details.Genre}</p>
      <p>Release Date: {details.Released}</p>
      <p>IMDB Rating: {details.imdbRating}</p>
      <p>Writer: {details.Writer}</p>

      {/* Movie Description */}
      <div>
        <h2>Description</h2>
        <p>{details.Plot}</p>
      </div>
    </div>
  );
}
