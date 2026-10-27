"use client";

// navigation (locale aware)
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

// translation
import { useLocale } from "next-intl";

// components ui
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/shadcn/ui/select";

//components
import { Icon } from "@/components/ui/Icon";

export function LanguageChangeButton() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const changeHandler = (value: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: value });
    });
  };

  return (
    <div>
      <Select value={currentLocale} onValueChange={changeHandler}>
        <SelectTrigger
          aria-label="Language"
          className="md:cursor-none bg-black text-white border border-slate-800 ring-offset-black focus:ring-black">
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
