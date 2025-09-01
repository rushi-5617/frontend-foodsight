"use client";

import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import Squares from "@/blocks/Backgrounds/Squares/Squares";

export default function LoginPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div className="h-[100dvh] w-full bg-background flex items-center justify-center"></div>;
  }

  return (
    <div
      className={`flex items-center justify-center h-[100dvh] px-4 tracking-wider leading-relaxed transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute w-full h-full">
        <Squares
          direction="up"
          fillColor="#1E293B"
          speed={0.5} 
          squareSize={50}
          borderColor="#B4E50D"
        />
      </div>
  
      <div className="z-20 p-4 backdrop-blur-sm rounded-lg w-full md:w-1/3 lg:w-1/4 min-h-1/2 border border-gray-600 flex flex-col justify-center text-center">
        <h1 className="text-2xl mb-4 font-semibold text-gray-200">Welcome back!</h1>
        <p className="mb-20 text-gray-300">Sign in with Google to continue</p>
        <a
          href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/google`}
          className="flex items-center justify-center gap-2 py-2 bg-foreground text-gray-800 rounded-lg hover:bg-gray-200 transition border border-gray-600"
        >
          <FcGoogle size={24} />
          <span className="font-bold text-gray-800">Continue with Google</span>
        </a>
      </div>

    </div>
  );
}
