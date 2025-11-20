"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/AuthContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const isLoggedIn = !!user;

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    await signOut();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🦡</span>
            <span className="text-xl font-bold text-uw-red">BadgerSpace</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/browse"
              className="text-slate-700 hover:text-uw-red transition-colors"
            >
              Browse Listings
            </Link>
            <Link
              href="/create"
              className="text-slate-700 hover:text-uw-red transition-colors"
            >
              Post Your Space
            </Link>
            <Link
              href="/my-listings"
              className="text-slate-700 hover:text-uw-red transition-colors"
            >
              My Listings
            </Link>

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 rounded-full p-2 hover:bg-slate-100 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-uw-red flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg border border-slate-200 py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/my-listings"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Listings
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/browse"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Listings
            </Link>
            <Link
              href="/create"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Post Your Space
            </Link>
            <Link
              href="/my-listings"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Listings
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
                  onClick={handleSignOut}
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

