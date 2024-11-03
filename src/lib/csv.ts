import Papa from "papaparse";
import {searchMovieID, findMovieByID, fetchPoster, searchSeriesID, findEpisode, findSeriesByID, findSeasonData, findSeasons, jaccardCompare } from "./tmdb";
import PQueue from "p-queue";
import { Data, CSVRow } from "./interfaces";




const queue = new PQueue({ interval: 1000, intervalCap: 50 });

// Parse the CSV content
export const parseCSV = (content: string) => {
  return new Promise<Data[]>((resolve) => {
    // papaparse
    Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
      complete: async (result: { data: CSVRow[] }) => {
        const rows = result.data;
        // map through rows
        const csvData = await Promise.all(
          rows.map(async (row) => {
            return queue.add(async () => {
              const searchUrl = 'https://api.themoviedb.org/3/search';
              const findUrl = 'https://api.themoviedb.org/3';

              let title: string = "";
              let watchedAt: Date;
              let isTvShow:boolean = false;
              let tmdbID: string = "";
              let runtime: number = 0;

              let season: string | null;
              let episodeName: string | null;


              let episodeDetails;
              let details;
              let genres = [];
              let posterPath: string = "";

              let releaseDate:Date;
              let isUploaded:boolean = false;
              const uploadDate: Date = new Date();

              if (row.Title.includes(':')) {
                // separate the titles into parts
                const parts = row.Title.trim().split(':');
                switch(parts.length){
                  case 2:
                    try {
                      title = parts[0].trim();
                      tmdbID = await searchSeriesID(searchUrl, title);
                      watchedAt = new Date(row.Date.trim())

                      if (tmdbID) {
                        season = '1';
                        isTvShow = true;
                        episodeName = parts[1].trim();

                        episodeDetails = await findEpisode(findUrl, tmdbID, episodeName, season);
                        details = await findSeriesByID(findUrl, tmdbID);
                        console.log(episodeDetails)

                        genres = details.genres.map((genre:any)=> genre.name);
                        posterPath = details.poster_path;
                        releaseDate = new Date(episodeDetails.air_date);
                        isUploaded = true;
                        runtime = episodeDetails.runtime;

                        return {
                          title,
                          watchedAt,
                          isTvShow,
                          runtime,
                          tmdbID,
                          season,
                          episodeName,
                          genres,
                          posterPath,
                          releaseDate,
                          isUploaded,
                          uploadDate,
                        }

                      } else {
                        title = row.Title.trim();
                        watchedAt = new Date(row.Date.trim());
                        tmdbID = await searchMovieID(searchUrl, title);
                        details = await findMovieByID(findUrl, tmdbID);

                        season = null;
                        episodeName = null;
                        runtime = details.runtime;
                   
                        isTvShow = false;
                        genres = details.genres.map((genre:any)=> genre.name);
                        posterPath = details.poster_path;
                        releaseDate = new Date(details.release_date);
                        isUploaded = true;

                        return {
                          title,
                          watchedAt,
                          isTvShow,
                          runtime,
                          tmdbID,
                          season,
                          episodeName,
                          genres,
                          posterPath,
                          releaseDate,
                          isUploaded,
                          uploadDate,
                        }
                      }
                    } catch (error) {
                      console.log(`Error fetching data for show or movie ${title}`, error);
                    }

                    break;

                  case 3:
                    try {
                      title = parts[0].trim();
                      watchedAt = new Date(row.Date.trim())
                      episodeName = parts[2].trim();
                      tmdbID = await searchSeriesID(searchUrl, title);

                      if (tmdbID) {
                        isTvShow = true;
                        details = await findSeriesByID(findUrl, tmdbID);
                        const seasonNumber = parts[1].trim().match(/\d+/);

                        if (seasonNumber) {
                          //If season name has a number
                          season = seasonNumber[0].toString();
                          episodeDetails =  await findEpisode(findUrl, tmdbID, episodeName, season);

                          genres = details.genres.map((genre:any)=> genre.name);
                          posterPath = details.poster_path;
                          releaseDate = new Date(episodeDetails.air_date);
                          isUploaded = true;
                          runtime = episodeDetails.runtime;
                          return {
                            title,
                            watchedAt,
                            isTvShow,
                            runtime,
                            tmdbID,
                            season,
                            episodeName,
                            genres,
                            posterPath,
                            releaseDate,
                            isUploaded,
                            uploadDate,
                          }
                          
                        } else {
                          // If Season name does not have a number
                          title = parts[0].trim();
                          episodeName = parts[2].trim();
                          const seasonName = parts[1].trim();
                          tmdbID = await searchSeriesID(searchUrl, title);

                          const seasons = await findSeasons(findUrl, tmdbID);

                          // loop through seasons
                          for (let i of seasons) {
                            try {
                              const seasonData = await findSeasonData(findUrl, tmdbID, i);
                              if (seasons.length < 2) {

                                season = seasonData.season_number.toString();
                                episodeDetails = await findEpisode(findUrl, tmdbID, episodeName, season);

                                genres = details.genres.map((genre:any)=> genre.name);
                                posterPath = details.poster_path;
                                releaseDate = new Date(episodeDetails.air_date);
                                isUploaded = true;
                                runtime = episodeDetails.runtime

                                return {
                                  title,
                                  watchedAt,
                                  isTvShow,
                                  runtime,
                                  tmdbID,
                                  season,
                                  episodeName,
                                  genres,
                                  posterPath,
                                  releaseDate,
                                  isUploaded,
                                  uploadDate,
                                }
                              } else {
                                if (!seasonData) {
                                  continue;
                                } else {
                                  let str1 = seasonData.name;
                                  let str2 = seasonName;
                                  const index = jaccardCompare(str1, str2);

                                  if (index >= 0.8) {
                                    season = seasonData.season_number.toString();
                                    episodeDetails = await findEpisode(findUrl, tmdbID, episodeName, season);

                                    genres = details.genres.map((genre:any)=> genre.name);
                                    posterPath = details.poster_path;
                                    releaseDate = new Date(episodeDetails.air_date);
                                    isUploaded = true;
                                    runtime = episodeDetails.runtime;

                                    return {
                                      title,
                                      watchedAt,
                                      isTvShow,
                                      runtime,
                                      tmdbID,
                                      season,
                                      episodeName,
                                      genres,
                                      posterPath,
                                      releaseDate,
                                      isUploaded,
                                      uploadDate,
                                    }
                                  }
                                }
                              }
                            } catch (error) {
                              console.error(`Error processing season at index ${i}:`, error);
                              continue;
                            }
                          }
                        }
                      } else {
                        // if series ID does not exist, process as movie
                        title = row.Title.trim();
                        tmdbID = await searchMovieID(searchUrl, title);
                        details =  await findMovieByID(findUrl, tmdbID);

                        episodeName = null;
                        season = null;
                        
                        genres = details.genres.map((genre:any)=> genre.name);
                        posterPath = details.poster_path;
                        releaseDate = new Date(details.release_date);
                        isUploaded = true;
                        runtime = details.runtime;

                        return {
                          title,
                          watchedAt,
                          isTvShow,
                          runtime,
                          tmdbID,
                          genres,
                          episodeName,
                          season,
                          posterPath,
                          releaseDate,
                          isUploaded,
                          uploadDate,
                        }
                      }
                    } catch (error) {
                      console.log(error);
                    }
                    break;

                  case 4:
                    title = parts[0].trim();
                    watchedAt = new Date(row.Date.trim());
                    episodeName = parts[2].trim() + ": " + parts[3].trim();
                    tmdbID = await searchSeriesID(searchUrl, title);

                    if (tmdbID) {
                      isTvShow = true;
                      details = await findSeriesByID(findUrl, tmdbID);
                      const seasonNumber = parts[1].trim().match(/\d+/)?.toString();
                      const seasons = await findSeasons(findUrl, tmdbID);
                      if (seasonNumber) {
                        episodeDetails = await findEpisode(findUrl, tmdbID, episodeName, seasonNumber);
                        if (episodeDetails) {
                          genres = details.genres.map((genre:any)=> genre.name);
                          posterPath = details.poster_path;
                          releaseDate = new Date(episodeDetails.air_date);
                          isUploaded = true;
                          season = episodeDetails.season_number.toString();
                          runtime = episodeDetails.runtime;
                          return {
                            title,
                            watchedAt,
                            isTvShow,
                            runtime,
                            tmdbID,
                            season,
                            episodeName,
                            genres,
                            posterPath,
                            releaseDate,
                            isUploaded,
                            uploadDate,
                          }
                        } else {
                          episodeName = parts[3].trim();
                          episodeDetails = await findEpisode(findUrl, tmdbID, episodeName, seasonNumber);
                        }
                      } else {
                        if (seasons.length > 1) {
                          for (let x of seasons) {
                            
                          }
                        } else {
                          try {
                            episodeDetails = await findEpisode(findUrl, tmdbID, episodeName, '1');
                            if (episodeDetails) {
                              genres = details.genres.map((genre:any)=> genre.name);
                              posterPath = details.poster_path;
                              releaseDate = new Date(episodeDetails.air_date);
                              isUploaded = true;
                              season = episodeDetails.season_number.toString();
                              runtime = episodeDetails.runtime;
                              return {
                                title,
                                watchedAt,
                                isTvShow,
                                runtime,
                                tmdbID,
                                season,
                                episodeName,
                                genres,
                                posterPath,
                                releaseDate,
                                isUploaded,
                                uploadDate,
                              };
                            } else {
                              episodeName = parts[3].trim();
                              episodeDetails = await findEpisode(findUrl, tmdbID, episodeName, '1');

                              genres = details.genres.map((genre:any)=> genre.name);
                              posterPath = details.poster_path;
                              releaseDate = new Date(episodeDetails.air_date);
                              isUploaded = true;
                              season = episodeDetails.season_number.toString();
                              runtime = episodeDetails.runtime;
                              return {
                                title,
                                watchedAt,
                                isTvShow,
                                runtime,
                                tmdbID,
                                season,
                                episodeName,
                                genres,
                                posterPath,
                                releaseDate,
                                isUploaded,
                                uploadDate,
                              } 
                            }
                          } catch (error) {
                            console.log(error);
                          }
                        }
                      }
                    }

                    break;
                    ///END OF SWITCH CASE
                 }
                
              } else {
                try{
                  title = row.Title.trim();
                  watchedAt = new Date(row.Date.trim());
                  isTvShow = false;
                  tmdbID = await searchMovieID(searchUrl, title);
                  details = await findMovieByID(findUrl, tmdbID);

                  episodeName = null;
                  season = null;
                  
                  genres = details.genres.map((genre:any)=> genre.name);
                  posterPath = details.poster_path;
                  releaseDate = new Date(details.release_date);
                  isUploaded = true;
                  runtime = details.runtime;

                  console.log(details)

                  return {
                    title,
                    watchedAt,
                    isTvShow,
                    runtime,
                    tmdbID,
                    genres,
                    episodeName,
                    season,
                    posterPath,
                    releaseDate,
                    isUploaded,
                    uploadDate,
                  }

                }catch (e){
                  console.log(e)
                  return null;
                }
              }

              
            });
          })
        );

        const filteredData = csvData.filter((entry) => entry!=null)

        resolve(filteredData);
      }
    });
  });
};
