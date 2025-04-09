
export type Genre = 
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Comedy'
  | 'Crime'
  | 'Documentary'
  | 'Drama'
  | 'Family'
  | 'Fantasy'
  | 'History'
  | 'Horror'
  | 'Music'
  | 'Mystery'
  | 'Romance'
  | 'Science Fiction'
  | 'TV Movie'
  | 'Thriller'
  | 'War'
  | 'Western';

export interface Movie {
  id: string;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  genres: Genre[];
  runtime?: number;
  tagline?: string;
  director?: string;
  cast?: string[];
}

export interface MovieFilter {
  genre?: Genre;
  year?: string;
  sortBy?: 'popularity' | 'rating' | 'releaseDate';
  searchQuery?: string;
}
