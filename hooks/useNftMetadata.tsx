import { useState, useEffect } from "react";
//
interface NFTMetadata {
  name: string;
  description: string;
  image: string;
}

export function useNftMetadata(tokenURI: string | undefined) {
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!tokenURI) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(tokenURI);
        if (!response.ok) {
          throw new Error("Failed to fetch metadata");
        }
        const data = await response.json();
        setMetadata(data);
      } catch (err) {
        console.error("Error fetching NFT metadata:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch metadata",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [tokenURI]);

  return { metadata, isLoading, error };
}
