
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Film, Heart, Home, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-lg bg-background/80 border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Film className="h-6 w-6 text-highlight" />
            <span className="text-xl font-bold text-foreground">MovieMate</span>
          </Link>
          <div className="hidden md:flex space-x-1">
            <Button
              asChild
              variant={location.pathname === "/" ? "default" : "ghost"}
              size="sm"
            >
              <Link to="/" className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>
            <Button
              asChild
              variant={location.pathname === "/discover" ? "default" : "ghost"}
              size="sm"
            >
              <Link to="/discover" className="flex items-center gap-1">
                <Film className="h-4 w-4" />
                <span>Discover</span>
              </Link>
            </Button>
            <Button
              asChild
              variant={location.pathname === "/favorites" ? "default" : "ghost"}
              size="sm"
            >
              <Link to="/favorites" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>Favorites</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search movies..."
              className="w-[200px] md:w-[250px] pr-8 bg-secondary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full px-3"
              type="submit"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
