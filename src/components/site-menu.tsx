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
        ☰ Menu
      </button>

      {isOpen ? (
        <div
          id="site-menu-panel"
          className="absolute right-0 top-14 z-[80] w-[min(92vw,980px)] rounded-[2rem] border border-white/10 bg-slate-950 p-5 shadow-2xl shadow-black/50"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">
                Karyra Role Menu
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                {language === "id"
                  ? "Masuk sesuai peran"
                  : "Enter by role"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                {language === "id"
                  ? "Pilih pengalaman yang sesuai: learner, admin, reviewer/grantee, local pilot, atau docs. Ini menjaga demo MVP tidak bercampur."
                  : "Choose the right experience: learner, admin, reviewer/grantee, local pilot, or docs. This keeps the MVP demo from feeling mixed."}
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
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              language === "id"
                ? "Cari learner, admin, reviewer, passport, Stellar..."
                : "Search learner, admin, reviewer, passport, Stellar..."
            }
            className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400"
          />

          {query.trim() ? (
            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {language === "id" ? "Hasil pencarian" : "Search results"}
              </p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {filteredLinks.length > 0 ? (
                  filteredLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-bold text-white">
                          {localize(language, link.titleId, link.titleEn)}
                        </h3>
                        {link.badge ? (
                          <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-bold uppercase text-emerald-300">
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
                  <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
                    {language === "id"
                      ? "Tidak ada hasil. Coba learner, admin, reviewer, passport, stellar, proof, atau grant."
                      : "No results. Try learner, admin, reviewer, passport, stellar, proof, or grant."}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-5 grid max-h-[65vh] gap-4 overflow-y-auto pr-1 lg:grid-cols-2">
              {navigationSections.map((section) => (
                <section
                  key={section.id}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
                >
                  <h3 className="font-black text-white">
                    {localize(language, section.titleId, section.titleEn)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {localize(
                      language,
                      section.descriptionId,
                      section.descriptionEn,
                    )}
                  </p>
                  <div className="mt-4 grid gap-2">
                    {section.links.slice(0, 5).map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="rounded-2xl border border-white/10 bg-slate-950/50 p-3 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-bold text-white">
                            {localize(language, link.titleId, link.titleEn)}
                          </span>
                          {link.badge ? (
                            <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-bold uppercase text-emerald-300">
                              {link.badge}
                            </span>
                          ) : null}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          <Link
            href="/menu"
            onClick={() => setIsOpen(false)}
            className="mt-5 flex items-center justify-center rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
          >
            {language === "id" ? "Buka Menu Lengkap" : "Open Full Menu"}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
