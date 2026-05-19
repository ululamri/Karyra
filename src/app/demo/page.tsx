import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";

type DemoStep = {
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  href: string;
  tag: string;
};

const demoSteps: DemoStep[] = [
  {
    titleId: "Mulai dari MVP Map",
    titleEn: "Start from the MVP Map",
    descriptionId:
      "Lihat gambaran besar alur Karyra dari belajar, quest, proof, Filecoin, Stellar, sampai impact.",
    descriptionEn:
      "See the full Karyra flow from learning, quests, proofs, Filecoin, Stellar, and impact.",
    href: "/mvp-map",
    tag: "Overview",
  },
  {
    titleId: "Coba Stellar Readiness",
    titleEn: "Try Stellar Readiness",
    descriptionId:
      "Buka jalur kesiapan pembayaran Web3 untuk wallet safety, memo awareness, dan checklist sebelum transaksi.",
    descriptionEn:
      "Open the Web3 payment-readiness path for wallet safety, memo awareness, and pre-transaction checklists.",
    href: "/stacks/stellar-readiness",
    tag: "Stellar",
  },
  {
    titleId: "Submit Quest Stellar",
    titleEn: "Submit a Stellar Quest",
    descriptionId:
      "Gunakan form quest dengan validasi karakter untuk membuktikan kesiapan sebelum review admin.",
    descriptionEn:
      "Use the quest form with character validation to prove readiness before admin review.",
    href: "/quests?track=stellar-readiness",
    tag: "Quest",
  },
  {
    titleId: "Review dari Admin Console",
    titleEn: "Review from Admin Console",
    descriptionId:
      "Masuk ke review submission, approve quest, dan lihat reward serta readiness ikut tersinkron.",
    descriptionEn:
      "Open submission review, approve quests, and see rewards and readiness sync automatically.",
    href: "/admin/submissions",
    tag: "Admin",
  },
  {
    titleId: "Lihat Readiness Passport",
    titleEn: "View the Readiness Passport",
    descriptionId:
      "Cek score, level, badge, proof record, timeline, dan share summary learner.",
    descriptionEn:
      "Check learner score, level, badges, proof records, timeline, and share summary.",
    href: "/passport",
    tag: "Passport",
  },
  {
    titleId: "Archive Proof ke Filecoin Demo",
    titleEn: "Archive Proofs to the Filecoin Demo Layer",
    descriptionId:
      "Buka admin proof archive, generate manifest, checksum, dan demo CID untuk proof record.",
    descriptionEn:
      "Open admin proof archive, generate manifests, checksums, and demo CIDs for proof records.",
    href: "/admin/proofs",
    tag: "Filecoin",
  },
  {
    titleId: "Verifikasi Proof Publik",
    titleEn: "Verify a Public Proof",
    descriptionId:
      "Buka halaman proof detail untuk melihat proof data, manifest, checksum, dan status archive.",
    descriptionEn:
      "Open a proof detail page to inspect proof data, manifest, checksum, and archive status.",
    href: "/transparency",
    tag: "Verify",
  },
  {
    titleId: "Baca Impact dan Status",
    titleEn: "Read Impact and Status",
    descriptionId:
      "Tutup review dengan melihat status, impact report, transparency portal, dan changelog.",
    descriptionEn:
      "Close the review by reading status, impact report, transparency portal, and changelog.",
    href: "/status",
    tag: "Impact",
  },
];

export default async function DemoPage() {
  const language = await getServerLanguage();

  const [
    courseCount,
    questCount,
    learnerCount,
    submissionCount,
    readinessProfileCount,
    proofRecordCount,
    archivedProofCount,
    stellarQuestCount,
  ] = await Promise.all([
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.user.count({ where: { role: "LEARNER" } }),
    prisma.questSubmission.count(),
    prisma.readinessProfile.count(),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.quest.count({
      where: { status: "PUBLISHED", chainKey: "stellar-readiness" },
    }),
  ]);

  const metrics = [
    { label: language === "id" ? "Course" : "Courses", value: courseCount },
    { label: "Quest", value: questCount },
    { label: language === "id" ? "Learner" : "Learners", value: learnerCount },
    {
      label: language === "id" ? "Submission" : "Submissions",
      value: submissionCount,
    },
    {
      label: language === "id" ? "Readiness Profile" : "Readiness Profiles",
      value: readinessProfileCount,
    },
    {
      label: language === "id" ? "Proof Record" : "Proof Records",
      value: proofRecordCount,
    },
    {
      label: language === "id" ? "Proof Archived" : "Archived Proofs",
      value: archivedProofCount,
    },
    {
      label: language === "id" ? "Quest Stellar" : "Stellar Quests",
      value: stellarQuestCount,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra Demo Path
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {language === "id"
                ? "Jalur demo cepat untuk reviewer dan komunitas."
                : "A fast demo path for reviewers and communities."}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Halaman ini menyatukan alur evaluasi Karyra: learning engine, Stellar Readiness, quest submission, admin review, Readiness Passport, Filecoin Proof Archive, dan impact snapshot."
                : "This page connects the Karyra evaluation flow: learning engine, Stellar Readiness, quest submission, admin review, Readiness Passport, Filecoin Proof Archive, and impact snapshot."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/reviewer-guide"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Reviewer Guide
            </Link>
            <Link
              href="/dashboard"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-3xl font-bold text-emerald-300">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Recommended Review Flow
              </p>
              <h2 className="mt-4 text-3xl font-bold">
                {language === "id"
                  ? "Ikuti urutan ini untuk memahami MVP Karyra."
                  : "Follow this sequence to understand the Karyra MVP."}
              </h2>
            </div>
            <p className="text-sm text-slate-300">
              {demoSteps.length} demo checkpoints
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {demoSteps.map((step, index) => (
              <Link
                key={step.href}
                href={step.href}
                className="group rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-emerald-400/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-300">
                      {String(index + 1).padStart(2, "0")} · {step.tag}
                    </span>
                    <h3 className="mt-4 text-xl font-bold group-hover:text-emerald-200">
                      {language === "id" ? step.titleId : step.titleEn}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-300">
                      {language === "id"
                        ? step.descriptionId
                        : step.descriptionEn}
                    </p>
                  </div>
                  <span className="text-emerald-300">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
              Stellar
            </p>
            <h2 className="mt-4 text-2xl font-bold">
              {language === "id" ? "Payment-readiness layer" : "Payment-readiness layer"}
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              {language === "id"
                ? "Reviewer bisa melihat bagaimana Karyra menyiapkan pemula sebelum transaksi nyata lewat checklist, course, quest, dan proof."
                : "Reviewers can see how Karyra prepares beginners before real transactions through checklists, courses, quests, and proofs."}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
              Filecoin
            </p>
            <h2 className="mt-4 text-2xl font-bold">
              {language === "id" ? "Proof archive direction" : "Proof archive direction"}
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              {language === "id"
                ? "Proof record dapat diarsipkan ke demo layer dengan manifest, checksum, dan CID placeholder sebagai fondasi integrasi nyata."
                : "Proof records can be archived to a demo layer with manifests, checksums, and placeholder CIDs as a foundation for real integration."}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
              Readiness
            </p>
            <h2 className="mt-4 text-2xl font-bold">
              {language === "id" ? "Learning identity" : "Learning identity"}
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              {language === "id"
                ? "Passport, badges, timeline, share summary, dan proof verification membuat progres learner bisa dibaca sebagai identitas kesiapan."
                : "Passport, badges, timeline, share summary, and proof verification turn learner progress into a readable readiness identity."}
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
