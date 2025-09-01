"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchCurrentUser, logoutUser } from "@/services/user";
import { User } from "@/types/user";

type UserContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const refreshUser = async () => {
    const u = await fetchCurrentUser();
    setUser(u);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem("jwt");
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      refreshUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
