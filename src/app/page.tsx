"use client";
import Image from "next/image";
import Link from "next/link";
import { HexagonIcon, BarChart3Icon, ZapIcon, Layers3Icon } from "lucide-react";
import { Web3Status } from "./components/Dialog/Web3Status";
import {
  ReflectionsSection,
  NftTierSection,
  TokenomicsSection,
  RewardsDashboardSection,
  FutureExpansionsSection,
  BonusTimingSection,
} from "./components/YumiSections";

export default function Home() {
  return (
    <div className="min-h-screen text-white mt-20">
      {/* Main Grid Layout */}
      <main className="max-w-screen-3xl mx-auto p-4">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Top Left - YUMI */}
          <div className="border border-[#00ff9d]/30 bg-[#0a0a1a] p-6 rounded-lg shadow-[0_0_15px_rgba(0,255,157,0.2)]">
            <h2 className="text-4xl font-bold mb-4">YUMI MINT</h2>
            <div className="w-16 h-1 bg-[#00ff9d] mb-4"></div>
            <p className="text-sm text-gray-400 mb-6">
              Exclusive collection of 4,000 unique digital collectibles. A
              reimagined with YUMI&apos;s signature aesthetic. Join the YUMI
              community today!
            </p>
            <Link href="/dashboard">
              <button className="bg-[#9333ea] text-white px-6 py-2 rounded-md text-sm hover:bg-[#9333ea]/90">
                MINT NOW
              </button>
            </Link>
          </div>

          {/* Top Center - Main Logo */}
          <div className="border border-[#00ff9d]/30 bg-[#0a0a1a] p-6 rounded-lg col-span-1 md:col-span-1 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(0,255,157,0.2)] relative">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] opacity-10 bg-center"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-32 h-32 relative mb-4">
                <div className="absolute inset-0 bg-[#9333ea]/20 rounded-xl"></div>
                <div className="absolute inset-2 border-2 border-[#9333ea] rounded-xl flex items-center justify-center">
                  <div className="text-5xl font-bold text-white">Y</div>
                </div>
                <div className="absolute inset-0 border-2 border-[#00ff9d] rounded-xl"></div>
              </div>
              <h2 className="text-xl font-bold mt-4">YUMI MINT NFTs</h2>
              <p className="text-sm text-center text-gray-400 mt-2">
                A collection of 4,000 NFTs featuring unique designs. Each piece
                captures the essence of YUMI&apos;s vision for the future of
                digital collectibles.
              </p>
            </div>
          </div>

          {/* Top Right - Profile */}
          <div className="border border-[#00ff9d]/30 bg-[#0a0a1a] p-6 rounded-lg shadow-[0_0_15px_rgba(0,255,157,0.2)]">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#9333ea] rounded-full mb-2 flex items-center justify-center">
                <span className="text-white text-xl">Y</span>
              </div>
              <h3 className="text-sm font-bold">YUMI COLLECTION</h3>
              <p className="text-xs text-gray-400 mb-4">
                TOTAL SUPPLY: 4,000 NFTs
              </p>
              <button className="w-full bg-[#9333ea] text-white py-2 rounded-md text-sm hover:bg-[#9333ea]/90 mb-2">
                VIEW GALLERY
              </button>
            </div>
            <div className="mt-4">
              <Image
                src="/placeholder.svg?height=150&width=250"
                alt="YUMI NFT Preview"
                width={250}
                height={150}
                className="rounded-md w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Featured Video Section */}
        <div className="border border-[#00ff9d]/30 bg-[#0a0a1a] p-6 rounded-lg mb-8 shadow-[0_0_15px_rgba(0,255,157,0.2)]">
          <h2 className="text-2xl font-bold text-[#00ff9d] mb-4 text-center">
            YUMI Experience
          </h2>
          <div className="w-full max-w-4xl mx-auto aspect-video relative overflow-hidden rounded-lg border-2 border-[#9333ea]">
            <video
              src="/Yumi.mp4"
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              playsInline
              loop
            >
              Your browser does not support the video tag.
            </video>
            {/* Overlay instructions for enabling sound */}
            <div
              id="videoOverlay"
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end p-4 text-center"
            >
              <p className="text-white font-medium mb-2">
                Click to play video with sound
              </p>
              <button
                className="bg-[#9333ea] text-white px-4 py-2 rounded-md text-sm mb-4 hover:bg-[#a855f7]"
                onClick={(e) => {
                  const video = e.currentTarget.parentElement
                    ?.previousElementSibling as HTMLVideoElement;
                  const overlay = document.getElementById("videoOverlay");
                  if (video) {
                    video.muted = false;
                    video.play();
                    if (overlay) {
                      overlay.style.display = "none";
                    }
                  }
                }}
              >
                Enable Sound
              </button>
            </div>
          </div>
        </div>

        {/* Info Sections */}
        <ReflectionsSection />
        <NftTierSection />
        <TokenomicsSection />
        <RewardsDashboardSection />
        <FutureExpansionsSection />
        <BonusTimingSection />

        {/* Bottom Section - Features */}
        <div className="border border-[#00ff9d]/30 bg-[#0a0a1a] p-6 rounded-lg col-span-1 md:col-span-3 shadow-[0_0_15px_rgba(0,255,157,0.2)] mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#0a0a1a] border border-[#9333ea] rounded-lg flex items-center justify-center mb-4">
                <HexagonIcon className="w-6 h-6 text-[#9333ea]" />
              </div>
              <h3 className="text-lg font-bold mb-2">UNIQUE DESIGNS</h3>
              <p className="text-xs text-gray-400">
                125 unique NFT designs with varying traits and rarity levels.
                Each piece is crafted with attention to detail and artistic
                excellence.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#0a0a1a] border border-[#9333ea] rounded-lg flex items-center justify-center mb-4">
                <BarChart3Icon className="w-6 h-6 text-[#9333ea]" />
              </div>
              <h3 className="text-lg font-bold mb-2">BUNDLE SAVINGS</h3>
              <p className="text-xs text-gray-400">
                Save more when you mint multiple NFTs. Get 2 NFTs for $70 or
                maximize your value with 5 NFTs for only $90.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#0a0a1a] border border-[#9333ea] rounded-lg flex items-center justify-center mb-4">
                <Layers3Icon className="w-6 h-6 text-[#9333ea]" />
              </div>
              <h3 className="text-lg font-bold mb-2">COMMUNITY PERKS</h3>
              <p className="text-xs text-gray-400">
                Join an exclusive community of collectors and gain access to
                future drops, special events, and unique opportunities within
                the YUMI ecosystem.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
