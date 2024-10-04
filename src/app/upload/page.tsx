'use client'
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Papa from 'papaparse';

interface CSVRow {
  Title: string;
  Date: string;
}

export default function CSVUpload() {
  const [csvData, setCsvData] = useState<{ title: string; watchedAt: string }[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        parseCSV(content);
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (content: string) => {
    Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log("Parsed CSV Result:", result); // Debugging: Log the entire result
  
        const mappedRows = (result.data as CSVRow[]).map((row) => {
          console.log("Row Data:", row); // Debugging: Log each row
  
          const title = row.Title ? row.Title.replace(/"/g, '').trim() : '';
          const watchedAt = row.Date ? row.Date.replace(/"/g, '').trim() : '';
  
          return title && watchedAt ? { title, watchedAt } : null;
        }).filter((row): row is { title: string; watchedAt: string } => row !== null); // Type guard
  
        setCsvData(mappedRows);
        console.log('Mapped rows set to state:', mappedRows);
      },
    });
  };
  
  const uploadCSV = async () => {
    console.log("Upload CSV button clicked!");

    if (csvData.length === 0) {
      alert('No CSV data available to upload');
      return;
    }

    setUploading(true);
    console.log('Data being uploaded:', csvData);

    try {
      const response = await axios.post('/api/uploadCSV', csvData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('CSV data uploaded successfully');
      } else {
        alert('Failed to upload CSV data');
      }
    } catch (error) {
      console.error('Error uploading CSV data:', error);
      alert('An error occurred while uploading the CSV data');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
  });

  return (
    <div className="csv-upload flex flex-col items-center justify-center gap-4">
      <h2>Please Enter Netflix Watch History</h2>
      <div
        {...getRootProps({
          className: 'dropzone p-20 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer mb-4',
        })}
      >
        <input {...getInputProps()} />
        <p>Drag & drop a CSV file here, or click to select one</p>
      </div>

      <button
        className="btn btn-primary justify-center"
        onClick={uploadCSV}
        disabled={csvData.length === 0 || uploading}
      >
        {uploading ? 'Uploading...' : 'Upload CSV'}
      </button>
    </div>
  );
}
