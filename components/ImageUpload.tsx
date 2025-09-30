"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { X, Upload } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
}

export default function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="w-full">
      {value ? (
        <div className="relative group">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
            <Image
              src={value}
              alt="Upload"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              onRemove?.();
              onChange("");
            }}
            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res: any) => {
            if (res?.[0]?.url) {
              onChange(res[0].url);
            }
            setIsUploading(false);
          }}
          onUploadError={(error: Error) => {
            console.error("Upload error:", error);
            setIsUploading(false);
          }}
          onUploadBegin={() => {
            setIsUploading(true);
          }}
          appearance={{
            container: "border-2 border-dashed border-black/20 dark:border-white/20 rounded-lg p-8 bg-black/5 dark:bg-white/5",
            uploadIcon: "text-primary",
            label: "text-sm text-foreground",
            allowedContent: "text-xs text-foreground/60",
            button: "bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors",
          }}
          content={{
            label: isUploading ? "Uploading..." : "Click or drag image to upload",
            allowedContent: "Image (4MB max)",
            button({ ready }: { ready: boolean }) {
              if (ready) return <div className="flex items-center gap-2"><Upload className="h-4 w-4" /> Choose File</div>;
              return "Getting ready...";
            },
          }}
        />
      )}
    </div>
  );
}