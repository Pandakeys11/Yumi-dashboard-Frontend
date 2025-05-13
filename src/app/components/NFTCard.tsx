import React, { useState } from "react";
import { useTokenURI } from "../hooks/useNftReadMethods";
import { useNftMetadata } from "../hooks/useNftMetadata";

interface NFTCardProps {
  tokenId: bigint;
  isSelected: boolean;
  onSelect: () => void;
}

// Define the attribute interface
interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

// Extend the NFTMetadata interface
interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: NFTAttribute[];
}

export function NFTCard({ tokenId, isSelected, onSelect }: NFTCardProps) {
  const [activeTab, setActiveTab] = useState<"info" | "attributes" | "rarity">(
    "info",
  );
  const { data: tokenURI, isLoading: uriLoading } = useTokenURI(tokenId);
  const {
    metadata,
    isLoading: metadataLoading,
    error,
  } = useNftMetadata(tokenURI as string);

  const isLoading = uriLoading || metadataLoading;

  // Group attributes by type
  const basicAttributes =
    (metadata as NFTMetadata)?.attributes?.filter(
      (attr: NFTAttribute) =>
        !attr.trait_type.includes("Rarity") && !attr.display_type,
    ) || [];

  const rarityAttributes =
    (metadata as NFTMetadata)?.attributes?.filter(
      (attr: NFTAttribute) =>
        attr.trait_type.includes("Rarity") || attr.display_type === "number",
    ) || [];

  return (
    <div
      className={`cursor-pointer rounded-lg p-4 transition-all duration-200 ${
        isSelected
          ? "bg-[#1a1a2e] border-2 border-[#9333ea] shadow-[0_0_15px_rgba(147,51,234,0.5)] text-white"
          : "bg-gray-800 text-white hover:bg-gray-700 hover:border border-[#00ff9d]/30"
      }`}
      onClick={onSelect}
    >
      <h4
        className={`text-lg font-medium mb-2 ${isSelected ? "text-[#00ff9d]" : ""}`}
      >
        NFT #{tokenId.toString()}
      </h4>

      {isLoading ? (
        <div className="animate-pulse">
          <div className="bg-gray-700 h-48 rounded-lg mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">Error loading metadata</div>
      ) : metadata ? (
        <div className="space-y-3">
          <div
            className={`relative h-48 rounded-lg overflow-hidden ${isSelected ? "ring-2 ring-[#9333ea]" : ""}`}
          >
            <img
              src={metadata.image}
              alt={metadata.name}
              className={`w-full h-full object-cover ${isSelected ? "brightness-110" : ""}`}
            />
            {isSelected && (
              <div className="absolute top-2 right-2 bg-[#9333ea] text-white px-2 py-1 rounded-md text-sm font-bold">
                Selected
              </div>
            )}
          </div>

          {isSelected && (
            <>
              <div className="flex border-b border-[#00ff9d]/30">
                <button
                  className={`px-3 py-2 text-sm font-medium ${activeTab === "info" ? "text-[#00ff9d] border-b-2 border-[#00ff9d]" : "text-gray-400 hover:text-white"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab("info");
                  }}
                >
                  Info
                </button>
                <button
                  className={`px-3 py-2 text-sm font-medium ${activeTab === "attributes" ? "text-[#00ff9d] border-b-2 border-[#00ff9d]" : "text-gray-400 hover:text-white"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab("attributes");
                  }}
                >
                  Attributes
                </button>
                <button
                  className={`px-3 py-2 text-sm font-medium ${activeTab === "rarity" ? "text-[#00ff9d] border-b-2 border-[#00ff9d]" : "text-gray-400 hover:text-white"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab("rarity");
                  }}
                >
                  Rarity
                </button>
              </div>

              <div className="mt-2">
                {activeTab === "info" && (
                  <div>
                    <h5 className="font-medium text-[#00ff9d]">
                      {metadata.name}
                    </h5>
                    <p className="text-sm text-white mt-1">
                      {metadata.description}
                    </p>
                  </div>
                )}

                {activeTab === "attributes" && (
                  <div className="max-h-32 overflow-y-auto">
                    {basicAttributes.length > 0 ? (
                      <div className="grid grid-cols-1 gap-2">
                        {basicAttributes.map(
                          (attr: NFTAttribute, index: number) => (
                            <div
                              key={index}
                              className="bg-[#0a0a1a] p-2 rounded"
                            >
                              <div className="text-xs text-gray-400">
                                {attr.trait_type}
                              </div>
                              <div className="text-sm font-medium text-white">
                                {attr.value}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">
                        No attributes available
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "rarity" && (
                  <div className="max-h-32 overflow-y-auto">
                    {rarityAttributes.length > 0 ? (
                      <div className="space-y-2">
                        {rarityAttributes.map(
                          (attr: NFTAttribute, index: number) => (
                            <div
                              key={index}
                              className="flex justify-between items-center bg-[#0a0a1a] p-2 rounded"
                            >
                              <div className="text-xs text-gray-400">
                                {attr.trait_type}
                              </div>
                              <div className="text-sm font-medium text-[#00ff9d]">
                                {attr.value}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">
                        No rarity data available
                      </p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {!isSelected && (
            <>
              <h5 className="font-medium">{metadata.name}</h5>
              <p className="text-sm opacity-80 line-clamp-2">
                {metadata.description}
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="text-sm opacity-70">No metadata available</div>
      )}
    </div>
  );
}
