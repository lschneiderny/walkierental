"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "../actions";
import ImageUpload from "@/components/ImageUpload";
import { ArrowLeft, Save, Package, DollarSign, Hash, Layers } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [productType, setProductType] = useState("RENTAL");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      if (imageUrl) {
        formData.set("imageUrl", imageUrl);
      }
      await createProduct(formData);
      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to create product:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold">Create New Product</h1>
        <p className="text-foreground/60 mt-2">Add a new rental product or accessory to your inventory</p>
      </div>

      <form action={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Basic Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name *</label>
              <input 
                name="name" 
                required 
                placeholder="e.g., Motorola T600 H2O"
                className="w-full border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL Slug *</label>
              <input 
                name="slug" 
                required 
                placeholder="e.g., motorola-t600-h2o"
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
              placeholder="Describe the product features, specifications, etc."
              className="w-full border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none" 
            />
          </div>
        </div>

        {/* Product Type & Inventory */}
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Product Type & Inventory</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Type *</label>
              <select 
                name="type" 
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="RENTAL">Rental Product</option>
                <option value="ACCESSORY">Accessory (For Sale)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">SKU</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                <input 
                  name="sku" 
                  placeholder="Optional"
                  className="w-full pl-10 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
              <input 
                type="number" 
                name="stock" 
                defaultValue={0} 
                min={0}
                required
                className="w-full border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Pricing</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={productType !== "RENTAL" ? "opacity-50" : ""}>
              <label className="block text-sm font-medium mb-2">
                Daily Rental Rate {productType === "RENTAL" && "*"}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60">$</span>
                <input 
                  type="number" 
                  step="0.01" 
                  name="dailyRate" 
                  min={0}
                  disabled={productType !== "RENTAL"}
                  required={productType === "RENTAL"}
                  placeholder="0.00"
                  className="w-full pl-8 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50" 
                />
              </div>
              <p className="text-xs text-foreground/60 mt-1">Price per day for rentals</p>
            </div>
            <div className={productType !== "ACCESSORY" ? "opacity-50" : ""}>
              <label className="block text-sm font-medium mb-2">
                Sale Price {productType === "ACCESSORY" && "*"}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60">$</span>
                <input 
                  type="number" 
                  step="0.01" 
                  name="price" 
                  min={0}
                  disabled={productType !== "ACCESSORY"}
                  required={productType === "ACCESSORY"}
                  placeholder="0.00"
                  className="w-full pl-8 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50" 
                />
              </div>
              <p className="text-xs text-foreground/60 mt-1">One-time purchase price</p>
            </div>
          </div>
        </div>

        {/* Product Image */}
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-semibold">Product Image</h2>
          <ImageUpload value={imageUrl} onChange={setImageUrl} />
          <input type="hidden" name="imageUrl" value={imageUrl} />
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-black/10 dark:border-white/10">
          <Link
            href="/admin/products"
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
            {isSubmitting ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
