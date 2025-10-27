"use client";

// translations
import { useTranslations } from "next-intl";

// components
import { Icon } from "@/components/Icon";
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
import { useNavigateToSection } from "@/app/hooks/useNavigateToSection";
import { toast } from "sonner";

// components ui
import { ButtonSocials } from "@/components/ui/button/ButtonSocials";
import { Separator } from "@/components/shadcn/ui/separator";
import NavigationMenuScroller from "@/components/Footer/NavigationMenuScroller";
import FooterSignature from "@/components/Footer/FooterSignature";

interface MenuItem {
  label: string;
  path: string;
  children?: {
    label: string;
    path: string;
    serverIp: string;
  }[];
}

export function Footer({ language }: { language: "en" | "tr" }) {
  const t = useTranslations("Footer");
  const t2 = useTranslations("Toast");
  const navigateToSection = useNavigateToSection();

  const menuItems: MenuItem[] = [
    { label: t("Link.home"), path: "#Home" },
    { label: t("Link.team"), path: "/team" },
    { label: t("Link.joinUs"), path: "/join-us#JoinUs" },
    { label: t("Link.contact"), path: "/contact#Contact" },
    { label: t("Link.rules"), path: "/rules#Rules" },
    { label: t("Link.blog"), path: "/blog" },
  ];

  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <div className="relative w-24 h-24 items-center flex justify-center">
          <div
            className="absolute inset-0 rounded-full pointer-events-none -z-1"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.1) 5%, rgba(50,255,0,1) 150%)",
            }}
          ></div>
          <Icon className="w-24 lg:mb-0" name="logoBlack" />
        </div>
        <div>
          <NavigationMenu className="dark">
            <NavigationMenuList className="grid grid-cols-2 md:flex gap-x-8 md:gap-x-0 md:space-x-8">
              {menuItems.map((item) => (
                <NavigationMenuItem
                  key={item.label}
                  className="cursor-pointer md:cursor-none cursor-target"
                >
                  {item.children ? (
                    <NavigationMenuLink
                      className="text-center"
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
                      className="text-md text-center"
                      onClick={() => navigateToSection(item.path)}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <Separator className="mt-2" />
      <div className="flex flex-col-reverse mt-8 lg:mt-0 lg:flex-row justify-between items-center text-white">
        <FooterSignature language={language} />
        <div className="flex flex-wrap justify-center mb-0 lg:mb-2 gap-y-2 sm:gap-x-0 items-center">
          <ButtonSocials
            link="https://www.instagram.com/silent_havoc_istanbul"
            alt="instagram.com/silent_havoc_istanbul"
            icon="instagram"
            iconClass="w-8"
            isActive={true}
          />
          <Separator orientation="vertical" />
          <p className="mx-2 text-sm text-center">Instagram</p>
        </div>
      </div>
    </div>
  );
}
