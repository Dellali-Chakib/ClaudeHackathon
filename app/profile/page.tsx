"use client";

import Image from "next/image";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "Sarah Chen",
    email: "sarah.chen@wisc.edu",
    phone: "(608) 555-0123",
    avatar: "https://i.pravatar.cc/150?img=1",
    verified: true,
    memberSince: "2024-01-15",
    bio: "Graduate student in Computer Science. Looking to sublet my apartment during summer internships.",
    listingsCount: 3,
    totalViews: 156,
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">My Profile</h1>

        <Card className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                {user.verified && (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                )}
              </div>
              <p className="text-slate-600 mb-2">{user.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>{user.phone}</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Member since {new Date(user.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">My Listings</h3>
            <p className="text-3xl font-bold text-uw-red">{user.listingsCount}</p>
            <p className="text-sm text-slate-600 mt-1">Active listings</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Total Views</h3>
            <p className="text-3xl font-bold text-uw-red">{user.totalViews}</p>
            <p className="text-sm text-slate-600 mt-1">Across all listings</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

