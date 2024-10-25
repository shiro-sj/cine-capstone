"use client"
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { parseCSV } from '@/lib/csv';
import { Data } from '@/lib/interfaces';


export default function CSVUploader() {

  const [csvData, setCsvData] = useState<Data[]>([]);

  const handleDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        
        // wait for CSV parsing to complete
        const parsedData = await parseCSV(content);
        setCsvData(parsedData);
        
        // upload CSV data
        try {
          const response = await axios.post('/api/upload/csv', parsedData, {
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

      reader.readAsText(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop, multiple: false });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <div className='w-96 h-72 bg-slate-300 text-black'>
              <p>Drop the files here ...</p>
            </div>
            :
            <div className='w-96 h-72 bg-white text-black hover:bg-slate-300'>
              <p>Drag files or click to upload.</p>
            </div>
        }
      </div>
    </div>
  );
}
