"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Language } from "../lib/i18n";
import {
  flatNavigationLinks,
  localize,
  navigationSections,
  primaryNavigationLinks,
} from "../lib/navigation";

type SiteMenuProps = {
  language: Language;
};

export function SiteMenu({ language }: SiteMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredLinks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return primaryNavigationLinks;
    }

    return flatNavigationLinks.filter((link) => {
      const haystack = [
        link.href,
        link.titleId,
        link.titleEn,
        link.descriptionId,
        link.descriptionEn,
        link.badge ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-sm font-bold text-emerald-200 transition hover:bg-emerald-400/20"
        aria-expanded={isOpen}
        aria-controls="site-menu-panel"
      >
        <span className="text-lg leading-none">☰</span>
        Menu
      </button>

      {isOpen ? (
        <div
          id="site-menu-panel"
          className="absolute right-0 z-50 mt-3 w-[min(92vw,28rem)] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40 backdrop-blur"
        >
          <div className="border-b border-white/10 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-emerald-300">
                  Karyra Navigation
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {language === "id"
                    ? "Akses cepat ke learner flow, proof, reviewer page, docs, dan admin."
                    : "Quick access to learner flow, proof, reviewer pages, docs, and admin."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-white/10 px-3 py-1 text-sm font-bold text-slate-300 transition hover:border-emerald-400/40 hover:text-emerald-200"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                language === "id"
                  ? "Cari passport, Stellar, docs..."
                  : "Search passport, Stellar, docs..."
              }
              className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400"
            />
          </div>

          <div className="max-h-[70vh] overflow-y-auto p-4">
            {query.trim() ? (
              <div className="grid gap-2">
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  {language === "id" ? "Hasil pencarian" : "Search results"}
                </p>

                {filteredLinks.length > 0 ? (
                  filteredLinks.map((link) => (
                    <Link
                      key={`${link.href}-${link.titleEn}`}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-bold text-white">
                          {localize(language, link.titleId, link.titleEn)}
                        </p>
                        {link.badge ? (
                          <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-bold text-emerald-300">
                            {link.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {localize(
                          language,
                          link.descriptionId,
                          link.descriptionEn,
                        )}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
                    {language === "id"
                      ? "Tidak ada hasil. Coba kata lain seperti passport, stellar, proof, atau admin."
                      : "No results. Try passport, stellar, proof, or admin."}
                  </p>
                )}
              </div>
            ) : (
              <div className="grid gap-5">
                {navigationSections.map((section) => (
                  <div key={section.titleEn}>
                    <div className="mb-3">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
                        {localize(language, section.titleId, section.titleEn)}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {localize(
                          language,
                          section.descriptionId,
                          section.descriptionEn,
                        )}
                      </p>
                    </div>

                    <div className="grid gap-2">
                      {section.links.slice(0, 4).map((link) => (
                        <Link
                          key={`${section.titleEn}-${link.href}`}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-bold text-white">
                              {localize(language, link.titleId, link.titleEn)}
                            </p>
                            {link.badge ? (
                              <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[0.68rem] font-bold text-emerald-300">
                                {link.badge}
                              </span>
                            ) : null}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-4">
            <Link
              href="/menu"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              {language === "id" ? "Buka Menu Lengkap" : "Open Full Menu"}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
