import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import axios from 'axios';

// Defining the CSV row format
interface CSVRow {
  Title: string;
  Date: string;
}

export default function CSVUploader() {
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [csvData, setCsvData] = useState<{ title: string; watchedAt: string; season?: string; episode?: string; tmdbDetails?: any }[]>([]);
  const [uploading, setUploading] = useState(false);

  // TMDB API
  const fetchMediaDetails = async (title: string, isTVShow: boolean = false) => {
    try {
      if (isTVShow) {
        const tvResponse = await axios.get(`https://api.themoviedb.org/3/search/tv`, {
          params: {
            api_key: TMDB_API_KEY,
            query: title,
            language: 'en-US',
          },
        });

        if (tvResponse.data.results && tvResponse.data.results.length > 0) {
          return { type: 'tv', details: tvResponse.data.results[0] };
        }
      } else {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: TMDB_API_KEY,
            query: title,
            language: 'en-US',
          },
        });

        if (movieResponse.data.results && movieResponse.data.results.length > 0) {
          return { type: 'movie', details: movieResponse.data.results[0] };
        }
      }

      console.log(`No details found for ${title}`);
      return null;
    } catch (error) {
      console.error(`Error fetching media details for ${title}:`, error);
      return null;
    }
  };

  // Parse the CSV content
  const parseCSV = (content: string) => {
    return new Promise<void>((resolve) => {
      Papa.parse(content, {
        header: true,
        skipEmptyLines: true,
        complete: async (result: { data: CSVRow[] }) => {
          console.log('Parsed CSV Result:', result);

          const mappedRows = (result.data as CSVRow[]).map((row): { title: string; watchedAt: string; season?: string; episode?: string } | null => {
            const title = row.Title ? row.Title.replace(/"/g, '').trim() : '';
            const watchedAt = row.Date ? row.Date.replace(/"/g, '').trim() : '';

            if (!title || !watchedAt) {
              return null;
            }

            const isTVShow = title.includes(':');
            let showTitle = title;
            let season: string | undefined = undefined;
            let episode: string | undefined = undefined;

            if (isTVShow) {
              const parts = title.split(':');
              if (parts.length === 3) {
                showTitle = parts[0].trim();
                season = parts[1].trim();
                episode = parts[2].trim();
              }
            }

            return {
              title: showTitle,
              season,
              episode,
              watchedAt,
            };
          }).filter((row): row is { title: string; watchedAt: string; season?: string; episode?: string } => row !== null);

          const detailedRows = await Promise.all(
            mappedRows.map(async (row) => {
              const isTVShow = row.season !== undefined;
              const tmdbDetails = await fetchMediaDetails(row.title, isTVShow);
              return {
                ...row,
                tmdbDetails,
              };
            })
          );

          setCsvData(detailedRows.map(row => ({
            title: row.title || "",
            watchedAt: row.watchedAt || "",
            season: row.season || undefined,
            episode: row.episode || undefined,
            tmdbDetails: row.tmdbDetails,
          })));
          resolve();
        },
      });
    });
  };

  const handleDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        
        // Wait for CSV parsing to complete
        await parseCSV(content);
        
        // Upload CSV data
        try {
          const response = await axios.post('/api/upload/csv', csvData, {
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
