"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Loader2, AlertCircle, ChevronLeft, ChevronRight, Grid3x3, List } from "lucide-react";
import { useMachines } from "@/hooks/useMachines";
import MachineCard from "@/components/MachineCard";
import MachineListItem from "@/components/MachineListItem";
import FiltersBar from "@/components/FiltersBar";
import type { MachineFilters, MachineSortOption } from "@/lib/types/htb";

type ViewMode = "grid" | "list";

export default function CTFPage() {
  const [filters, setFilters] = useState<MachineFilters>({});
  const [sortBy, setSortBy] = useState<MachineSortOption>("solveDateDesc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const {
    machines,
    allMachines,
    stats,
    loading,
    error,
    currentPage,
    totalPages,
    totalMachines,
    setCurrentPage,
    hasNextPage,
    hasPreviousPage,
  } = useMachines({ filters, sortBy, pageSize: 12 });

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-light mb-4">
            <Terminal className="inline-block mr-4 text-accent" size={48} />
            CTF <span className="text-accent">Machines</span>
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-4" />
          <p className="text-gray-light/80 max-w-2xl mx-auto text-justify">
            A comprehensive showcase of Hack The Box machines I&apos;ve solved, demonstrating my
            offensive security skills across various difficulty levels, operating systems, and
            attack techniques.
          </p>
        </motion.div>

        {/* Stats Dashboard */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <div className="bg-container-alt rounded-lg p-6 border border-accent/20 text-center">
              <div className="text-3xl font-bold text-accent mb-2">{stats.total}</div>
              <div className="text-gray-light/80 text-sm">Total Machines</div>
            </div>
            <div className="bg-container-alt rounded-lg p-6 border border-accent/20 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {stats.byDifficulty.Easy || 0}
              </div>
              <div className="text-gray-light/80 text-sm">Easy</div>
            </div>
            <div className="bg-container-alt rounded-lg p-6 border border-accent/20 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {stats.byDifficulty.Medium || 0}
              </div>
              <div className="text-gray-light/80 text-sm">Medium</div>
            </div>
            <div className="bg-container-alt rounded-lg p-6 border border-accent/20 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {(stats.byDifficulty.Hard || 0) + (stats.byDifficulty.Insane || 0)}
              </div>
              <div className="text-gray-light/80 text-sm">Hard+</div>
            </div>
          </motion.div>
        )}

        {/* View Toggle and Filters - Fixed Alignment */}
        <div className="mb-6">
          <FiltersBar
            filters={filters}
            sortBy={sortBy}
            onFiltersChange={setFilters}
            onSortChange={setSortBy}
            availableTags={stats?.uniqueTags}
            availableSkills={stats?.uniqueSkills}
            stats={stats}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-accent mb-4" size={48} />
            <p className="text-gray-light/80">Loading machines...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3 text-red-400">
              <AlertCircle size={20} className="mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Error loading machines</h3>
                <p className="text-sm text-red-400/80 mb-3">{error}</p>
                <div className="text-xs text-red-400/60 space-y-1">
                  <p><strong>Common issues:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Check that HTB_TOKEN is set in .env.local</li>
                    <li>Verify your HTB API token is valid and not expired</li>
                    <li>Check the server console for detailed error logs</li>
                    <li>Ensure your HTB subscription is active</li>
                  </ul>
                  <p className="mt-2">Check your terminal/console where you ran <code className="bg-red-400/20 px-1 rounded">npm run dev</code> for detailed error messages.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        {!loading && !error && (
          <div className="mb-6 text-gray-light/80 text-sm">
            Showing {machines.length} of {totalMachines} machine{totalMachines !== 1 ? "s" : ""}
          </div>
        )}

        {/* Machines Display */}
        {!loading && !error && machines.length > 0 && (
          <>
            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {machines.map((machine, index) => (
                  <MachineCard key={machine.id} machine={machine} index={index} />
                ))}
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                {machines.map((machine, index) => (
                  <MachineListItem key={machine.id} machine={machine} index={index} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={!hasPreviousPage}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    hasPreviousPage
                      ? "bg-container-alt border-accent/20 text-gray-light hover:border-accent/40"
                      : "bg-container-alt border-accent/10 text-gray-light/40 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="text-gray-light">
                  Page {currentPage} of {totalPages}
                </div>

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!hasNextPage}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    hasNextPage
                      ? "bg-container-alt border-accent/20 text-gray-light hover:border-accent/40"
                      : "bg-container-alt border-accent/10 text-gray-light/40 cursor-not-allowed"
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && machines.length === 0 && (
          <div className="text-center py-20">
            <Terminal className="mx-auto mb-4 text-gray-light/40" size={64} />
            <h3 className="text-xl font-semibold text-gray-light mb-2">No machines found</h3>
            <p className="text-gray-light/60">
              {totalMachines === 0
                ? "No machines have been solved yet."
                : "Try adjusting your filters to see more results."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

