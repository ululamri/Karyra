import Link from "next/link";
import { getServerLanguage } from "../../lib/i18n-server";
import {
  localize,
  navigationSections,
  primaryNavigationLinks,
} from "../../lib/navigation";

export default async function MenuPage() {
  const language = await getServerLanguage();

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra Menu
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {language === "id"
                ? "Navigasi cepat untuk seluruh MVP."
                : "Fast navigation for the whole MVP."}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Gunakan halaman ini untuk membuka learner flow, Readiness Passport, Filecoin Proof Archive, Stellar Readiness, docs, reviewer flow, dan admin console tanpa mencari satu per satu."
                : "Use this page to open learner flow, Readiness Passport, Filecoin Proof Archive, Stellar Readiness, docs, reviewer flow, and the admin console without hunting page by page."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Demo Path
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {primaryNavigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">
                  {localize(language, link.titleId, link.titleEn)}
                </h2>
                {link.badge ? (
                  <span className="rounded-full bg-slate-950/60 px-3 py-1 text-xs font-bold text-emerald-300">
                    {link.badge}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {localize(language, link.descriptionId, link.descriptionEn)}
              </p>
            </Link>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {navigationSections.map((section) => (
            <div
              key={section.titleEn}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                {localize(language, section.titleId, section.titleEn)}
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                {localize(language, section.titleId, section.titleEn)}
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                {localize(
                  language,
                  section.descriptionId,
                  section.descriptionEn,
                )}
              </p>

              <div className="mt-6 grid gap-3">
                {section.links.map((link) => (
                  <Link
                    key={`${section.titleEn}-${link.href}`}
                    href={link.href}
                    className="rounded-3xl border border-white/10 bg-slate-950/50 p-4 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-bold text-white">
                          {localize(language, link.titleId, link.titleEn)}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {localize(
                            language,
                            link.descriptionId,
                            link.descriptionEn,
                          )}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 text-sm font-bold text-emerald-300">
                        {link.badge ? (
                          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs">
                            {link.badge}
                          </span>
                        ) : null}
                        <span>Open →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
