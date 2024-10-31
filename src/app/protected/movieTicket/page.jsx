// Inspired by reciptify

'use client'
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import MovieTicket from "../../components/dynamicImages/movieTicket";
import NavBar from "@/app/components/navbar";
import Receipt from "@/app/components/dynamicImages/recipt"

export default function Page() {
    const svgRef = useRef();
    const { isSignedIn } = useUser();
    const [movieTitle, setMovieTitle] = useState('');
    const [watchedTime, setWatchTime] = useState('');
    const [timeline, setTimeline] = useState('');
    const [watchHistory, setWatchHistory] = useState([]);
    const [imageStyle, setImageStyle] = useState('');
    const [movieStyle, setMovieStyle] = useState(true);
    const [reciptStyle, setReciptStyle] = useState(false);

    const fetchTopMovie = async () => {
        try {
            
            const response = await axios.get('/api/prisma/topStats');
            setMovieTitle(response.data.topMovie.title);
            setWatchTime(response.data.topMovie.watchedAt);
        } catch (error) {
            console.error('Error fetching watch history:', error);
        }
    };

    useEffect(() => {
        if (isSignedIn) fetchTopMovie();

    }, [isSignedIn]);

    const handleDownload = () => {
        const svgElement = svgRef.current.querySelector('svg');
        if (!svgElement) return;

        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);

        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = svgElement.getAttribute("width");
            canvas.height = svgElement.getAttribute("height");

            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);

            canvas.toBlob((blob) => {
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = 'movie-ticket.png';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }, 'image/png');

            URL.revokeObjectURL(svgUrl);
        };
        image.src = svgUrl;
    };

    const handleMovieTicket = () =>{
        setMovieStyle(true);
        setReciptStyle(false);
    }
    const handleRecipt = () =>{
        setMovieStyle(false);
        setReciptStyle(true);
    }

    return (
        <div>
            <NavBar/>
            
            <div ref={svgRef}>
                {(movieStyle) && <MovieTicket movieTitle={movieTitle} watchedTime={watchedTime} />}
                {reciptStyle && <Receipt itemsString="Item 1, Item 2, Item 3" total={26.47} date="2024-10-29" />
            }
                
            </div>
            <button onClick={handleDownload}>Download as PNG</button>

            <div>
                <button onClick = {handleMovieTicket}>Movie(Movie Ticket)</button>
                <button onClick = {handleRecipt}>TV Show(recipt)</button>
            </div>

            {/* <div>
                <button className="m-2" onClick={() => setTimeline('week')}>Week</button>
                <button className="m-2" onClick={() => setTimeline('month')}>Month</button>
                <button className="m-2" onClick={() => setTimeline('year')}>Year</button>
                <button className="m-2" onClick={() => setTimeline('decade')}>Decade</button>
            </div> */}
        </div>
    );
}
