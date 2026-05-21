import Link from "next/link";

const docLinks = [
  {
    href: "/docs/product-narrative",
    title: "Narasi Produk",
    description:
      "Masalah utama, pendekatan blockchain-first, dan alasan Karyra dibangun untuk masyarakat lokal.",
    badge: "Fondasi",
  },
  {
    href: "/docs/filecoin-stellar",
    title: "Strategi Filecoin + Stellar",
    description:
      "Peran Filecoin sebagai proof archive layer dan Stellar sebagai safe practice layer.",
    badge: "Target",
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
  {
    href: "/filecoin-proof-archive",
    title: "Filecoin Proof Archive",
    description:
      "Lapisan arsip bukti untuk proof manifest, snapshot paspor, checksum, dan PieceCID/CID.",
    badge: "Filecoin",
  },
  {
    href: "/stacks/stellar-readiness",
    title: "Stellar Readiness Track",
    description:
      "Jalur latihan aman untuk wallet safety, memo, asset, trustline, payment, dan SEP-10 awareness.",
    badge: "Stellar",
  },
  {
    href: "/about",
    title: "Tentang Karyra",
    description:
      "Penjelasan singkat tentang arah, prinsip, dan alasan Karyra dibangun.",
    badge: "About",
  },
  {
    href: "/faq",
    title: "FAQ",
    description:
      "Pertanyaan umum tentang Karyra, Paspor Kesiapan, quest, reward, dan fase demo.",
    badge: "FAQ",
  },
  {
    href: "/terms",
    title: "Ketentuan",
    description:
      "Batasan penggunaan, disclaimer edukasi, dan risiko teknologi blockchain.",
    badge: "Legal",
  },
  {
    href: "/demo-flow",
    title: "Alur Demo",
    description:
      "Rute singkat agar reviewer dapat memahami Karyra tanpa menebak halaman mana yang harus dibuka.",
    badge: "Demo",
  },
  {
    href: "/proof-system",
    title: "Sistem Bukti",
    description:
      "Bukti Belajar, Bukti Partisipasi, dan Bukti Kesiapan sebagai kerangka utama Karyra.",
    badge: "Bukti",
  },
  {
    href: "/roadmap",
    title: "Roadmap",
    description:
      "Arah pengembangan produk dari pembelajaran inti menuju readiness dan komunitas.",
    badge: "Rencana",
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
            Dokumentasi ini membantu menjaga narasi Karyra tetap jelas: mulai dari masalah salah paham tentang blockchain, Filecoin Proof Archive, Stellar Readiness Track, Paspor Kesiapan, alur demo, sampai ketentuan penggunaan.
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
