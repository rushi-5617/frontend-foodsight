"use client";

import React from "react";
import Image from "next/image";

const BrandLogo: React.FC = () => {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed top-[27.5px] left-4 md:top-8 md:left-20 z-20 w-5 h-5 flex items-center cursor-pointer"
      onClick={scrollToTop}
    >
      <Image
        src="/logo.svg"
        alt="Brand Logo"
        width={50}
        height={50}
        className="w-full h-full object-contain"
        priority
      />
      <span className="text-gray-100 text-lg font-semibold font-anokha tracking-widest pl-2">
        FOODSIGHT
      </span>
    </div>
  );
};

export default BrandLogo;
