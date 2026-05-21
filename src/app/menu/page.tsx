import Link from "next/link";
import { localize, navigationSections } from "@/lib/navigation";

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
            Menu
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
            Navigasi Karyra.
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
            Menu publik hanya menampilkan area yang membantu pengguna belajar, memahami progres, mengikuti aktivitas komunitas, dan melihat Paspor Kesiapan.
          </p>
        </header>

        <section className="grid gap-5">
          {navigationSections.map((section) => (
            <div
              id={section.id}
              key={section.id}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                    {section.id}
                  </p>
                  <h2 className="mt-1 text-2xl font-black">
                    {localize("id", section.titleId, section.titleEn)}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    {localize("id", section.descriptionId, section.descriptionEn)}
                  </p>
                </div>
                <p className="text-sm text-slate-500">
                  {section.links.length} tautan
                </p>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {section.links.map((link) => (
                  <Link
                    key={`${section.id}-${link.href}`}
                    href={link.href}
                    className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-black text-white">
                        {localize("id", link.titleId, link.titleEn)}
                      </h3>
                      {link.badge ? (
                        <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-black text-emerald-300">
                          {link.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">
                      {localize("id", link.descriptionId, link.descriptionEn)}
                    </p>
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
