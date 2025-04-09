
import { useState, useEffect } from "react";
import { mockMovies } from "@/data/mockData";
import { Movie } from "@/types/movie";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import MovieGrid from "@/components/MovieGrid";
import { Heart } from "lucide-react";

// In a real app, this would be stored in a database or localStorage
const Favorites = () => {
  // This is a mock implementation - in a real app we'd use localStorage or a database
  // For now, we'll just randomly select 3-5 movies as "favorites" for demo purposes
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    // Simulate random favorites for demo purposes
    const randomFavorites = [...mockMovies]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 3);
      
    setFavoriteMovies(randomFavorites);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Heart className="text-highlight" />
              Favorites
            </h1>
            <p className="text-muted-foreground">Your collection of favorite movies</p>
          </div>
          
          {favoriteMovies.length > 0 ? (
            <MovieGrid movies={favoriteMovies} filters={{}} />
          ) : (
            <div className="py-16 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted" />
              <h3 className="text-xl font-medium">No favorites yet</h3>
              <p className="text-muted-foreground mt-2">
                Start adding movies to your favorites by clicking the heart icon
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
