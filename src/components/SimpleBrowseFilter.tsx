
import React, { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  FilterDropdown
} from "./ui/dropdown-menu";
import { availableGenres } from "@/data/mockData";
import { Genre, MovieFilter } from "@/types/movie";

const sortOptions = [
  { value: "popularity", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "releaseDate", label: "Release Date" }
];

interface SimpleBrowseFilterProps {
  onFilterChange: (filters: MovieFilter) => void;
  currentFilters: MovieFilter;
}

const SimpleBrowseFilter = ({ onFilterChange, currentFilters }: SimpleBrowseFilterProps) => {
  const [searchTerm, setSearchTerm] = useState(currentFilters.searchQuery || "");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      ...currentFilters,
      searchQuery: searchTerm
    });
  };
  
  const handleGenreSelect = (genre: Genre) => {
    onFilterChange({
      ...currentFilters,
      genre
    });
  };
  
  const handleSortSelect = (sortBy: "popularity" | "rating" | "releaseDate") => {
    onFilterChange({
      ...currentFilters,
      sortBy
    });
  };
  
  const resetFilters = () => {
    setSearchTerm("");
    onFilterChange({
      sortBy: "popularity"
    });
  };
  
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold mb-6 text-white">Browse Movies</h1>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search input */}
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search movies..." 
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 bg-black/20 border-white/10 text-white h-12"
            />
          </div>
        </form>
        
        {/* Genre filter */}
        <div className="w-full md:w-72">
          <DropdownMenu>
            <FilterDropdown placeholder={currentFilters.genre || "All Genres"} />
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuItem 
                onClick={() => onFilterChange({...currentFilters, genre: undefined})}
                className="cursor-pointer"
              >
                All Genres
              </DropdownMenuItem>
              
              {availableGenres.map((genre) => (
                <DropdownMenuItem 
                  key={genre} 
                  onClick={() => handleGenreSelect(genre)}
                  className="cursor-pointer"
                >
                  {genre}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Sort filter */}
        <div className="w-full md:w-72">
          <DropdownMenu>
            <FilterDropdown 
              placeholder={sortOptions.find(option => option.value === currentFilters.sortBy)?.label || "Sort By"}
              className="border-red-500 border-2" // Highlight the sort dropdown as in the image
            />
            <DropdownMenuContent align="end" className="w-72">
              {sortOptions.map((option) => (
                <DropdownMenuItem 
                  key={option.value} 
                  onClick={() => handleSortSelect(option.value as "popularity" | "rating" | "releaseDate")}
                  className="cursor-pointer"
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Reset filters button */}
        <Button 
          variant="outline" 
          className="text-white bg-black/20 border-white/10 h-12"
          onClick={resetFilters}
        >
          <Filter className="mr-2 h-4 w-4" /> Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default SimpleBrowseFilter;
