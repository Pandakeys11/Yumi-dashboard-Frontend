import { Section } from "./Section";
import { PieChart as PieChartIcon, BarChart } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";

export const TokenomicsSection = () => {
  const [showLaunchFees, setShowLaunchFees] = useState(false);

  const tokenInfo = [
    { label: "Total Supply", value: "100,000,000 $YUMI" },
    { label: "Max TX", value: "2%" },
    { label: "Max Wallet", value: "3%" },
  ];

  const standardFees = [
    { label: "Platform", value: "1%", color: "#9333ea" },
    { label: "Rewards Pool", value: "2%", color: "#00ff9d" },
    { label: "Liquidity", value: "1%", color: "#7e22ce" },
  ];

  const launchFees = [
    { label: "Platform", value: "2%", color: "#9333ea" },
    { label: "Rewards Pool", value: "3%", color: "#00ff9d" },
    { label: "Liquidity", value: "2%", color: "#7e22ce" },
  ];

  const fees = showLaunchFees ? launchFees : standardFees;

  const standardPieData = [
    { name: "Platform", value: 1, color: "#9333ea" },
    { name: "Rewards Pool", value: 2, color: "#00ff9d" },
    { name: "Liquidity", value: 1, color: "#7e22ce" },
    { name: "Remaining", value: 96, color: "#1a1a2e" },
  ];

  const launchPieData = [
    { name: "Platform", value: 2, color: "#9333ea" },
    { name: "Rewards Pool", value: 3, color: "#00ff9d" },
    { name: "Liquidity", value: 2, color: "#7e22ce" },
    { name: "Remaining", value: 93, color: "#1a1a2e" },
  ];

  const pieData = showLaunchFees ? launchPieData : standardPieData;

  return (
    <Section id="tokenomics" title="TOKENOMICS SNAPSHOT" titleNumber="03">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-6">
            {tokenInfo.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-[#1a1a2e]"
              >
                <span className="text-gray-300">{item.label}</span>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium text-white mb-2">
              Buy/Sell Fees:
            </h3>
            <div className="space-y-2">
              {fees.map((fee, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border border-[#00ff9d]/20 rounded-md bg-[#1a1a2e]"
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: fee.color }}
                    ></div>
                    <span className="text-white">{fee.label}</span>
                  </div>
                  <span className="text-[#00ff9d] font-medium">
                    {fee.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="p-3 bg-[#1a1a2e] rounded-md border border-[#9333ea]/30 mb-4 cursor-pointer"
            onClick={() => setShowLaunchFees(!showLaunchFees)}
          >
            <div className="flex justify-between items-center">
              <p className="text-white">
                <span className="text-[#9333ea] font-bold">
                  Launch Sell Fee:
                </span>{" "}
                7% (first 48 hours only)
              </p>
              <div
                className={`w-4 h-4 rounded-full border border-[#9333ea] flex items-center justify-center ${showLaunchFees ? "bg-[#9333ea]" : ""}`}
              >
                {showLaunchFees && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 italic">
            {showLaunchFees
              ? "Showing launch phase fees (first 48 hours)"
              : "Showing standard fees (after 48 hours)"}
            . Click the launch fee box to toggle view.
          </p>
        </div>

        <div className="bg-[#1a1a2e] rounded-lg p-4 border border-[#00ff9d]/30 flex flex-col items-center justify-center">
          <div className="relative w-full h-64">
            {/* Outer border/glow effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[170px] h-[170px] rounded-full border-2 border-[#00ff9d] opacity-30 shadow-[0_0_15px_rgba(0,255,157,0.2)]"></div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="#00ff9d"
                  strokeWidth={1}
                  label={({ name, percent }) =>
                    name === "Remaining" ? "" : `${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      strokeWidth={index === 3 ? 0 : 1}
                    />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#ffffff"
                  fontSize="12"
                >
                  $YUMI
                </text>
                <Tooltip
                  formatter={(value) => `${value}%`}
                  contentStyle={{
                    backgroundColor: "#0a0a1a",
                    borderColor: "#00ff9d",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#ffffff" }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute bottom-0 right-0 p-2 bg-[#0a0a1a]/80 rounded-md border border-[#00ff9d]/20">
              <div className="text-xs text-[#9333ea] font-bold mb-2">
                {showLaunchFees ? "Launch Fees (7%)" : "Standard Fees (4%)"}
              </div>
              <div className="flex items-center text-xs text-white mb-1">
                <div
                  className="w-2 h-2 rounded-full mr-1"
                  style={{ backgroundColor: "#9333ea" }}
                ></div>
                <span>Platform: {showLaunchFees ? "2%" : "1%"}</span>
              </div>
              <div className="flex items-center text-xs text-white mb-1">
                <div
                  className="w-2 h-2 rounded-full mr-1"
                  style={{ backgroundColor: "#00ff9d" }}
                ></div>
                <span>Rewards: {showLaunchFees ? "3%" : "2%"}</span>
              </div>
              <div className="flex items-center text-xs text-white">
                <div
                  className="w-2 h-2 rounded-full mr-1"
                  style={{ backgroundColor: "#7e22ce" }}
                ></div>
                <span>Liquidity: {showLaunchFees ? "2%" : "1%"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
