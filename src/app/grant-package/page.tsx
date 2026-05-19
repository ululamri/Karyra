import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n-server";
import { prisma } from "@/lib/prisma";

const packageSections = [
  {
    title: "Reviewer Entry",
    href: "/reviewer",
    badge: "Start",
    descriptionId: "Pilih jalur review: visitor, learner, admin, atau grant package.",
    descriptionEn: "Choose a review path: visitor, learner, admin, or grant package.",
  },
  {
    title: "Demo Path",
    href: "/demo",
    badge: "Demo",
    descriptionId: "Alur checkpoint untuk menilai MVP dari homepage sampai proof archive.",
    descriptionEn: "Checkpoint flow to evaluate the MVP from homepage to proof archive.",
  },
  {
    title: "MVP Map",
    href: "/mvp-map",
    badge: "Map",
    descriptionId: "Peta visual alur learner, admin, proof, Filecoin, dan Stellar.",
    descriptionEn: "Visual map of learner, admin, proof, Filecoin, and Stellar flows.",
  },
  {
    title: "Impact Report",
    href: "/impact",
    badge: "Impact",
    descriptionId: "Ringkasan dampak awal, proof records, dan readiness metrics.",
    descriptionEn: "Early impact summary, proof records, and readiness metrics.",
  },
  {
    title: "Transparency Portal",
    href: "/transparency",
    badge: "Transparency",
    descriptionId: "Portal progres, recent proof, recent submission, dan demo path.",
    descriptionEn: "Progress portal with recent proofs, submissions, and demo path.",
  },
  {
    title: "Project Status",
    href: "/status",
    badge: "Metrics",
    descriptionId: "Snapshot metrik platform, readiness, Filecoin, dan Stellar.",
    descriptionEn: "Metrics snapshot for platform, readiness, Filecoin, and Stellar.",
  },
  {
    title: "QA Checklist",
    href: "/qa-checklist",
    badge: "QA",
    descriptionId: "Checklist manual untuk memverifikasi flow MVP sebelum review/demo.",
    descriptionEn: "Manual checklist to verify MVP flow before review/demo.",
  },
  {
    title: "System Health",
    href: "/admin/health",
    badge: "Admin",
    descriptionId: "Cek database, readiness, submission, proof, dan archive health.",
    descriptionEn: "Check database, readiness, submission, proof, and archive health.",
  },
  {
    title: "Workshop Kit",
    href: "/workshop-kit",
    badge: "Local",
    descriptionId: "Panduan fasilitator untuk membawa Karyra ke workshop lokal.",
    descriptionEn: "Facilitator guide for bringing Karyra into local workshops.",
  },
  {
    title: "Pilot Plan",
    href: "/pilot-plan",
    badge: "Pilot",
    descriptionId: "Rencana pilot 4 minggu, success metrics, dan risk controls.",
    descriptionEn: "A 4-week pilot plan, success metrics, and risk controls.",
  },
  {
    title: "Stellar Readiness",
    href: "/stacks/stellar-readiness",
    badge: "Stellar",
    descriptionId: "Jalur kesiapan pembayaran Web3 untuk komunitas non-teknikal.",
    descriptionEn: "Web3 payment-readiness path for non-technical communities.",
  },
  {
    title: "Filecoin Proof Archive",
    href: "/admin/proofs",
    badge: "Filecoin",
    descriptionId: "Proof archive demo dengan manifest JSON, checksum, dan CID demo.",
    descriptionEn: "Proof archive demo with JSON manifest, checksum, and demo CID.",
  },
];

const grantSignals = [
  {
    titleId: "Role clarity",
    titleEn: "Role clarity",
    descriptionId:
      "Navigasi sudah dipisah menjadi learner, admin, reviewer, docs, dan local pilot agar reviewer tidak tersesat.",
    descriptionEn:
      "Navigation is grouped into learner, admin, reviewer, docs, and local pilot paths so reviewers do not get lost.",
  },
  {
    titleId: "Readiness infrastructure",
    titleEn: "Readiness infrastructure",
    descriptionId:
      "Karyra tidak berhenti di course; learner punya passport, timeline, badge, proof, dan share summary.",
    descriptionEn:
      "Karyra goes beyond courses; learners have passports, timelines, badges, proofs, and share summaries.",
  },
  {
    titleId: "Filecoin archive direction",
    titleEn: "Filecoin archive direction",
    descriptionId:
      "Proof archive sudah memiliki manifest JSON, checksum, dan demo CID sebagai placeholder integrasi Filecoin/IPFS asli.",
    descriptionEn:
      "Proof archive includes JSON manifests, checksums, and demo CIDs as placeholders for real Filecoin/IPFS integration.",
  },
  {
    titleId: "Stellar readiness direction",
    titleEn: "Stellar readiness direction",
    descriptionId:
      "Stellar diposisikan sebagai pre-transaction confidence layer melalui course, quest, checklist, dan proof-of-readiness.",
    descriptionEn:
      "Stellar is positioned as a pre-transaction confidence layer through courses, quests, checklists, and proof-of-readiness.",
  },
  {
    titleId: "Local pilot readiness",
    titleEn: "Local pilot readiness",
    descriptionId:
      "Workshop Kit dan Pilot Plan sudah tersedia untuk menghubungkan produk online dengan edukasi komunitas lokal.",
    descriptionEn:
      "Workshop Kit and Pilot Plan are available to connect the online product with local community education.",
  },
  {
    titleId: "QA and health visibility",
    titleEn: "QA and health visibility",
    descriptionId:
      "QA Checklist dan Admin System Health membantu solo builder mengecek alur MVP sebelum demo/grant review.",
    descriptionEn:
      "QA Checklist and Admin System Health help the solo builder check the MVP flow before demo/grant review.",
  },
];

export default async function GrantPackagePage() {
  const language = await getServerLanguage();

  const [
    learnerCount,
    courseCount,
    questCount,
    proofRecordCount,
    archivedProofCount,
    readinessProfileCount,
    workshopCount,
    pendingSubmissionCount,
    stellarQuestCount,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "LEARNER" } }),
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.readinessProfile.count(),
    prisma.workshop.count(),
    prisma.questSubmission.count({
      where: { status: { in: ["SUBMITTED", "NEEDS_REVIEW"] } },
    }),
    prisma.quest.count({ where: { status: "PUBLISHED", chainKey: "stellar-readiness" } }),
  ]);

  const metrics = [
    { label: language === "id" ? "Learner" : "Learners", value: learnerCount },
    { label: language === "id" ? "Course" : "Courses", value: courseCount },
    { label: "Quest", value: questCount },
    { label: language === "id" ? "Proof" : "Proofs", value: proofRecordCount },
    { label: language === "id" ? "Archived" : "Archived", value: archivedProofCount },
    { label: language === "id" ? "Passport" : "Passports", value: readinessProfileCount },
    { label: "Workshop", value: workshopCount },
    { label: language === "id" ? "Pending Review" : "Pending Review", value: pendingSubmissionCount },
    { label: language === "id" ? "Quest Stellar" : "Stellar Quests", value: stellarQuestCount },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Karyra Grant Package
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-bold tracking-tight md:text-6xl">
            {language === "id"
              ? "Satu halaman untuk seluruh bukti MVP, demo, QA, dan readiness grant."
              : "One page for all MVP evidence, demo, QA, and grant-readiness signals."}
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 md:text-lg">
            {language === "id"
              ? "Gunakan halaman ini sebagai paket review Karyra. Reviewer bisa mulai dari role-based entry, mengikuti demo path, memeriksa impact, melihat Filecoin + Stellar layer, lalu mengecek QA dan system health."
              : "Use this page as the Karyra review package. Reviewers can start from the role-based entry, follow the demo path, inspect impact, review the Filecoin + Stellar layer, then check QA and system health."}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/reviewer"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Reviewer Entry
            </Link>
            <Link
              href="/qa-checklist"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              QA Checklist
            </Link>
            <Link
              href="/admin/health"
              className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-5 py-3 text-sm font-bold text-rose-300 transition hover:bg-rose-400/20"
            >
              System Health
            </Link>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9">
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
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
              Package Links
            </p>
            <h2 className="mt-4 text-3xl font-bold">
              {language === "id"
                ? "Halaman penting untuk reviewer."
                : "Key pages for reviewers."}
            </h2>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {packageSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-emerald-400/40"
              >
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-300">
                  {section.badge}
                </span>
                <h3 className="mt-4 text-xl font-bold">{section.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {language === "id" ? section.descriptionId : section.descriptionEn}
                </p>
                <p className="mt-4 text-sm font-bold text-emerald-300">
                  Open →
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
            Grant Readiness Signals
          </p>
          <h2 className="mt-4 text-3xl font-bold">
            {language === "id"
              ? "Signal bahwa MVP sudah siap diuji."
              : "Signals that the MVP is ready to be tested."}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {grantSignals.map((signal) => (
              <div
                key={signal.titleEn}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"
              >
                <h3 className="text-xl font-bold">
                  {language === "id" ? signal.titleId : signal.titleEn}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {language === "id" ? signal.descriptionId : signal.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
