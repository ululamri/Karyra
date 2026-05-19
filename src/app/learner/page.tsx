import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";

const learnerActions = [
  {
    href: "/dashboard",
    titleId: "Buka Dashboard",
    titleEn: "Open Dashboard",
    descriptionId: "Lihat XP, badge, progress belajar, submission, dan workshop.",
    descriptionEn: "View XP, badges, learning progress, submissions, and workshops.",
  },
  {
    href: "/courses",
    titleId: "Mulai Course",
    titleEn: "Start Courses",
    descriptionId: "Ikuti materi Web3 dan Stellar readiness dari level pemula.",
    descriptionEn: "Follow beginner-friendly Web3 and Stellar readiness materials.",
  },
  {
    href: "/quests?track=stellar-readiness",
    titleId: "Kerjakan Quest Stellar",
    titleEn: "Do Stellar Quests",
    descriptionId: "Submit quest untuk membangun Proof-of-Readiness.",
    descriptionEn: "Submit quests to build Proof-of-Readiness.",
  },
  {
    href: "/passport",
    titleId: "Lihat Readiness Passport",
    titleEn: "View Readiness Passport",
    descriptionId: "Lihat score, level, proof record, badge, dan archive status.",
    descriptionEn: "View score, level, proof records, badges, and archive status.",
  },
  {
    href: "/stacks/stellar-readiness/checklist",
    titleId: "Coba Stellar Checklist",
    titleEn: "Try Stellar Checklist",
    descriptionId: "Checklist keamanan sebelum transaksi nyata.",
    descriptionEn: "Safety checklist before real transactions.",
  },
  {
    href: "/workshops",
    titleId: "Ikut Workshop",
    titleEn: "Join Workshops",
    descriptionId: "Daftar aktivitas offline/community onboarding.",
    descriptionEn: "Register for offline/community onboarding activities.",
  },
];

export default async function LearnerModePage() {
  const language = await getServerLanguage();

  const [courseCount, questCount, workshopCount, proofCount] = await Promise.all([
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.workshop.count({ where: { status: { in: ["OPEN", "COMPLETED"] } } }),
    prisma.proofRecord.count(),
  ]);

  const metrics = [
    { label: language === "id" ? "Course" : "Courses", value: courseCount },
    { label: language === "id" ? "Quest" : "Quests", value: questCount },
    { label: language === "id" ? "Workshop" : "Workshops", value: workshopCount },
    { label: language === "id" ? "Proof" : "Proofs", value: proofCount },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="rounded-[2.5rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-300">
            Learner Mode
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            {language === "id"
              ? "Belajar, ikut quest, lalu bangun Readiness Passport."
              : "Learn, complete quests, then build your Readiness Passport."}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            {language === "id"
              ? "Area ini hanya menampilkan pengalaman learner. Admin tools dan reviewer/grant pages sengaja dipisahkan agar user awam tidak tersesat."
              : "This area only shows the learner experience. Admin tools and reviewer/grant pages are intentionally separated so non-technical users do not get lost."}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-2xl bg-emerald-400 px-6 py-4 text-base font-black text-slate-950 transition hover:bg-emerald-300"
            >
              {language === "id" ? "Buka Dashboard" : "Open Dashboard"}
            </Link>
            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-bold text-white transition hover:border-emerald-400/40"
            >
              {language === "id" ? "Ganti Mode" : "Switch Mode"}
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-3xl font-black text-emerald-300">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {learnerActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
            >
              <h2 className="text-2xl font-black">
                {language === "id" ? action.titleId : action.titleEn}
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                {language === "id"
                  ? action.descriptionId
                  : action.descriptionEn}
              </p>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}
