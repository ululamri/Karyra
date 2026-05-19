import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";
import { RoleModeBanner } from "@/components/role-mode-banner";

const learnerActions = [
  {
    href: "/dashboard",
    label: "01",
    titleId: "Dashboard Learner",
    titleEn: "Learner Dashboard",
    descriptionId: "Lihat XP, badge, progress belajar, submission, reward, dan workshop.",
    descriptionEn: "View XP, badges, learning progress, submissions, rewards, and workshops.",
  },
  {
    href: "/courses",
    label: "02",
    titleId: "Course Pemula",
    titleEn: "Beginner Courses",
    descriptionId: "Ikuti materi Web3 dan Stellar readiness dari level non-teknikal.",
    descriptionEn: "Follow Web3 and Stellar readiness materials from a non-technical level.",
  },
  {
    href: "/quests?track=stellar-readiness",
    label: "03",
    titleId: "Quest Stellar",
    titleEn: "Stellar Quests",
    descriptionId: "Submit quest untuk membangun Proof-of-Readiness sebelum transaksi nyata.",
    descriptionEn: "Submit quests to build Proof-of-Readiness before real transactions.",
  },
  {
    href: "/passport",
    label: "04",
    titleId: "Readiness Passport",
    titleEn: "Readiness Passport",
    descriptionId: "Lihat score, level, proof record, badge, timeline, dan archive status.",
    descriptionEn: "View score, level, proof records, badges, timeline, and archive status.",
  },
  {
    href: "/stacks/stellar-readiness/checklist",
    label: "05",
    titleId: "Checklist Stellar",
    titleEn: "Stellar Checklist",
    descriptionId: "Latihan pre-transaction confidence sebelum menyentuh transaksi bernilai nyata.",
    descriptionEn: "Practice pre-transaction confidence before touching real-value transactions.",
  },
  {
    href: "/workshops",
    label: "06",
    titleId: "Workshop Lokal",
    titleEn: "Local Workshops",
    descriptionId: "Daftar aktivitas offline dan community onboarding.",
    descriptionEn: "Register for offline activities and community onboarding.",
  },
];

export default async function LearnerModePage() {
  const language = await getServerLanguage();
  const [courseCount, questCount, workshopCount, proofCount, badgeCount, passportCount] =
    await Promise.all([
      prisma.course.count({ where: { status: "PUBLISHED" } }),
      prisma.quest.count({ where: { status: "PUBLISHED" } }),
      prisma.workshop.count({ where: { status: { in: ["OPEN", "COMPLETED"] } } }),
      prisma.proofRecord.count(),
      prisma.badge.count(),
      prisma.readinessProfile.count(),
    ]);

  const metrics = [
    { label: language === "id" ? "Course Aktif" : "Active Courses", value: courseCount },
    { label: language === "id" ? "Quest" : "Quests", value: questCount },
    { label: language === "id" ? "Workshop" : "Workshops", value: workshopCount },
    { label: language === "id" ? "Proof Record" : "Proof Records", value: proofCount },
    { label: language === "id" ? "Badge" : "Badges", value: badgeCount },
    { label: language === "id" ? "Passport" : "Passports", value: passportCount },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <RoleModeBanner mode="learner" language={language} />

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
            {language === "id" ? "Learner Journey" : "Learner Journey"}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
            {language === "id"
              ? "Belajar, ikut quest, lalu bangun bukti kesiapan Web3."
              : "Learn, complete quests, then build Web3 readiness proof."}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            {language === "id"
              ? "Mode ini dirancang untuk user awam: tidak ada admin tools, tidak ada halaman grant yang membingungkan, hanya alur belajar yang membawa learner menuju Readiness Passport."
              : "This mode is designed for everyday users: no admin tools, no confusing grant pages, only a learning flow that brings learners toward the Readiness Passport."}
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-2 text-3xl font-bold text-emerald-300">{metric.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {learnerActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
            >
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                {action.label}
              </span>
              <h2 className="mt-4 text-2xl font-bold">
                {language === "id" ? action.titleId : action.titleEn}
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                {language === "id" ? action.descriptionId : action.descriptionEn}
              </p>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}
