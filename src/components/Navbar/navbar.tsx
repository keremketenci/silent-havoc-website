"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { ButtonNav } from "@/components/ui/button/ButtonNav";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { toast } from "sonner";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/shadcn/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LanguageChangeButton } from "@/components/LanguageChangeButton";
import { Separator } from "@/components/shadcn/ui/separator";
import { useNavigateToSection } from "@/app/hooks/useNavigateToSection";
import NoiseModeToggle from "@/components/NoiseModeToggle";

interface MenuItem {
  label: string;
  path: string;
  children?: {
    label: string;
    path: string;
    serverIp: string;
  }[];
}

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const t = useTranslations("Navbar");
  const t2 = useTranslations("Toast");
  const navigateToSection = useNavigateToSection();

  const menuItems: MenuItem[] = [
    { label: t("Link.home"), path: "#Home" },
    { label: t("Link.team"), path: "/team" },
    { label: t("Link.joinUs"), path: "/join-us#JoinUs" },
    { label: t("Link.contact"), path: "/contact#Contact" },
    { label: t("Link.rules"), path: "/rules#Rules" },
    { label: t("Link.blog"), path: "/blog" },
    // { label: t('Link.gameServers'), path: '#', children: [{ label: t('Link.cs2server'), path: '#CS2Server', serverIp: 'connect server-ip' }] }
  ];

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isButtonNavChecked, setIsButtonNavChecked] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev);
    setIsButtonNavChecked((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node)
    ) {
      setIsNavbarOpen(false);
      setIsButtonNavChecked(false);
      setOpenSubmenu(null);
    }
  };

  useEffect(() => {
    if (isNavbarOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isNavbarOpen]);

  return (
    <>
      {/* Desktop Navbar */}
      <div className={`${className} hidden md:block`} ref={navbarRef}>
        <div className="flex justify-between">
          <NavigationMenu className="dark">
            <NavigationMenuList className="space-x-8">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.label} className="cursor-target">
                  {item.children ? (
                    <NavigationMenuLink
                      onClick={() => navigateToSection(item.path)}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger>{item.label}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {item.children.map((child) => (
                            <DropdownMenuItem
                              key={child.path}
                              onClick={() => {
                                navigateToSection(child.path);
                                navigator.clipboard.writeText(child.serverIp);
                                if (child.serverIp.includes("."))
                                  toast(t2("GameServers.ServerIp.success"));
                                else if (child.serverIp.includes("#"))
                                  toast(t2("GameServers.ServerIp.failed"));
                                else toast(t2("GameServers.ServerIp.noip"));
                              }}
                            >
                              {child.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </NavigationMenuLink>
                  ) : (
                    <NavigationMenuLink
                      onClick={() => navigateToSection(item.path)}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  )}
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
        ref={navbarRef}
      >
        <div className="flex justify-between items-center gap-2">
          <ButtonNav checked={isButtonNavChecked} onChange={toggleNavbar} />
          <div className="flex items-center gap-2">
            <LanguageChangeButton />
            <NoiseModeToggle id="noise-switch-mobile" size="sm" />
          </div>
        </div>

        {isNavbarOpen && (
          <div>
            <Separator className="my-4" />
            <ScrollArea className="flex w-full h-[150px] rounded-md">
              <div className="px-1 text-start space-y-2">
                {menuItems.map((item) => {
                  const isOpen = openSubmenu === item.label;

                  if (item.children) {
                    // Dropdown item
                    return (
                      <div key={item.label}>
                        <div
                          onClick={() =>
                            setOpenSubmenu(isOpen ? null : item.label)
                          }
                          className="flex items-center justify-between text-xl hover:text-accent"
                        >
                          <span>{item.label}</span>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </div>

                        {isOpen && (
                          <div className="ml-4 mt-1 space-y-1">
                            {item.children.map((child) => (
                              <div
                                className="cursor-pointer text-xl hover:text-accent"
                                key={child.path}
                                onClick={() => {
                                  navigateToSection(child.path);
                                  navigator.clipboard.writeText(child.serverIp);
                                  if (child.serverIp.includes("."))
                                    toast(t2("GameServers.ServerIp.success"));
                                  else if (child.serverIp.includes("#"))
                                    toast(t2("GameServers.ServerIp.failed"));
                                  else toast(t2("GameServers.ServerIp.noip"));

                                  // Navbar kapanışı
                                  setIsNavbarOpen(false);
                                  setIsButtonNavChecked(false);
                                  setOpenSubmenu(null);
                                }}
                              >
                                {child.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  } else {
                    // Normal item
                    return (
                      <div
                        className="cursor-pointer text-xl hover:text-accent"
                        key={item.path}
                        onClick={() => {
                          navigateToSection(item.path);
                          setIsNavbarOpen(false);
                          setIsButtonNavChecked(false);
                          setOpenSubmenu(null);
                        }}
                      >
                        {item.label}
                      </div>
                    );
                  }
                })}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </>
  );
}
