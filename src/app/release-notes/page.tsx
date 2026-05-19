import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { getServerLanguage } from "../../lib/i18n-server";

const shippedItems = [
  {
    title: "Readiness Passport",
    description:
      "Learner profile with readiness score, level, badges, proof records, timeline, and share summary.",
    href: "/passport",
  },
  {
    title: "Filecoin Proof Archive Demo",
    description:
      "Proof archive flow with manifest JSON, checksum, demo CID, admin archive tools, and public proof verification.",
    href: "/admin/proofs",
  },
  {
    title: "Stellar Readiness Track",
    description:
      "Payment-readiness stack with course seed, quests, checklist, badge, and submission flow.",
    href: "/stacks/stellar-readiness",
  },
  {
    title: "Quest Review + Reward Flow",
    description:
      "Learner submissions, client-side validation, admin approval, XP reward ledger, and dashboard status.",
    href: "/admin/submissions",
  },
  {
    title: "Public Review Pages",
    description:
      "Reviewer guide, MVP map, docs hub, impact report, roadmap, transparency portal, and changelog.",
    href: "/reviewer-guide",
  },
];

const nextItems = [
  "Replace demo Filecoin CID with real storage adapter when integration target is selected.",
  "Add learner authentication and real user session mapping beyond the demo learner flow.",
  "Add richer admin filters for learners, proofs, submissions, and workshops.",
  "Prepare pilot workshop materials and local facilitator checklist.",
  "Convert grant-ready documentation into a downloadable brief or deck later.",
];

export default async function ReleaseNotesPage() {
  const language = await getServerLanguage();

  const [
    courseCount,
    questCount,
    submissionCount,
    proofRecordCount,
    archivedProofCount,
    badgeCount,
    workshopCount,
  ] = await Promise.all([
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.questSubmission.count(),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.badge.count(),
    prisma.workshop.count(),
  ]);

  const metrics = [
    { label: "Published courses", value: courseCount },
    { label: "Published quests", value: questCount },
    { label: "Submissions", value: submissionCount },
    { label: "Proof records", value: proofRecordCount },
    { label: "Archived proofs", value: archivedProofCount },
    { label: "Badges", value: badgeCount },
    { label: "Workshops", value: workshopCount },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-8 text-zinc-50 md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra Release Notes
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {language === "id"
                ? "Checkpoint MVP setelah batch readiness, Filecoin, dan Stellar."
                : "MVP checkpoint after the readiness, Filecoin, and Stellar batch."}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
              {language === "id"
                ? "Halaman ini merangkum fitur yang sudah dikirim, sinyal readiness, dan area berikutnya yang masih perlu ditingkatkan. Cocok untuk dokumentasi internal maupun review publik."
                : "This page summarizes shipped features, readiness signals, and the next improvement areas. It is useful for internal tracking and public review."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/changelog"
              className="rounded-2xl border border-zinc-800 px-5 py-3 text-sm font-bold text-zinc-200 transition hover:border-emerald-400/50"
            >
              Changelog
            </Link>
            <Link
              href="/demo"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-emerald-300"
            >
              Demo Path
            </Link>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5"
            >
              <p className="text-3xl font-bold text-emerald-300">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-zinc-400">{metric.label}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[2rem] border border-zinc-800 bg-zinc-900/70 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Shipped in this checkpoint
          </p>
          <h2 className="mt-4 text-3xl font-bold">
            {language === "id" ? "Fitur yang sudah bisa diuji" : "Features that can already be tested"}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {shippedItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-5 transition hover:border-emerald-400/50"
              >
                <h3 className="text-xl font-bold text-zinc-100">{item.title}</h3>
                <p className="mt-3 leading-7 text-zinc-400">{item.description}</p>
                <p className="mt-4 text-sm font-bold text-emerald-300">Open →</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Reviewer Signal
            </p>
            <h2 className="mt-4 text-3xl font-bold">
              {language === "id"
                ? "Karyra sekarang menunjukkan loop produk aktif."
                : "Karyra now shows active product loops."}
            </h2>
            <p className="mt-4 leading-8 text-zinc-300">
              {language === "id"
                ? "Reviewer dapat mengikuti alur belajar, submit quest, review admin, reward XP, proof record, archive manifest, dan passport share tanpa menebak status MVP."
                : "Reviewers can follow learning, quest submission, admin review, XP reward, proof records, archive manifests, and passport sharing without guessing the MVP status."}
            </p>
          </div>

          <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/70 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-400">
              Next improvement areas
            </p>
            <div className="mt-5 grid gap-3">
              {nextItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm leading-6 text-zinc-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
