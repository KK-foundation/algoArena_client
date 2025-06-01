import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchAndFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = ["All", "Easy", "Medium", "Hard", "New", "Trending"];

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search challenges, topics, or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent transition-all"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="appearance-none bg-secondary border border-border rounded-lg px-4 py-3 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent cursor-pointer transition-all"
          >
            {filters.map((filter) => (
              <option key={filter} value={filter.toLowerCase()}>
                {filter}
              </option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
        </div>

        {/* Suggest Me One Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="btn-primary whitespace-nowrap group">
            <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
            Suggest Me One
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
