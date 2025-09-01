"use client";

import { useEffect, useState } from "react";
import { fetchCurrentUser, logoutUser } from "@/services/user";
import { User } from "@/types/user";
import { ProductResponse } from "@/types/product";
import Image from "next/image";
import UserProductHistory from "./UserProductHistory";
import { Mail, LogOut } from "lucide-react";

type UserMenuProps = {
  onSelectProduct: (product: ProductResponse) => void;
  currentProductId?: number | null;
  onLogout?: () => void;
  disabled?: boolean;
};

export default function UserMenu({ onSelectProduct, currentProductId, onLogout, disabled }: UserMenuProps) {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchCurrentUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setOpen(false);
    localStorage.removeItem("jwt");
    onLogout?.();
  };

  if (!user) {
    return (
      <div className="fixed top-6 right-4 md:top-8 md:right-20 z-20">
        <a
          href="/login"
          className={`text-foreground tracking-wider transition-all duration-300 hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]
            ${disabled ? "pointer-events-none cursor-not-allowed" : ""}`}
        >
          Login
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-6 right-4 z-20 md:right-20">
        <button
          onClick={() => setOpen(true)}
          className="w-8 h-8 rounded-full overflow-hidden"
        >
          {user.picture ? (
            <Image
              src={user.picture}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded-full" />
          )}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-30 flex transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="fixed inset-0 bg-black/25 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />

        <div
          className={`relative ml-auto sm:max-w-40 min-w-60 md:min-w-80 lg:min-w-100 h-full bg-background text-foreground flex flex-col
            transform transition-transform duration-300 ease-out
            ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col items-start w-full px-4 tracking-wider leading-relaxed font-light mt-4">
            <div
              className="flex items-center cursor-pointer space-x-4 p-2 hover:bg-gray-700 rounded transition w-full"
              onClick={() => setShowUserDetails(!showUserDetails)}
            >
              {user.picture && (
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                  unoptimized
                />
              )}
              <span className="font-normal">{user.name}</span>
            </div>

            <div
              className={`flex flex-col w-full space-y-4 overflow-hidden transition-all duration-300 ease-out
                ${showUserDetails ? "max-h-40 opacity-100 mt-6" : "max-h-0 opacity-0"}`}
            >
              <div className="flex items-center space-x-2 text-foreground w-full text-sm ml-2">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-foreground w-full text-sm px-2 py-1 rounded hover:bg-red-500 hover:text-background transition-all duration-300 ease-out"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          <hr className="my-4 mx-5 border-1 border-gray-500" />

          <div className="flex-1 overflow-y-auto tracking-wider leading-relaxed font-light ml-6 relative -left-2">
            <h2 className="mb-2 ml-2 text-gray-300 font-normal">Products</h2>
            <UserProductHistory
              onSelectProduct={onSelectProduct}
              currentProductId={currentProductId}
              open={open}
            />
          </div>
        </div>
      </div>
    </>
  );
}
