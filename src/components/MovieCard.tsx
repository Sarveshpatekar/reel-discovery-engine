
import { cn } from "@/lib/utils";
import { Movie } from "@/types/movie";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

const MovieCard = ({ movie, className }: MovieCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/movie/${movie.id}`} className={cn("block", className)}>
      <Card className="movie-card relative overflow-hidden border-0 bg-transparent shadow-none">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg movie-card-shadow">
          <img
            src={movie.posterPath}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 movie-overlay">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                <span className="text-sm font-medium">
                  {movie.voteAverage.toFixed(1)}
                </span>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full"
                    onClick={toggleFavorite}
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isFavorite ? "fill-highlight text-highlight" : "text-gray-300"
                      )}
                    />
                    <span className="sr-only">Add to favorites</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-1 text-left">
          <h3 className="line-clamp-1 font-semibold tracking-tight">
            {movie.title}
          </h3>
          <div className="flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {new Date(movie.releaseDate).getFullYear()} • {movie.runtime} min
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default MovieCard;
