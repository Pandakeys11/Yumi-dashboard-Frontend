import { useState } from "react";
import { useAccount } from "wagmi";
import { useOwnerCollection } from "../../hooks/useNftReadMethods";
import { useTransferNFT } from "../../hooks/useNftWriteMethods";
import { useToast } from "../Toast/ToastProvider";
import { NFTCard } from "../NFTCard";

function UserNFTs() {
  const { address } = useAccount();
  const { data: nfts, isLoading } = useOwnerCollection(
    address as `0x${string}`,
  );
  const { showToast } = useToast();
  const [selectedNFT, setSelectedNFT] = useState<bigint | null>(null);
  const [transferTo, setTransferTo] = useState<`0x${string}`>(
    "" as `0x${string}`,
  );
  const { transfer, isPending, isConfirming, isSuccess, error } =
    useTransferNFT();

  const handleTransfer = async () => {
    if (
      !transferTo ||
      !transferTo.startsWith("0x") ||
      transferTo.length !== 42
    ) {
      console.error("Invalid recipient address");
      showToast("Invalid recipient address", "error");
      return;
    }

    if (!selectedNFT) {
      console.error("No NFT selected for transfer");
      showToast("No NFT selected for transfer", "error");
      return;
    }

    try {
      await transfer(transferTo, selectedNFT);

      if (isSuccess) {
        setSelectedNFT(null);
        setTransferTo("" as `0x${string}`);
        showToast("NFT transferred successfully!", "success");
      }
    } catch (err) {
      console.error("Error transferring NFT:", err);
      showToast("Error transferring NFT", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-40 flex items-center justify-center text-gray-300">
        Loading your NFTs...
      </div>
    );
  }

  const nftArray = Array.isArray(nfts) ? nfts : [];

  return (
    <div className="yumi-card p-6">
      <h2 className="text-2xl font-semibold text-[#00ff9d] mb-4">Your NFTs</h2>

      {nftArray.length > 0 ? (
        <div>
          <h3 className="text-xl text-white mb-4">
            Select an NFT to transfer:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {nftArray.map((tokenId: bigint) => (
              <NFTCard
                key={tokenId.toString()}
                tokenId={tokenId}
                isSelected={selectedNFT === tokenId}
                onSelect={() => setSelectedNFT(tokenId)}
              />
            ))}
          </div>

          {selectedNFT && (
            <div className="bg-[#1a1a2e] p-4 rounded-lg mt-6 border border-[#00ff9d]/30">
              <h3 className="text-white text-lg font-medium mb-4">
                Transfer NFT #{selectedNFT.toString()}
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="transferTo"
                  className="block text-gray-300 mb-2"
                >
                  Recipient Address:
                </label>
                <input
                  id="transferTo"
                  type="text"
                  value={transferTo}
                  onChange={(e) =>
                    setTransferTo(e.target.value as `0x${string}`)
                  }
                  placeholder="Enter recipient address (0x...)"
                  className="yumi-input w-full"
                />
              </div>

              <button
                onClick={handleTransfer}
                disabled={!transferTo || isPending || isConfirming}
                className="yumi-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending
                  ? "Preparing..."
                  : isConfirming
                    ? "Confirming..."
                    : "Transfer NFT"}
              </button>
            </div>
          )}

          {isSuccess && (
            <p className="mt-4 text-[#00ff9d] font-medium">
              NFT transferred successfully!
            </p>
          )}
          {error && (
            <p className="mt-4 text-[#ef4444] font-medium">
              Error: {error.message}
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-8 bg-[#1a1a2e] rounded-lg border border-[#00ff9d]/30">
          You don&apos;t own any NFTs yet.
        </p>
      )}
    </div>
  );
}

export default UserNFTs;
