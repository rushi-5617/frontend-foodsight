import Image from "next/image";
import { ProductResponse } from "@/types/product";
import SummaryCard from "@/components/SummaryCard";

interface Props {
  product: ProductResponse;
}

export default function BasicInfoCard({ product }: Props) {
  return (
    <div className="bg-background px-4 md:px-20 py-10 flex flex-col gap-6">

      <div className="flex flex-row items-start gap-4 md:gap-40">
        <div className="flex-shrink-0">
          <Image
            src={product.imageUrl}
            alt={product.productName}
            width={250}
            height={0}
            style={{ height: "auto" }}
            className="object-contain w-40 md:w-[250px]"
          />
        </div>

        <div className="flex flex-col gap-4 md:gap-10">
          <div className="flex flex-col text-foreground tracking-wider leading-relaxed font-extralight">
            <b className="text-lg md:text-2xl mb-2">{product.productName}</b>
            <p>{product.productCompany}</p>
            <p>BarCode: {product.id}</p>
            <p>{product.quantity}</p>
            <p>{product.calories}</p>
          </div>

          <div className="hidden md:block flex-row md:flex-col flex-wrap gap-4">
            <SummaryCard product={product} />
          </div>
        </div>

      </div>

      <div className="block md:hidden flex-row md:flex-col flex-wrap gap-4">
        <SummaryCard product={product} />
      </div>

    </div>
  );
}
