import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Papa from 'papaparse';

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
      complete: (result) => {
        const rows = result.data;

        // Debug: Log the data to inspect its structure
        console.log("CSV rows structure:", rows);

        // Ensure rows are not empty
        if (!Array.isArray(rows) || rows.length === 0) {
          console.error('CSV is empty or failed to parse correctly');
          return;
        }

        const headers = rows[0] as string[];  // Assuming first row is headers
        if (!headers || headers.length < 2) {
          console.error('Invalid CSV format. Headers are missing or malformed.');
          return;
        }

        const mappedRows = rows.slice(1).map((row: any, index: number) => {
          // Debug: Log each row for debugging
          console.log(`Processing row ${index + 1}:`, row);

          // Ensure row is an array, convert if it's an object
          if (typeof row === 'object' && !Array.isArray(row)) {
            // Convert object to array by taking the values
            row = Object.values(row);
            console.log(`Row ${index + 1} was an object, converted to array:`, row);
          }

          // Ensure row is an array
          if (!Array.isArray(row)) {
            console.error(`Row ${index + 1} is not an array:`, row);
            return null;  // Skip this row
          }

          const rowData: { title?: string; watchedAt?: string } = {};

          // We assume that "Title" is in the first column and "Date" is in the second
          row.forEach((cell, idx) => {
            const header = headers[idx]?.trim();

            if (header === 'Title') {
              rowData.title = cell ? cell.replace(/"/g, '').trim() : '';
            } else if (header === 'Date') {
              rowData.watchedAt = cell ? cell.replace(/"/g, '').trim() : '';
            }
          });

          return rowData;
        });

        // Filter out rows where either title or watchedAt is missing
        const filteredRows = mappedRows.filter((row) => row?.title && row?.watchedAt);

        // Make sure we are using valid data
        const validRows = filteredRows.map((row) => ({
          title: row?.title as string,  // Type assertion to ensure it's a string
          watchedAt: row?.watchedAt as string,  // Type assertion to ensure it's a string
        }));

        // Debug: Log the rows that will be uploaded
        console.log('Filtered rows:', validRows);

        // Update the state with valid rows
        setCsvData(validRows);
      },
      header: true,  // Treat first row as headers
      skipEmptyLines: true,  // Skip empty lines in CSV
    });
  };

  // Client-side uploadCSV function
  const uploadCSV = async () => {
    console.log("Upload CSV button clicked!");

    try {
      if (!csvData || csvData.length === 0) {
        alert('No CSV data available to upload');
        return;
      }

      setUploading(true);

      // Debug log: Check what csvData contains before making the request
      console.log('Data being uploaded:', csvData);

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
};
