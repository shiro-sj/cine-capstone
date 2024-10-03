// Custom component to display row data
'use client'

import { useState,useEffect } from "react";
import {Link} from 'next/navigation'

function QuickMovie({ row ,Date}) {
    const [movie, setMovie] = useState(null);
    const link = '/description/'+ row.Title
  
    useEffect(() => {
      const fetchMovieData = async () => {
        var movieData
        try{
        const response = await fetch(`https://www.omdbapi.com/?apikey=b0620182&t=${encodeURIComponent(row.Title)}`);
        movieData = await response.json();
        }
        catch{
            movieData = 'N/A';
        }
        setMovie(movieData);
      };
  
      fetchMovieData();
    }, [row.Title]);
  
    if (!movie){ return <div>Loading...</div>;}

    return (
      <div>
        <a href = {link}>
          <img 
            src={movie.Poster} 
            alt={`${movie.Title} Poster`} 
            width={300} 
            height={450} 
          />
          <p>{row.Title}</p>
        </a>
        <p>{Date}</p>
      </div>
    );
  }
export default QuickMovie;