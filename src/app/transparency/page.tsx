import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getEvidenceText(evidence: unknown) {
  if (
    evidence &&
    typeof evidence === "object" &&
    "text" in evidence &&
    typeof evidence.text === "string"
  ) {
    return evidence.text;
  }

  return "";
}

export default async function TransparencyPage() {
  const language = await getServerLanguage();

  const [
    learnerCount,
    readinessProfileCount,
    proofCount,
    archivedProofCount,
    submissionCount,
    approvedSubmissionCount,
    recentProofs,
    recentSubmissions,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "LEARNER" } }),
    prisma.readinessProfile.count(),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.questSubmission.count(),
    prisma.questSubmission.count({ where: { status: "APPROVED" } }),
    prisma.proofRecord.findMany({
      orderBy: { issuedAt: "desc" },
      take: 5,
      include: {
        user: {
          select: {
            username: true,
            displayName: true,
          },
        },
      },
    }),
    prisma.questSubmission.findMany({
      orderBy: { submittedAt: "desc" },
      take: 5,
      include: {
        quest: {
          select: {
            title: true,
            chainKey: true,
            xpReward: true,
          },
        },
        user: {
          select: {
            username: true,
            displayName: true,
          },
        },
      },
    }),
  ]);

  const archiveRate =
    proofCount > 0 ? Math.round((archivedProofCount / proofCount) * 100) : 0;
  const approvalRate =
    submissionCount > 0
      ? Math.round((approvedSubmissionCount / submissionCount) * 100)
      : 0;

  const transparencyPrinciples =
    language === "id"
      ? [
          {
            title: "Progress terlihat publik",
            description:
              "Status, changelog, roadmap, impact, MVP map, dan docs tersedia sebagai halaman publik.",
          },
          {
            title: "Proof bisa diverifikasi",
            description:
              "Proof record memiliki halaman detail, status archive, demo CID, manifest, dan checksum.",
          },
          {
            title: "Grant-review friendly",
            description:
              "Reviewer dapat mengikuti alur demo dari belajar, submit quest, approval, proof, passport, sampai archive.",
          },
          {
            title: "Local-first, non-technical-first",
            description:
              "Karyra tetap diarahkan untuk komunitas lokal dan pemula Web3 sebelum masuk ke praktik teknikal.",
          },
        ]
      : [
          {
            title: "Progress is publicly visible",
            description:
              "Status, changelog, roadmap, impact, MVP map, and docs are available as public pages.",
          },
          {
            title: "Proofs are verifiable",
            description:
              "Proof records include detail pages, archive status, demo CIDs, manifests, and checksums.",
          },
          {
            title: "Grant-review friendly",
            description:
              "Reviewers can follow the demo flow from learning, quest submission, approval, proof, passport, to archive.",
          },
          {
            title: "Local-first, non-technical-first",
            description:
              "Karyra remains focused on local communities and Web3 beginners before technical practice.",
          },
        ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra Transparency Portal
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {language === "id"
                ? "Transparansi progress, proof, dan impact."
                : "Transparent progress, proofs, and impact."}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Halaman ini merangkum sinyal transparansi Karyra: apa yang sudah dibangun, bagaimana proof diverifikasi, dan bagaimana reviewer dapat menilai MVP secara cepat."
                : "This page summarizes Karyra transparency signals: what has been built, how proofs are verified, and how reviewers can evaluate the MVP quickly."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/roadmap"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Roadmap
            </Link>
            <Link
              href="/reviewer-guide"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Reviewer Guide
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: language === "id" ? "Learner" : "Learners",
              value: learnerCount,
              detail:
                language === "id"
                  ? "Akun learner yang tersedia untuk demo dan pengujian."
                  : "Learner accounts available for demo and testing.",
            },
            {
              label: "Readiness Passports",
              value: readinessProfileCount,
              detail:
                language === "id"
                  ? "Profil kesiapan yang sudah terbentuk dari aktivitas learner."
                  : "Readiness profiles created from learner activity.",
            },
            {
              label: "Proof Archive",
              value: `${archivedProofCount}/${proofCount}`,
              detail:
                language === "id"
                  ? `${archiveRate}% proof sudah diarsipkan ke demo Filecoin layer.`
                  : `${archiveRate}% of proofs are archived to the demo Filecoin layer.`,
            },
            {
              label: "Quest Approval",
              value: `${approvedSubmissionCount}/${submissionCount}`,
              detail:
                language === "id"
                  ? `${approvalRate}% submission sudah disetujui admin.`
                  : `${approvalRate}% of submissions have been approved by admin.`,
            },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-2 text-3xl font-bold text-emerald-300">
                {metric.value}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {metric.detail}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Principles
            </p>
            <h2 className="mt-4 text-3xl font-bold">
              {language === "id"
                ? "Prinsip transparansi Karyra"
                : "Karyra transparency principles"}
            </h2>

            <div className="mt-6 grid gap-4">
              {transparencyPrinciples.map((principle) => (
                <div
                  key={principle.title}
                  className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"
                >
                  <h3 className="text-lg font-bold">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Demo Path
            </p>
            <h2 className="mt-4 text-3xl font-bold">
              {language === "id"
                ? "Alur review yang disarankan"
                : "Suggested review flow"}
            </h2>
            <ol className="mt-6 grid gap-3">
              {[
                ["/", "Homepage"],
                ["/mvp-map", "MVP Map"],
                ["/stacks/stellar-readiness", "Stellar Readiness"],
                ["/quests?track=stellar-readiness", "Stellar Quests"],
                ["/dashboard", "Learner Dashboard"],
                ["/admin/submissions", "Admin Review"],
                ["/passport", "Readiness Passport"],
                ["/admin/proofs", "Filecoin Proof Archive"],
                ["/passport/share", "Passport Share"],
                ["/docs/grant-readiness", "Grant Docs"],
              ].map(([href, label], index) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4 transition hover:border-emerald-400/40"
                  >
                    <span className="font-semibold">
                      {String(index + 1).padStart(2, "0")}. {label}
                    </span>
                    <span className="text-sm text-emerald-300">Open</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                  Recent Proofs
                </p>
                <h2 className="mt-4 text-3xl font-bold">
                  {language === "id" ? "Proof terbaru" : "Latest proofs"}
                </h2>
              </div>
              <Link
                href="/admin/proofs"
                className="text-sm font-bold text-sky-300 hover:text-sky-200"
              >
                View all
              </Link>
            </div>

            <div className="mt-6 grid gap-3">
              {recentProofs.length > 0 ? (
                recentProofs.map((proof) => (
                  <Link
                    key={proof.id}
                    href={`/proofs/${proof.id}`}
                    className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 transition hover:border-sky-400/40"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-bold">{proof.title}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          {proof.user.displayName} · {proof.type}
                        </p>
                      </div>
                      <span className="text-xs text-slate-500">
                        {formatDate(proof.issuedAt)}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-emerald-300">
                      {proof.archivedToFilecoin
                        ? proof.filecoinCid ?? "Archived"
                        : "Pending archive"}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="rounded-2xl bg-slate-950/50 p-4 text-slate-300">
                  {language === "id"
                    ? "Belum ada proof record."
                    : "No proof records yet."}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                  Recent Submissions
                </p>
                <h2 className="mt-4 text-3xl font-bold">
                  {language === "id"
                    ? "Submission terbaru"
                    : "Latest submissions"}
                </h2>
              </div>
              <Link
                href="/admin/submissions"
                className="text-sm font-bold text-amber-300 hover:text-amber-200"
              >
                Review
              </Link>
            </div>

            <div className="mt-6 grid gap-3">
              {recentSubmissions.length > 0 ? (
                recentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-bold">{submission.quest.title}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          {submission.user.displayName} · {submission.status}
                        </p>
                      </div>
                      <span className="text-xs text-slate-500">
                        {formatDate(submission.submittedAt)}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                      {getEvidenceText(submission.evidence) ||
                        "Submission evidence stored."}
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-2xl bg-slate-950/50 p-4 text-slate-300">
                  {language === "id"
                    ? "Belum ada submission quest."
                    : "No quest submissions yet."}
                </p>
              )}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
