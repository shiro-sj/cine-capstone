import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import axios from 'axios';
import { title } from 'process';


interface CSVRow {
  Title: string;
  Date: string;
}


export default function CSVUploader() {
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [csvData, setCsvData] = useState<{ title: string; watchedAt: string; isTvShow: boolean; id: string; data:{} }[]>([]);

  //function for fetching movie id from TMDB
  async function fetchDetails(searchUrl:string, title: string){
    try{
      const response = await axios.get(`${searchUrl}/multi`, {
        params:{
          api_key: TMDB_API_KEY,
          query: title,
        },
      }) 

      return response.data.results;

    }catch (e){
      console.log('Error fetching ID: ', e)
    };
  };

  async function searchMovieID(searchUrl: string, title:string){
    try {
      const response = await axios.get(`${searchUrl}/movie`,{
        params:{
          api_key: TMDB_API_KEY,
          query:title
        }
      })
      return response.data.results[0].id;
    } catch (e) {
      console.error('Error fetching movie ID: ',e)
      
    }
  }
  async function searchSeriesID(searchUrl: string, title:string){
    try {
      const response = await axios.get(`${searchUrl}/tv`,{
        params:{
          api_key: TMDB_API_KEY,
          query:title
        }
      })
      return response.data.results[0].id;
    } catch (e) {
      console.error('Error fetching series ID: ',e)
    }
  }

  //function for fetching movie id from TMDB


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

  };

  //function for fetching movies by id from TMDB
  async function findMovieByID(findUrl:String, id:string |null){
    try{
      const response = await axios.get(`${findUrl}/movie/${id}`, {
        params:{
          api_key: TMDB_API_KEY
        }
      })
      return response.data;

    }catch(e){
      console.log('Error fetching movie data: ', e)
    }

  };

  async function findEpisode(findUrl:String, id:string, episodeName:String){
    try {
      const response = await axios.get(`${findUrl}/tv/${id}/season/1`,{
        params:{
          api_key: TMDB_API_KEY
        }
      })

      for (let episodeNumber in response.data.episodes){
        let name = response.data.episodes[episodeNumber].name
        if (name == episodeName){
          return response.data.episodes[episodeNumber];
        }
      }

      return response.data;
    } catch (error) {
      
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
            let id: string | null = null;
            let isTvShow = false;
            let title: string = "";
            let episodeName: string | null = null;
            let data = {};

            if (row.Title.includes(':')) {
              // separate the titles into parts
              const parts = row.Title.trim().split(':');
             
               switch(parts.length){
                case 2:

                  try {
                    title = parts[0].trim()
                    episodeName = parts[1].trim()
                    id = await searchSeriesID(searchUrl, title)

                    if (id){
                      console.log(await findEpisode(findUrl, id, episodeName))
                      isTvShow = true;
                    } else{
                      title = row.Title.trim();
                      id = await searchMovieID(searchUrl, title);
                      console.log(await findMovieByID(findUrl, id));
                    }
                  } catch (error) {
                    console.log(error)
                  }
                  break;
                case 3:
                  title = parts[0].trim();
                  const seasonNumber= parts[1].trim().match(/\d/);;
                  if (seasonNumber){
                    console.log(`Contains season number: ${seasonNumber}`)
                  }
                  
                  break;
                case 4:
                  break;
              
               }

              

            } else {
              title = row.Title.trim();
              id = await searchMovieID(searchUrl, title);
              console.log(await findMovieByID(findUrl, id));
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
        
        // wait for CSV parsing to complete
        await parseCSV(content);
        
        // upload CSV data
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
