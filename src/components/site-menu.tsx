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

function audienceLabel(language: Language, audience?: string) {
  switch (audience) {
    case "learner":
      return language === "id" ? "Learner" : "Learner";
    case "admin":
      return language === "id" ? "Admin" : "Admin";
    case "reviewer":
      return language === "id" ? "Reviewer" : "Reviewer";
    case "docs":
      return language === "id" ? "Docs" : "Docs";
    default:
      return language === "id" ? "Link" : "Link";
  }
}

function audienceClass(audience?: string) {
  switch (audience) {
    case "learner":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    case "admin":
      return "border-rose-400/30 bg-rose-400/10 text-rose-300";
    case "reviewer":
      return "border-sky-400/30 bg-sky-400/10 text-sky-300";
    case "docs":
      return "border-violet-400/30 bg-violet-400/10 text-violet-300";
    default:
      return "border-white/10 bg-white/5 text-slate-300";
  }
}

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
        link.audience ?? "",
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
          className="absolute right-0 z-50 mt-3 w-[min(92vw,44rem)] rounded-[2rem] border border-white/10 bg-slate-950/95 p-4 text-white shadow-2xl backdrop-blur md:p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Karyra Navigation
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                {language === "id"
                  ? "Pilih mode navigasi"
                  : "Choose navigation mode"}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                {language === "id"
                  ? "Menu dipisah agar reviewer bisa membedakan alur learner, admin, reviewer, dan dokumentasi."
                  : "The menu is grouped so reviewers can distinguish learner, admin, reviewer, and docs flows."}
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
                ? "Cari learner, admin, reviewer, Stellar, proof..."
                : "Search learner, admin, reviewer, Stellar, proof..."
            }
            className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400"
          />

          {query.trim() ? (
            <div className="mt-4 grid max-h-[60vh] gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link) => (
                  <Link
                    key={`${link.href}-${link.titleEn}`}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold">
                        {localize(language, link.titleId, link.titleEn)}
                      </h3>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${audienceClass(
                          link.audience,
                        )}`}
                      >
                        {audienceLabel(language, link.audience)}
                      </span>
                      {link.badge ? (
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-slate-300">
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
                <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400 sm:col-span-2">
                  {language === "id"
                    ? "Tidak ada hasil. Coba kata lain seperti learner, admin, reviewer, passport, stellar, proof, atau docs."
                    : "No results. Try learner, admin, reviewer, passport, stellar, proof, or docs."}
                </p>
              )}
            </div>
          ) : (
            <div className="mt-4 grid max-h-[60vh] gap-3 overflow-y-auto pr-1 md:grid-cols-2">
              {navigationSections.map((section) => (
                <div
                  key={section.titleEn}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${audienceClass(
                          section.audience,
                        )}`}
                      >
                        {audienceLabel(language, section.audience)}
                      </p>
                      <h3 className="mt-3 font-bold">
                        {localize(language, section.titleId, section.titleEn)}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {localize(
                      language,
                      section.descriptionId,
                      section.descriptionEn,
                    )}
                  </p>

                  <div className="mt-3 grid gap-2">
                    {section.links.slice(0, 4).map((link) => (
                      <Link
                        key={`${section.titleEn}-${link.href}`}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="rounded-xl bg-slate-950/60 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-emerald-400/10 hover:text-emerald-200"
                      >
                        {localize(language, link.titleId, link.titleEn)}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href="/reviewer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center rounded-2xl border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-sm font-bold text-sky-200 transition hover:bg-sky-400/20"
            >
              {language === "id" ? "Mulai dari Reviewer Mode" : "Start Reviewer Mode"}
            </Link>
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
