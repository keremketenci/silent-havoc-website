// translations
import { useTranslations } from "next-intl";

// components
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/ui/Icon";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/shadcn/ui/navigation-menu";
import { menuItems } from "@/data/navigation";

// components ui
import { ButtonSocials } from "@/components/ui/button/ButtonSocials";
import { Separator } from "@/components/shadcn/ui/separator";
// import { NavigationMenuScroller } from "@/components/layout/NavigationMenuScroller";
import { FooterSignature } from "@/components/layout/FooterSignature";

export function Footer({ language }: { language: "en" | "tr" }) {
  const t = useTranslations("Footer");

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
          <Icon className="w-24 lg:mb-0" name="logoBlack" alt="SILENT HAVOC" />
        </div>
        <div>
          <NavigationMenu className="dark">
            <NavigationMenuList className="grid grid-cols-2 md:flex gap-x-8 md:gap-x-0 md:space-x-8">
              {menuItems.map((item) => (
                <NavigationMenuItem
                  key={item.key}
                  className="cursor-pointer md:cursor-none cursor-target"
                >
                  <NavigationMenuLink asChild className="text-md text-center md:cursor-none">
                    <Link href={item.href}>{t(`Link.${item.key}`)}</Link>
                  </NavigationMenuLink>
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
