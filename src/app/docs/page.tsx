import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n-server";

const docLinks = [
  {
    href: "/proof-system",
    title: "Proof System",
    descriptionId: "Identitas produk utama: Proof-of-Learning, Proof-of-Participation, dan Proof-of-Readiness.",
    descriptionEn: "Core product identity: Proof-of-Learning, Proof-of-Participation, and Proof-of-Readiness.",
    badge: "Core",
  },
  {
    href: "/docs/architecture",
    title: "Architecture",
    descriptionId: "Bagaimana learning, quest, passport, proof, Stellar, dan Filecoin saling terhubung.",
    descriptionEn: "How learning, quests, passport, proofs, Stellar, and Filecoin connect.",
    badge: "Tech",
  },
  {
    href: "/roadmap",
    title: "Roadmap",
    descriptionId: "Arah pengembangan produk Karyra dari MVP menuju platform produksi.",
    descriptionEn: "Karyra's product direction from MVP toward production platform.",
    badge: "Plan",
  },
  {
    href: "/changelog",
    title: "Changelog",
    descriptionId: "Riwayat perkembangan dan pembaruan produk.",
    descriptionEn: "Product progress and update history.",
    badge: "Log",
  },
  {
    href: "/status",
    title: "Status",
    descriptionId: "Snapshot metrik produk, proof, readiness, dan komunitas.",
    descriptionEn: "Product, proof, readiness, and community metrics snapshot.",
    badge: "Open",
  },
];

export default async function DocsPage() {
  const language = await getServerLanguage();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Karyra Docs</p>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
            {language === "id" ? "Dokumentasi produk, bukan halaman utama." : "Product documentation, not the homepage."}
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            {language === "id"
              ? "Penjelasan panjang tentang arsitektur, roadmap, dan status dipusatkan di sini agar halaman utama tetap bersih dan fokus pada identitas produk."
              : "Long-form explanations about architecture, roadmap, and status live here so the homepage stays clean and focused on product identity."}
          </p>
        </header>

        <section className="grid gap-3 md:grid-cols-2">
          {docLinks.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40 hover:bg-emerald-400/10">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-black text-emerald-300">
                {item.badge}
              </span>
              <h2 className="mt-4 text-xl font-black">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {language === "id" ? item.descriptionId : item.descriptionEn}
              </p>
            </Link>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
          <h2 className="text-2xl font-black">{language === "id" ? "Internal tools disembunyikan dari navigasi publik." : "Internal tools are hidden from public navigation."}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            {language === "id"
              ? "Admin console, QA checklist, system health, dan reviewer/grant tools tetap ada untuk pengembangan dan evaluasi, tetapi tidak ditampilkan sebagai identitas produk publik."
              : "Admin console, QA checklist, system health, and reviewer/grant tools remain available for development and evaluation, but are not presented as the public product identity."}
          </p>
          <Link href="/login" className="mt-4 inline-flex min-h-11 items-center rounded-2xl bg-emerald-400 px-4 py-2.5 text-sm font-black text-slate-950">
            {language === "id" ? "Masuk ke demo/internal" : "Enter demo/internal"}
          </Link>
        </section>
      </section>
    </main>
  );
}
