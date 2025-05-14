import { Section } from "./Section";
import { MonitorIcon, ArrowRight } from "lucide-react";
import Image from "next/image";

export const RewardsDashboardSection = () => {
  const features = [
    "Claim $OMEGA (MON) rewards with one click",
    "View your NFTs and tier bonuses",
    "Track your wallet balance and reflection earnings",
    "Monitor multi-chain activity in real time",
    "Mobile-optimized & user-friendly",
  ];

  return (
    <Section id="dashboard" title="THE REWARDS DASHBOARD" titleNumber="04">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-white mb-4">
            A full-featured Rewards Dashboard is launching alongside the mint:
          </p>

          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-gray-300">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-[#9333ea] rounded-full mr-3 mt-0.5 text-white text-xs">
                  ✓
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-center md:justify-start">
            <button className="bg-[#9333ea] hover:bg-[#a855f7] text-white px-6 py-2 rounded-md text-sm transition duration-300 flex items-center">
              PREVIEW DASHBOARD
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* <div className="bg-[#1a1a2e] rounded-lg p-4 border border-[#00ff9d]/30 flex flex-col items-center justify-center"> */}
        <div className="w-full relative">
          <div className="absolute -top-5 -left-7 w-10 h-10 bg-[#9333ea] rounded-full flex items-center justify-center">
            <MonitorIcon className="w-5 h-5 text-white" />
          </div>

          <div className="border-4 border-[#00ff9d]/30 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(0,255,157,0.2)]">
            <div className="bg-[#0a0a1a] h-6 w-full flex items-center px-2">
              <div className="w-2 h-2 rounded-full bg-[#00ff9d] mr-1"></div>
              <div className="w-2 h-2 rounded-full bg-[#9333ea] mr-1"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 mr-1"></div>
              <span className="text-white text-xs ml-2">YUMI Dashboard</span>
            </div>

            <div className="bg-gradient-to-br from-[#0a0a1a] to-[#1a1a2e] h-64 p-4">
              <div className="mb-4">
                <h4 className="text-[#00ff9d] text-sm uppercase">
                  Rewards Overview
                </h4>
                <div className="flex justify-between mt-2 border-b border-[#00ff9d]/20 pb-2">
                  <span className="text-gray-400 text-xs">
                    Available $OMEGA
                  </span>
                  <span className="text-white text-xs">4.735 MON</span>
                </div>
                <div className="flex justify-between mt-2 border-b border-[#00ff9d]/20 pb-2">
                  <span className="text-gray-400 text-xs">$YUMI Tokens</span>
                  <span className="text-white text-xs">12,500 YUMI</span>
                </div>
                <div className="flex justify-between mt-2 pb-2">
                  <span className="text-gray-400 text-xs">Tier Bonus</span>
                  <span className="text-[#00ff9d] text-xs">+15%</span>
                </div>
              </div>

              <div className="bg-[#0a0a1a] rounded p-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Claim Status</span>
                  <span className="text-[#00ff9d] text-xs">Ready to Claim</span>
                </div>
              </div>

              <div className="flex justify-center">
                <button className="bg-[#9333ea] w-full py-2 rounded text-white text-xs">
                  CLAIM REWARDS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Section>
  );
};
