"use client";

import * as React from "react";

import Link from "next/link";
import { Drawer } from "../ui/drawer";
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../Button";
import { FaBars } from "react-icons/fa";
import { ButtonSecondary } from "@/app/components/Button";
import { CrossIcon, HamburgerIcon } from "@/app/components/Icons";
import { useRouter } from "next/navigation";
import { Web3Status } from "../Dialog/Web3Status";
import Image from "next/image";

export const navigations = [
  { id: 1, href: "#", label: "Home" },
  { id: 2, href: "#", label: "About" },
  { id: 3, href: "#", label: "Contact" },
];

export function DrawerMenu() {
  const router = useRouter();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="regular">
          <FaBars />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex flex-col items-center">
            <Image src="/logo.jpeg" alt="logo" width={50} height={50} />
            <DrawerTitle>$YUMI</DrawerTitle>
            <DrawerDescription>MONAD TESTNET</DrawerDescription>
          </DrawerHeader>

          <Web3Status className="flex flex-col" />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
