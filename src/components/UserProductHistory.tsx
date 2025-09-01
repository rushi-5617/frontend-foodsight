"use client";

import { useEffect, useState } from "react";
import { ProductResponse } from "@/types/product";
import { getUserHistory } from "@/services/historyService";

interface Props {
  onSelectProduct: (product: ProductResponse) => void;
  currentProductId?: number | null;
  open?: boolean;
}

export default function UserProductHistory({ onSelectProduct, open = false, currentProductId }: Props) {
  const [history, setHistory] = useState<ProductResponse[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (open) {
      getUserHistory().then(setHistory);
    }
  }, [open]);

  useEffect(() => {
    if (currentProductId !== undefined && currentProductId !== null) {
      setSelectedId(currentProductId);
    }
  }, [currentProductId]);

  const sortedHistory = [...history].sort((a, b) => Number(b.id) - Number(a.id));

  const handleSelect = (product: ProductResponse) => {
    setSelectedId(Number(product.id));
    onSelectProduct(product);
  };

  return (
    <ul className="space-y-2 pr-2">
      {sortedHistory.map((p) => (
        <li
          key={p.id}
          className={`cursor-pointer text-sm tracking-wider leading-relaxed text-foreground font-light px-2 py-1 rounded transition
            ${
              history.length > 1 && selectedId === Number(p.id)
                ? "bg-gray-800"
                : "hover:bg-gray-700"
            }`}
          onClick={() => handleSelect(p)}
        >
          {p.productName}
        </li>
      ))}
    </ul>
  );
}
