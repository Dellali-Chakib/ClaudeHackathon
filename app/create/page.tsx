"use client";

import { useRouter } from "next/navigation";
import CreateListingForm from "@/components/CreateListingForm";

export default function CreateListingPage() {
  const router = useRouter();

  const handleSubmit = (formData: any) => {
    // Mock: In real app, this would save to backend
    console.log("Creating listing:", formData);
    alert("Listing created successfully! (This is a demo)");
    router.push("/my-listings");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Create New Listing</h1>
        <CreateListingForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

