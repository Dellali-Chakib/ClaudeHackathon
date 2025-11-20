import { Listing } from '@/types';

// Mock user IDs for demo purposes (these would come from Supabase auth in production)
const MOCK_USER_IDS = {
  sarah: 'mock-user-sarah-chen',
  mike: 'mock-user-mike-johnson',
  emma: 'mock-user-emma-rodriguez',
  alex: 'mock-user-alex-kim',
  jordan: 'mock-user-jordan-taylor',
  riley: 'mock-user-riley-martinez',
  casey: 'mock-user-casey-brown',
  morgan: 'mock-user-morgan-lee',
  taylor: 'mock-user-taylor-white',
  sam: 'mock-user-sam-davis',
  jamie: 'mock-user-jamie-wilson',
  blake: 'mock-user-blake-anderson',
};

export const mockListings: Listing[] = [
  {
    id: '1',
    userId: MOCK_USER_IDS.sarah,
    title: 'Spacious 1BR near Camp Randall',
    type: 'full_space',
    price: 600,
    startDate: '2025-05-15',
    endDate: '2025-08-15',
    location: '0.3 miles from campus',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
    ],
    amenities: ['parking', 'laundry', 'furnished', 'wifi'],
    description: 'Going home for summer internship. Fully furnished 1-bedroom apartment available May through August. Walking distance to campus, grocery stores, and restaurants. Quiet building with great neighbors. Perfect for a student looking for summer housing.',
    host: {
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=1',
      verified: true,
      memberSince: '2024-01-15',
      bio: 'Graduate student in Computer Science'
    },
    contactMethod: 'in_app',
    status: 'active',
    viewCount: 42
  },
  {
    id: '2',
    userId: MOCK_USER_IDS.mike,
    title: 'Storage space in Lakeshore dorm',
    type: 'storage',
    price: 75,
    startDate: '2025-05-10',
    endDate: '2025-08-20',
    location: 'Lakeshore residence halls',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800'
    ],
    amenities: ['secure', 'climate_controlled'],
    description: 'Half of my dorm room available for storage over summer. Great for boxes, furniture, etc. Room is on the 3rd floor with elevator access. Climate controlled and secure building.',
    host: {
      name: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      verified: true,
      memberSince: '2023-09-01',
      bio: 'Sophomore in Engineering'
    },
    contactMethod: 'email',
    contactInfo: 'mike.j@wisc.edu',
    status: 'active',
    viewCount: 28
  },
  {
    id: '3',
    userId: MOCK_USER_IDS.emma,
    title: 'Cozy Studio Apartment - State Street',
    type: 'full_space',
    price: 850,
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    location: '0.1 miles from State Street',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'
    ],
    amenities: ['furnished', 'wifi', 'ac', 'heating'],
    description: 'Beautiful studio apartment right on State Street. Perfect location for summer classes or internship. Fully furnished with all utilities included. Modern kitchen and bathroom.',
    host: {
      name: 'Emma Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=5',
      verified: true,
      memberSince: '2023-08-20',
      bio: 'Senior in Business'
    },
    contactMethod: 'phone',
    contactInfo: '(608) 555-0123',
    status: 'active',
    viewCount: 67
  },
  {
    id: '4',
    userId: MOCK_USER_IDS.alex,
    title: 'Summer Sublet - 2BR Apartment',
    type: 'full_space',
    price: 500,
    startDate: '2025-05-20',
    endDate: '2025-08-10',
    location: '0.5 miles from Engineering Hall',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    amenities: ['parking', 'laundry', 'furnished', 'wifi', 'pet-friendly'],
    description: 'One bedroom in a 2BR apartment available for summer sublet. Roommate will be away for internship. Shared kitchen and living space. Pet-friendly building!',
    host: {
      name: 'Alex Kim',
      avatar: 'https://i.pravatar.cc/150?img=12',
      verified: true,
      memberSince: '2024-02-01',
      bio: 'Junior in Biology'
    },
    contactMethod: 'in_app',
    status: 'active',
    viewCount: 89
  },
  {
    id: '5',
    userId: MOCK_USER_IDS.jordan,
    title: 'Storage Unit - Basement Space',
    type: 'storage',
    price: 50,
    startDate: '2025-05-01',
    endDate: '2025-08-31',
    location: '0.7 miles from campus',
    images: [
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800'
    ],
    amenities: ['secure', 'dry'],
    description: 'Clean, dry basement storage space. Perfect for storing boxes, furniture, or seasonal items. Locked storage area in secure building.',
    host: {
      name: 'Jordan Taylor',
      avatar: 'https://i.pravatar.cc/150?img=8',
      verified: true,
      memberSince: '2023-10-15',
      bio: 'Graduate student in History'
    },
    contactMethod: 'email',
    contactInfo: 'jordan.t@wisc.edu',
    status: 'active',
    viewCount: 34
  },
  {
    id: '6',
    userId: MOCK_USER_IDS.riley,
    title: 'Short-term Stay - Memorial Union Area',
    type: 'short_term',
    price: 80,
    startDate: '2025-07-01',
    endDate: '2025-07-15',
    location: '0.2 miles from Memorial Union',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
    ],
    amenities: ['furnished', 'wifi', 'ac'],
    description: 'Private room available for short-term stay during summer session. Perfect for visiting students or conference attendees. All utilities included.',
    host: {
      name: 'Riley Martinez',
      avatar: 'https://i.pravatar.cc/150?img=9',
      verified: true,
      memberSince: '2024-01-10',
      bio: 'Graduate student in Education'
    },
    contactMethod: 'in_app',
    status: 'active',
    viewCount: 23
  },
  {
    id: '7',
    userId: MOCK_USER_IDS.casey,
    title: 'Furnished Room - Near Library Mall',
    type: 'full_space',
    price: 550,
    startDate: '2025-05-15',
    endDate: '2025-08-20',
    location: '0.4 miles from Library Mall',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
    ],
    amenities: ['furnished', 'wifi', 'laundry', 'parking'],
    description: 'Comfortable furnished room in shared house. Great location near campus. Shared kitchen and bathroom with one other student. Quiet neighborhood.',
    host: {
      name: 'Casey Brown',
      avatar: 'https://i.pravatar.cc/150?img=11',
      verified: true,
      memberSince: '2023-09-05',
      bio: 'Senior in Psychology'
    },
    contactMethod: 'phone',
    contactInfo: '(608) 555-0456',
    status: 'active',
    viewCount: 56
  },
  {
    id: '8',
    userId: MOCK_USER_IDS.morgan,
    title: 'Climate-Controlled Storage',
    type: 'storage',
    price: 90,
    startDate: '2025-05-01',
    endDate: '2025-08-31',
    location: '1.0 miles from campus',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800'
    ],
    amenities: ['secure', 'climate_controlled', 'dry'],
    description: 'Climate-controlled storage space perfect for electronics, instruments, or sensitive items. Secure facility with 24/7 access.',
    host: {
      name: 'Morgan Lee',
      avatar: 'https://i.pravatar.cc/150?img=6',
      verified: true,
      memberSince: '2024-03-01',
      bio: 'Junior in Music'
    },
    contactMethod: 'email',
    contactInfo: 'morgan.l@wisc.edu',
    status: 'active',
    viewCount: 19
  },
  {
    id: '9',
    userId: MOCK_USER_IDS.taylor,
    title: 'Modern 1BR - Near Engineering',
    type: 'full_space',
    price: 750,
    startDate: '2025-06-01',
    endDate: '2025-08-15',
    location: '0.2 miles from Engineering Hall',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    amenities: ['furnished', 'wifi', 'ac', 'heating', 'parking', 'laundry'],
    description: 'Beautiful modern 1-bedroom apartment with updated kitchen and bathroom. Great natural light. Perfect for summer internship or classes.',
    host: {
      name: 'Taylor White',
      avatar: 'https://i.pravatar.cc/150?img=13',
      verified: true,
      memberSince: '2023-11-20',
      bio: 'Graduate student in Engineering'
    },
    contactMethod: 'in_app',
    status: 'active',
    viewCount: 94
  },
  {
    id: '10',
    userId: MOCK_USER_IDS.sam,
    title: 'Shared Room - Regent Street',
    type: 'full_space',
    price: 400,
    startDate: '2025-05-20',
    endDate: '2025-08-10',
    location: '0.6 miles from campus',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    amenities: ['furnished', 'wifi', 'laundry'],
    description: 'Shared room in friendly student house. Great for budget-conscious students. Shared kitchen, bathroom, and common areas with 3 other students.',
    host: {
      name: 'Sam Davis',
      avatar: 'https://i.pravatar.cc/150?img=14',
      verified: true,
      memberSince: '2024-01-25',
      bio: 'Sophomore in Communications'
    },
    contactMethod: 'in_app',
    status: 'active',
    viewCount: 71
  },
  {
    id: '11',
    userId: MOCK_USER_IDS.jamie,
    title: 'Weekend Stay - Near Kohl Center',
    type: 'short_term',
    price: 100,
    startDate: '2025-07-10',
    endDate: '2025-07-13',
    location: '0.3 miles from Kohl Center',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
    ],
    amenities: ['furnished', 'wifi', 'ac'],
    description: 'Perfect for weekend visitors or short stays. Private room with shared bathroom. Walking distance to Kohl Center and downtown.',
    host: {
      name: 'Jamie Wilson',
      avatar: 'https://i.pravatar.cc/150?img=15',
      verified: true,
      memberSince: '2023-12-10',
      bio: 'Senior in Economics'
    },
    contactMethod: 'phone',
    contactInfo: '(608) 555-0789',
    status: 'active',
    viewCount: 15
  },
  {
    id: '12',
    userId: MOCK_USER_IDS.blake,
    title: 'Large Storage Space - Garage',
    type: 'storage',
    price: 65,
    startDate: '2025-05-01',
    endDate: '2025-08-31',
    location: '0.8 miles from campus',
    images: [
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800'
    ],
    amenities: ['secure', 'dry'],
    description: 'Large garage storage space. Perfect for storing bikes, furniture, or large items. Secure garage with lock. Easy access.',
    host: {
      name: 'Blake Anderson',
      avatar: 'https://i.pravatar.cc/150?img=16',
      verified: true,
      memberSince: '2024-02-15',
      bio: 'Junior in Kinesiology'
    },
    contactMethod: 'email',
    contactInfo: 'blake.a@wisc.edu',
    status: 'active',
    viewCount: 38
  }
];

