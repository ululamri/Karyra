import Link from "next/link";
import type { Language } from "../lib/i18n";
import { localize, navigationSections, primaryNavigationLinks } from "../lib/navigation";

type SiteFooterProps = {
  language: Language;
};

const footerHighlights = [
  {
    href: "/passport",
    titleId: "Readiness Passport",
    titleEn: "Readiness Passport",
    descriptionId: "Score, proof, badge, timeline, dan share summary learner.",
    descriptionEn: "Learner score, proofs, badges, timeline, and share summary.",
  },
  {
    href: "/stacks/stellar-readiness",
    titleId: "Stellar Readiness",
    titleEn: "Stellar Readiness",
    descriptionId: "Jalur kesiapan pembayaran Web3 sebelum transaksi nyata.",
    descriptionEn: "A Web3 payment-readiness path before real transactions.",
  },
  {
    href: "/admin/proofs",
    titleId: "Filecoin Proof Archive",
    titleEn: "Filecoin Proof Archive",
    descriptionId: "Demo manifest, checksum, CID, dan proof verification.",
    descriptionEn: "Demo manifest, checksum, CID, and proof verification.",
  },
];

export function SiteFooter({ language }: SiteFooterProps) {
  const publicReviewSection = navigationSections.find(
    (section) => section.titleEn === "Public Review",
  );

  const docsSection = navigationSections.find(
    (section) => section.titleEn === "Docs & Admin",
  );

  return (
    <footer className="border-t border-white/10 bg-slate-950 px-5 pb-28 pt-10 text-white md:px-8 md:pb-10">
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Link href="/" className="inline-flex flex-col">
            <span className="text-2xl font-black tracking-tight text-emerald-300">
              Karyra
            </span>
            <span className="mt-1 text-sm text-slate-400">
              {language === "id"
                ? "Local Web3 readiness infrastructure"
                : "Local Web3 readiness infrastructure"}
            </span>
          </Link>

          <p className="mt-5 max-w-2xl leading-8 text-slate-300">
            {language === "id"
              ? "Karyra membantu komunitas lokal non-teknikal membangun kesiapan Web3 melalui pembelajaran, quest, passport, proof archive, dan jalur kesiapan pembayaran berbasis Stellar."
              : "Karyra helps local non-technical communities build Web3 readiness through learning, quests, passports, proof archives, and Stellar-based payment readiness."}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {primaryNavigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:border-emerald-400/40 hover:text-emerald-200"
              >
                {localize(language, link.titleId, link.titleEn)}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {footerHighlights.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
            >
              <h3 className="font-bold text-white">
                {localize(language, item.titleId, item.titleEn)}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {localize(language, item.descriptionId, item.descriptionEn)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 border-t border-white/10 pt-8 md:grid-cols-3">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">
            {language === "id" ? "Navigasi" : "Navigation"}
          </h3>
          <div className="mt-4 grid gap-2">
            <Link className="text-sm text-slate-400 hover:text-emerald-300" href="/menu">
              {language === "id" ? "Menu Lengkap" : "Full Menu"}
            </Link>
            <Link className="text-sm text-slate-400 hover:text-emerald-300" href="/demo">
              Demo Path
            </Link>
            <Link className="text-sm text-slate-400 hover:text-emerald-300" href="/mvp-map">
              MVP Map
            </Link>
            <Link className="text-sm text-slate-400 hover:text-emerald-300" href="/status">
              {language === "id" ? "Status Proyek" : "Project Status"}
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">
            {language === "id" ? "Review Publik" : "Public Review"}
          </h3>
          <div className="mt-4 grid gap-2">
            {(publicReviewSection?.links.slice(0, 5) ?? []).map((link) => (
              <Link
                key={link.href}
                className="text-sm text-slate-400 hover:text-emerald-300"
                href={link.href}
              >
                {localize(language, link.titleId, link.titleEn)}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">
            Docs & Admin
          </h3>
          <div className="mt-4 grid gap-2">
            {(docsSection?.links.slice(0, 5) ?? []).map((link) => (
              <Link
                key={link.href}
                className="text-sm text-slate-400 hover:text-emerald-300"
                href={link.href}
              >
                {localize(language, link.titleId, link.titleEn)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>
          {language === "id"
            ? "Dibangun sebagai MVP edukasi, readiness, dan proof infrastructure untuk komunitas lokal."
            : "Built as an education, readiness, and proof infrastructure MVP for local communities."}
        </p>
        <p>Filecoin Proof Archive demo · Stellar Readiness Track · Karyra Passport</p>
      </section>
    </footer>
  );
}
