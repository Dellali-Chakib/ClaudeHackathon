"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, Calendar, DollarSign, CheckCircle2, Flag, Edit, Trash2 } from "lucide-react";
import { getListingById, incrementViewCount, isListingOwner, deleteListing } from "@/lib/dataService";
import { useAuth } from "@/lib/auth/AuthContext";
import { formatDateRange, formatPrice, getSpaceTypeLabel, getSpaceTypeColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ImageGallery from "@/components/ImageGallery";
import ContactModal from "@/components/ContactModal";
import { Listing } from "@/types";

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [listing, setListing] = useState<Listing | undefined>(undefined);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const foundListing = getListingById(params.id as string);
    setListing(foundListing);
    if (foundListing) {
      incrementViewCount(foundListing.id);
    }
  }, [params.id]);

  const isOwner = listing ? isListingOwner(listing, user?.id) : false;

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Listing Not Found</h1>
          <p className="text-slate-600">The listing you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const amenitiesLabels: Record<string, string> = {
    parking: "Parking",
    laundry: "Laundry",
    furnished: "Furnished",
    "pet-friendly": "Pet-friendly",
    wifi: "WiFi",
    ac: "AC",
    heating: "Heating",
    secure: "Secure",
    climate_controlled: "Climate Controlled",
    dry: "Dry",
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <ImageGallery images={listing.images} title={listing.title} />
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold">{listing.title}</h1>
                <Badge className={getSpaceTypeColor(listing.type)}>
                  {getSpaceTypeLabel(listing.type)}
                </Badge>
              </div>
              <div className="flex items-center text-slate-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{listing.location}</span>
              </div>
              <div className="text-2xl font-bold text-uw-red">
                {formatPrice(listing.price)}
              </div>
            </div>

            {/* Availability */}
            <Card className="p-4">
              <div className="flex items-center text-slate-700">
                <Calendar className="h-5 w-5 mr-2" />
                <div>
                  <p className="font-medium">Availability</p>
                  <p className="text-sm text-slate-600">
                    {formatDateRange(listing.startDate, listing.endDate)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-slate-700 whitespace-pre-line">{listing.description}</p>
            </Card>

            {/* Amenities */}
            {listing.amenities.length > 0 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-3">
                  {listing.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-slate-700">
                        {amenitiesLabels[amenity] || amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Host Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Host Information</h2>
              <div className="flex items-center space-x-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={listing.host.avatar}
                    alt={listing.host.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{listing.host.name}</h3>
                    {listing.host.verified && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-slate-600">
                    Member since {new Date(listing.host.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                  {listing.host.bio && (
                    <p className="text-sm text-slate-600 mt-1">{listing.host.bio}</p>
                  )}
                </div>
              </div>
            </Card>

            {/* CTA Buttons */}
            <div className="space-y-3">
              {isOwner ? (
                <>
                  <Button
                    className="w-full bg-uw-red hover:bg-uw-red/90"
                    size="lg"
                    onClick={() => router.push(`/create?edit=${listing.id}`)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Listing
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700"
                    size="sm"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this listing?")) {
                        try {
                          if (deleteListing(listing.id, user?.id || null)) {
                            alert("Listing deleted successfully!");
                            router.push("/my-listings");
                          }
                        } catch (error) {
                          alert(error instanceof Error ? error.message : "Failed to delete listing");
                        }
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Listing
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="w-full bg-uw-red hover:bg-uw-red/90"
                    size="lg"
                    onClick={() => setContactModalOpen(true)}
                  >
                    Contact Host
                  </Button>
                  <Button variant="ghost" className="w-full" size="sm">
                    <Flag className="h-4 w-4 mr-2" />
                    Report Listing
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        listing={listing}
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </div>
  );
}

