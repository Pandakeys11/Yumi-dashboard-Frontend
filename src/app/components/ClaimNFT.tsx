import React, { useState } from "react";
import { Button } from "./Button";
import Image from "next/image";
import Link from "next/link";

const acts = [
  {
    title: "Teaser",
    hasVideo: true,
  },
  {
    title: "Act 1: Survival",
    hasVideo: false,
  },
  {
    title: "Act 2: The Escape",
    hasVideo: false,
  },
  {
    title: "Act 3: Heaven Sent",
    hasVideo: false,
  },
  {
    title: "Act 4: Yumi",
    hasVideo: false,
  },
];

const ClaimNFT = () => {
  const [currentActIndex, setCurrentActIndex] = useState(0);

  const handleNext = () => {
    setCurrentActIndex((prev) => (prev + 1) % acts.length);
  };

  const handlePrev = () => {
    setCurrentActIndex((prev) => (prev - 1 + acts.length) % acts.length);
  };

  return (
    <section className="flex items-center h-full flex-col justify-center relative -mt-32 pt-56 space-y-5 py-10">
      <div className="text-center text-white space-y-8">
        <h3 className="text-2xl font-bold">
          Gabriels Journey – The Depths of Hell
        </h3>
        <p className="text-base max-w-md mx-auto text-center">
          Beneath the heavens, an abyss of fire rages on. The land is cracked
          and scorched, ruled by flames and shadows. Demonic forces lurk in the
          darkness, waiting to strike. There is no peace here—only war,
          suffering, and an unending battle for the soul.
        </p>
      </div>

      {/* <div className="w-full max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            className="text-white text-4xl hover:text-red-500 transition-colors"
            aria-label="Previous act"
          >
            ←
          </button>

          <div className="flex-1">
            <h2 className="text-5xl font-bold text-white text-center mb-6">
              {acts[currentActIndex].title}
            </h2>

            {acts[currentActIndex].hasVideo ? (
              <video
                src="/gameVideo.mp4"
                autoPlay
                muted
                loop
                className="w-full aspect-video object-cover rounded-xl border-4 border-red-800"
              />
            ) : (
              <div className="w-full aspect-video bg-black/50 rounded-xl border-4 border-red-800 flex items-center justify-center">
                <p className="text-3xl text-white font-bold">Coming Soon</p>
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            className="text-white text-4xl hover:text-red-500 transition-colors"
            aria-label="Next act"
          >
            →
          </button>
        </div>
      </div> */}

      {/* <div>
        <h3 className="text-2xl font-bold text-center text-white">
          🕊️ The Story of Yumi
        </h3>
        <p className="text-base max-w-md mx-auto text-center text-white">
          Yumi is a lore-driven NFT experience built on Monad. As Seraphiel,
          a warrior angel, you must fight through waves of demonic enemies and
          carve your path through hell itself.
        </p>
      </div> */}
      {/*<div className="text-center flex flex-col items-center justify-center text-white space-y-8">*/}
      {/*  <h1 className="text-lg lg:text-4xl font-bold">*/}
      {/*    Claim Your Whitelist Now*/}
      {/*  </h1>*/}

      {/*  <Image*/}
      {/*    src="/NFT.jpg"*/}
      {/*    alt="nft"*/}
      {/*    width={300}*/}
      {/*    height={100}*/}
      {/*    className="rounded-xl border-4 border-red-800"*/}
      {/*  />*/}

      {/*  <Link href="/dashboard#mint">*/}
      {/*    <Button size="regular" className="px-12 py-6 z-20 bg-red-600">*/}
      {/*      MINT NOW*/}
      {/*    </Button>*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </section>
  );
};

export default ClaimNFT;
