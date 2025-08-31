import { ProductResponse } from "@/types/product";

interface Props {
  product: ProductResponse;
}

export default function ExtraInfoCard({ product }: Props) {
  return (
    <div className="bg-gray-200 text-background px-4 md:px-20 py-10 tracking-wider leading-relaxed flex flex-col items-start">

      <div className="mb-4 bg-orange-700 text-yellow-100 p-4 font-extralight w-5/6 md:w-1/3 flex flex-col ml-auto">
        <h3 className="mb-2 text-lg"><b>Main Concerns</b></h3>
        <ul className="list-disc list-inside">
          {product.mainConcerns.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4 w-5/6 md:w-1/2 font-light">
        <h3 className="mb-2 font-bold text-lg"><b>Chemical Additives</b></h3>
        <ul className="list-disc list-inside flex flex-wrap gap-2 flex-col">
          {Object.entries(product.chemicalAdditives).map(([key, value], i) => (
            <li
              key={i}
              className="bg-yellow-500 text-red-900 inline-block px-2 py-1"
            >
              {key}: {value}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4 bg-background text-foreground p-4 font-extralight w-5/6 md:w-1/3 flex flex-col ml-auto">
        <h3 className="mb-2 text-lg"><b>Key Findings</b></h3>
        <ul className="list-disc list-inside">
          {product.uniqueInsights.map((insight, i) => (
            <li key={i}>{insight}</li>
          ))}
        </ul>
      </div>

      <div className="bg-green-700 text-green-100 p-4 font-extralight w-5/6 md:w-1/2">
        <h3 className="mb-2 text-lg"><b>Environmental Impact</b></h3>
        <p>{product.environmentImpact}</p>

      </div>
    </div>
  );
}
