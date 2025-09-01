import { ProductResponse } from "@/types/product";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface UserProductDTO {
  id: number;
  productJson: ProductResponse;
}

export async function getUserHistory(): Promise<ProductResponse[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/foodsight/user/products`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch history");

    const data: { body: UserProductDTO[] } = await res.json();

    return (data.body ?? []).map((item) => item.productJson);
  } catch (err) {
    console.error("History fetch error:", err);
    return [];
  }
}
