import Link from "next/link";
import {
  DEFAULT_LANGUAGE,
  type Language,
  normalizeLanguage,
  t,
} from "../lib/i18n";
import { LanguageToggle } from "./language-toggle";
import { PreviewModeToggle } from "./preview-mode-toggle";
import { SiteMenu } from "./site-menu";

type SiteHeaderProps = {
  language?: Language | null;
};

const modeLinks = [
  {
    href: "/learner",
    label: "Learner",
  },
  {
    href: "/admin",
    label: "Admin",
  },
  {
    href: "/reviewer",
    label: "Reviewer",
  },
] as const;

function getSafeLanguage(language?: Language | null): Language {
  return normalizeLanguage(language ?? DEFAULT_LANGUAGE);
}

export function SiteHeader({ language }: SiteHeaderProps) {
  const safeLanguage = getSafeLanguage(language);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 px-5 py-3 text-white backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 text-lg font-black text-slate-950">
            K
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-black leading-none">
              {t(safeLanguage, "appName")}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {t(safeLanguage, "appTagline")}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {modeLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/5 hover:text-emerald-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <PreviewModeToggle language={safeLanguage} />
          </div>
          <LanguageToggle language={safeLanguage} />
          <SiteMenu language={safeLanguage} />
        </div>
      </div>
    </header>
  );
}
