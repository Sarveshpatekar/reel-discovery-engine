
import { useState } from "react";
import { mockMovies } from "@/data/mockData";
import { MovieFilter as MovieFilterType } from "@/types/movie";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import MovieGrid from "@/components/MovieGrid";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import SimpleBrowseFilter from "@/components/SimpleBrowseFilter";

const Discover = () => {
  const [filters, setFilters] = useState<MovieFilterType>({
    sortBy: "popularity",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background bg-gradient-to-b from-black to-gray-900">
      <NavBar />
      
      <main className="container py-8">
        <div className="space-y-6">
          {/* Desktop filters */}
          <div className="hidden md:block">
            <SimpleBrowseFilter 
              onFilterChange={setFilters} 
              currentFilters={filters} 
            />
          </div>
          
          {/* Mobile filter button */}
          <div className="md:hidden flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Browse Movies</h1>
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
                      setFilters(newFilters);
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

export default Discover;
