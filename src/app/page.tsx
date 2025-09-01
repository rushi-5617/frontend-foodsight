"use client";

import { useState, useRef, useEffect } from "react";
import { ProductResponse } from "@/types/product";
import ProductPage from "@/components/ProductPage";
import UploadBarcode from "@/components/UploadBarcode";
import BarcodeScanner from "@/components/BarcodeScanner";
import DarkVeil from "@/blocks/Backgrounds/DarkVeil/DarkVeil";
import UserMenu from "@/components/UserMenu";
import BrandLogo from "@/components/BrandLogo";

import NoBarcode from "@/components/NoBarcode";
import NoProduct from "@/components/NoProduct";


export default function Page() {
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const productRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product && productRef.current) {
      productRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setError(null);
    }
  }, [product]);

  useEffect(() => {
    if ((error === "No barcode found in image" || error === "Product not found in OFF API") && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [error]);

  useEffect(() => {
    if (!error) return;

    if (error === "No barcode found in image" || error === "Product not found in OFF API") {
      return;
    }

    const timer = setTimeout(() => setError(null), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="overflow-x-clip h-[100dvh] bg-background">
      {!loaded && (
        <div className="fixed inset-0 z-50 bg-background flex items-center justify-center"></div>
      )}

      <div className="w-screen relative">
        <DarkVeil
          speed={0.5}
          hueShift={75}
          noiseIntensity={0.05}
          scanlineFrequency={3}
          scanlineIntensity={0.25}
          warpAmount={4.5}
        />
      </div>

      <BrandLogo />

      <UserMenu onSelectProduct={setProduct} currentProductId={product ? Number(product.id) : null} />

      <div className="absolute inset-0 flex flex-col justify-center z-10 gap-6 -top-16 md:top-0 lg:gap-20 ml-4 lg:ml-20">
        <h1 className="text-5xl lg:text-7xl leading-tight text-foreground w-3/4">
          FoodSight – Scan & Get
          <span className="text-background lg:text-foreground"> Insights</span>
        </h1>

        <div className="relative flex gap-4">
          <BarcodeScanner
            onProductScanned={(p) => setProduct(p)}
            onError={(msg) => setError(msg)}
          />
          <UploadBarcode
            onProductScanned={(p) => setProduct(p)}
            onError={(msg) => setError(msg)}
          />
          {error &&
            error !== "No barcode found in image" &&
            error !== "Product not found in OFF API" && (
              <p className="absolute top-full mt-2 left-0 text-red-500 text-sm z-10">
                {error}
              </p>
          )}

        </div>
      </div>

      <div className="absolute bottom-8 lg:bottom-0 w-full h-1/2 bg-foreground">
        <p className="block lg:hidden mt-40 tracking-wider leading-relaxed ml-4 mr-4">
          <b>FoodSight</b> lets you scan a product’s barcode with your camera or upload an image
          to instantly view ingredients, nutrition, allergen and additives—helping you
          make smarter, healthier choices.
        </p>
        <p className="hidden lg:block mt-32 lg:w-3/5 tracking-wider leading-relaxed ml-20 mr-4">
          <b>FoodSight</b> lets you effortlessly scan a food product’s barcode—either live
          through your camera or by uploading an image—to instantly access detailed
          information. From ingredients and nutritional values to potential allergens
          and additives, the app provides clear insights to help you make smarter,
          healthier choices.
        </p>
      </div>

      {product && (
        <div ref={productRef} className="relative top-60 md:top-80 lg:top-96">
          <ProductPage product={product} />
        </div>
      )}

      {error === "No barcode found in image" && (
        <div className="relative top-60 md:top-80 lg:top-96" ref={errorRef}>
          <NoBarcode />
        </div>
      )}

      {error === "Product not found in OFF API" && (
        <div className="relative top-60  md:top-80 lg:top-96" ref={errorRef}>
          <NoProduct />
        </div>
      )}

    </main>
  );
}
