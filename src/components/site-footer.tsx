import Link from "next/link";
import type { Language } from "../lib/i18n";
import { localize, primaryNavigationLinks } from "../lib/navigation";

type SiteFooterProps = {
  language: Language;
};

const footerHighlights = [
  {
    href: "/passport",
    title: "Paspor Kesiapan",
    description: "Ringkasan bukti belajar, partisipasi, readiness score, dan badge.",
  },
  {
    href: "/filecoin-proof-archive",
    title: "Filecoin Proof Archive",
    description: "Arsip bukti belajar dan partisipasi melalui manifest dan CID/PieceCID.",
  },
  {
    href: "/stacks/stellar-readiness",
    title: "Stellar Readiness",
    description: "Latihan aman untuk wallet, memo, asset, trustline, dan payment readiness.",
  },
];

const productLinks = [
  { href: "/about", label: "Tentang" },
  { href: "/courses", label: "Kursus" },
  { href: "/lessons", label: "Pelajaran" },
  { href: "/dashboard", label: "Dasbor" },
  { href: "/passport", label: "Paspor" },
];

const supportLinks = [
  { href: "/docs", label: "Dokumentasi" },
  { href: "/docs/filecoin-stellar", label: "Filecoin + Stellar" },
  { href: "/demo-flow", label: "Alur Demo" },
  { href: "/proof-system", label: "Sistem Bukti" },
  { href: "/faq", label: "FAQ" },
];

const legalLinks = [
  { href: "/terms", label: "Ketentuan" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/changelog", label: "Catatan Perubahan" },
];

export function SiteFooter({ language }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-5 pb-28 pt-10 text-white md:px-8 md:pb-10">
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-emerald-400/20 bg-white shadow-sm">
              <img
                src="/brand/karyra-icon.svg"
                alt="Logo Karyra"
                className="h-9 w-9"
              />
            </span>
            <span className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-emerald-300">
                Karyra
              </span>
              <span className="mt-1 text-sm text-slate-400">
                Ruang kesiapan blockchain lokal
              </span>
            </span>
          </Link>

          <p className="mt-5 max-w-2xl leading-8 text-slate-300">
            Karyra membantu masyarakat lokal memahami blockchain dari fondasi kepercayaan digital, mengarsipkan bukti belajar melalui Filecoin, dan melatih kesiapan wallet/payment melalui Stellar.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {primaryNavigationLinks.slice(0, 7).map((link) => (
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
              <h3 className="font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 border-t border-white/10 pt-8 md:grid-cols-3">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">
            Produk
          </h3>
          <div className="mt-4 grid gap-2">
            {productLinks.map((link) => (
              <Link
                key={link.href}
                className="text-sm text-slate-400 hover:text-emerald-300"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">
            Dokumentasi
          </h3>
          <div className="mt-4 grid gap-2">
            {supportLinks.map((link) => (
              <Link
                key={link.href}
                className="text-sm text-slate-400 hover:text-emerald-300"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">
            Transparansi
          </h3>
          <div className="mt-4 grid gap-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                className="text-sm text-slate-400 hover:text-emerald-300"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>
          Dibangun sebagai ruang edukasi, readiness, dan proof infrastructure untuk komunitas lokal.
        </p>
        <p>Karyra · Filecoin Proof Archive · Stellar Readiness Track</p>
      </section>
    </footer>
  );
}
