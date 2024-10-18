import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import axios from 'axios';


interface CSVRow {
  Title: string;
  Date: string;
}


export default function CSVUploader() {
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [csvData, setCsvData] = useState<{ title: string; watchedAt: string; isTvShow: boolean; id: string; data:{} }[]>([]);
  const [uploading, setUploading] = useState(false);

  //function for fetching movie id from TMDB
  async function fetchMovieID(searchUrl:string, title: string){
    try{
      const response = await axios.get(`${searchUrl}/movie`, {
        params:{
          api_key: TMDB_API_KEY,
          query: title,
        },
      }) 

      return response.data.results[0].id;

    }catch (e){
      console.log('Error fetching movie ID: ', e)
    };
  };

  //function for fetching movie id from TMDB
  async function fetchSeriesID(searchUrl:string, title: string){
    try{
      const response = await axios.get(`${searchUrl}/tv`, {
        params:{
          api_key: TMDB_API_KEY,
          query: title,
        },
      })
      return response.data.results[0].id;

    }catch (e){
      console.log('Error fetching Series ID: ', e)
    };
  };

   //function for fetching series by id from TMDB
  async function findSeriesByID(findUrl:String, id:string){
    try{
      const response = await axios.get(`${findUrl}/tv/${id}`, {
        params:{
          api_key: TMDB_API_KEY
        }
      })
      return response.data;

    }catch(e){
      console.log('Error fetching series data: ', e)
    }

  }

  //function for fetching movies by id from TMDB
  async function findMovieByID(findUrl:String, id:string |null){
    try{
      const response = await axios.get(`${findUrl}/movie/${id}`, {
        params:{
          api_key: TMDB_API_KEY
        }
      })
      console.log(response.data.id);
      return response.data;

    }catch(e){
      console.log('Error fetching movie data: ', e)
    }

  }

  // Parse the CSV content
  const parseCSV = (content: string) => {
    return new Promise<void>((resolve) => {
      // Papaparse
      Papa.parse(content, {
        header: true,
        skipEmptyLines: true,
        complete: async (result: { data: CSVRow[] }) => {
          // map through rows
          await Promise.all(
            result.data.map(async (row) => {
              const searchUrl = 'https://api.themoviedb.org/3/search';
              const findUrl = 'https://api.themoviedb.org/3';
              const watchDate = row.Date;
              let id: string|null = null;
              let isTvShow = false;
              let title: string = "";
              let data = {};
  
              if (row.Title.includes(':')) {
                try {
                  const seriesId = await fetchSeriesID(searchUrl, title);
                  const parts = row.Title.split(':');

                  if (parts.length == 2){
                    title = parts[0];
                    console.log(`Attempting to fetch series ID for: ${title}`);
                  }
                  
                  
                  // try fetching the series ID first
                  
                  
                  if (seriesId) {
                    id = seriesId;
                    isTvShow = true;
                    // console.log(`Series ID found for: ${title} with ID: ${id}`);
                  } else {
                    title = row.Title.trim();
                    console.log(`No series found for: ${title}. Trying to fetch Movie ID...`);
                    id = await fetchMovieID(searchUrl, title);

                    // console.log(`Movie ID found for: ${title} with ID: ${id}`);
                  }
                } catch (e) {
                  console.error(`Error processing title: ${title}`, e);
                }
              } else {
                try {
                  title = row.Title.trim();
                  id = await fetchMovieID(searchUrl, title);
                  data = await findMovieByID(findUrl, id);
                  // console.log(`Movie ID found for title: ${title} with ID: ${id}`);
                } catch (e) {
                  console.error(`Error fetching Movie ID for title: ${title}`, e);
                }
              }
  
              if (id) {
                //setData for backend processing...
                setCsvData((prevData) => [
                  ...prevData,
                  { title: title, watchedAt: watchDate, isTvShow, id, data },
                ]);

                
                console.error('ID not found for title:', row.Title);
              }

            })

            
          );
          
          resolve();
        }
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
