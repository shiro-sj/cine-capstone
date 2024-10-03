'use client';

import { useCsv } from '../../context/CsvContext';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function CSVUpload() {
  const { setCsvData } = useCsv();  // Access csvData and setCsvData from context
  const router = useRouter();  // Initialize router

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        parseCSV(content);
        // Redirect the user to the home page after parsing the CSV file
        router.push('/');
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (content) => {
    const rows = content.split('\n').map(row => row.split(','));
    if (rows.length === 0) return;

    const headers = rows[0];
    const mappedRows = rows.slice(1).map(row => {
      let rowData = {};
      row.forEach((cell, index) => {
        const header = headers[index]?.trim();
        if (header) {
          rowData[header] = cell ? cell.replace(/"/g, '').trim() : '';
        }
      });
      return rowData;
    });

    setCsvData(mappedRows.slice(0, 20));  // Save the first 20 rows to state
  };

  return (
    <div className="csv-upload">
      <h1>Please Enter Netflix Watch History</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
}
