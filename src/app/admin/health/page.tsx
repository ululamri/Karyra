import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";

type HealthCard = {
  label: string;
  value: string | number;
  description: string;
  status: "ok" | "warning" | "info";
};

function statusClass(status: HealthCard["status"]) {
  switch (status) {
    case "ok":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    case "warning":
      return "border-amber-400/30 bg-amber-400/10 text-amber-300";
    default:
      return "border-sky-400/30 bg-sky-400/10 text-sky-300";
  }
}

function statusLabel(status: HealthCard["status"], language: string) {
  if (status === "ok") return language === "id" ? "Aman" : "OK";
  if (status === "warning") return language === "id" ? "Perlu Cek" : "Check";
  return "Info";
}

export default async function AdminHealthPage() {
  const language = await getServerLanguage();

  let databaseStatus: "ok" | "warning" = "ok";
  let databaseMessage =
    language === "id"
      ? "Database merespons query health check."
      : "Database responded to the health check query.";

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    databaseStatus = "warning";
    databaseMessage =
      error instanceof Error
        ? error.message
        : language === "id"
          ? "Database tidak merespons health check."
          : "Database did not respond to the health check.";
  }

  const [
    learnerCount,
    adminCount,
    publishedCourseCount,
    publishedQuestCount,
    stellarQuestCount,
    pendingSubmissionCount,
    approvedSubmissionCount,
    proofRecordCount,
    archivedProofCount,
    readinessProfileCount,
    readyLearnerCount,
    workshopRegistrationCount,
    rewardAggregate,
    recentSubmissions,
    recentProofs,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "LEARNER" } }),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED", chainKey: "stellar-readiness" } }),
    prisma.questSubmission.count({ where: { status: { in: ["SUBMITTED", "NEEDS_REVIEW"] } } }),
    prisma.questSubmission.count({ where: { status: "APPROVED" } }),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.readinessProfile.count(),
    prisma.readinessProfile.count({ where: { level: { in: ["READY", "COMMUNITY_READY"] } } }),
    prisma.workshopRegistration.count(),
    prisma.rewardLedger.aggregate({
      where: { kind: "XP", direction: "CREDIT" },
      _sum: { xpAmount: true },
    }),
    prisma.questSubmission.findMany({
      orderBy: { submittedAt: "desc" },
      take: 5,
      select: {
        id: true,
        status: true,
        submittedAt: true,
        quest: { select: { title: true, chainKey: true, xpReward: true } },
        user: { select: { displayName: true, username: true } },
      },
    }),
    prisma.proofRecord.findMany({
      orderBy: { issuedAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        type: true,
        archivedToFilecoin: true,
        filecoinCid: true,
        issuedAt: true,
        user: { select: { displayName: true, username: true } },
      },
    }),
  ]);

  const cards: HealthCard[] = [
    {
      label: "Database",
      value: databaseStatus === "ok" ? "Online" : "Warning",
      description: databaseMessage,
      status: databaseStatus,
    },
    {
      label: language === "id" ? "Learner" : "Learners",
      value: learnerCount,
      description:
        language === "id"
          ? "Akun learner yang tersedia untuk demo dan pilot."
          : "Learner accounts available for demo and pilot flows.",
      status: learnerCount > 0 ? "ok" : "warning",
    },
    {
      label: "Admins",
      value: adminCount,
      description:
        language === "id"
          ? "Akun admin untuk review submission dan kelola MVP."
          : "Admin accounts for submission review and MVP management.",
      status: adminCount > 0 ? "ok" : "warning",
    },
    {
      label: "Published Courses",
      value: publishedCourseCount,
      description:
        language === "id" ? "Course yang dapat diakses learner." : "Courses available to learners.",
      status: publishedCourseCount > 0 ? "ok" : "warning",
    },
    {
      label: "Published Quests",
      value: publishedQuestCount,
      description:
        language === "id"
          ? "Quest aktif untuk submission learner."
          : "Active quests for learner submissions.",
      status: publishedQuestCount > 0 ? "ok" : "warning",
    },
    {
      label: "Stellar Quests",
      value: stellarQuestCount,
      description:
        language === "id"
          ? "Quest khusus jalur Stellar Readiness."
          : "Quests for the Stellar Readiness track.",
      status: stellarQuestCount > 0 ? "ok" : "warning",
    },
    {
      label: "Pending Review",
      value: pendingSubmissionCount,
      description:
        language === "id"
          ? "Submission yang menunggu review admin."
          : "Submissions waiting for admin review.",
      status: pendingSubmissionCount > 0 ? "warning" : "ok",
    },
    {
      label: "Approved Submissions",
      value: approvedSubmissionCount,
      description:
        language === "id"
          ? "Submission yang sudah disetujui dan dapat menghasilkan proof."
          : "Approved submissions that can generate proof records.",
      status: approvedSubmissionCount > 0 ? "ok" : "info",
    },
    {
      label: "Readiness Profiles",
      value: readinessProfileCount,
      description:
        language === "id"
          ? "Profile kesiapan yang sudah tersinkron."
          : "Readiness profiles already synced.",
      status: readinessProfileCount > 0 ? "ok" : "warning",
    },
    {
      label: "Ready Learners",
      value: readyLearnerCount,
      description:
        language === "id"
          ? "Learner dengan level READY atau COMMUNITY_READY."
          : "Learners at READY or COMMUNITY_READY level.",
      status: readyLearnerCount > 0 ? "ok" : "info",
    },
    {
      label: "Proof Records",
      value: proofRecordCount,
      description:
        language === "id"
          ? "Proof-of-Learning, Participation, dan Readiness."
          : "Proof-of-Learning, Participation, and Readiness records.",
      status: proofRecordCount > 0 ? "ok" : "warning",
    },
    {
      label: "Archived Proofs",
      value: `${archivedProofCount}/${proofRecordCount}`,
      description:
        language === "id"
          ? "Proof yang sudah punya manifest + demo Filecoin CID."
          : "Proofs with manifest + demo Filecoin CID.",
      status: archivedProofCount > 0 ? "ok" : "info",
    },
    {
      label: "Workshop Registrations",
      value: workshopRegistrationCount,
      description:
        language === "id"
          ? "Registrasi aktivitas offline/community onboarding."
          : "Registrations for offline/community onboarding.",
      status: workshopRegistrationCount > 0 ? "ok" : "info",
    },
    {
      label: "XP Distributed",
      value: rewardAggregate._sum.xpAmount ?? 0,
      description:
        language === "id"
          ? "Total XP yang tercatat di reward ledger."
          : "Total XP recorded in the reward ledger.",
      status: (rewardAggregate._sum.xpAmount ?? 0) > 0 ? "ok" : "info",
    },
  ];

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
              System Health
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Admin Health Check
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              {language === "id"
                ? "Pantau kondisi inti MVP: database, learner, course, quest, submission, proof, Filecoin archive, Stellar track, dan readiness profile."
                : "Monitor core MVP health: database, learners, courses, quests, submissions, proofs, Filecoin archive, Stellar track, and readiness profiles."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/qa-checklist"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              QA Checklist
            </Link>
            <Link
              href="/status"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:border-emerald-400/40"
            >
              Public Status
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-slate-400">{card.label}</p>
              <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusClass(card.status)}`}>
                {statusLabel(card.status, language)}
              </span>
            </div>
            <p className="mt-3 text-3xl font-black text-white">{card.value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">{card.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">
                Recent Submissions
              </p>
              <h2 className="mt-2 text-2xl font-black">
                {language === "id" ? "Submission Terbaru" : "Latest Submissions"}
              </h2>
            </div>
            <Link href="/admin/submissions" className="text-sm font-black text-emerald-300 hover:text-emerald-200">
              Review
            </Link>
          </div>

          <div className="mt-5 grid gap-3">
            {recentSubmissions.length > 0 ? (
              recentSubmissions.map((submission) => (
                <div key={submission.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-wide">
                    <span className="rounded-full bg-amber-400/10 px-3 py-1 text-amber-300">
                      {submission.status}
                    </span>
                    {submission.quest.chainKey ? (
                      <span className="rounded-full bg-sky-400/10 px-3 py-1 text-sky-300">
                        {submission.quest.chainKey}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 font-black">{submission.quest.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {submission.user.displayName} (@{submission.user.username}) · {submission.quest.xpReward} XP
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-white/10 p-4 text-slate-300">
                {language === "id" ? "Belum ada submission terbaru." : "No recent submissions."}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">
                Recent Proofs
              </p>
              <h2 className="mt-2 text-2xl font-black">
                {language === "id" ? "Proof Terbaru" : "Latest Proofs"}
              </h2>
            </div>
            <Link href="/admin/proofs" className="text-sm font-black text-emerald-300 hover:text-emerald-200">
              Archive
            </Link>
          </div>

          <div className="mt-5 grid gap-3">
            {recentProofs.length > 0 ? (
              recentProofs.map((proof) => (
                <Link
                  key={proof.id}
                  href={`/proofs/${proof.id}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-emerald-400/40"
                >
                  <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-wide">
                    <span className="rounded-full bg-violet-400/10 px-3 py-1 text-violet-300">
                      {proof.type}
                    </span>
                    <span className={proof.archivedToFilecoin ? "rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300" : "rounded-full bg-amber-400/10 px-3 py-1 text-amber-300"}>
                      {proof.archivedToFilecoin ? "Archived" : "Pending Archive"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-black">{proof.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {proof.user.displayName} (@{proof.user.username})
                  </p>
                  {proof.filecoinCid ? (
                    <p className="mt-2 truncate font-mono text-xs text-slate-500">
                      {proof.filecoinCid}
                    </p>
                  ) : null}
                </Link>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-white/10 p-4 text-slate-300">
                {language === "id" ? "Belum ada proof terbaru." : "No recent proofs."}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
