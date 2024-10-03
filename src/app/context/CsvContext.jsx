'use client';  // Ensures this code only runs on the client-side
import { createContext, useContext, useState } from 'react';

// Create a new context for CSV data
const CsvContext = createContext();

// Custom hook to access CSV data context
export default function useCsv() {
  return useContext(CsvContext);
}

// CsvProvider component to wrap parts of the app where CSV data is needed
export function CsvProvider({ children }) {
  const [csvData, setCsvData] = useState([]);  // State to hold CSV data

  return (
    <CsvContext.Provider value={{ csvData, setCsvData }}>
      {children}  {/* The components that need access to this context will go here */}
    </CsvContext.Provider>
  );
}
