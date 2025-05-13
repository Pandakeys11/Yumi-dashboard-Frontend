"use client";

import { useAccount } from "wagmi";
import { useAuth } from "../lib/context/AuthContext";
import AdminLogin from "../components/Admin/AdminLogin";
import { ADMIN_WALLET_ADDRESS } from "../lib/utils/constant";
import Link from "next/link";
import AdminPanel from "../components/IntegrationComponent/AdminPanel";

export default function AdminDashboard() {
  const { isConnected, address } = useAccount();
  const { isAdmin, logout } = useAuth();

  const isAdminWallet =
    address?.toLowerCase() === ADMIN_WALLET_ADDRESS.toLowerCase();

  if (!isAdminWallet) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-black">
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-800 max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-main mb-6 text-center">
            Unauthorized Access
          </h2>
          <p className="text-gray-300 text-center mb-6">
            This wallet does not have admin privileges. Please connect with an
            admin wallet to continue.
          </p>
          <div className="flex justify-center">
            <Link
              href="/dashboard"
              className="bg-yellow-main hover:bg-yellow-light text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLogin />;
  }

  return (
    <div className="bg-black text-white py-10 px-4 sm:px-6 lg:px-8 min-h-screen mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-main">
            Admin Dashboard
          </h1>
          <button
            onClick={logout}
            className="bg-red-main hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <AdminPanel />
        </div>
      </div>
    </div>
  );
}
