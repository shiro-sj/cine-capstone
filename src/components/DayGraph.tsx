"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function WatchHistoryGraph() {
  const [watchHistory, setWatchHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the watch history data
  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        const response = await axios.get('/api/watchHistory');
        setWatchHistory(response.data);
      } catch (error) {
        console.error('Error fetching watch history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchHistory();
  }, []);

  // Process the data to extract dates and the number of views on each date
  const processData = () => {
    const dateMap: { [key: string]: number } = {};
    
    watchHistory.forEach((item: { watchedAt: string }) => {
      const date = new Date(item.watchedAt).toLocaleDateString();
      dateMap[date] = (dateMap[date] || 0) + 1;
    });

    const sortedDates = Object.keys(dateMap).sort();
    const counts = sortedDates.map((date) => dateMap[date]);

    return { sortedDates, counts };
  };

  const { sortedDates, counts } = processData();

  // Chart.js Data Setup
  const data = {
    labels: sortedDates, // Dates
    datasets: [
      {
        label: 'Views per Day',
        data: counts, // Number of views per day
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,0.2)',
        tension: 0.1,
      },
    ],
  };

  // Options for the chart (optional)
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Your Viewing Activity Over Time',
      },
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Viewing Activity Over Time</h2>
      <div style={{ width: '100%', margin: '0 auto', padding: '40' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
