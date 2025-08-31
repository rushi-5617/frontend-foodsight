"use client";

import { useState, useEffect } from "react";
import { scanProduct } from "@/services/product";
import { ProductResponse } from "@/types/product";

interface Props {
  onProductScanned: (product: ProductResponse) => void;
  onError?: (message: string | null) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp"
];

export default function UploadBarcode({ onProductScanned, onError }: Props) {
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!loading) {
      setDots("");
      return;
    }

    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  const handleUploadFile = async (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      onError?.("Invalid file type. Only PNG, JPEG, WEBP are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      onError?.("File size exceeds 5MB limit.");
      return;
    }

    setLoading(true);
    try {
      const data = await scanProduct({ file });
      onProductScanned(data);
    } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.message === "NO_BARCODE") {
            onError?.("No barcode found in image");
          } else if (err.message === "PRODUCT_NOT_FOUND") {
            onError?.("Product not found in OFF API");
          } else {
            onError?.("Failed to scan product");
          }
        }

    } finally {
      setLoading(false);
    }

  };

  return (
    <label
      className={`flex items-center text-sm cursor-pointer border border-background text-background px-4 py-1 tracking-wider h-10 hover:bg-gray-100 duration-300 ${loading ? "w-[112.5px] animate-shadowColor" : ""}`}
    >
      {loading ? `Scanning${dots}` : "Upload Barcode"}
      <input
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        onClick={() => onError?.(null)}
        disabled={loading} 
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          handleUploadFile(file);
        }}
        className="hidden"
      />
    </label>
  );
}
