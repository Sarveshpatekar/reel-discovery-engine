
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { mockMovies } from "@/data/mockData";
import { MovieFilter as MovieFilterType } from "@/types/movie";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import MovieGrid from "@/components/MovieGrid";
import { SlidersHorizontal, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import SimpleBrowseFilter from "@/components/SimpleBrowseFilter";

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
    <div className="min-h-screen bg-background bg-gradient-to-b from-black to-gray-900">
      <NavBar />
      
      <main className="container py-8">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2 text-white">
                <SearchIcon className="h-8 w-8 text-highlight" />
                Search Results
              </h1>
              {query ? (
                <p className="text-gray-400">
                  Search results for: <span className="font-medium text-white">"{query}"</span>
                </p>
              ) : (
                <p className="text-gray-400">Browse all movies and series</p>
              )}
            </div>
          </div>
          
          {/* Desktop filters */}
          <div className="hidden md:block">
            <SimpleBrowseFilter 
              onFilterChange={(newFilters) => {
                setFilters({
                  ...newFilters,
                  searchQuery: query || newFilters.searchQuery
                });
              }}
              currentFilters={filters} 
            />
          </div>
          
          {/* Mobile filter button */}
          <div className="md:hidden">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
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
                  <SimpleBrowseFilter 
                    onFilterChange={(newFilters) => {
                      setFilters({
                        ...newFilters,
                        searchQuery: query || newFilters.searchQuery
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
