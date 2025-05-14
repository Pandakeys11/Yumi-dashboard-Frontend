import { Section } from "./Section";
import { NetworkIcon, BarChart3Icon } from "lucide-react";

export const FutureExpansionsSection = () => {
  return (
    <Section
      id="expansions"
      title="FUTURE EXPANSIONS & PARTNERED REFLECTIONS"
      titleNumber="05"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-white mb-4">
            YUMI is designed to expand through project partnerships:
          </p>

          <ul className="space-y-3 mb-6">
            {[
              "Partner projects can plug into YUMI's reflection system",
              "Each project adds 0.025% to 0.05% of its TX volume into YUMI's pool",
              "This grows the reward pool for all $YUMI holders",
              "Reflection-as-a-Service fuels network growth, collaboration, and passive yield",
            ].map((item, index) => (
              <li key={index} className="flex items-start text-gray-300">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-[#9333ea] rounded-full mr-3 mt-0.5 text-white text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#1a1a2e] rounded-lg p-4 border border-[#00ff9d]/30 flex flex-col items-center justify-center">
          <h3 className="text-[#00ff9d] text-lg font-medium mb-4">
            Network Growth
          </h3>

          <div className="relative w-full h-56">
            <svg viewBox="0 0 300 200" className="w-full h-full">
              {/* Base circle: YUMI */}
              <circle cx="150" cy="100" r="40" fill="#9333ea" opacity="0.7" />
              <text
                x="150"
                y="105"
                fontSize="14"
                fill="#ffffff"
                textAnchor="middle"
              >
                YUMI
              </text>

              {/* Partner Projects */}
              <circle cx="70" cy="60" r="25" fill="#00ff9d" opacity="0.7" />
              <text
                x="70"
                y="65"
                fontSize="10"
                fill="#ffffff"
                textAnchor="middle"
              >
                Partner 1
              </text>
              <line
                x1="100"
                y1="75"
                x2="125"
                y2="85"
                stroke="#00ff9d"
                strokeWidth="2"
              />

              <circle cx="60" cy="140" r="25" fill="#00ff9d" opacity="0.7" />
              <text
                x="60"
                y="145"
                fontSize="10"
                fill="#ffffff"
                textAnchor="middle"
              >
                Partner 2
              </text>
              <line
                x1="85"
                y1="130"
                x2="120"
                y2="110"
                stroke="#00ff9d"
                strokeWidth="2"
              />

              <circle cx="230" cy="60" r="25" fill="#00ff9d" opacity="0.7" />
              <text
                x="230"
                y="65"
                fontSize="10"
                fill="#ffffff"
                textAnchor="middle"
              >
                Partner 3
              </text>
              <line
                x1="200"
                y1="75"
                x2="175"
                y2="85"
                stroke="#00ff9d"
                strokeWidth="2"
              />

              <circle cx="240" cy="140" r="25" fill="#00ff9d" opacity="0.7" />
              <text
                x="240"
                y="145"
                fontSize="10"
                fill="#ffffff"
                textAnchor="middle"
              >
                Partner 4
              </text>
              <line
                x1="215"
                y1="130"
                x2="180"
                y2="110"
                stroke="#00ff9d"
                strokeWidth="2"
              />

              {/* Flow indicators */}
              <circle cx="112" cy="80" r="3" fill="white" />
              <circle cx="102" cy="120" r="3" fill="white" />
              <circle cx="188" cy="80" r="3" fill="white" />
              <circle cx="198" cy="120" r="3" fill="white" />

              {/* Rewards pool */}
              <rect
                x="130"
                y="160"
                width="40"
                height="20"
                rx="5"
                fill="#00ff9d"
                opacity="0.7"
              />
              <text
                x="150"
                y="175"
                fontSize="10"
                fill="#ffffff"
                textAnchor="middle"
              >
                Pool
              </text>
              <line
                x1="150"
                y1="140"
                x2="150"
                y2="160"
                stroke="#00ff9d"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="text-center text-sm text-gray-400 mt-2">
            Each partner project contributes to the growing YUMI ecosystem
          </div>
        </div>
      </div>
    </Section>
  );
};
