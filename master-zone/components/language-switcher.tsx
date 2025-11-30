"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Languages } from "lucide-react";
import { useState, useTransition } from "react";
import Image from "next/image";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "/flags/en.png" },
    { code: "vi", name: "Tiếng Việt", flag: "/flags/vi.png" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale);

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
      setIsOpen(false);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 transition-all duration-300 border border-white/10"
        disabled={isPending}
      >
        {currentLanguage && (
          <div className="flex items-center gap-2">
            <Image
              src={currentLanguage.flag}
              alt={currentLanguage.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="text-sm font-medium">
              {currentLanguage.code.toUpperCase()}
            </span>
          </div>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-50">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  locale === language.code
                    ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
                disabled={isPending}
              >
                <Image
                  src={language.flag}
                  alt={language.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="font-medium text-sm">{language.name}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {language.code.toUpperCase()}
                  </div>
                </div>
                {locale === language.code && (
                  <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
