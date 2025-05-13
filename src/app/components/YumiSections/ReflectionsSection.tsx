import { Section } from "./Section";
import { ZapIcon } from "lucide-react";

export const ReflectionsSection = () => {
  return (
    <Section
      id="reflections"
      title="WHAT ARE $YUMI REFLECTIONS"
      titleNumber="01"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-white mb-4">
            Every $YUMI transaction contributes 2% to the rewards pool. These
            reflections convert into $OMEGA tokens (MON), which holders can
            manually claim via the YUMI DApp.
          </p>

          <ul className="space-y-3">
            {[
              "Reflections updated daily",
              "Claimed via the Rewards Dashboard",
              "Launching first on Monad",
              "More EVM & BSC networks coming soon",
            ].map((item, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <span className="inline-block w-2 h-2 bg-[#00ff9d] rounded-full mr-3"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#1a1a2e] rounded-lg p-4 border border-[#00ff9d]/30 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-[#9333ea]/20 rounded-full flex items-center justify-center mb-4">
            <ZapIcon className="w-8 h-8 text-[#9333ea]" />
          </div>

          <div className="relative w-full h-32">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 300 100" className="w-full h-full">
                <path
                  d="M0,50 Q50,20 100,50 T200,50 T300,50"
                  fill="none"
                  stroke="#9333ea"
                  strokeWidth="2"
                />
                <circle cx="50" cy="35" r="4" fill="#00ff9d" />
                <circle cx="120" cy="59" r="4" fill="#00ff9d" />
                <circle cx="200" cy="50" r="4" fill="#00ff9d" />
                <circle cx="280" cy="40" r="4" fill="#00ff9d" />
                <text
                  x="50"
                  y="25"
                  fontSize="10"
                  fill="#ffffff"
                  textAnchor="middle"
                >
                  Transaction
                </text>
                <text
                  x="120"
                  y="40"
                  fontSize="10"
                  fill="#ffffff"
                  textAnchor="middle"
                >
                  Pool
                </text>
                <text
                  x="200"
                  y="35"
                  fontSize="10"
                  fill="#ffffff"
                  textAnchor="middle"
                >
                  Reflections
                </text>
                <text
                  x="280"
                  y="27"
                  fontSize="10"
                  fill="#ffffff"
                  textAnchor="middle"
                >
                  Claim
                </text>
              </svg>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400 mt-2">
            YUMI Reflections Flow: Transaction → Pool → Reflections → Claim
          </p>
        </div>
      </div>
    </Section>
  );
};
