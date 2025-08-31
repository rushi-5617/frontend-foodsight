"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function NoBarcode() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="flex items-center justify-center text-center p-4 bg-background gap-2 md:gap-4 min-h-[100px]">
      {!imgLoaded && (
        <p></p>
      )}

      <div className={imgLoaded ? "flex items-center justify-center gap-2 md:gap-4" : "hidden"}>
        <Image
          src="/noBarcode.png"
          alt="No barcode"
          width={75}
          height={50}
          onLoadingComplete={() => setImgLoaded(true)}
          priority={true}
        />
        <p className="text-foreground tracking-wider leading-relaxed text-sm">
          No Barcode detected in the image. Please try again.
        </p>
      </div>
    </div>
  );
}
