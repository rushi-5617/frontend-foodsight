import { ProductResponse } from "@/types/product";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface ScanOptions {
  file?: File;
  code?: string;
}

export async function scanProduct({ file, code }: ScanOptions): Promise<ProductResponse> {
  if (!file && !code) throw new Error("Either file or code must be provided");

  const formData = new FormData();
  if (file) formData.append("file", file);
  if (code) formData.append("barcode", code);

  const token = localStorage.getItem("jwt");

  const res = await fetch(`${BACKEND_URL}/foodsight/scan`, {
    method: "POST",
    body: formData,
    credentials: "include",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message === "No barcode found in image") {
      throw new Error("NO_BARCODE");
    } else if (data.message === "Product not found in OFF API") {
      throw new Error("PRODUCT_NOT_FOUND");
    } else {
      throw new Error(data.message || "Scan failed");
    }
  }

  return data.body as ProductResponse;
}
