export interface Ingredient {
  ingredient: string;
  percentage: number;
}

export interface Nutrient {
  nutrient: string;
  quantity: number;
  unit: string;
}

export interface ProductResponse {
  imageUrl: string;
  productName: string;
  productCompany: string;
  id: string;
  quantity: string;
  calories: string;

  summary: string;
  healthRating: string;
  nutriScore: string;
  novaGroup: string;

  mainConcerns: string[];
  chemicalAdditives: Record<string, string>;
  uniqueInsights: string[];
  environmentImpact: string;

  ingredients: Ingredient[];

  nutrients: Nutrient[];
}
