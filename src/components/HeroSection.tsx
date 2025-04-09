
import { Movie } from "@/types/movie";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

interface HeroSectionProps {
  movie: Movie;
}

const HeroSection = ({ movie }: HeroSectionProps) => {
  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={movie.backdropPath}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>
      
      <div className="container relative h-full flex items-center">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-shadow">
            {movie.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Badge variant="secondary" className="bg-highlight text-white border-none">
              {movie.voteAverage.toFixed(1)} Rating
            </Badge>
            <span>{new Date(movie.releaseDate).getFullYear()}</span>
            <span>{movie.runtime} min</span>
            <div className="flex gap-2">
              {movie.genres.slice(0, 3).map(genre => (
                <Badge key={genre} variant="outline" className="bg-black/30 backdrop-blur-sm">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
          
          {movie.tagline && (
            <p className="text-lg italic text-gray-200">"{movie.tagline}"</p>
          )}
          
          <p className="text-gray-200 line-clamp-3 md:line-clamp-4">
            {movie.overview}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-highlight hover:bg-highlight-hover text-white gap-2">
              <Link to={`/movie/${movie.id}`}>
                <Play className="h-5 w-5" fill="currentColor" /> Watch Trailer
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 backdrop-blur-sm">
              <Link to={`/movie/${movie.id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
