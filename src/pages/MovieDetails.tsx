
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockMovies } from "@/data/mockData";
import { Movie } from "@/types/movie";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Star, Users, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import MovieCard from "@/components/MovieCard";
import { useToast } from "@/hooks/use-toast";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Find the movie by ID
    const foundMovie = mockMovies.find(m => m.id === id);
    if (foundMovie) {
      setMovie(foundMovie);
      
      // Get similar movies (same genres)
      const similar = mockMovies
        .filter(m => 
          m.id !== id && 
          m.genres.some(genre => foundMovie.genres.includes(genre))
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
      
      setSimilarMovies(similar);
    } else {
      // Handle movie not found
      navigate("/not-found");
    }
  }, [id, navigate]);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? `${movie?.title} has been removed from your favorites` 
        : `${movie?.title} has been added to your favorites`,
    });
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <div className="container py-16 text-center">
          <p>Loading movie details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main>
        {/* Hero section with backdrop */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={movie.backdropPath}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          
          <div className="container relative h-full py-8 flex flex-col justify-end">
            <Button 
              variant="ghost" 
              className="absolute top-4 left-4 text-white"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
          </div>
        </section>
        
        {/* Movie details */}
        <section className="container relative">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 -mt-36 md:-mt-44 pb-8">
            {/* Poster column */}
            <div className="mx-auto md:mx-0">
              <div className="w-[250px] md:w-[300px] aspect-[2/3] overflow-hidden rounded-lg shadow-xl">
                <img 
                  src={movie.posterPath}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            
            {/* Info column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{movie.title}</h1>
                
                {movie.tagline && (
                  <p className="text-lg italic text-muted-foreground">{movie.tagline}</p>
                )}
                
                <div className="flex flex-wrap items-center gap-3 text-sm pt-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-medium">{movie.voteAverage.toFixed(1)}</span>
                    <span className="text-muted-foreground ml-1">({movie.voteCount.toLocaleString()})</span>
                  </div>
                  <span>{new Date(movie.releaseDate).getFullYear()}</span>
                  
                  {movie.runtime && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{movie.runtime} min</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {movie.genres.map(genre => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="outline" 
                  onClick={toggleFavorite}
                  className="gap-2"
                >
                  <Heart className={cn(
                    "h-5 w-5",
                    isFavorite && "fill-highlight text-highlight"
                  )} /> 
                  {isFavorite ? "Added to Favorites" : "Add to Favorites"}
                </Button>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{movie.overview}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movie.director && (
                    <div>
                      <span className="text-muted-foreground">Director: </span>
                      <span>{movie.director}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Release Date: </span>
                    <span>
                      {new Date(movie.releaseDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              
              {movie.cast && movie.cast.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" /> Cast
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map((actor, index) => (
                      <Badge key={index} variant="outline" className="py-1">
                        {actor}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Similar movies */}
        {similarMovies.length > 0 && (
          <section className="container py-8">
            <Separator className="mb-8" />
            <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {similarMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MovieDetails;
