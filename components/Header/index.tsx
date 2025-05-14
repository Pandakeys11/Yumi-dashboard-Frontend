import React from "react";
import { Web3Status } from "../Dialog/Web3Status";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/lib/context/AuthContext";
//
export const Header = () => {
  const { isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm">
      <nav className="flex items-center justify-between max-w-7xl mx-auto p-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            {/* <Image
              src="/logo.png"
              width={40}
              height={40}
              alt="YUMI Logo"
              className="w-10 h-10"
            /> */}
            {/* <span className="text-white font-bold text-xl">YUMI</span> */}
          </Link>

          <div className="hidden md:flex space-x-6 ml-10">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-white transition"
            >
              Dashboard
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="text-yellow-main hover:text-yellow-light transition"
              >
                Admin
              </Link>
            )}
          </div>
        </div>

        <Web3Status />
      </nav>
    </header>
  );
};
