import { Ingredient } from "@/types/product";

interface Props {
  ingredients: Ingredient[];
}

export default function IngredientsList({ ingredients }: Props) {
  if (!ingredients?.length) return null;

  return (
    <div className="bg-background text-foreground px-4 md:px-20 py-10 tracking-wider leading-relaxed font-extralight">
      <h3 className="text-xl mb-4"><b>Ingredients</b></h3>
      <table className="w-full text-left">
        <thead className="bg-muted">
          <tr>
            <th className="border border-foreground px-4 py-2 font-normal w-4/5">Ingredient</th>
            <th className="border border-foreground px-4 py-2 text-right font-normal">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ing, i) => (
            <tr key={i} className="hover:bg-muted/30 text-sm">
              <td className="border border-foreground px-4 py-2 ">{ing.ingredient}</td>
              <td className="border border-foreground px-4 py-2 text-right">{ing.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
