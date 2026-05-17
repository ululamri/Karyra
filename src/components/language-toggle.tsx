"use client";

import { useRouter } from "next/navigation";
import { type Language, t } from "../lib/i18n";

type LanguageToggleProps = {
  language: Language;
};

export function LanguageToggle({ language }: LanguageToggleProps) {
  const router = useRouter();
  const nextLanguage: Language = language === "id" ? "en" : "id";

  function handleToggle() {
    document.cookie = `karyra_lang=${nextLanguage}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      title={
        language === "id"
          ? t(language, "switchToEnglish")
          : t(language, "switchToIndonesian")
      }
      className="inline-flex h-10 min-w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-3 text-sm font-bold text-white md:h-12 md:min-w-12 md:px-4 md:text-base"
    >
      {language === "id" ? "ID" : "EN"}
    </button>
  );
}