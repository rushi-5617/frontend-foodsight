"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, Result } from "@zxing/library";
import { ProductResponse } from "@/types/product";
import { scanProduct } from "@/services/product";

interface Props {
  onProductScanned: (product: ProductResponse) => void;
  onError?: (message: string | null) => void;
}

export default function BarcodeScanner({ onProductScanned, onError }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!loading) return setDots("");
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (!scanning || typeof window === "undefined") return;

    const codeReader = new BrowserMultiFormatReader();
    let stream: MediaStream | null = null;

    const startScanning = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
        });

        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        codeReader.decodeFromVideoDevice(
          null,
          videoRef.current!,
          async (result: Result | undefined) => {
            if (result) {
              const code = result.getText()?.trim();
              if (code) {
                setScanning(false);
                codeReader.reset();
                stream?.getTracks().forEach((track) => track.stop());

                setLoading(true);
                try {
                  const product = await scanProduct({ code });
                  onProductScanned(product);
                } finally {
                  setLoading(false);
                }
              }
            }
          }
        );
      } catch {
        setScanning(false);
      }
    };

    startScanning();

    return () => {
      codeReader.reset();
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [scanning, onProductScanned]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && !videoRef.current.contains(e.target as Node)) {
      setScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
        <label
          className={`flex items-center text-sm cursor-pointer bg-background text-foreground px-4 py-1 tracking-wider font-light h-10 hover:bg-gray-800 duration-300 ${loading ? "w-[112.5px] animate-shadowColor" : ""}`}
        >
          {loading ? `Scanning${dots}` : "Scan Live"}
          {!loading && (
            <input
              type="button"
                onClick={() => {
                  onError?.(null);
                  setScanning(true);
                }}
              className="hidden"
            />
          )}
        </label>

      {scanning && (
        <div
          ref={overlayRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/25 flex justify-center items-start z-[9999] p-4"
        >
          <div className="relative w-full md:w-2/3 lg:w-1/3 flex justify-center">
            <video
              ref={videoRef}
              className="w-full h-auto max-h-full mt-8 rounded-xl shadow-xl"
              autoPlay
              muted
              playsInline
            />
          </div>
        </div>
      )}
    </div>
  );
}
