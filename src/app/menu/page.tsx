import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n-server";
import {
  localize,
  navigationSections,
  primaryNavigationLinks,
} from "@/lib/navigation";

function audienceClass(audience: string) {
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

export default async function MenuPage() {
  const language = await getServerLanguage();

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra Menu
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {language === "id"
                ? "Navigasi berdasarkan mode pengguna."
                : "Navigation by user mode."}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Gunakan halaman ini untuk memilih jalur yang tepat: learner, admin, reviewer, atau dokumentasi. Ini membantu reviewer memahami sedang berada sebagai siapa saat mengevaluasi Karyra."
                : "Use this page to choose the right path: learner, admin, reviewer, or documentation. This helps reviewers understand which role they are using when evaluating Karyra."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/reviewer"
              className="rounded-2xl bg-sky-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-200"
            >
              Reviewer Mode
            </Link>
            <Link
              href="/dashboard"
              className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-bold text-emerald-300 transition hover:bg-emerald-400/20"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-4">
          {primaryNavigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-5 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
            >
              <div className="flex flex-wrap gap-2">
                {link.badge ? (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-300">
                    {link.badge}
                  </span>
                ) : null}
                {link.audience ? (
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${audienceClass(
                      link.audience,
                    )}`}
                  >
                    {link.audience}
                  </span>
                ) : null}
              </div>
              <h2 className="mt-4 text-xl font-bold">
                {localize(language, link.titleId, link.titleEn)}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {localize(language, link.descriptionId, link.descriptionEn)}
              </p>
            </Link>
          ))}
        </section>

        <section className="grid gap-6">
          {navigationSections.map((section) => (
            <article
              key={section.titleEn}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${audienceClass(
                      section.audience,
                    )}`}
                  >
                    {section.audience}
                  </span>
                  <h2 className="mt-4 text-3xl font-bold">
                    {localize(language, section.titleId, section.titleEn)}
                  </h2>
                  <p className="mt-3 max-w-3xl leading-8 text-slate-300">
                    {localize(
                      language,
                      section.descriptionId,
                      section.descriptionEn,
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {section.links.map((link) => (
                  <Link
                    key={`${section.titleEn}-${link.href}`}
                    href={link.href}
                    className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-emerald-400/40"
                  >
                    <div className="flex flex-wrap gap-2">
                      {link.badge ? (
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-300">
                          {link.badge}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-4 text-xl font-bold">
                      {localize(language, link.titleId, link.titleEn)}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {localize(
                        language,
                        link.descriptionId,
                        link.descriptionEn,
                      )}
                    </p>
                    <p className="mt-4 text-sm font-bold text-emerald-300">
                      Open →
                    </p>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
