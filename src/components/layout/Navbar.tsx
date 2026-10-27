"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { ButtonNav } from "@/components/ui/button/ButtonNav";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/shadcn/ui/navigation-menu";
import { LanguageChangeButton } from "@/components/layout/LanguageChangeButton";
import { Separator } from "@/components/shadcn/ui/separator";
import { NoiseModeToggle } from "@/components/layout/NoiseModeToggle";
import { menuItems } from "@/data/navigation";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const t = useTranslations("Navbar");

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const closeNavbar = () => setIsNavbarOpen(false);

  // Close the mobile menu when clicking outside of it
  useEffect(() => {
    if (!isNavbarOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target as Node)
      ) {
        setIsNavbarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isNavbarOpen]);

  return (
    <>
      {/* Desktop Navbar */}
      <div className={`${className} hidden md:block`}>
        <div className="flex justify-between">
          <NavigationMenu className="dark">
            <NavigationMenuList className="space-x-8">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.key} className="cursor-target">
                  <NavigationMenuLink asChild>
                    <Link href={item.href}>{t(`Link.${item.key}`)}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuList className="items-center gap-3">
              <NavigationMenuItem className="cursor-target">
                <LanguageChangeButton />
              </NavigationMenuItem>
              <NavigationMenuItem className="cursor-target">
                <NoiseModeToggle className="p-2" id="noise-switch" />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className={`${className} flex flex-col md:hidden justify-between`}
        ref={mobileNavRef}
      >
        <div className="flex justify-between items-center gap-2">
          <ButtonNav
            checked={isNavbarOpen}
            onChange={() => setIsNavbarOpen((prev) => !prev)}
          />
          <div className="flex items-center gap-2">
            <LanguageChangeButton />
            <NoiseModeToggle id="noise-switch-mobile" size="sm" />
          </div>
        </div>

        {isNavbarOpen && (
          <nav>
            <Separator className="my-4" />
            <ScrollArea className="flex w-full h-[150px] rounded-md">
              <div className="px-1 text-start space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="block cursor-pointer text-xl hover:text-accent"
                    onClick={closeNavbar}
                  >
                    {t(`Link.${item.key}`)}
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </nav>
        )}
      </div>
    </>
  );
}
