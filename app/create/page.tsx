"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CreateListingForm from "@/components/CreateListingForm";
import { createListing } from "@/lib/dataService";
import { useAuth } from "@/lib/auth/AuthContext";
import { Listing, SpaceType, ContactMethod } from "@/types";

export default function CreateListingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleSubmit = (formData: {
    title: string;
    type: SpaceType;
    description: string;
    startDate: string;
    endDate: string;
    price: string;
    location: string;
    amenities: string[];
    images: File[];
    contactMethod: ContactMethod;
    contactInfo?: string;
  }) => {
    if (!user) {
      alert("You must be logged in to create a listing");
      router.push("/login");
      return;
    }

    try {
      // Convert form data to listing format
      const listingData: Omit<Listing, 'id' | 'userId' | 'viewCount' | 'createdAt' | 'updatedAt'> = {
        title: formData.title,
        type: formData.type,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        price: parseInt(formData.price),
        location: formData.location,
        amenities: formData.amenities,
        images: formData.images.map((_, idx) => `/placeholder-${idx + 1}.jpg`), // Placeholder until image upload is implemented
        contactMethod: formData.contactMethod,
        contactInfo: formData.contactInfo,
        status: 'active',
        host: {
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'UW Student',
          avatar: user.user_metadata?.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`,
          verified: true,
          memberSince: new Date(user.created_at).toISOString(),
        },
      };

      createListing(listingData, user);
      alert("Listing created successfully!");
      router.push("/my-listings");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to create listing");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Create New Listing</h1>
        <CreateListingForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

