"use client";

import React from "react";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";
import { useAuth } from "../lib/context/AuthContext";
import Link from "next/link";
import { DialogType, useDialog } from "../components/Dialog/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import NFTInfo from "../components/IntegrationComponent/NFTInfo";
import MintNFT from "../components/IntegrationComponent/MintNFT";
import UserNFTs from "../components/IntegrationComponent/UserNFT";
import { ButtonPrimary } from "../components/Button";

export default function UserDashboard() {
  const { isConnected } = useAccount();
  const { open, setOpen } = useDialog(DialogType.Connector);
  const { isAdmin } = useAuth();

  if (!isConnected) {
    return (
      <div className="bg-black text-white py-10 px-4 sm:px-6 lg:px-8 min-h-screen mt-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-yellow-main mb-12 text-center">
            YUMI NFT Dashboard
          </h1>
          <p className="text-gray-300 text-center mb-6">
            Please connect your wallet to continue.
          </p>
          <div className="flex justify-center">
            <ButtonPrimary
              size="regular"
              onClick={() => setOpen(true)}
              className="bg-yellow-main hover:bg-yellow-light text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              Connect Wallet
            </ButtonPrimary>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white py-10 px-4 sm:px-6 lg:px-8 min-h-screen mt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-main mb-12 text-center">
          YUMI NFT Dashboard
        </h1>

        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-200 pb-2 border-b border-gray-800">
              User Dashboard
            </h2>
            {isAdmin && (
              <Link
                href="/admin"
                className="bg-yellow-main hover:bg-yellow-light text-gray-900 px-4 py-2 rounded-lg transition font-semibold"
              >
                Go to Admin Panel
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 gap-8">
            <NFTInfo />
            <MintNFT />
            <UserNFTs />
          </div>
        </div>
      </div>
    </div>
  );
}
