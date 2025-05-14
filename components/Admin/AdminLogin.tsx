"use client";

import React, { useState } from "react";
import { useAuth } from "@/app/lib/context/AuthContext";
import { useAccount } from "wagmi";
import { ADMIN_WALLET_ADDRESS } from "@/app/lib/utils/constant";
import Link from "next/link";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { address } = useAccount();

  const isAdminWallet =
    address?.toLowerCase() === ADMIN_WALLET_ADDRESS.toLowerCase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(password);
    if (!success) {
      setError("Invalid password. Please try again.");
      setPassword("");
    }
  };

  if (!isAdminWallet) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#0a0a1a]">
        <div className="yumi-card p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-[#ef4444] mb-6 text-center">
            Unauthorized Access
          </h2>
          <p className="text-gray-300 text-center mb-6">
            This wallet does not have admin privileges. Please connect with an
            admin wallet to continue.
          </p>
          <div className="flex justify-center">
            <Link href="/dashboard" className="yumi-button">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#0a0a1a]">
      <div className="yumi-card p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-[#00ff9d] mb-6 text-center">
          YUMI Admin Access
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="yumi-input w-full"
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && <p className="text-[#ef4444] text-sm mt-2">{error}</p>}

          <button type="submit" className="yumi-button w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
