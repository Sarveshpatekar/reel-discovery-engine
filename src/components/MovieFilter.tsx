
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
import { CheckIcon, ChevronDownIcon, FilterIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { availableGenres, availableYears } from "@/data/mockData";
import { MovieFilter as MovieFilterType, Genre } from "@/types/movie";

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
  
  useEffect(() => {
    onFilterChange({
      genre: selectedGenre,
      year: selectedYear,
      sortBy: selectedSort,
    });
  }, [selectedGenre, selectedYear, selectedSort, onFilterChange]);

  const clearFilters = () => {
    setSelectedGenre(undefined);
    setSelectedYear(undefined);
    setSelectedSort("popularity");
  };

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "rating", label: "Rating" },
    { value: "releaseDate", label: "Release Date" },
  ] as const;

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center">
      <div className="flex gap-2 items-center flex-wrap">
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
          <PopoverContent className="w-[200px] p-0" align="start">
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
      </div>

      <div className="flex gap-2 items-center ml-auto">
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
        </div>

        {(selectedGenre || selectedYear || selectedSort !== "popularity") && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8">
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default MovieFilter;
