"use client";

import { ReactNode, useState } from "react";
import { I18nContext } from "@/lib/i18n-context";
import { Language } from "@/lib/i18n";

interface I18nProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function I18nProvider({
  children,
  defaultLanguage = "vi",
}: I18nProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  return (
    <I18nContext.Provider value={{ language, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}
