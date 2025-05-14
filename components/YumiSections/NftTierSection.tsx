import { Section } from "./Section";
import { LayersIcon } from "lucide-react";

export const NftTierSection = () => {
  const tiers = [
    { name: "Mystic (Core 5)", bonus: "+25%", color: "#00ff9d" },
    { name: "Legendary (Yumi)", bonus: "+20%", color: "#9333ea" },
    { name: "Epic (Omega)", bonus: "+15%", color: "#7e22ce" },
    { name: "Rare (Kage)", bonus: "+5%", color: "#a855f7" },
    { name: "Uncommon (Sol)", bonus: "+2.5%", color: "#c084fc" },
    { name: "Common (Murk)", bonus: "+1%", color: "#d8b4fe" },
  ];

  const steps = [
    "User mints a YUMI NFT",
    "NFT is assigned a Tier",
    "Holder receives 75% of the mint price back in $YUMI tokens",
    "Tier Bonus % is added to increase total returned",
    "NFT holders also earn reflections passively",
    "The more $YUMI held, the more reflections earned",
  ];

  return (
    <Section id="nft-tiers" title="NFT TIER BONUS SYSTEM" titleNumber="02">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-4">
            How the mint works:
          </h3>
          <ol className="space-y-4 mb-6">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-3 text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9333ea] flex items-center justify-center text-white text-sm">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-[#1a1a2e] rounded-lg p-4 border border-[#00ff9d]/30">
          <div className="flex items-center justify-center mb-4">
            <LayersIcon className="w-6 h-6 text-[#9333ea] mr-2" />
            <h3 className="text-lg font-medium text-white">NFT Rarity Tiers</h3>
          </div>

          <div className="space-y-2">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border border-[#00ff9d]/20 rounded-md bg-[#0a0a1a]"
              >
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: tier.color }}
                  ></div>
                  <span className="text-white">{tier.name}</span>
                </div>
                <span className="text-[#00ff9d] font-medium">{tier.bonus}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 py-3 px-4 rounded bg-[#0a0a1a] border border-[#00ff9d]/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Mint NFT</span>
              <span className="text-white">100%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Base Return</span>
              <span className="text-[#00ff9d]">75% + Tier Bonus</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
