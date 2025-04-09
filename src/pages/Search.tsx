
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { mockMovies } from "@/data/mockData";
import { Movie, MovieFilter as MovieFilterType } from "@/types/movie";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import MovieFilter from "@/components/MovieFilter";
import MovieGrid from "@/components/MovieGrid";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [filters, setFilters] = useState<MovieFilterType>({
    searchQuery: query,
    sortBy: "popularity",
  });
  
  useEffect(() => {
    // Update search query when URL param changes
    setFilters(prev => ({
      ...prev,
      searchQuery: query
    }));
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <SearchIcon className="h-6 w-6" />
              Search Results
            </h1>
            {query ? (
              <p className="text-muted-foreground">
                Search results for: <span className="font-medium text-foreground">"{query}"</span>
              </p>
            ) : (
              <p className="text-muted-foreground">Browse all movies</p>
            )}
          </div>
          
          <MovieFilter 
            onFilterChange={setFilters} 
            currentFilters={filters} 
          />
          
          <MovieGrid 
            movies={mockMovies} 
            filters={filters} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
