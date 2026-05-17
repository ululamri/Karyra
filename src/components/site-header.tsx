import Link from "next/link";
import { type Language, t } from "../lib/i18n";
import { LanguageToggle } from "./language-toggle";
import { PreviewModeToggle } from "./preview-mode-toggle";

type SiteHeaderProps = {
  language: Language;
};

const navItems = [
  {
    href: "/courses",
    key: "courses",
  },
  {
    href: "/quests",
    key: "quests",
  },
  {
    href: "/workshops",
    key: "workshops",
  },
  {
    href: "/dashboard",
    key: "dashboard",
  },
  {
    href: "/status",
    key: "status",
  },
  {
    href: "/changelog",
    key: "changelog",
  },
  {
    href: "/reviewer-guide",
    key: "reviewerGuide",
  },
  {
    href: "/admin",
    key: "admin",
  },
] as const;

export function SiteHeader({ language }: SiteHeaderProps) {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 px-5 py-4 text-white backdrop-blur md:px-8 md:py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <Link href="/" className="min-w-0">
          <p className="text-xl font-bold leading-none md:text-2xl">
            {t(language, "appName")}
          </p>
          <p className="mt-1 truncate text-xs text-slate-400 md:text-sm">
            {t(language, "appTagline")}
          </p>
        </Link>

        <nav className="desktop-nav hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium text-slate-300 transition hover:text-white"
            >
              {t(language, item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <LanguageToggle language={language} />
          <PreviewModeToggle language={language} />
        </div>
      </div>
    </header>
  );
}