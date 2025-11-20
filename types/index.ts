export type SpaceType = 'full_space' | 'storage' | 'short_term';

export type ContactMethod = 'in_app' | 'email' | 'phone';

export type ListingStatus = 'active' | 'inactive';

export interface Host {
  name: string;
  avatar: string;
  verified: boolean;
  memberSince: string;
  bio?: string;
}

export interface Listing {
  id: string;
  title: string;
  type: SpaceType;
  price: number;
  startDate: string;
  endDate: string;
  location: string;
  images: string[];
  amenities: string[];
  description: string;
  host: Host;
  contactMethod: ContactMethod;
  contactInfo?: string;
  status: ListingStatus;
  viewCount: number;
}

export interface FilterState {
  startDate?: string;
  endDate?: string;
  spaceType?: SpaceType | 'all';
  minPrice: number;
  maxPrice: number;
  distance?: string;
  searchQuery?: string;
}

