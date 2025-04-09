
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { mockMovies } from "@/data/mockData";
import { Movie, MovieFilter as MovieFilterType } from "@/types/movie";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import MovieFilter from "@/components/MovieFilter";
import MovieGrid from "@/components/MovieGrid";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [filters, setFilters] = useState<MovieFilterType>({
    searchQuery: query,
    sortBy: "popularity",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
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
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <SearchIcon className="h-8 w-8 text-highlight" />
                Search Results
              </h1>
              {query ? (
                <p className="text-muted-foreground">
                  Search results for: <span className="font-medium text-foreground">"{query}"</span>
                </p>
              ) : (
                <p className="text-muted-foreground">Browse all movies and series</p>
              )}
            </div>
            
            {/* Mobile filter button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <MovieFilter 
                    onFilterChange={(newFilters) => {
                      setFilters({
                        ...newFilters,
                        searchQuery: query
                      });
                    }} 
                    currentFilters={filters} 
                  />
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setIsFilterOpen(false)}>
                    Done
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Desktop filters */}
          <div className="hidden md:block">
            <MovieFilter 
              onFilterChange={(newFilters) => {
                setFilters({
                  ...newFilters,
                  searchQuery: query
                });
              }}
              currentFilters={filters} 
            />
          </div>
          
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
