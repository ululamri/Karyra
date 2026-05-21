import Link from "next/link";
import {
  DEFAULT_LANGUAGE,
  type Language,
  normalizeLanguage,
  t,
} from "../lib/i18n";
import { PreviewModeToggle } from "./preview-mode-toggle";
import { SiteMenu } from "./site-menu";

type SiteHeaderProps = {
  language?: Language | null;
};

const publicLinks = [
  { href: "/", label: "Beranda" },
  { href: "/courses", label: "Kursus" },
  { href: "/lessons", label: "Pelajaran" },
  { href: "/dashboard", label: "Dasbor" },
  { href: "/passport", label: "Paspor" },
] as const;

function getSafeLanguage(language?: Language | null): Language {
  return normalizeLanguage(language ?? DEFAULT_LANGUAGE);
}

export function SiteHeader({ language }: SiteHeaderProps) {
  const safeLanguage = getSafeLanguage(language);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/92 px-4 py-2.5 text-white backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-base font-black text-slate-950">
            K
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-black leading-none md:text-base">
              {t(safeLanguage, "appName")}
            </p>
            <p className="mt-1 hidden truncate text-xs text-slate-400 sm:block">
              Ruang kesiapan blockchain lokal
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {publicLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl px-3 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/5 hover:text-emerald-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <PreviewModeToggle language={safeLanguage} />
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/login"
              className="inline-flex min-h-10 items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black text-white transition hover:border-emerald-400/40 hover:bg-white/10"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="inline-flex min-h-10 items-center rounded-2xl bg-emerald-400 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              Daftar
            </Link>
          </div>

          <SiteMenu language={safeLanguage} />
        </div>
      </div>
    </header>
  );
}
