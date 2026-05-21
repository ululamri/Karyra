import Link from "next/link";

const docLinks = [
  {
    href: "/docs/mainnet-graduation",
    title: "Testnet-to-Mainnet Graduation",
    description:
      "Model latihan aman di testnet/calibration sebelum pengalaman mainnet terbimbing.",
    badge: "Mainnet",
  },
  {
    href: "/docs/grant-architecture",
    title: "Grant Architecture",
    description:
      "Dual-Network Architecture Ecosystem: Karyra, Filecoin Proof Archive, dan Stellar Readiness Track.",
    badge: "Arsitektur",
  },
  {
    href: "/docs/filecoin-stellar",
    title: "Strategi Filecoin + Stellar",
    description:
      "Peran Filecoin sebagai proof archive layer dan Stellar sebagai safe practice + financial access layer.",
    badge: "Target",
  },
  {
    href: "/docs/filecoin-architecture",
    title: "Filecoin Storage Architecture",
    description:
      "Calibration testing, Filecoin Mainnet archive, Synapse SDK, Lighthouse.storage, Web3.Storage, dan Storage Providers.",
    badge: "Filecoin",
  },
  {
    href: "/docs/stellar-testnet-flow",
    title: "Stellar Testnet Flow",
    description:
      "Friendbot, testnet XLM, memo awareness, trustline simulation, payment readiness, dan guided mainnet experience.",
    badge: "Stellar",
  },
  {
    href: "/docs/impact-metrics",
    title: "Impact Metrics",
    description:
      "Target 1.000 pengguna lokal, Stellar Payment Readiness, dan Filecoin Learning Passport CID.",
    badge: "Impact",
  },
  {
    href: "/docs/open-source",
    title: "Open Source & Transparansi",
    description:
      "GitHub, roadmap, changelog, lisensi open source, dan checklist repository untuk reviewer.",
    badge: "Open",
  },
  {
    href: "/docs/product-narrative",
    title: "Narasi Produk",
    description:
      "Masalah utama, pendekatan blockchain-first, dan alasan Karyra dibangun untuk masyarakat lokal.",
    badge: "Fondasi",
  },
  {
    href: "/docs/readiness-passport",
    title: "Paspor Kesiapan",
    description:
      "Cara Paspor Kesiapan membaca bukti belajar, partisipasi, readiness score, dan arsip bukti.",
    badge: "Paspor",
  },
  {
    href: "/docs/grant-readiness",
    title: "Kesiapan Grant",
    description:
      "Checklist internal untuk melihat apa yang sudah kuat dan apa yang masih perlu dipoles sebelum apply.",
    badge: "Grant",
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
            Dokumentasi Karyra
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
            Pusat penjelasan produk dan kesiapan grant.
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            Dokumentasi ini menjadi sumber utama untuk proposal, pitch deck, whitepaper, reviewer flow, dan pembaruan publik Karyra.
          </p>
        </header>

        <section className="grid gap-3 md:grid-cols-2">
          {docLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
            >
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-black text-emerald-300">
                {item.badge}
              </span>
              <h2 className="mt-4 text-xl font-black">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {item.description}
              </p>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}
