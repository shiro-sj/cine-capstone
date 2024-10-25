export interface CSVRow {
    Title: string;
    Date: string;
}

export interface Data {
  title: string;
  watchedAt: Date;
  isTvShow: boolean;
  runtime: number;
  episodeName: string | null;
  season: string | null;
  tmdbID: string;
  genres: string[];
  posterPath: string;
  releaseDate: Date;
  isUploaded: boolean;
  uploadDate: Date;
}

export interface Entry{
  id: number,
  title: string,
  episodeName: string | null,
  season: string | null;
  watchedAt: Date;
  isTvShow: boolean;
  runtime:number;
  tmdbID: number;
  genres: string[];
  posterPath: string;
  releaseDate: Date;
  isUploaded: boolean;
  uploadDate: Date;
  userId: number,
}

export interface StatsProps {
  view: string;
}