import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";
import { PageShell } from "@/components/ui/page-shell";
import { CompactCard, MetricCard } from "@/components/ui/compact-card";
import { ModePill } from "@/components/ui/mode-pill";

const roleCards = [
  {
    href: "/learner",
    mode: "Learner" as const,
    titleId: "Masuk sebagai Learner",
    titleEn: "Enter as Learner",
    descriptionId: "Belajar Web3 dari nol, ikut quest, buka Readiness Passport, dan coba Stellar readiness track.",
    descriptionEn: "Learn Web3 from zero, complete quests, open the Readiness Passport, and try the Stellar readiness track.",
    ctaId: "Mulai belajar",
    ctaEn: "Start learning",
  },
  {
    href: "/admin",
    mode: "Admin" as const,
    titleId: "Masuk sebagai Admin",
    titleEn: "Enter as Admin",
    descriptionId: "Kelola course, review submission, pantau learner readiness, archive proof, dan cek system health.",
    descriptionEn: "Manage courses, review submissions, monitor learner readiness, archive proofs, and check system health.",
    ctaId: "Buka admin",
    ctaEn: "Open admin",
  },
  {
    href: "/reviewer",
    mode: "Reviewer" as const,
    titleId: "Masuk sebagai Reviewer / Grantee",
    titleEn: "Enter as Reviewer / Grantee",
    descriptionId: "Evaluasi MVP melalui grant package, demo path, impact report, transparency, QA checklist, dan docs.",
    descriptionEn: "Evaluate the MVP through the grant package, demo path, impact report, transparency, QA checklist, and docs.",
    ctaId: "Review MVP",
    ctaEn: "Review MVP",
  },
];

export default async function HomePage() {
  const language = await getServerLanguage();

  const [courseCount, questCount, learnerCount, proofRecordCount, archivedProofCount, stellarQuestCount] = await Promise.all([
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.user.count({ where: { role: "LEARNER" } }),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.quest.count({ where: { status: "PUBLISHED", chainKey: "stellar-readiness" } }),
  ]);

  const metrics = [
    { label: language === "id" ? "Course" : "Courses", value: courseCount },
    { label: language === "id" ? "Quest" : "Quests", value: questCount },
    { label: language === "id" ? "Learner" : "Learners", value: learnerCount },
    { label: language === "id" ? "Proof" : "Proofs", value: proofRecordCount },
    { label: language === "id" ? "Archived" : "Archived", value: archivedProofCount },
    { label: language === "id" ? "Stellar" : "Stellar", value: stellarQuestCount },
  ];

  return (
    <PageShell>
      <section className="grid gap-5 lg:grid-cols-[1fr_0.78fr] lg:items-start">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:p-7">
          <ModePill mode="Public" label="MVP Preview" />
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
            Local Web3 Readiness Infrastructure.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base md:leading-7">
            {language === "id"
              ? "Karyra adalah MVP pembelajaran dan readiness untuk komunitas lokal: belajar, quest, proof record, Filecoin archive, dan Stellar payment-readiness. Pilih mode agar pengalaman learner, admin, dan reviewer tidak bercampur."
              : "Karyra is a learning and readiness MVP for local communities: learning, quests, proof records, Filecoin archive, and Stellar payment-readiness. Choose a mode so learner, admin, and reviewer experiences stay separated."}
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:max-w-2xl">
            {metrics.map((metric) => <MetricCard key={metric.label} label={metric.label} value={metric.value} />)}
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4 md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
            {language === "id" ? "Catatan MVP" : "MVP Note"}
          </p>
          <h2 className="mt-2 text-xl font-bold text-white md:text-2xl">
            {language === "id" ? "Demo/preview environment." : "Demo/preview environment."}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {language === "id"
              ? "Role dipisahkan secara visual untuk memudahkan evaluasi. Versi produksi akan memakai autentikasi, permission, dashboard per role, dan onboarding yang lebih sederhana."
              : "Roles are visually separated for easier evaluation. Production will use authentication, permissions, per-role dashboards, and simpler onboarding."}
          </p>
          <Link href="/grant-package" className="mt-4 inline-flex min-h-11 items-center rounded-2xl bg-emerald-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-300">
            {language === "id" ? "Lihat Grant Package" : "Open Grant Package"}
          </Link>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {roleCards.map((card) => (
          <Link key={card.href} href={card.href} className="group rounded-3xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 md:p-5">
            <ModePill mode={card.mode} />
            <h2 className="mt-3 text-xl font-bold text-white md:text-2xl">
              {language === "id" ? card.titleId : card.titleEn}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {language === "id" ? card.descriptionId : card.descriptionEn}
            </p>
            <span className="mt-4 inline-flex text-sm font-bold text-emerald-300 group-hover:text-emerald-200">
              {language === "id" ? card.ctaId : card.ctaEn} →
            </span>
          </Link>
        ))}
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <CompactCard href="/stacks/stellar-readiness" eyebrow="Stellar" title="Payment Readiness" description="Wallet safety, memo awareness, stablecoin literacy, scam prevention, dan pre-transaction confidence." />
        <CompactCard href="/admin/proofs" eyebrow="Filecoin" title="Proof Archive" description="Proof records, archive manifest, checksum, dan demo CID sebagai pondasi decentralized evidence preservation." />
        <CompactCard href="/reviewer" eyebrow="Reviewer" title="Grant Review" description="Demo path, impact, transparency, QA checklist, workshop kit, pilot plan, dan technical docs." />
      </section>
    </PageShell>
  );
}
