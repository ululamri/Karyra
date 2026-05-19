import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n-server";
import { prisma } from "@/lib/prisma";

const modeCards = [
  {
    href: "/",
    label: "Visitor",
    titleId: "Mulai sebagai pengunjung publik",
    titleEn: "Start as a public visitor",
    descriptionId:
      "Lihat positioning Karyra, masalah yang diselesaikan, dan snapshot produk dari homepage.",
    descriptionEn:
      "See Karyra's positioning, problem framing, and product snapshot from the homepage.",
  },
  {
    href: "/dashboard",
    label: "Learner",
    titleId: "Coba sebagai learner",
    titleEn: "Try as a learner",
    descriptionId:
      "Masuk ke learner journey: belajar, quest, submission, badge, passport, dan timeline.",
    descriptionEn:
      "Enter the learner journey: learning, quests, submissions, badges, passport, and timeline.",
  },
  {
    href: "/admin",
    label: "Admin",
    titleId: "Coba sebagai admin MVP",
    titleEn: "Try as an MVP admin",
    descriptionId:
      "Review submission, monitor learner readiness, archive proof, dan cek system health.",
    descriptionEn:
      "Review submissions, monitor learner readiness, archive proofs, and check system health.",
  },
  {
    href: "/grant-package",
    label: "Reviewer",
    titleId: "Review grant package",
    titleEn: "Review grant package",
    descriptionId:
      "Buka index semua bukti MVP: demo path, impact, docs, roadmap, QA, workshop kit, dan pilot plan.",
    descriptionEn:
      "Open the MVP evidence index: demo path, impact, docs, roadmap, QA, workshop kit, and pilot plan.",
  },
];

const demoSteps = [
  { href: "/stacks/stellar-readiness", label: "Stellar Readiness" },
  { href: "/stacks/stellar-readiness/checklist", label: "Pre-Transaction Checklist" },
  { href: "/quests?track=stellar-readiness", label: "Submit Stellar Quest" },
  { href: "/admin/submissions", label: "Admin Review" },
  { href: "/passport", label: "Readiness Passport" },
  { href: "/admin/proofs", label: "Filecoin Proof Archive" },
  { href: "/passport/share", label: "Share Passport" },
  { href: "/qa-checklist", label: "Run QA Checklist" },
];

export default async function ReviewerEntryPage() {
  const language = await getServerLanguage();

  const [
    learnerCount,
    courseCount,
    questCount,
    proofRecordCount,
    archivedProofCount,
    readinessProfileCount,
    pendingSubmissionCount,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "LEARNER" } }),
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.readinessProfile.count(),
    prisma.questSubmission.count({
      where: { status: { in: ["SUBMITTED", "NEEDS_REVIEW"] } },
    }),
  ]);

  const metrics = [
    { label: language === "id" ? "Learner" : "Learners", value: learnerCount },
    { label: language === "id" ? "Course" : "Courses", value: courseCount },
    { label: "Quest", value: questCount },
    { label: language === "id" ? "Proof" : "Proofs", value: proofRecordCount },
    { label: language === "id" ? "Archived" : "Archived", value: archivedProofCount },
    { label: language === "id" ? "Passport" : "Passports", value: readinessProfileCount },
    { label: language === "id" ? "Pending Review" : "Pending Review", value: pendingSubmissionCount },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
            Karyra Reviewer Mode
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-bold tracking-tight md:text-6xl">
            {language === "id"
              ? "Pilih jalur review: visitor, learner, admin, atau grant package."
              : "Choose a review path: visitor, learner, admin, or grant package."}
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 md:text-lg">
            {language === "id"
              ? "Halaman ini dibuat agar reviewer tidak bingung sedang menggunakan Karyra sebagai siapa. Karyra memiliki alur publik, learner journey, admin console, dan grant review package yang sengaja dipisahkan untuk evaluasi MVP."
              : "This page helps reviewers understand which role they are using. Karyra separates the public flow, learner journey, admin console, and grant review package for MVP evaluation."}
          </p>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modeCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-sky-400/40 hover:bg-sky-400/10"
            >
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sky-300">
                {card.label}
              </span>
              <h2 className="mt-4 text-2xl font-bold">
                {language === "id" ? card.titleId : card.titleEn}
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                {language === "id" ? card.descriptionId : card.descriptionEn}
              </p>
            </Link>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-4 lg:grid-cols-7">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-2 text-3xl font-bold text-emerald-300">
                {metric.value}
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Suggested Demo Path
              </p>
              <h2 className="mt-4 text-3xl font-bold">
                {language === "id"
                  ? "Jalur cepat untuk memahami MVP."
                  : "A fast path to understand the MVP."}
              </h2>
            </div>
            <Link
              href="/grant-package"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Grant Package
            </Link>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {demoSteps.map((step, index) => (
              <Link
                key={step.href}
                href={step.href}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-emerald-400/40"
              >
                <p className="text-sm font-bold text-emerald-300">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-xl font-bold">{step.label}</h3>
                <p className="mt-3 text-sm font-semibold text-slate-400">
                  Open →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
