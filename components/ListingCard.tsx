import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, DollarSign, CheckCircle2 } from "lucide-react";
import { Listing } from "@/types";
import { formatDateRange, formatPrice, getSpaceTypeLabel, getSpaceTypeColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listing/${listing.id}`}>
      <Card className="rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={listing.images[0] || '/placeholder.jpg'}
            alt={listing.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {listing.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-slate-600 text-sm mb-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{listing.location}</span>
          </div>

          {/* Date Range */}
          <div className="flex items-center text-slate-600 text-sm mb-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDateRange(listing.startDate, listing.endDate)}</span>
          </div>

          {/* Price */}
          <div className="flex items-center text-uw-red font-semibold mb-3">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>{formatPrice(listing.price)}</span>
          </div>

          {/* Host Info */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <Image
                src={listing.host.avatar}
                alt={listing.host.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm text-slate-700 flex items-center">
              {listing.host.name}
              {listing.host.verified && (
                <CheckCircle2 className="h-4 w-4 ml-1 text-green-500" />
              )}
            </span>
          </div>

          {/* Type Badge */}
          <div className="mt-auto">
            <Badge className={getSpaceTypeColor(listing.type)}>
              {getSpaceTypeLabel(listing.type)}
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
}

