import { Nutrient } from "@/types/product";

interface Props {
  nutrients: Nutrient[];
}

export default function NutrientsList({ nutrients }: Props) {
  if (!nutrients?.length) return null;

  return (
    <div className="bg-foreground text-background px-4 md:px-20 py-10 tracking-wider leading-relaxed">
      <h3 className="text-xl mb-4"><b>Nutritional Info</b></h3>
      <table className="w-full text-left">
        <thead className="bg-muted">
          <tr>
            <th className="border border-background px-4 py-2 w-4/5">Nutrient</th>
            <th className="border border-background px-4 py-2 text-right">Value (Per 100g/ml)</th>
          </tr>
        </thead>
        <tbody>
          {nutrients.map((n, i) => (
            <tr key={i} className="hover:bg-muted/30 text-sm">
              <td className="border border-background px-4 py-2">{n.nutrient}</td>
              <td className="border border-background px-4 py-2 text-right">
                {n.quantity} {n.unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
