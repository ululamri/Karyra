import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n-server";

const docLinks = [
  {
    href: "/docs/architecture",
    titleId: "Arsitektur Produk",
    titleEn: "Product Architecture",
    descriptionId:
      "Peta lapisan Karyra: learning, quest, readiness passport, Filecoin proof archive, Stellar readiness, dan admin console.",
    descriptionEn:
      "Karyra layers: learning, quests, readiness passport, Filecoin proof archive, Stellar readiness, and admin console.",
    badge: "Architecture",
  },
  {
    href: "/docs/grant-readiness",
    titleId: "Grant Readiness Checklist",
    titleEn: "Grant Readiness Checklist",
    descriptionId:
      "Checklist kesiapan MVP untuk reviewer: fitur aktif, demo flow, proof layer, impact signal, dan bagian yang masih demo.",
    descriptionEn:
      "MVP readiness checklist for reviewers: active features, demo flow, proof layer, impact signals, and demo-only parts.",
    badge: "Review",
  },
  {
    href: "/mvp-map",
    titleId: "MVP Map",
    titleEn: "MVP Map",
    descriptionId:
      "Peta alur produk dari course, quest, admin review, proof archive, passport, sampai impact report.",
    descriptionEn:
      "Product flow map from courses, quests, admin review, proof archive, passport, and impact report.",
    badge: "Flow",
  },
  {
    href: "/reviewer-guide",
    titleId: "Reviewer Guide",
    titleEn: "Reviewer Guide",
    descriptionId:
      "Panduan cepat untuk mencoba dan mengevaluasi MVP Karyra.",
    descriptionEn:
      "A quick guide to try and evaluate the Karyra MVP.",
    badge: "Demo",
  },
];

export default async function DocsPage() {
  const language = await getServerLanguage();

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra Docs
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {language === "id"
                ? "Dokumentasi publik untuk memahami MVP Karyra."
                : "Public documentation to understand the Karyra MVP."}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Halaman ini mengumpulkan dokumen penting agar reviewer, mentor, contributor, dan calon partner bisa memahami posisi produk Karyra tanpa menebak-nebak struktur MVP."
                : "This page gathers key documents so reviewers, mentors, contributors, and potential partners can understand Karyra without guessing the MVP structure."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Home
            </Link>
            <Link
              href="/status"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Status
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2">
          {docLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/40 md:p-8"
            >
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-300">
                {item.badge}
              </span>
              <h2 className="mt-5 text-2xl font-bold">
                {language === "id" ? item.titleId : item.titleEn}
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                {language === "id" ? item.descriptionId : item.descriptionEn}
              </p>
              <p className="mt-5 text-sm font-bold text-emerald-300">
                Open →
              </p>
            </Link>
          ))}
        </section>

        <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
            Documentation Principle
          </p>
          <h2 className="mt-4 text-3xl font-bold">
            {language === "id"
              ? "Dokumentasi harus membantu orang memahami alur, bukan hanya membaca klaim."
              : "Documentation should help people understand flows, not just read claims."}
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            {language === "id"
              ? "Karena Karyra ditujukan untuk komunitas lokal non-teknikal, dokumentasi publik juga dibuat dengan gaya human-readable: jalur produk, bukti yang bisa dicek, status yang transparan, dan batasan MVP yang jelas."
              : "Because Karyra targets non-technical local communities, its public documentation is also human-readable: product flows, reviewable proofs, transparent status, and clear MVP boundaries."}
          </p>
        </section>
      </section>
    </main>
  );
}
