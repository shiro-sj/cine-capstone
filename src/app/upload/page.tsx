import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function CSVUpload() {
  const [csvData, setCsvData] = useState<{ title: string; watchedAt: string }[]>([]);

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
    const rows = content.split('\n').map((row) => row.split(','));

    if (rows.length === 0) return;

    const headers = rows[0];
    const mappedRows = rows.slice(1).map((row) => {
      const rowData: { title?: string; watchedAt?: string } = {};
      row.forEach((cell, index) => {
        const header = headers[index]?.trim();
        if (header === 'title') {
          rowData.title = cell ? cell.replace(/"/g, '').trim() : '';
        } else if (header === 'watchedAt') {
          rowData.watchedAt = cell ? cell.replace(/"/g, '').trim() : '';
        }
      });
      return rowData;
    });

    const filteredRows = mappedRows.map((row) => ({
      title: row.title || '',
      watchedAt: row.watchedAt || '',
    }));

    setCsvData(filteredRows);
  };

// Client-side uploadCSV function
const uploadCSV = async () => {
  try {
    if (!csvData || csvData.length === 0) {
      alert('No CSV data available to upload');
      return;
    }

    // Send CSV data as JSON
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
        disabled={csvData.length === 0}
      >
        Upload CSV
      </button>
    </div>
  );
}
