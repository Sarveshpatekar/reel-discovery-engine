
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
  reviews?: Review[];
  type: 'movie' | 'series';
}

export interface Review {
  id: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MovieFilter {
  genre?: Genre;
  year?: string;
  sortBy?: 'popularity' | 'rating' | 'releaseDate';
  searchQuery?: string;
  minRating?: number;
  maxRating?: number;
  type?: 'movie' | 'series' | 'all';
}
