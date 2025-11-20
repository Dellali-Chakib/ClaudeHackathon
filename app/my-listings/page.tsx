"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, Edit, Trash2, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockListings } from "@/lib/mockData";
import { formatPrice, getSpaceTypeLabel, getSpaceTypeColor } from "@/lib/utils";
import ListingCard from "@/components/ListingCard";

export default function MyListingsPage() {
  const router = useRouter();
  // Mock: In real app, filter by current user
  const myListings = mockListings.slice(0, 3);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      // Mock: In real app, delete from backend
      console.log("Deleting listing:", id);
      alert("Listing deleted! (This is a demo)");
    }
  };

  const handleToggleStatus = (id: string) => {
    // Mock: In real app, update status in backend
    console.log("Toggling status for listing:", id);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">My Listings</h1>
          <Button className="bg-uw-red hover:bg-uw-red/90" asChild>
            <Link href="/create">
              <Plus className="h-4 w-4 mr-2" />
              Create New Listing
            </Link>
          </Button>
        </div>

        {myListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={listing.images[0] || '/placeholder.jpg'}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2 flex-1">
                      {listing.title}
                    </h3>
                    <Badge
                      className={
                        listing.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-slate-100 text-slate-800"
                      }
                    >
                      {listing.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center text-slate-600 text-sm mb-3">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{listing.viewCount} views</span>
                  </div>
                  <div className="text-lg font-semibold text-uw-red mb-4">
                    {formatPrice(listing.price)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/listing/${listing.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/create?edit=${listing.id}`)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(listing.id)}
                    >
                      {listing.status === "active" ? (
                        <ToggleRight className="h-4 w-4" />
                      ) : (
                        <ToggleLeft className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(listing.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🏠</div>
              <h2 className="text-2xl font-semibold mb-2">
                You haven&apos;t posted any listings yet
              </h2>
              <p className="text-slate-600 mb-6">
                Start connecting with UW students by creating your first listing.
              </p>
              <Button className="bg-uw-red hover:bg-uw-red/90" asChild>
                <Link href="/create">Create Your First Listing</Link>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

