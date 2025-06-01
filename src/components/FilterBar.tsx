
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { availableTags } from "@/constents/tags";

const FilterBar = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="bg-craft-panel border border-craft-border rounded-lg p-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-craft-text-secondary w-4 h-4" />
          <Input 
            placeholder="Search problems..." 
            className="pl-10 bg-craft-bg border-craft-border text-craft-text-primary placeholder-craft-text-secondary focus:border-craft-accent focus:ring-craft-accent/20"
          />
        </div>
        
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-32 bg-craft-bg border-craft-border text-craft-text-primary">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-craft-panel border-craft-border">
              <SelectItem value="easy" className="text-craft-text-primary hover:bg-craft-bg">Easy</SelectItem>
              <SelectItem value="medium" className="text-craft-text-primary hover:bg-craft-bg">Medium</SelectItem>
              <SelectItem value="hard" className="text-craft-text-primary hover:bg-craft-bg">Hard</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-32 bg-craft-bg border-craft-border text-craft-text-primary">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-craft-panel border-craft-border">
              <SelectItem value="all" className="text-craft-text-primary hover:bg-craft-bg">All</SelectItem>
              <SelectItem value="solved" className="text-craft-text-primary hover:bg-craft-bg">Solved</SelectItem>
              <SelectItem value="unsolved" className="text-craft-text-primary hover:bg-craft-bg">Unsolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-craft-text-secondary text-sm font-medium">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 ${
                selectedTags.includes(tag)
                  ? 'bg-craft-accent text-craft-bg hover:bg-craft-accent/80'
                  : 'border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent'
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
