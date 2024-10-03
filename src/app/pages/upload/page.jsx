'use client';
import { useCsv } from '../context/CsvContext';
import QuickMovie from '../components/quickMovie';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function CSVUpload() {
  const { csvData, setCsvData } = useCsv();  // Access csvData and setCsvData from context
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
    const rows = content.split('\n').map(row => row.split(','));  // Split CSV into rows and columns
  
    if (rows.length === 0) return;  // Exit if there are no rows
  
    const headers = rows[0];  // The first row is the headers
  
    // Map each row of data to an object with keys corresponding to headers
    const mappedRows = rows.slice(1).map(row => {
      let rowData = {};
  
      row.forEach((cell, index) => {
        const header = headers[index] && headers[index].trim();  // Ensure header exists and is trimmed
        if (header) {
          rowData[header] = cell ? cell.replace(/"/g, '').trim() : '';  // Clean up cell data or default to empty string
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
