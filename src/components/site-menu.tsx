"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Language } from "@/lib/i18n";
import {
  flatNavigationLinks,
  localize,
  navigationSections,
  primaryNavigationLinks,
} from "@/lib/navigation";

type SiteMenuProps = {
  language?: Language;
};

const fallbackLanguage: Language = "id";

export function SiteMenu({ language = fallbackLanguage }: SiteMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const safeLanguage = language ?? fallbackLanguage;

  const filteredLinks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return primaryNavigationLinks;

    return flatNavigationLinks.filter((link) =>
      [
        link.href,
        link.titleId,
        link.titleEn,
        link.descriptionId,
        link.descriptionEn,
        link.badge ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex min-h-10 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-slate-200 transition hover:border-emerald-400/40 hover:text-emerald-300"
        aria-expanded={isOpen}
        aria-controls="site-menu-panel"
      >
        ☰
        <span className="hidden sm:inline">Menu</span>
      </button>

      {isOpen ? (
        <div
          id="site-menu-panel"
          className="absolute right-0 z-50 mt-3 w-[min(92vw,400px)] rounded-3xl border border-white/10 bg-slate-950/96 p-4 shadow-2xl shadow-black/50 backdrop-blur"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
                Karyra
              </p>
              <h2 className="mt-1 text-lg font-bold text-white">
                Navigasi belajar
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Pilih area utama Karyra: kursus, pelajaran, dasbor, paspor, dan aktivitas komunitas.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-white/10 px-3 py-1 text-sm font-bold text-slate-300 transition hover:border-emerald-400/40 hover:text-emerald-200"
              aria-label="Tutup menu"
            >
              ×
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:hidden">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black text-white transition hover:border-emerald-400/40"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-emerald-400 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              Daftar
            </Link>
          </div>

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari kursus, pelajaran, paspor..."
            className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400"
          />

          {query.trim() ? (
            <div className="mt-4 grid max-h-[54vh] gap-2 overflow-y-auto pr-1">
              {filteredLinks.length > 0 ? (
                filteredLinks.slice(0, 10).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-white">
                        {localize(safeLanguage, link.titleId, link.titleEn)}
                      </h3>
                      {link.badge ? (
                        <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                          {link.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                      {localize(safeLanguage, link.descriptionId, link.descriptionEn)}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-400">
                  Tidak ada hasil.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-4 grid gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Jalur utama
                </p>
                <div className="grid gap-2">
                  {primaryNavigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-sm font-bold text-white transition hover:border-emerald-400/40"
                    >
                      <span>{localize(safeLanguage, link.titleId, link.titleEn)}</span>
                      <span className="text-emerald-300">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Area tambahan
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {navigationSections.map((section) => (
                    <Link
                      key={section.id}
                      href={`/menu#${section.id}`}
                      onClick={() => setIsOpen(false)}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs font-bold text-white transition hover:border-emerald-400/40"
                    >
                      {localize(safeLanguage, section.titleId, section.titleEn)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
