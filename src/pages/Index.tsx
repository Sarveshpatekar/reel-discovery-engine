
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import MovieCard from "@/components/MovieCard";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { mockMovies } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Movie, MovieFilter } from "@/types/movie";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Get a random featured movie for the hero
  const featuredMovie = mockMovies[Math.floor(Math.random() * 5)];
  
  // Filter movies for different sections
  const topRatedMovies = [...mockMovies].sort((a, b) => b.voteAverage - a.voteAverage).slice(0, 6);
  
  const recentMovies = [...mockMovies]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 6);
  
  // Filter for recommended section (some randomized logic)
  const recommendedMovies = [...mockMovies]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main>
        <HeroSection movie={featuredMovie} />
        
        <div className="container py-8 space-y-12">
          {/* Top Rated Movies */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Top Rated</h2>
              <Button variant="ghost" asChild className="gap-1">
                <Link to="/discover?sort=rating">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {topRatedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
          
          {/* New Releases */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">New Releases</h2>
              <Button variant="ghost" asChild className="gap-1">
                <Link to="/discover?sort=releaseDate">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {recentMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
          
          {/* Recommended For You */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recommended For You</h2>
              <Button variant="ghost" asChild className="gap-1">
                <Link to="/discover">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {recommendedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
