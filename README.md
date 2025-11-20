# BadgerSpace - UW-Madison Student Housing Platform

A beautiful, responsive frontend for BadgerSpace, a UW-Madison student housing connection platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **🔐 UW-Madison Authentication**: Secure login with email domain restrictions (only @wisc.edu)
- **💬 In-App Messaging**: Chat with hosts directly, similar to Zillow's messaging system
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
- **Supabase** for authentication and backend
- **Tailwind CSS** for styling
- **shadcn/ui** components (Button, Card, Input, Dialog, etc.)
- **Lucide React** for icons

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase:
   - Copy `.env.example` to `.env.local`
   - Follow the complete setup guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - Add your Supabase credentials to `.env.local`
   - **For messaging**: Follow [SUPABASE_MESSAGING_SETUP.md](./SUPABASE_MESSAGING_SETUP.md) to create the database tables

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
app/
├── layout.tsx              # Root layout with AuthProvider
├── page.tsx                # Landing page
├── login/
│   └── page.tsx           # Login page
├── signup/
│   └── page.tsx           # Signup page
├── auth/
│   └── callback/
│       └── route.ts       # OAuth callback handler
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
├── Navbar.tsx             # Navigation bar with auth UI
├── Footer.tsx             # Footer with disclaimers
├── ListingCard.tsx        # Card for browse grid
├── FilterSidebar.tsx      # Filters for browse page
├── ImageGallery.tsx       # Photo carousel
├── ContactModal.tsx       # Contact host modal
└── CreateListingForm.tsx  # Multi-step form

lib/
├── auth/
│   └── AuthContext.tsx    # Auth provider and hooks
├── supabase/
│   ├── client.ts          # Browser Supabase client
│   ├── server.ts          # Server Supabase client
│   └── middleware.ts      # Session management
├── mockData.ts            # Mock listings data
└── utils.ts               # Helper functions + email validation

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

## 🔐 Authentication

BadgerSpace uses Supabase for authentication with strict email domain validation:

- ✅ **Allowed**: Only emails ending with `@wisc.edu` (including subdomains like `@cs.wisc.edu`)
- ❌ **Blocked**: All other email domains
- 🔒 **Validation**: Both frontend (UX) and backend (security) validation
- 📧 **Email verification**: Recommended for production deployments

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for complete setup instructions.

## 📌 Notes

- Currently uses **mock data** for listings - database integration coming next
- All images use Unsplash and Pravatar for demo purposes
- ✅ **Authentication is fully implemented** with Supabase
- Form submissions show alerts (will be replaced with API calls)

## 🎯 Next Steps

- ✅ ~~Implement authentication~~ (COMPLETED)
- Connect listings to Supabase database
- Add real image upload functionality
- Connect contact forms to messaging system
- Add search indexing
- Implement user verification badges

## 📄 License

Built for UW-Madison students.
