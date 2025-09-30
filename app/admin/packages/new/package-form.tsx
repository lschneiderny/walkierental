"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPackage } from "../actions";
import ImageUpload from "@/components/ImageUpload";
import ItemsPicker from "./items-picker";
import { ArrowLeft, Save, Package, DollarSign, FileText } from "lucide-react";
import Link from "next/link";

interface PackageFormProps {
  rentals: Array<{ id: string; name: string }>;
}

export default function PackageForm({ rentals }: PackageFormProps) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      if (imageUrl) {
        formData.set("imageUrl", imageUrl);
      }
      await createPackage(formData);
      router.push("/admin/packages");
    } catch (error) {
      console.error("Failed to create package:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/packages"
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Packages
        </Link>
        <h1 className="text-3xl font-bold">Create New Package</h1>
        <p className="text-foreground/60 mt-2">Bundle rental products together for special pricing</p>
      </div>

      <form action={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Package Details</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Package Name *</label>
              <input 
                name="name" 
                required 
                placeholder="e.g., Professional Event Package"
                className="w-full border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL Slug *</label>
              <input 
                name="slug" 
                required 
                placeholder="e.g., professional-event-package"
                pattern="[a-z0-9-]+"
                className="w-full border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm" 
              />
              <p className="text-xs text-foreground/60 mt-1">Lowercase letters, numbers, and hyphens only</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea 
              name="description" 
              rows={4}
              placeholder="Describe what's included and who this package is ideal for..."
              className="w-full border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none" 
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Package Pricing</h2>
          </div>
          
          <div className="max-w-md">
            <label className="block text-sm font-medium mb-2">Daily Rate *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60">$</span>
              <input 
                type="number" 
                step="0.01" 
                name="dailyRate" 
                required 
                min={0}
                placeholder="0.00"
                className="w-full pl-8 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
              />
            </div>
            <p className="text-xs text-foreground/60 mt-1">Total daily rental rate for the entire package</p>
          </div>
        </div>

        {/* Package Items */}
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Package Contents</h2>
          </div>
          <ItemsPicker rentals={rentals} />
        </div>

        {/* Package Image */}
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-semibold">Package Image</h2>
          <ImageUpload value={imageUrl} onChange={setImageUrl} />
          <input type="hidden" name="imageUrl" value={imageUrl} />
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-black/10 dark:border-white/10">
          <Link
            href="/admin/packages"
            className="px-6 py-2.5 border border-black/10 dark:border-white/10 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Cancel
          </Link>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Creating..." : "Create Package"}
          </button>
        </div>
      </form>
    </div>
  );
}