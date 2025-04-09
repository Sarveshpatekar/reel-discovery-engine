
import { Film } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 bg-background py-6 mt-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Film className="h-6 w-6 text-highlight" />
              <h2 className="text-xl font-bold">MovieMate</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover the best movies and get personalized recommendations based on your preferences.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/discover" className="text-muted-foreground hover:text-foreground transition-colors">Discover</Link></li>
              <li><Link to="/favorites" className="text-muted-foreground hover:text-foreground transition-colors">Favorites</Link></li>
              <li><Link to="/search" className="text-muted-foreground hover:text-foreground transition-colors">Search</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/discover?genre=Action" className="text-muted-foreground hover:text-foreground transition-colors">Action</Link></li>
              <li><Link to="/discover?genre=Comedy" className="text-muted-foreground hover:text-foreground transition-colors">Comedy</Link></li>
              <li><Link to="/discover?genre=Drama" className="text-muted-foreground hover:text-foreground transition-colors">Drama</Link></li>
              <li><Link to="/discover?genre=Sci-Fi" className="text-muted-foreground hover:text-foreground transition-colors">Sci-Fi</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border/40 pt-6 text-sm text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MovieMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
