
import { Movie, MovieFilter } from "@/types/movie";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";

interface MovieGridProps {
  movies: Movie[];
  filters: MovieFilter;
}

const MovieGrid = ({ movies, filters }: MovieGridProps) => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);

  useEffect(() => {
    let result = [...movies];
    
    // Apply genre filter
    if (filters.genre) {
      result = result.filter(movie => movie.genres.includes(filters.genre!));
    }
    
    // Apply year filter
    if (filters.year) {
      result = result.filter(movie => {
        const releaseYear = new Date(movie.releaseDate).getFullYear().toString();
        return releaseYear === filters.year;
      });
    }
    
    // Apply search query filter if it exists
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(query) || 
        movie.overview.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'popularity':
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'rating':
        result.sort((a, b) => b.voteAverage - a.voteAverage);
        break;
      case 'releaseDate':
        result.sort((a, b) => 
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
        break;
      default:
        // Default sort by popularity
        result.sort((a, b) => b.popularity - a.popularity);
    }
    
    setFilteredMovies(result);
  }, [movies, filters]);

  if (filteredMovies.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-xl font-medium">No movies match your filters</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {filteredMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
