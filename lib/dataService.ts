"use client";

import { Listing } from "@/types";
import { mockListings } from "./mockData";
import { User } from "@supabase/supabase-js";

// In-memory storage for user-created listings (simulating database)
let userListings: Listing[] = [];

// Initialize with mock data - ensure all have userId
let allListings: Listing[] = mockListings.map(listing => ({
  ...listing,
  userId: listing.userId || 'unknown-user', // Fallback for safety
  createdAt: listing.createdAt || new Date().toISOString(),
  updatedAt: listing.updatedAt || new Date().toISOString(),
}));

/**
 * Get all active listings (for browse page)
 * Optionally excludes listings owned by the current user
 */
export function getAllListings(currentUserId?: string | null, excludeOwn: boolean = false): Listing[] {
  let listings = allListings.filter(listing => listing.status === 'active');
  
  if (excludeOwn && currentUserId) {
    listings = listings.filter(listing => listing.userId !== currentUserId);
  }
  
  return listings;
}

/**
 * Get listings owned by a specific user
 */
export function getUserListings(userId: string | null | undefined): Listing[] {
  if (!userId) return [];
  return allListings.filter(listing => listing.userId === userId);
}

/**
 * Get a single listing by ID
 */
export function getListingById(id: string): Listing | undefined {
  return allListings.find(listing => listing.id === id);
}

/**
 * Check if a user owns a listing
 */
export function isListingOwner(listing: Listing | undefined, userId: string | null | undefined): boolean {
  if (!listing || !userId) return false;
  return listing.userId === userId;
}

/**
 * Create a new listing and associate it with the current user
 */
export function createListing(listingData: Omit<Listing, 'id' | 'userId' | 'viewCount' | 'createdAt' | 'updatedAt'>, user: User): Listing {
  const newListing: Listing = {
    ...listingData,
    id: `listing-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId: user.id,
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    // Generate host info from user
    host: {
      name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'UW Student',
      avatar: user.user_metadata?.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`,
      verified: true, // All authenticated users are verified
      memberSince: new Date(user.created_at).toISOString(),
      bio: user.user_metadata?.bio,
    },
  };
  
  allListings.push(newListing);
  return newListing;
}

/**
 * Update an existing listing
 */
export function updateListing(listingId: string, updates: Partial<Listing>, userId: string | null): Listing | null {
  const listing = allListings.find(l => l.id === listingId);
  if (!listing) return null;
  
  // Check ownership
  if (listing.userId !== userId) {
    throw new Error('You do not have permission to edit this listing');
  }
  
  const updatedListing: Listing = {
    ...listing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  const index = allListings.findIndex(l => l.id === listingId);
  if (index !== -1) {
    allListings[index] = updatedListing;
  }
  
  return updatedListing;
}

/**
 * Delete a listing
 */
export function deleteListing(listingId: string, userId: string | null): boolean {
  const listing = allListings.find(l => l.id === listingId);
  if (!listing) return false;
  
  // Check ownership
  if (listing.userId !== userId) {
    throw new Error('You do not have permission to delete this listing');
  }
  
  const index = allListings.findIndex(l => l.id === listingId);
  if (index !== -1) {
    allListings.splice(index, 1);
    return true;
  }
  
  return false;
}

/**
 * Toggle listing status (active/inactive)
 */
export function toggleListingStatus(listingId: string, userId: string | null): Listing | null {
  const listing = allListings.find(l => l.id === listingId);
  if (!listing) return null;
  
  // Check ownership
  if (listing.userId !== userId) {
    throw new Error('You do not have permission to modify this listing');
  }
  
  const newStatus = listing.status === 'active' ? 'inactive' : 'active';
  return updateListing(listingId, { status: newStatus }, userId);
}

/**
 * Increment view count for a listing
 */
export function incrementViewCount(listingId: string): void {
  const listing = allListings.find(l => l.id === listingId);
  if (listing) {
    listing.viewCount = (listing.viewCount || 0) + 1;
  }
}

