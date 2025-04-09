
import { useState } from "react";
import { mockMovies } from "@/data/mockData";
import { MovieFilter as MovieFilterType } from "@/types/movie";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import MovieFilter from "@/components/MovieFilter";
import MovieGrid from "@/components/MovieGrid";
import { Separator } from "@/components/ui/separator";

const Discover = () => {
  const [filters, setFilters] = useState<MovieFilterType>({
    sortBy: "popularity",
  });

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Discover Movies</h1>
            <p className="text-muted-foreground">Find your next favorite movie</p>
          </div>
          
          <MovieFilter 
            onFilterChange={setFilters} 
            currentFilters={filters} 
          />
          
          <Separator />
          
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
