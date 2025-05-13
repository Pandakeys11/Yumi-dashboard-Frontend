"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ToastProvider } from "@/app/components/Toast/ToastProvider";
import { DialogProvider } from "./components/Dialog/dialog";
import { wagmiConfig, queryClient } from "./lib/utils/wagmiConfig";
import { AuthProvider } from "./lib/context/AuthContext";
//
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastProvider>
            <DialogProvider>{children}</DialogProvider>
          </ToastProvider>
        </AuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
