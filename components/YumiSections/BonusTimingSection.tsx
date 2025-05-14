import { Section } from "./Section";
import { ClockIcon, RocketIcon, Plane } from "lucide-react";
import Link from "next/link";

export const BonusTimingSection = () => {
  return (
    <Section id="bonus-timing" title="BONUS + TIMING" titleNumber="BONUS">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#00ff9d]/30 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-[#9333ea]/20 rounded-full flex items-center justify-center mb-4">
            <RocketIcon className="w-6 h-6 text-[#9333ea]" />
          </div>
          <h3 className="text-white font-medium mb-2">NFT Airdrop</h3>
          <p className="text-gray-400 text-sm">
            NFT holders will be airdropped mainnet $YUMI tokens at Monad TGE
          </p>
        </div>

        <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#00ff9d]/30 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-[#9333ea]/20 rounded-full flex items-center justify-center mb-4">
            <ClockIcon className="w-6 h-6 text-[#9333ea]" />
          </div>
          <h3 className="text-white font-medium mb-2">Launch Timing</h3>
          <p className="text-gray-400 text-sm">
            Testnet & Mint go live after May 11th
          </p>
          <div className="mt-4 w-full bg-[#0a0a1a] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#00ff9d] h-full" style={{ width: "65%" }}></div>
          </div>
          <p className="text-xs text-white mt-2">Progress: 65%</p>
        </div>

        <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#00ff9d]/30 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-[#9333ea]/20 rounded-full flex items-center justify-center mb-4">
            <Plane className="w-6 h-6 text-[#9333ea]" />
          </div>
          <h3 className="text-white font-medium mb-2">Whitelist + Bonus</h3>
          <p className="text-gray-400 text-sm">
            Claim your whitelist and Tier Bonus by minting early!
          </p>
          <Link href="/dashboard">
            <button className="mt-4 bg-[#9333ea] hover:bg-[#a855f7] text-white px-6 py-2 rounded-md text-sm transition duration-300">
              MINT NOW
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-8 p-4 bg-[#9333ea]/20 rounded-lg border border-[#9333ea]/30 text-center">
        <p className="text-white">
          Join the YUMI community today and start earning passive income through
          our innovative reflection system!
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link href="/dashboard">
            <button className="bg-[#9333ea] hover:bg-[#a855f7] text-white px-6 py-2 rounded-md text-sm transition duration-300">
              MINT NFT
            </button>
          </Link>
          <button className="bg-[#00ff9d] hover:bg-[#33ffb1] text-[#0a0a1a] px-6 py-2 rounded-md text-sm transition duration-300">
            WHITEPAPER
          </button>
        </div>
      </div>
    </Section>
  );
};
