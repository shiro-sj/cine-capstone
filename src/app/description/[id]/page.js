"use client";

import React, { useState, useEffect } from 'react';
import { useCsv } from '../../context/CsvContext';

export default function MovieDetails({ params }) {
    
    const [details, setDetails] = useState(null);
    const { csvData } = useCsv();

    useEffect(() => {
        const fetchMovieData = async () => {
          const response = await fetch(`https://www.omdbapi.com/?apikey=b0620182&t=${params.id}&plot=full`);
          const movieData = await response.json();
          setDetails(movieData);
        };
    
        fetchMovieData();
      }, []);

      if (details == null){
        return<h1>Loading...</h1>
      }

    return(
        <div>
        <a href = '/watchHistory' >
        <p>back</p>
        </a>

            <h1>{details.Title}</h1>
        <div>
            <img 
                src={details.Poster} 
                alt={`${details.Title} Poster`} 
                width={300} 
                height={450} 
            />
        </div>
        <p>Directed by: {details.Director}</p>
        <p>Genre: {details.Genre}</p>
        <p>Release Date: {details.Released}</p>
        <p>IMDB Ratings: {details.imdbRating}</p>
        <p>Director: {details.Director}</p>
        <p>Writer: {details.Writer}</p>

        {/* Movie Description */}
        <div>
            <h2>Description</h2>
            <p>{details.Plot}</p>
        </div>
        </div>
      )

}