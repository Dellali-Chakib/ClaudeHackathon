"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { FilterState, SpaceType } from "@/types";

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApplyFilters: () => void;
}

export default function FilterSidebar({
  filters,
  onFiltersChange,
  onApplyFilters,
}: FilterSidebarProps) {
  const handleChange = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>
      
      <div className="space-y-6">
        {/* Date Range */}
        <div>
          <label className="text-sm font-medium mb-2 block">Date Range</label>
          <div className="space-y-2">
            <Input
              type="date"
              value={filters.startDate || ""}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
            <Input
              type="date"
              value={filters.endDate || ""}
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
          </div>
        </div>

        {/* Space Type */}
        <div>
          <label className="text-sm font-medium mb-2 block">Space Type</label>
          <Select
            value={filters.spaceType || "all"}
            onChange={(e) => handleChange("spaceType", e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="full_space">Full Space</option>
            <option value="storage">Storage Only</option>
            <option value="short_term">Short-term Stay</option>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <label className="text-sm font-medium mb-2 block">Price Range</label>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-500 block mb-1">Min: ${filters.minPrice}</label>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={filters.minPrice}
                onChange={(e) => handleChange("minPrice", parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1">Max: ${filters.maxPrice}</label>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={filters.maxPrice}
                onChange={(e) => handleChange("maxPrice", parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <p className="text-sm text-slate-600 font-medium">
              ${filters.minPrice} - ${filters.maxPrice}
            </p>
          </div>
        </div>

        {/* Distance */}
        <div>
          <label className="text-sm font-medium mb-2 block">Distance</label>
          <div className="space-y-2">
            {["any", "0.5", "1", "2"].map((distance) => (
              <label key={distance} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="distance"
                  value={distance}
                  checked={filters.distance === distance || (distance === "any" && !filters.distance)}
                  onChange={(e) => handleChange("distance", e.target.value === "any" ? undefined : e.target.value)}
                  className="text-uw-red"
                />
                <span className="text-sm">
                  {distance === "any"
                    ? "Any distance"
                    : `< ${distance} ${distance === "0.5" ? "mile" : "miles"}`}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <Button onClick={onApplyFilters} className="w-full">
          Apply Filters
        </Button>
      </div>
    </Card>
  );
}

