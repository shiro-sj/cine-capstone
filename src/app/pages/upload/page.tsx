'use client';  // Ensure this code runs only on the client side
import React from 'react';
import { useCsv } from '../../context/CsvContext';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';  // Import react-dropzone

export default function CSVUpload() {
  const { setCsvData } = useCsv();  // Access setCsvData from context
  const router = useRouter();  // Initialize router

  // Function to handle the file drop
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        parseCSV(content);
        // Redirect the user to the home page after parsing the CSV file
        router.push('/');
      };
      reader.readAsText(file);
    }
  };

  // Function to parse CSV content and store data
  const parseCSV = (content: string) => {
    const rows = content.split('\n').map((row) => row.split(','));  // Split CSV into rows and columns
    if (rows.length === 0) return;  // Exit if there are no rows

    const headers = rows[0];  // The first row is the headers

    // Map each row of data to an object with keys corresponding to headers
    const mappedRows = rows.slice(1).map((row) => {
      const rowData: { [key: string]: string } = {};

      row.forEach((cell, index) => {
        const header = headers[index]?.trim();  // Ensure header exists and is trimmed
        if (header) {
          rowData[header] = cell ? cell.replace(/"/g, '').trim() : '';  // Clean up cell data
        }
      });

      return rowData;
    });

    setCsvData(mappedRows.slice(0, 20));  // Save the first 20 rows to state
  };

  // Set up react-dropzone to handle file drag-and-drop
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    multiple: false,  // Only accept one file at a time
  });

  return (
    <div className="csv-upload">
      <h2>Please Enter Netflix Watch History</h2>
      <div
        {...getRootProps({
          className: 'dropzone p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer',
        })}
      >
        <input {...getInputProps()} />
        <p>Drag & drop a CSV file here, or click to select one</p>
      </div>
    </div>
  );
};
