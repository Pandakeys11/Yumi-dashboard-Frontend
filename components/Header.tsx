"use client";

import * as React from "react";
import Link from "next/link";
import { DrawerMenu, navigations } from "./Drawer/DrawerMenu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/app/components/ui/navigation-menu";

import { FaBars } from "react-icons/fa";
import { cn } from "../lib/utils/helpers";
import { Web3Status } from "./Dialog/Web3Status";
import { DialogType } from "./Dialog/dialog";
import { useDialog } from "./Dialog/dialog";
import SwitchChainDialog from "./Dialog/SwitchChainDialog";
import ConnectorDialog from "./Dialog/ConnectorDialog";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex items-center justify-between fixed z-50 top-0 left-0 right-0 px-6 py-5 w-full mx-auto">
      <Link href="/">
        <h2 className="text-2xl font-bold text-white">Yumi Mint</h2>
      </Link>
      <div className="block md:hidden">
        <DrawerMenu />
      </div>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <div className="flex flex-row items-center gap-4">
            <Web3Status />
            <SwitchChainDialog />
            <ConnectorDialog />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
