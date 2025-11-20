"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ListingCard from "@/components/ListingCard";
import FilterSidebar from "@/components/FilterSidebar";
import { mockListings } from "@/lib/mockData";
import { FilterState, Listing } from "@/types";

export default function BrowsePage() {
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 2000,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredListings = useMemo(() => {
    let results = [...mockListings];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.location.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query)
      );
    }

    // Space type filter
    if (filters.spaceType && filters.spaceType !== "all") {
      results = results.filter((listing) => listing.type === filters.spaceType);
    }

    // Price filter
    results = results.filter(
      (listing) =>
        listing.price >= filters.minPrice && listing.price <= filters.maxPrice
    );

    // Date filter
    if (filters.startDate) {
      results = results.filter(
        (listing) => listing.endDate >= filters.startDate!
      );
    }
    if (filters.endDate) {
      results = results.filter(
        (listing) => listing.startDate <= filters.endDate!
      );
    }

    return results;
  }, [filters, searchQuery]);

  const handleApplyFilters = () => {
    // Filters are already applied in useMemo
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Browse Listings</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by title, location, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              onApplyFilters={handleApplyFilters}
            />
          </aside>

          {/* Main Grid */}
          <main className="flex-1">
            <div className="mb-4 text-slate-600">
              {filteredListings.length} listing{filteredListings.length !== 1 ? "s" : ""} found
            </div>
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500 text-lg">No listings found. Try adjusting your filters.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

