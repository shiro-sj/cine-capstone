import { StatsProps } from "@/lib/interfaces";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Stats ({view}: StatsProps) {

    const [topMovie, setTopMovie] = useState("");
    const [topMovieCount, setTopMovieCount] = useState(0);

    const [topTVShow, setTopTVShow] = useState("");
    const [topTVShowCount, setTopTVShowCount] = useState(0);

    const [topTitle, setTopTitle] = useState("");
    const [topTitleCount, setTopTitleCount] = useState(0);

    const [totalWatchTime, setTotalWatchTime] = useState(0);

    const { isSignedIn } = useUser();

    useEffect(() => {
        const fetchTotalWatchTime = async ()=> {
            try{
              const response = await axios.get('/api/prisma/watchTime');
              setTotalWatchTime(response.data.totalWatchTime)
            } catch (error){
              console.error('Error fetching watch Time:', error);
            }
        }

        const fetchTopStats = async () => {
            if (isSignedIn) {
                try {
                    const response = await axios.get('/api/prisma/topStats');
                    setTopMovie(response.data.topMovie.title);
                    setTopMovieCount(response.data.topMovie._count.title);

                    setTopTVShow(response.data.topTVShow.title); 
                    setTopTVShowCount(response.data.topTVShow._count.title); 

                    setTopTitle(response.data.topTitle.title); 
                    setTopTitleCount(response.data.topTitle._count.title); 
                } catch (error) {
                    console.error("Error fetching top stats:", error);
                }
            }
        };

        fetchTopStats();
        fetchTotalWatchTime();
    }, [isSignedIn]);

    return(
        <div>
            <h2>Stats:</h2>
            <h3>Total Watch Time: {totalWatchTime}</h3>
            {view === "Movie" && (
                <p>Top Movie: {topMovie} ({topMovieCount} views)</p>
            )}
            {view === "TV" && (
                <p>Top TV Show: {topTVShow} ({topTVShowCount} views)</p>
            )}
            {view === "All" && (
                <p>Top Title: {topTitle} ({topTitleCount} views)</p>
            )}
        </div>
    )
}

