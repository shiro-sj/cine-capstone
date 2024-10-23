import Papa from "papaparse";
import { searchSeriesID, findEpisode, searchMovieID, findMovieByID, findSeasons, findSeasonData, jaccardCompare } from "./tmdb";
import PQueue from "p-queue";

interface CSVRow {
  Title: string;
  Date: string;
}

const queue = new PQueue({ interval: 1000, intervalCap: 50 });

// Parse the CSV content
export const parseCSV = (content: string) => {
  return new Promise<void>((resolve) => {
    // Papaparse
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

              const watchDate = row.Date;
              let id: string | null = null;
              let isTvShow = false;
              let title: string = "";
              let episodeName: string | null = null;
              let season: string | null = null;
              let data = {};

              if (row.Title.includes(':')) {
                // separate the titles into parts
                const parts = row.Title.trim().split(':');

                switch (parts.length) {
                  case 2:
                    try {
                      title = parts[0].trim();
                      episodeName = parts[1].trim();
                      id = await searchSeriesID(searchUrl, title);

                      if (id) {
                        season = '1';
                        console.log(title, id, episodeName, await findEpisode(findUrl, id, episodeName, season));
                        isTvShow = true;
                      } else {
                        title = row.Title.trim();
                        id = await searchMovieID(searchUrl, title);
                        console.log(title, id, await findMovieByID(findUrl, id));
                      }
                    } catch (error) {
                      console.log(error);
                    }
                    break;
                  case 3:
                    try {
                      title = parts[0].trim();
                      episodeName = parts[2].trim();
                      id = await searchSeriesID(searchUrl, title);

                      if (id) {
                        const seasonNumber = parts[1].trim().match(/\d+/);
                        if (seasonNumber) {
                          season = seasonNumber[0];
                          console.log(title, id, episodeName, await findEpisode(findUrl, id, episodeName, season));
                        } else {
                          title = parts[0].trim();
                          episodeName = parts[2].trim();
                          const seasonName = parts[1].trim();
                          id = await searchSeriesID(searchUrl, title);

                          const seasons = await findSeasons(findUrl, id);

                          for (let i of seasons) {
                            try {
                              const data = await findSeasonData(findUrl, id, i);

                              if (seasons.length < 2) {
                                season = data.season_number;
                                const episodeData = await findEpisode(findUrl, id, episodeName, season);
                                console.log(title, id, episodeName, episodeData);
                              } else {
                                if (!data) {
                                  continue;
                                } else {
                                  let str1 = data.name;
                                  let str2 = seasonName;
                                  const index = jaccardCompare(str1, str2);

                                  if (index >= 0.8) {
                                    season = data.season_number;
                                    const episodeData = await findEpisode(findUrl, id, episodeName, season);
                                    console.log(title, id, episodeName, episodeData);
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
                        title = row.Title.trim();
                        id = await searchMovieID(searchUrl, title);
                        console.log(title, id, await findMovieByID(findUrl, id));
                      }
                    } catch (error) {
                      console.log(error);
                    }
                    break;
                  case 4:
                    title = parts[0].trim();
                    episodeName = parts[2].trim() + ": " + parts[3].trim();
                    id = await searchSeriesID(searchUrl, title);

                    if (id) {
                      const seasonNumber = parts[1].trim().match(/\d+/)?.toString();
                      const seasons = await findSeasons(findUrl, id);
                      if (seasonNumber) {
                        const episodeData = await findEpisode(findUrl, id, episodeName, seasonNumber);
                        if (episodeData) {
                          console.log(title, id, episodeName, episodeData);
                        } else {
                          episodeName = parts[3].trim();
                          const episodeData = await findEpisode(findUrl, id, episodeName, seasonNumber);
                          console.log(title, id, episodeName, episodeData);
                        }
                      } else {
                        if (seasons.length > 1) {
                          for (let x of seasons) {
                            
                          }
                        } else {
                          try {
                            const episodeData = await findEpisode(findUrl, id, episodeName, '1');
                            if (episodeData) {
                              console.log(title, id, episodeName, episodeData);
                            } else {
                              episodeName = parts[3].trim();
                              const episodeData = await findEpisode(findUrl, id, episodeName, '1');
                              console.log(title, id, episodeName, episodeData);
                            }
                          } catch (error) {
                            console.log(error);
                          }
                        }
                      }
                    }
                    break;
                }
              } else {
                title = row.Title.trim();
                id = await searchMovieID(searchUrl, title);
                console.log(title, id, await findMovieByID(findUrl, id));
              }

              
            });
          })
        );

        resolve();
      }
    });
  });
};
