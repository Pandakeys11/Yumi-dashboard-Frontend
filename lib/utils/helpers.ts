import { Hash } from "viem";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const shortenHash = (hash: string, shortenBy?: number): string =>
  `${hash.substring(0, shortenBy ?? 4)}...${hash.substring(hash.length - (shortenBy ?? 4))}`;

export const getDisplayNameForAddress = (address: Hash): string =>
  address.slice(0, 4) + "..." + address.slice(-5);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
