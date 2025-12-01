import enMessages from "@/messages/en.json";
import viMessages from "@/messages/vi.json";

export type Language = "en" | "vi";

const messages = {
  en: enMessages,
  vi: viMessages,
};

export function getMessages(language: Language = "en") {
  return messages[language] || messages.en;
}

export function useTranslation(language: Language = "en") {
  const msg = getMessages(language);

  return {
    t: (key: string, defaultValue?: string) => {
      const keys = key.split(".");
      let value: any = msg;

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          return defaultValue || key;
        }
      }

      return typeof value === "string" ? value : key;
    },
    messages: msg,
  };
}
