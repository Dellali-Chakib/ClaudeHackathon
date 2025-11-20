"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { SpaceType, ContactMethod } from "@/types";
import { Home, Package, Clock } from "lucide-react";

interface CreateListingFormProps {
  onSubmit: (data: any) => void;
}

export default function CreateListingForm({ onSubmit }: CreateListingFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    type: "" as SpaceType | "",
    description: "",
    startDate: "",
    endDate: "",
    price: "",
    location: "",
    amenities: [] as string[],
    images: [] as File[],
    contactMethod: "in_app" as ContactMethod,
    contactInfo: "",
  });

  const amenitiesList = [
    "parking",
    "laundry",
    "furnished",
    "pet-friendly",
    "wifi",
    "ac",
    "heating",
    "secure",
  ];

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 5);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files].slice(0, 5),
      }));
    }
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.title && formData.type && formData.description;
      case 2:
        return formData.startDate && formData.endDate && formData.price && formData.location;
      case 3:
        return true; // Optional step
      case 4:
        return formData.contactMethod === "in_app" || formData.contactInfo;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  s === step
                    ? "border-uw-red bg-uw-red text-white"
                    : s < step
                    ? "border-uw-red bg-uw-red text-white"
                    : "border-slate-300 text-slate-400"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
              {s < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    s < step ? "bg-uw-red" : "bg-slate-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>Basic Info</span>
          <span>Availability</span>
          <span>Details</span>
          <span>Contact</span>
        </div>
      </div>

      <Card className="p-8">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Basic Information</h2>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Spacious 1BR near Camp Randall"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Space Type</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "full_space", label: "Full Space", icon: Home },
                  { value: "storage", label: "Storage Only", icon: Package },
                  { value: "short_term", label: "Short-term Stay", icon: Clock },
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setFormData({ ...formData, type: value as SpaceType })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.type === value
                        ? "border-uw-red bg-uw-red/5"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Icon className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">{label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your space..."
                rows={6}
              />
            </div>
          </div>
        )}

        {/* Step 2: Availability & Price */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Availability & Pricing</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Start Date</label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">End Date</label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Monthly Price ($)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="600"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., 0.3 miles from campus"
              />
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Details</h2>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesList.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="rounded"
                    />
                    <span className="text-sm capitalize">{amenity.replace("-", " ")}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Images (Max 5)</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <p className="text-sm text-slate-600 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <Button variant="outline" type="button">
                    Choose Images
                  </Button>
                </label>
                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded overflow-hidden bg-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`Upload ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Contact Preferences */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contact Preferences</h2>
            
            <div>
              <label className="text-sm font-medium mb-2 block">How should people contact you?</label>
              <div className="space-y-3">
                {[
                  { value: "in_app", label: "In-app messaging (recommended)" },
                  { value: "email", label: "Email" },
                  { value: "phone", label: "Phone" },
                ].map(({ value, label }) => (
                  <label key={value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={value}
                      checked={formData.contactMethod === value}
                      onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value as ContactMethod, contactInfo: "" })}
                      className="text-uw-red"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {(formData.contactMethod === "email" || formData.contactMethod === "phone") && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {formData.contactMethod === "email" ? "Email Address" : "Phone Number"}
                </label>
                <Input
                  type={formData.contactMethod === "email" ? "email" : "tel"}
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  placeholder={formData.contactMethod === "email" ? "your.email@wisc.edu" : "(608) 123-4567"}
                />
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          {step < 4 ? (
            <Button onClick={handleNext} disabled={!isStepValid()}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!isStepValid()}>
              Publish Listing
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

