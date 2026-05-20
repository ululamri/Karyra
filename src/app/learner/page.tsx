import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";

const actions = [
  {
    href: "/courses",
    label: "Learn",
    titleId: "Mulai dari materi dasar",
    titleEn: "Start with basic lessons",
    textId: "Belajar Web3 dari konsep keamanan, wallet, payment, dan kebiasaan aman.",
    textEn: "Learn Web3 through safety concepts, wallets, payments, and safe habits.",
  },
  {
    href: "/quests?track=stellar-readiness",
    label: "Quest",
    titleId: "Bangun bukti kesiapan",
    titleEn: "Build readiness proof",
    textId: "Kerjakan quest dan checklist untuk membuktikan kesiapan sebelum transaksi.",
    textEn: "Complete quests and checklists to prove readiness before transactions.",
  },
  {
    href: "/workshops",
    label: "Participate",
    titleId: "Ikut komunitas lokal",
    titleEn: "Join local communities",
    textId: "Workshop dan onboarding lokal menjadi bagian dari Proof-of-Participation.",
    textEn: "Workshops and local onboarding become part of Proof-of-Participation.",
  },
  {
    href: "/passport",
    label: "Passport",
    titleId: "Lihat Readiness Passport",
    titleEn: "Open Readiness Passport",
    textId: "Lihat progress, badge, proof record, dan level kesiapanmu.",
    textEn: "View progress, badges, proof records, and your readiness level.",
  },
];

export default async function LearnerPage() {
  const language = await getServerLanguage();

  const [courseCount, questCount, workshopCount, proofCount] = await Promise.all([
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.workshop.count({ where: { status: { in: ["OPEN", "COMPLETED"] } } }),
    prisma.proofRecord.count(),
  ]);

  const stats = [
    { label: "Courses", value: courseCount },
    { label: "Quests", value: questCount },
    { label: "Workshops", value: workshopCount },
    { label: "Proofs", value: proofCount },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.1fr_0.75fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Learner App</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-6xl">
              {language === "id" ? "Belajar Web3 tanpa langsung takut transaksi." : "Learn Web3 without jumping straight into transactions."}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              {language === "id"
                ? "Karyra menuntun pemula dari pembelajaran, quest, workshop, lalu membentuk Readiness Passport sebagai bukti kesiapan."
                : "Karyra guides beginners from learning, quests, and workshops into a Readiness Passport that proves readiness."}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950">
                Dashboard
              </Link>
              <Link href="/proof-system" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white">
                Proof System
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs text-slate-400">{stat.label}</p>
                <p className="mt-1 text-2xl font-black">{stat.value}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {actions.map((action, index) => (
            <Link key={action.href} href={action.href} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40 hover:bg-emerald-400/10">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">0{index + 1} · {action.label}</p>
              <h2 className="mt-3 text-xl font-black">{language === "id" ? action.titleId : action.titleEn}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{language === "id" ? action.textId : action.textEn}</p>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}
