import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n-server";
import { prisma } from "@/lib/prisma";
import { RoleModeBanner } from "@/components/role-mode-banner";

const modeCards = [
  {
    href: "/learner",
    label: "Learner",
    titleId: "Coba sebagai learner",
    titleEn: "Try as a learner",
    descriptionId: "Masuk ke user-facing journey: course, quest, checklist, passport, dan workshop.",
    descriptionEn: "Enter the user-facing journey: courses, quests, checklist, passport, and workshops.",
  },
  {
    href: "/admin",
    label: "Admin",
    titleId: "Coba sebagai admin MVP",
    titleEn: "Try as an MVP admin",
    descriptionId: "Review submission, pantau readiness, arsipkan proof, dan cek health.",
    descriptionEn: "Review submissions, monitor readiness, archive proofs, and check health.",
  },
  {
    href: "/grant-package",
    label: "Grant",
    titleId: "Buka grant package",
    titleEn: "Open grant package",
    descriptionId: "Index semua bukti MVP: demo, impact, docs, roadmap, QA, workshop kit, dan pilot plan.",
    descriptionEn: "Index all MVP evidence: demo, impact, docs, roadmap, QA, workshop kit, and pilot plan.",
  },
];

const demoSteps = [
  { href: "/learner", label: "Learner Entry" },
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
    workshopCount,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "LEARNER" } }),
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.readinessProfile.count(),
    prisma.questSubmission.count({ where: { status: { in: ["SUBMITTED", "NEEDS_REVIEW"] } } }),
    prisma.workshop.count(),
  ]);

  const metrics = [
    { label: language === "id" ? "Learner" : "Learners", value: learnerCount },
    { label: language === "id" ? "Course" : "Courses", value: courseCount },
    { label: "Quest", value: questCount },
    { label: language === "id" ? "Proof" : "Proofs", value: proofRecordCount },
    { label: language === "id" ? "Archived" : "Archived", value: archivedProofCount },
    { label: language === "id" ? "Passport" : "Passports", value: readinessProfileCount },
    { label: language === "id" ? "Pending Review" : "Pending Review", value: pendingSubmissionCount },
    { label: language === "id" ? "Workshop" : "Workshops", value: workshopCount },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <RoleModeBanner mode="reviewer" language={language} />

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
            Karyra Reviewer Mode
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
            {language === "id"
              ? "Evaluasi MVP tanpa tersesat di halaman learner atau admin."
              : "Evaluate the MVP without getting lost in learner or admin pages."}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            {language === "id"
              ? "Reviewer Mode mengumpulkan jalur review utama: role demo, grant package, impact, transparency, QA, workshop kit, dan pilot plan. Produk final nantinya akan memisahkan akses dengan auth dan permission sungguhan."
              : "Reviewer Mode gathers the main review paths: role demo, grant package, impact, transparency, QA, workshop kit, and pilot plan. The final product will separate access with real auth and permissions."}
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-2 text-3xl font-bold text-amber-300">{metric.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {modeCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-amber-400/40 hover:bg-amber-400/10"
            >
              <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-300">
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

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                Suggested Demo Path
              </p>
              <h2 className="mt-4 text-3xl font-bold">
                {language === "id" ? "Jalur cepat memahami MVP." : "A fast path to understand the MVP."}
              </h2>
            </div>
            <Link
              href="/grant-package"
              className="rounded-2xl bg-amber-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-amber-200"
            >
              Grant Package
            </Link>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {demoSteps.map((step, index) => (
              <Link
                key={step.href}
                href={step.href}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-amber-400/40"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-amber-300">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 font-bold">{step.label}</h3>
                <p className="mt-2 text-sm text-slate-400">Open →</p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
