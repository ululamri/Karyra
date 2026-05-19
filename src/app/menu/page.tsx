import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n-server";
import { flatNavigationLinks, localize, navigationSections } from "@/lib/navigation";
import { PageShell } from "@/components/ui/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { CompactCard, MetricCard } from "@/components/ui/compact-card";
import { ModePill } from "@/components/ui/mode-pill";

const featured = [
  { href: "/learner", title: "Learner Mode", description: "User-facing journey: dashboard, courses, quests, passport.", badge: "User" },
  { href: "/admin", title: "Admin Mode", description: "Internal tools: review, proof archive, learner readiness, health.", badge: "Admin" },
  { href: "/reviewer", title: "Reviewer Mode", description: "Grant/investor review: package, demo, impact, QA, docs.", badge: "Review" },
];

export default async function MenuPage() {
  const language = await getServerLanguage();

  return (
    <PageShell>
      <PageHero
        eyebrow="Karyra Navigation"
        title={language === "id" ? "Pilih area sesuai peran." : "Choose an area by role."}
        description={language === "id" ? "Navigasi penuh tetap tersedia, tetapi dipisahkan berdasarkan Learner, Admin, Reviewer, Local Pilot, dan Docs agar MVP tidak terasa bercampur." : "Full navigation is available, but separated by Learner, Admin, Reviewer, Local Pilot, and Docs so the MVP does not feel mixed."}
        actions={[{ href: "/", label: "Gateway" }, { href: "/grant-package", label: "Grant Package", variant: "primary" }]}
      >
        <ModePill mode="Public" label="Full Navigation Hub" />
      </PageHero>

      <section className="grid gap-3 md:grid-cols-3">
        {featured.map((item) => <CompactCard key={item.href} href={item.href} eyebrow="Featured" title={item.title} description={item.description} badge={item.badge} />)}
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {navigationSections.map((section) => <MetricCard key={section.id} label={localize(language, section.titleId, section.titleEn)} value={section.links.length} hint="links" />)}
      </section>

      <section className="grid gap-5">
        {navigationSections.map((section) => (
          <div key={section.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:p-5">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">{section.id.replace("-", " ")}</p>
                <h2 className="mt-1 text-xl font-bold md:text-2xl">{localize(language, section.titleId, section.titleEn)}</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">{localize(language, section.descriptionId, section.descriptionEn)}</p>
              </div>
              <p className="text-sm text-slate-500">{section.links.length} links</p>
            </div>
            <div className="mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {section.links.map((link) => (
                <Link key={`${section.id}-${link.href}`} href={link.href} className="rounded-2xl border border-white/10 bg-slate-950/50 p-3 transition hover:border-emerald-400/40 hover:bg-emerald-400/10">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-white">{localize(language, link.titleId, link.titleEn)}</h3>
                    {link.badge ? <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">{link.badge}</span> : null}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{localize(language, link.descriptionId, link.descriptionEn)}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <p className="text-center text-xs text-slate-500">{flatNavigationLinks.length} total links · MVP preview navigation</p>
    </PageShell>
  );
}
