import { ProductResponse } from "@/types/product";
import BasicInfoCard from "@/components/BasicInfoCard";
import ExtraInfoCard from "@/components/ExtraInfoCard";
import IngredientsList from "@/components/IngredientsList";
import NutrientsList from "@/components/NutrientsList";

interface Props {
  product: ProductResponse;
}

export default function ProductPage({ product }: Props) {
  return (
    <div className="w-full">
      <BasicInfoCard product={product} />
      <ExtraInfoCard product={product} />
      <IngredientsList ingredients={product.ingredients} />
      <NutrientsList nutrients={product.nutrients} />
    </div>
  );
}
