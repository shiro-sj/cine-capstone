'use client'
import { useState,useEffect } from "react";
import { useCsv } from '../context/CsvContext';

export default function watchTime(){
    const [watchTime,setWatchTime] = useState();
    const {csvData} = useCsv();

    
    const fetchMovieTime = async (title) => {
        const response = await fetch(`https://www.omdbapi.com/?apikey=b0620182&t=${encodeURIComponent(title)}`);
        const movieData = await response.json();
        return movieData.Runtime;
    };
    
    useEffect(()=>{
        const getWatchTime = async () =>{
            let totalTime = 0;

            const filteredData = csvData.slice(0, 20);

            for (let movie of filteredData){
                const time = await fetchMovieTime(movie.Title);

                if (time && time !== 'N/A'){
                    const runtimeInt = parseInt(time.replace(' mins', ''));
                    totalTime = totalTime + runtimeInt;
                }
            }
            setWatchTime(totalTime);
        }

        if (csvData.length>0){
            getWatchTime();
        }
    },[csvData]);

    return(
        <div>
            <p>you have watched in total: {watchTime} minutes</p>
        </div>
    )

}