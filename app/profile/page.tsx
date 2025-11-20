"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/AuthContext";
import { getUserListings } from "@/lib/dataService";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

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

  // Get user's listings for statistics
  const userListings = getUserListings(user.id);
  const listingsCount = userListings.length;
  const totalViews = userListings.reduce((sum, listing) => sum + (listing.viewCount || 0), 0);

  // Get user info from auth
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'UW Student';
  const userEmail = user.email || '';
  const userAvatar = user.user_metadata?.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`;
  const memberSince = new Date(user.created_at).toISOString();
  const userBio = user.user_metadata?.bio || '';
  const isVerified = true; // All authenticated users are verified

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">My Profile</h1>

        <Card className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image
                src={userAvatar}
                alt={userName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-2xl font-bold">{userName}</h2>
                {isVerified && (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                )}
              </div>
              {userBio && (
                <p className="text-slate-600 mb-2">{userBio}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{userEmail}</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Member since {new Date(memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">My Listings</h3>
            <p className="text-3xl font-bold text-uw-red">{listingsCount}</p>
            <p className="text-sm text-slate-600 mt-1">Total listings</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Total Views</h3>
            <p className="text-3xl font-bold text-uw-red">{totalViews}</p>
            <p className="text-sm text-slate-600 mt-1">Across all listings</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

