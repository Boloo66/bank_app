"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "../constants";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import Footer from "./Footer";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <div className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Image
              src="/icons/hamburger.svg"
              width={30}
              height={30}
              alt="menu"
              className="cursor-pointer"
            />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <Link href="/" className="cursor-pointer flex items-center px-4">
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="banking-logo"
              className="size-[24px] max-xl:size-14"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              Horizon
            </h1>
          </Link>
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex flex-col h-full gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn("mobilenav-sheet_close w-full", {
                          "bg-bank-gradient": isActive,
                        })}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          className={cn({
                            "invert-0 brightness-[3]": isActive,
                          })}
                          width={20}
                          height={20}
                        />
                        <p
                          className={cn("text-16 font-semibold text-black-2", {
                            "!text-white": isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                USER
              </nav>
            </SheetClose>
            <Footer user={user} type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
