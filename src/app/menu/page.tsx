import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n-server";
import { localize, navigationSections } from "@/lib/navigation";

export default async function MenuPage() {
  const language = await getServerLanguage();

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-300">
            Karyra Role Navigation
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            {language === "id"
              ? "Pilih area sesuai peran."
              : "Choose an area by role."}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            {language === "id"
              ? "Karyra MVP memisahkan pengalaman learner, admin, reviewer/grantee, local pilot, dan dokumentasi agar navigasi demo tidak bercampur."
              : "The Karyra MVP separates learner, admin, reviewer/grantee, local pilot, and documentation experiences so the demo navigation does not feel mixed."}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {navigationSections.map((section) => (
            <section
              key={section.id}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
                {section.id.replace("-", " ")}
              </p>
              <h2 className="mt-3 text-2xl font-black">
                {localize(language, section.titleId, section.titleEn)}
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                {localize(
                  language,
                  section.descriptionId,
                  section.descriptionEn,
                )}
              </p>

              <div className="mt-5 grid gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
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
                      {link.badge ? (
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-300">
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
      </section>
    </main>
  );
}
