# BadgerSpace - UW-Madison Student Housing Platform

A beautiful, responsive frontend for BadgerSpace, a UW-Madison student housing connection platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Browse Listings**: Search and filter available spaces by date, type, price, and location
- **Create Listings**: Multi-step form to post your space with images and details
- **Listing Details**: Comprehensive view with image gallery, amenities, and host information
- **My Listings**: Dashboard to manage your posted listings
- **User Profile**: View and edit your profile information
- **Responsive Design**: Mobile-first design that works on all devices
- **UW-Madison Branding**: Custom color scheme matching UW-Madison brand colors

## 🛠️ Tech Stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS** for styling
- **shadcn/ui** components (Button, Card, Input, Dialog, etc.)
- **Lucide React** for icons

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
app/
├── layout.tsx              # Root layout with navbar
├── page.tsx                # Landing page
├── browse/
│   └── page.tsx           # Browse listings grid
├── listing/
│   └── [id]/
│       └── page.tsx       # Listing detail page
├── create/
│   └── page.tsx           # Create listing form
├── my-listings/
│   └── page.tsx           # User's listings dashboard
└── profile/
    └── page.tsx           # User profile

components/
├── ui/                     # shadcn/ui components
├── Navbar.tsx             # Navigation bar
├── Footer.tsx             # Footer with disclaimers
├── ListingCard.tsx        # Card for browse grid
├── FilterSidebar.tsx      # Filters for browse page
├── ImageGallery.tsx       # Photo carousel
├── ContactModal.tsx       # Contact host modal
└── CreateListingForm.tsx  # Multi-step form

lib/
├── mockData.ts            # Mock listings data
└── utils.ts               # Helper functions

types/
└── index.ts               # TypeScript types
```

## 🎨 Design System

### Colors
- **UW Red**: `#c5050c` - Primary buttons and CTAs
- **UW Gray**: `#282728` - Footer and dark elements
- **UW Gold**: `#FFC72C` - Accent color (available but not heavily used)

### Design Principles
- Modern & Clean: Card-based layouts with generous whitespace
- Mobile-First: Responsive on all screen sizes
- Smooth Interactions: Hover effects, transitions, loading states
- Visual Hierarchy: Clear typography scale

## 📝 Pages

### Landing Page (`/`)
- Hero section with UW-Madison campus background
- Statistics section
- "How It Works" guide

### Browse Listings (`/browse`)
- Search functionality
- Filter sidebar (date, type, price, distance)
- Responsive grid of listing cards

### Listing Detail (`/listing/[id]`)
- Image gallery with thumbnails
- Full listing information
- Host details
- Contact modal

### Create Listing (`/create`)
- Multi-step form (4 steps)
- Progress indicator
- Image upload
- Contact preferences

### My Listings (`/my-listings`)
- Dashboard of user's listings
- Status management
- Edit and delete actions

### Profile (`/profile`)
- User information
- Statistics (listings count, views)

## 🔧 Development

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📌 Notes

- Currently uses **mock data** - backend integration will be added later
- All images use Unsplash and Pravatar for demo purposes
- Authentication is mocked (user is always "logged in")
- Form submissions show alerts (will be replaced with API calls)

## 🎯 Next Steps (Backend Integration)

- Connect to Supabase for data persistence
- Implement authentication
- Add real image upload functionality
- Connect contact forms to messaging system
- Add search indexing
- Implement user verification system

## 📄 License

Built for UW-Madison students.
