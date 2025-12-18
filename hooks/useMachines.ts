/**
 * React hook for fetching and managing HTB machines
 */

import { useState, useEffect, useMemo } from "react";
import type { MachineSolved, MachineFilters, MachineSortOption, MachinesResponse } from "@/lib/types/htb";

interface UseMachinesOptions {
  filters?: MachineFilters;
  sortBy?: MachineSortOption;
  pageSize?: number;
}

export function useMachines(options: UseMachinesOptions = {}) {
  const { filters = {}, sortBy = "solveDateDesc", pageSize = 12 } = options;
  
  const [data, setData] = useState<MachinesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch machines from API
  useEffect(() => {
    let cancelled = false;

    async function fetchMachines() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/htb/ctf");
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP ${response.status}`);
        }

        const result: MachinesResponse = await response.json();
        
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to fetch machines");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMachines();

    return () => {
      cancelled = true;
    };
  }, []);

  // Filter machines
  const filteredMachines = useMemo(() => {
    if (!data) return [];

    let filtered = [...data.machines];

    // Filter by difficulty
    if (filters.difficulty && filters.difficulty.length > 0) {
      filtered = filtered.filter((m) => filters.difficulty!.includes(m.difficulty));
    }

    // Filter by OS
    if (filters.os && filters.os.length > 0) {
      filtered = filtered.filter((m) => filters.os!.includes(m.os));
    }

    // Filter by status
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter((m) => filters.status!.includes(m.status));
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((m) =>
        filters.tags!.some((tag) => 
          m.tags && m.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
        )
      );
    }

    // Filter by skills
    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter((m) =>
        filters.skills!.some((skill) => 
          m.skills && m.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }

    // Filter by year
    if (filters.year) {
      filtered = filtered.filter((m) => {
        if (!m.solveDate) return false;
        const year = new Date(m.solveDate).getFullYear();
        return year === filters.year;
      });
    }

    // Filter by search query (machine name)
    if (filters.search && filters.search.trim().length > 0) {
      const searchLower = filters.search.toLowerCase().trim();
      filtered = filtered.filter((m) =>
        m.name.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [data, filters]);

  // Sort machines
  const sortedMachines = useMemo(() => {
    const sorted = [...filteredMachines];

    switch (sortBy) {
      case "solveDateDesc":
        sorted.sort((a, b) => {
          const dateA = new Date(a.solveDate).getTime();
          const dateB = new Date(b.solveDate).getTime();
          return dateB - dateA;
        });
        break;
      case "solveDateAsc":
        sorted.sort((a, b) => {
          const dateA = new Date(a.solveDate).getTime();
          const dateB = new Date(b.solveDate).getTime();
          return dateA - dateB;
        });
        break;
      case "difficultyDesc":
        sorted.sort((a, b) => {
          const diffA = a.difficultyNumeric || 0;
          const diffB = b.difficultyNumeric || 0;
          return diffB - diffA;
        });
        break;
      case "difficultyAsc":
        sorted.sort((a, b) => {
          const diffA = a.difficultyNumeric || 0;
          const diffB = b.difficultyNumeric || 0;
          return diffA - diffB;
        });
        break;
      case "pointsDesc":
        sorted.sort((a, b) => b.points - a.points);
        break;
      case "pointsAsc":
        sorted.sort((a, b) => a.points - b.points);
        break;
      case "ratingDesc":
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "ratingAsc":
        sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        break;
      case "nameAsc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return sorted;
  }, [filteredMachines, sortBy]);

  // Paginate machines
  const paginatedMachines = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedMachines.slice(start, end);
  }, [sortedMachines, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedMachines.length / pageSize);

  // Reset to page 1 when filters or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  return {
    machines: paginatedMachines,
    allMachines: sortedMachines,
    stats: data?.stats,
    loading,
    error,
    currentPage,
    totalPages,
    totalMachines: sortedMachines.length,
    setCurrentPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}

