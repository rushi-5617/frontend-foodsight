"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchCurrentUser } from "@/services/user";
import { User } from "@/types/user";

type UserContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const refreshUser = async () => {
    const u = await fetchCurrentUser();
    setUser(u);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
