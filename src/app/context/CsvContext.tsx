'use client';  // Ensures this code only runs on the client-side
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface CsvContextType {
  csvData: { [key: string]: string }[];  // Define this based on the expected structure of your CSV data
  setCsvData: React.Dispatch<React.SetStateAction<{ [key: string]: string }[]>>;
}

// Create a new context for CSV data with a default value of `undefined`
const CsvContext = createContext<CsvContextType | undefined>(undefined);

// Custom hook to access the CSV data context
function useCsv(): CsvContextType {
  const context = useContext(CsvContext);

  if (!context) {
    throw new Error('useCsv must be used within a CsvProvider');
  }

  return context;
}

// CsvProvider component to wrap parts of the app where CSV data is needed
interface CsvProviderProps {
  children: ReactNode;  // `children` will be the components that consume the context
}

export default function CsvProvider({ children }: CsvProviderProps): JSX.Element {
  const [csvData, setCsvData] = useState<{ [key: string]: string }[]>([]);  // State to hold CSV data

  return (
    <CsvContext.Provider value={{ csvData, setCsvData }}>
      {children}  {/* The components that need access to this context will go here */}
    </CsvContext.Provider>
  );
}
