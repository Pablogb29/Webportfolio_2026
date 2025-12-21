"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, Grid3x3, List, Search } from "lucide-react";
import type { MachineFilters, MachineSortOption } from "@/lib/types/htb";

type ViewMode = "grid" | "list";

interface FiltersBarProps {
  filters: MachineFilters;
  sortBy: MachineSortOption;
  onFiltersChange: (filters: MachineFilters) => void;
  onSortChange: (sort: MachineSortOption) => void;
  availableTags?: string[];
  availableSkills?: string[];
  stats?: {
    byDifficulty: Record<string, number>;
    byOS: Record<string, number>;
    byStatus: Record<string, number>;
    byYear: Record<string, number>;
    uniqueTags: string[];
    uniqueSkills: string[];
  };
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}

const sortOptions: { value: MachineSortOption; label: string }[] = [
  { value: "solveDateDesc", label: "Solve Date (Newest)" },
  { value: "solveDateAsc", label: "Solve Date (Oldest)" },
  { value: "difficultyDesc", label: "Difficulty (Hardest)" },
  { value: "difficultyAsc", label: "Difficulty (Easiest)" },
  { value: "pointsDesc", label: "Points (Highest)" },
  { value: "pointsAsc", label: "Points (Lowest)" },
  { value: "ratingDesc", label: "Rating (Highest)" },
  { value: "nameAsc", label: "Name (A-Z)" },
  { value: "nameDesc", label: "Name (Z-A)" },
];

const difficulties: Array<"Easy" | "Medium" | "Hard" | "Insane" | "Tutorial"> = [
  "Easy",
  "Medium",
  "Hard",
  "Insane",
  "Tutorial",
];

const osTypes: Array<"Linux" | "Windows" | "Other" | "FreeBSD" | "OpenBSD"> = [
  "Linux",
  "Windows",
  "Other",
  "FreeBSD",
  "OpenBSD",
];

const statusTypes: Array<"Active" | "Retired"> = ["Active", "Retired"];

export default function FiltersBar({
  filters,
  sortBy,
  onFiltersChange,
  onSortChange,
  availableTags = [],
  availableSkills = [],
  stats,
  viewMode = "grid",
  onViewModeChange,
}: FiltersBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  function toggleFilter(
    key: "difficulty",
    value: "Easy" | "Medium" | "Hard" | "Insane" | "Tutorial"
  ): void;
  function toggleFilter(
    key: "os",
    value: "Linux" | "Windows" | "Other" | "FreeBSD" | "OpenBSD"
  ): void;
  function toggleFilter(
    key: "status",
    value: "Active" | "Retired"
  ): void;
  function toggleFilter(
    key: "tags" | "skills",
    value: string
  ): void;
  function toggleFilter(
    key: "difficulty" | "os" | "status" | "tags" | "skills",
    value: string | "Easy" | "Medium" | "Hard" | "Insane" | "Tutorial" | "Linux" | "Windows" | "Other" | "FreeBSD" | "OpenBSD" | "Active" | "Retired"
  ): void {
    const current = filters[key] as any[] | undefined;
    const newFilters = { ...filters };

    if (current && current.includes(value)) {
      newFilters[key] = current.filter((v) => v !== value) as any;
    } else {
      newFilters[key] = [...(current || []), value] as any;
    }

    // Remove empty arrays
    if (Array.isArray(newFilters[key]) && (newFilters[key] as any[]).length === 0) {
      delete newFilters[key];
    }

    onFiltersChange(newFilters);
  }

  const clearFilters = () => {
    onFiltersChange({});
  };

  const handleSearchChange = (value: string) => {
    onFiltersChange({
      ...filters,
      search: value || undefined,
    });
  };

  const hasActiveFilters =
    (filters.difficulty && filters.difficulty.length > 0) ||
    (filters.os && filters.os.length > 0) ||
    (filters.status && filters.status.length > 0) ||
    (filters.tags && filters.tags.length > 0) ||
    (filters.skills && filters.skills.length > 0) ||
    filters.year !== undefined ||
    (filters.search && filters.search.trim().length > 0);

  const getYears = () => {
    if (!stats?.byYear) return [];
    return Object.keys(stats.byYear)
      .map(Number)
      .sort((a, b) => b - a);
  };

  return (
    <div className="mb-6 sm:mb-8">
      {/* Toolbar - Fixed Alignment */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        {/* View Toggle */}
        {onViewModeChange && (
          <div className="flex items-center gap-0 bg-container-alt border border-accent/20 rounded-lg p-1 h-9 sm:h-10">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-colors flex items-center gap-1 sm:gap-2 h-7 sm:h-8 leading-none ${
                viewMode === "grid"
                  ? "bg-accent/20 text-accent"
                  : "text-gray-light/60 hover:text-gray-light"
              }`}
              aria-label="Grid view"
            >
              <Grid3x3 size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-colors flex items-center gap-1 sm:gap-2 h-7 sm:h-8 leading-none ${
                viewMode === "list"
                  ? "bg-accent/20 text-accent"
                  : "text-gray-light/60 hover:text-gray-light"
              }`}
              aria-label="List view"
            >
              <List size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">List</span>
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative flex-1 min-w-[150px] sm:min-w-[200px] max-w-md">
          <Search size={16} className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-light/60 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          <input
            type="text"
            placeholder="Search machines..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 h-9 sm:h-10 bg-container-alt border border-accent/20 rounded-lg text-gray-light placeholder-gray-light/50 focus:outline-none focus:border-accent/40 transition-colors text-sm sm:text-base"
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 h-9 sm:h-10 bg-container-alt border border-accent/20 rounded-lg text-gray-light hover:border-accent/40 transition-colors leading-none text-sm sm:text-base"
        >
          <Filter size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 bg-accent text-background text-xs rounded-full leading-none">
              {[
                filters.difficulty?.length || 0,
                filters.os?.length || 0,
                filters.status?.length || 0,
                filters.tags?.length || 0,
                filters.skills?.length || 0,
                filters.year ? 1 : 0,
              ].reduce((a, b) => a + b, 0)}
            </span>
          )}
        </button>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 h-9 sm:h-10 bg-container-alt border border-accent/20 rounded-lg text-gray-light hover:border-accent/40 transition-colors leading-none text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">Sort: </span>
            <span className="sm:hidden">Sort</span>
            <span className="hidden sm:inline">{sortOptions.find((o) => o.value === sortBy)?.label}</span>
            <ChevronDown size={16} className={`sm:w-[18px] sm:h-[18px] ${showSort ? "rotate-180" : ""}`} />
          </button>

          {showSort && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowSort(false)}
              />
              <div className="absolute top-full left-0 mt-2 w-56 sm:w-64 bg-container-alt border border-accent/20 rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortChange(option.value);
                      setShowSort(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-accent/10 transition-colors leading-none ${
                      sortBy === option.value ? "text-accent bg-accent/5" : "text-gray-light"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 h-9 sm:h-10 text-gray-light/60 hover:text-gray-light transition-colors leading-none text-sm sm:text-base"
          >
            <X size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-container-alt border border-accent/20 rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Difficulty Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-light mb-2 sm:mb-3">Difficulty</label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((diff) => {
                const isSelected = filters.difficulty?.includes(diff);
                const count = stats?.byDifficulty[diff] || 0;
                return (
                  <button
                    key={diff}
                    onClick={() => toggleFilter("difficulty", diff)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded border text-xs sm:text-sm transition-colors leading-none ${
                      isSelected
                        ? "bg-accent/20 border-accent text-accent"
                        : "bg-container border-accent/20 text-gray-light hover:border-accent/40"
                    }`}
                  >
                    {diff} {count > 0 && `(${count})`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* OS Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-light mb-2 sm:mb-3">Operating System</label>
            <div className="flex flex-wrap gap-2">
              {osTypes.map((os) => {
                const isSelected = filters.os?.includes(os);
                const count = stats?.byOS[os] || 0;
                return (
                  <button
                    key={os}
                    onClick={() => toggleFilter("os", os)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded border text-xs sm:text-sm transition-colors leading-none ${
                      isSelected
                        ? "bg-accent/20 border-accent text-accent"
                        : "bg-container border-accent/20 text-gray-light hover:border-accent/40"
                    }`}
                  >
                    {os} {count > 0 && `(${count})`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-light mb-2 sm:mb-3">Status</label>
            <div className="flex flex-wrap gap-2">
              {statusTypes.map((status) => {
                const isSelected = filters.status?.includes(status);
                const count = stats?.byStatus[status] || 0;
                return (
                  <button
                    key={status}
                    onClick={() => toggleFilter("status", status)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded border text-xs sm:text-sm transition-colors leading-none ${
                      isSelected
                        ? "bg-accent/20 border-accent text-accent"
                        : "bg-container border-accent/20 text-gray-light hover:border-accent/40"
                    }`}
                  >
                    {status} {count > 0 && `(${count})`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags Filter */}
          {availableTags.length > 0 && (
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-light mb-2 sm:mb-3">Tags</label>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {availableTags.slice(0, 50).map((tag) => {
                  const isSelected = filters.tags?.some(
                    (t) => t.toLowerCase() === tag.toLowerCase()
                  );
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleFilter("tags", tag)}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded border text-xs sm:text-sm transition-colors leading-none ${
                        isSelected
                          ? "bg-purple-accent/20 border-purple-accent text-purple-accent"
                          : "bg-container border-cyber-purple/20 text-gray-light hover:border-purple-accent/40"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Skills Filter */}
          {availableSkills.length > 0 && (
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-light mb-2 sm:mb-3">Skills</label>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {availableSkills.slice(0, 50).map((skill) => {
                  const isSelected = filters.skills?.some(
                    (s) => s.toLowerCase() === skill.toLowerCase()
                  );
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleFilter("skills", skill)}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded border text-xs sm:text-sm transition-colors leading-none ${
                        isSelected
                          ? "bg-cyan-400/20 border-cyan-400 text-cyan-400"
                          : "bg-container border-cyan-400/20 text-gray-light hover:border-cyan-400/40"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Year Filter */}
          {getYears().length > 0 && (
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-light mb-2 sm:mb-3">Year</label>
              <div className="flex flex-wrap gap-2">
                {getYears().map((year) => {
                  const isSelected = filters.year === year;
                  const count = stats?.byYear[year.toString()] || 0;
                  return (
                    <button
                      key={year}
                      onClick={() =>
                        onFiltersChange({
                          ...filters,
                          year: isSelected ? undefined : year,
                        })
                      }
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded border text-xs sm:text-sm transition-colors leading-none ${
                        isSelected
                          ? "bg-accent/20 border-accent text-accent"
                          : "bg-container border-accent/20 text-gray-light hover:border-accent/40"
                      }`}
                    >
                      {year} {count > 0 && `(${count})`}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
