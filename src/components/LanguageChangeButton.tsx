"use client";

// next
import { useRouter, usePathname } from "next/navigation";

// translation
import { useLocale } from "next-intl";

// components ui
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

//components
import { Icon } from "@/components/Icon";

export function LanguageChangeButton() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeHandler = (value: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${value}`);
    router.replace(newPath);
  };

  
  return (
    <div>
      <Select defaultValue={currentLocale} onValueChange={changeHandler}>
        <SelectTrigger className="md:cursor-none bg-black text-white border border-slate-800 ring-offset-black focus:ring-black">
          {/* Language */}
          {currentLocale === "en" ? (
            <Icon name="en" className="w-8 mr-2" />
          ) : currentLocale === "tr" ? (
            <Icon name="tr" className="w-8 mr-2" />
          ) : (
            "N/A"
          )}
        </SelectTrigger>
        <SelectContent className="bg-black text-white border-slate-800 z-99">
          <SelectItem
            className="md:cursor-none cursor-target focus:bg-slate-800 focus:text-white"
            value="en"
          >
            English
          </SelectItem>
          <SelectItem
            className="md:cursor-none cursor-target focus:bg-slate-800 focus:text-white"
            value="tr"
          >
            Türkçe
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
