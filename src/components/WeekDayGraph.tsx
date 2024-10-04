"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function WatchHistoryDayGraph() {
  const [watchHistory, setWatchHistory] = useState<[]>([]);
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

  // Process the data to extract the day of the week and number of views on each day
  const processData = () => {
    const daysOfWeek: { [key: string]: number } = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };

    // Count views for each day of the week
    watchHistory.forEach((item: { watchedAt: string }) => {
      const date = new Date(item.watchedAt);
      const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
      daysOfWeek[dayOfWeek]++;
    });

    // Prepare data for the chart
    const days = Object.keys(daysOfWeek);
    const counts = Object.values(daysOfWeek);

    return { days, counts };
  };

  const { days, counts } = processData();

  // Chart.js Data Setup
  const data = {
    labels: days, // Days of the week
    datasets: [
      {
        label: 'Views per Day of the Week',
        data: counts, // Number of views per day
        backgroundColor: 'rgba(138,43,226,0.6)', // Purple color
        borderColor: 'rgba(138,43,226,1)', // Purple border
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Your Viewing Activity by Day of the Week',
        font: {
          size: 18,
          family: 'Arial, sans-serif',
          weight: 'bold',
        },
        color: '#6a0dad', // Purple title
        padding: { top: 20, bottom: 20 },
      },
      legend: {
        display: true,
        labels: {
          color: '#6a0dad', // Purple legend text
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            family: 'Arial, sans-serif',
          },
          color: '#6a0dad', // Purple axis ticks
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
            family: 'Arial, sans-serif',
          },
          color: '#6a0dad', // Purple axis ticks
        },
        grid: {
          color: '#dcdcdc', // Light gray grid lines
        },
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 style={{ color: '#6a0dad', fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}>
        Your Viewing Activity by Day of the Week
      </h2>
      <div style={{ width: '100%', margin: '0 auto', height: '500px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
