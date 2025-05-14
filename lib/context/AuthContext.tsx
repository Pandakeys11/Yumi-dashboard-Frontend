"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ADMIN_PASSWORD, ADMIN_WALLET_ADDRESS } from "../utils/constant";

interface AuthContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { address } = useAccount();

  useEffect(() => {
    const storedAuth = localStorage.getItem("yumiAdminAuth");
    const isAdminWallet =
      address?.toLowerCase() === ADMIN_WALLET_ADDRESS.toLowerCase();

    if (storedAuth === "true" && isAdminWallet) {
      setIsAdmin(true);
    } else if (!isAdminWallet && isAdmin) {
      logout();
    }
  }, [address]); // Re-run when address changes

  const login = (password: string): boolean => {
    const isAdminWallet =
      address?.toLowerCase() === ADMIN_WALLET_ADDRESS.toLowerCase();

    if (password === ADMIN_PASSWORD && isAdminWallet) {
      setIsAdmin(true);
      localStorage.setItem("yumiAdminAuth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("yumiAdminAuth");
  };

  const value = {
    isAdmin,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
