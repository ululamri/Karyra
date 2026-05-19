import Link from "next/link";
import { type Language, t } from "../lib/i18n";
import { LanguageToggle } from "./language-toggle";
import { PreviewModeToggle } from "./preview-mode-toggle";
import { SiteMenu } from "./site-menu";

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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 px-5 py-4 text-white backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-lg font-black text-slate-950 transition group-hover:bg-emerald-300">
            K
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-black leading-tight">
              {t(language, "appName")}
            </p>
            <p className="hidden truncate text-xs text-slate-400 sm:block">
              {t(language, "appTagline")}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {t(language, item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <PreviewModeToggle language={language} />
            <LanguageToggle language={language} />
          </div>

          <SiteMenu language={language} />
        </div>
      </div>
    </header>
  );
}
