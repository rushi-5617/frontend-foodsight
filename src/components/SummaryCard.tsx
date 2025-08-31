import { ProductResponse } from "@/types/product";

interface Props {
  product: ProductResponse;
}

export default function SummaryCard({ product }: Props) {
  return (
    <div className="text-foreground tracking-wider leading-relaxed font-extralight">
      <p className="md:w-2/3 mb-4">{product.summary}</p>
      <p>Health Rating: {product.healthRating}</p>
      <p>Nutri-Score: {product.nutriScore}</p>
      <p>NOVA Group: {product.novaGroup}</p>
    </div>
  );
}
