'use client'
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function MovieTicket() {
    const svgRef = useRef();

    const [movieTitle, setMovieTitle] = useState('Fast and Furious');
    const [watchedTime, setWatchTime] = useState('10:00 PM');
    const [timeline, setTimeline] = useState(''); // 'week', 'month', 'year', 'decade'


    useEffect(() => {
        const fetchMovie = async () => {



        };

        fetchMovie();
    }, [timeline]);


 const handleDownload = () => {
        const svgElement = svgRef.current;
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


    return (
        <div>
            <svg
                ref={svgRef}
                width="300"
                height="150"
                viewBox="0 0 300 150"
                xmlns="http://www.w3.org/2000/svg"
                style={{ borderRadius: '10px', border: '2px solid #333', backgroundColor: '#f5e1c4' }}
            >
                <rect x="0" y="0" width="10" height="150" fill="#e3c09d" />
                <circle cx="5" cy="20" r="2" fill="#333" />
                <circle cx="5" cy="50" r="2" fill="#333" />
                <circle cx="5" cy="80" r="2" fill="#333" />
                <circle cx="5" cy="110" r="2" fill="#333" />
                <circle cx="5" cy="140" r="2" fill="#333" />

                <rect x="290" y="0" width="10" height="150" fill="#e3c09d" />
                <circle cx="295" cy="20" r="2" fill="#333" />
                <circle cx="295" cy="50" r="2" fill="#333" />
                <circle cx="295" cy="80" r="2" fill="#333" />
                <circle cx="295" cy="110" r="2" fill="#333" />
                <circle cx="295" cy="140" r="2" fill="#333" />

                <text
                    x="50%"
                    y="30%"
                    textAnchor="middle"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="18"
                    fontWeight="bold"
                >
                    ADMIT ONE
                </text>

                <text
                    x="50%"
                    y="55%"
                    textAnchor="middle"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="14"
                >
                    {movieTitle}
                </text>

                <text
                    x="50%"
                    y="70%"
                    textAnchor="middle"
                    fill="#333"
                    fontFamily="Arial, sans-serif"
                    fontSize="12"
                >
                    Watched at: {watchedTime}
                </text>
            </svg>

            <button onClick={handleDownload}>Download as PNG</button>

            <div>
                <button className="m-2" onClick={() => setTimeline('week')}>Week</button>
                <button className="m-2" onClick={() => setTimeline('month')}>Month</button>
                <button className="m-2" onClick={() => setTimeline('year')}>Year</button>
                <button className="m-2" onClick={() => setTimeline('decade')}>Decade</button>
            </div>
        </div>
    );
}
