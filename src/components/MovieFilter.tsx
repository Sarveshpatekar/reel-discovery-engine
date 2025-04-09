
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "./ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  CheckIcon, 
  ChevronDownIcon, 
  FilterIcon, 
  XIcon, 
  Film, 
  Tv, 
  Star,
  SlidersHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { availableGenres, availableYears } from "@/data/mockData";
import { MovieFilter as MovieFilterType, Genre } from "@/types/movie";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface MovieFilterProps {
  onFilterChange: (filters: MovieFilterType) => void;
  currentFilters: MovieFilterType;
}

const MovieFilter = ({ onFilterChange, currentFilters }: MovieFilterProps) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>(currentFilters.genre);
  const [selectedYear, setSelectedYear] = useState<string | undefined>(currentFilters.year);
  const [selectedSort, setSelectedSort] = useState<"popularity" | "rating" | "releaseDate">(
    currentFilters.sortBy || "popularity"
  );
  const [ratingRange, setRatingRange] = useState<[number, number]>([
    currentFilters.minRating || 0, 
    currentFilters.maxRating || 10
  ]);
  const [selectedType, setSelectedType] = useState<"movie" | "series" | "all">(
    currentFilters.type || "all"
  );
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  useEffect(() => {
    onFilterChange({
      genre: selectedGenre,
      year: selectedYear,
      sortBy: selectedSort,
      minRating: ratingRange[0],
      maxRating: ratingRange[1],
      type: selectedType === "all" ? undefined : selectedType,
    });
  }, [selectedGenre, selectedYear, selectedSort, ratingRange, selectedType, onFilterChange]);

  const clearFilters = () => {
    setSelectedGenre(undefined);
    setSelectedYear(undefined);
    setSelectedSort("popularity");
    setRatingRange([0, 10]);
    setSelectedType("all");
    setIsAdvancedOpen(false);
  };

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "rating", label: "Rating" },
    { value: "releaseDate", label: "Release Date" },
  ] as const;

  return (
    <div className="bg-card/40 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border/50">
      <Tabs defaultValue="basic">
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="basic" className="w-1/2">Basic Filters</TabsTrigger>
          <TabsTrigger value="advanced" className="w-1/2">Advanced Filters</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Content Type (Movie/Series) */}
            <div className="flex gap-2 w-full justify-center sm:justify-start">
              <Button
                variant={selectedType === "all" ? "default" : "outline"}
                size="sm"
                className="w-1/3"
                onClick={() => setSelectedType("all")}
              >
                All
              </Button>
              <Button
                variant={selectedType === "movie" ? "default" : "outline"}
                size="sm"
                className="w-1/3 flex items-center gap-1"
                onClick={() => setSelectedType("movie")}
              >
                <Film className="h-4 w-4" /> Movies
              </Button>
              <Button
                variant={selectedType === "series" ? "default" : "outline"}
                size="sm"
                className="w-1/3 flex items-center gap-1"
                onClick={() => setSelectedType("series")}
              >
                <Tv className="h-4 w-4" /> Series
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Genre Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <span>Genre</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search genres..." />
                  <CommandList>
                    <CommandGroup>
                      {availableGenres.map((genre) => (
                        <CommandItem 
                          key={genre} 
                          onSelect={() => setSelectedGenre(genre === selectedGenre ? undefined : genre)}
                          className="flex items-center gap-2"
                        >
                          <div className={cn(
                            "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            selectedGenre === genre ? "bg-primary text-primary-foreground" : "opacity-50"
                          )}>
                            {selectedGenre === genre && <CheckIcon className="h-3 w-3" />}
                          </div>
                          <span>{genre}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Year Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <span>Year</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search years..." />
                  <CommandList>
                    <CommandGroup>
                      {availableYears.map((year) => (
                        <CommandItem 
                          key={year} 
                          onSelect={() => setSelectedYear(year === selectedYear ? undefined : year)}
                          className="flex items-center gap-2"
                        >
                          <div className={cn(
                            "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            selectedYear === year ? "bg-primary text-primary-foreground" : "opacity-50"
                          )}>
                            {selectedYear === year && <CheckIcon className="h-3 w-3" />}
                          </div>
                          <span>{year}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Sort By */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <span>Sort By</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {sortOptions.map((option) => (
                        <CommandItem 
                          key={option.value} 
                          onSelect={() => setSelectedSort(option.value)}
                          className="flex items-center gap-2"
                        >
                          <div className={cn(
                            "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            selectedSort === option.value ? "bg-primary text-primary-foreground" : "opacity-50"
                          )}>
                            {selectedSort === option.value && <CheckIcon className="h-3 w-3" />}
                          </div>
                          <span>{option.label}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            
            <div className="ml-auto">
              {(selectedGenre || selectedYear || selectedType !== "all" || selectedSort !== "popularity") && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9">
                  Clear All
                </Button>
              )}
            </div>
          </div>
          
          {/* Selected filters */}
          <div className="flex gap-1 flex-wrap">
            {selectedGenre && (
              <Badge className="flex items-center gap-1 bg-secondary">
                {selectedGenre}
                <XIcon
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSelectedGenre(undefined)}
                />
              </Badge>
            )}
            {selectedYear && (
              <Badge className="flex items-center gap-1 bg-secondary">
                {selectedYear}
                <XIcon
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSelectedYear(undefined)}
                />
              </Badge>
            )}
            {selectedType !== "all" && (
              <Badge className="flex items-center gap-1 bg-secondary">
                {selectedType === "movie" ? "Movies Only" : "Series Only"}
                <XIcon
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSelectedType("all")}
                />
              </Badge>
            )}
            {(ratingRange[0] > 0 || ratingRange[1] < 10) && (
              <Badge className="flex items-center gap-1 bg-secondary">
                {`${ratingRange[0]}-${ratingRange[1]} Stars`}
                <XIcon
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setRatingRange([0, 10])}
                />
              </Badge>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <div className="space-y-6">
            {/* Rating Range Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="text-sm font-medium flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" /> Rating Range
                </h3>
                <span className="text-sm">{ratingRange[0]} - {ratingRange[1]}</span>
              </div>
              <Slider
                value={ratingRange}
                min={0}
                max={10}
                step={0.5}
                onValueChange={(value) => setRatingRange(value as [number, number])}
                className="py-4"
              />
            </div>
            
            <Separator />
            
            {/* Content Type detailed selection */}
            <div>
              <h3 className="text-sm font-medium mb-2">Content Type</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={selectedType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType("all")}
                >
                  All
                </Button>
                <Button
                  variant={selectedType === "movie" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType("movie")}
                  className="flex items-center justify-center gap-1"
                >
                  <Film className="h-4 w-4" /> Movies
                </Button>
                <Button
                  variant={selectedType === "series" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType("series")}
                  className="flex items-center justify-center gap-1"
                >
                  <Tv className="h-4 w-4" /> Series
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MovieFilter;
