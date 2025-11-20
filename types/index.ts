export type SpaceType = 'full_space' | 'storage' | 'short_term';

export type ContactMethod = 'in_app' | 'email' | 'phone';

export type ListingStatus = 'active' | 'inactive';

export interface Host {
  name: string;
  avatar: string;
  verified: boolean;
  memberSince: string;
  bio?: string;
  userId?: string; // Supabase user ID for in-app messaging
}

export interface Listing {
  id: string;
  userId: string; // ID of the user who created the listing
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
  createdAt?: string;
  updatedAt?: string;
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

export interface Message {
  id: string;
  listing_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  listing_id: string;
  sender_id: string;
  receiver_id: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
  created_at: string;
}

