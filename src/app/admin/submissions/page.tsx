import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { getServerLanguage } from "../../../lib/i18n-server";
import { SubmitButton } from "../../../components/submit-button";
import {
  approveQuestSubmissionAction,
  rejectQuestSubmissionAction,
} from "../../actions/admin";
import { MetricCard } from "@/components/ui/compact-card";

function getEvidenceText(evidence: unknown) {
  if (
    evidence &&
    typeof evidence === "object" &&
    "text" in evidence &&
    typeof evidence.text === "string"
  ) {
    return evidence.text;
  }

  return "-";
}

function statusTone(status: string) {
  if (status === "APPROVED") return "bg-emerald-400/10 text-emerald-300";
  if (status === "REJECTED") return "bg-rose-400/10 text-rose-300";
  if (status === "SUBMITTED" || status === "NEEDS_REVIEW") return "bg-amber-400/10 text-amber-300";
  return "bg-white/10 text-slate-300";
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export default async function AdminSubmissionsPage() {
  const language = await getServerLanguage();

  const submissions = await prisma.questSubmission.findMany({
    orderBy: { submittedAt: "desc" },
    select: {
      id: true,
      status: true,
      evidence: true,
      submittedAt: true,
      reviewedAt: true,
      reviewNote: true,
      user: {
        select: {
          username: true,
          displayName: true,
          xp: true,
          level: true,
        },
      },
      quest: {
        select: {
          slug: true,
          title: true,
          xpReward: true,
          type: true,
          difficulty: true,
          chainKey: true,
        },
      },
    },
  });

  const pendingCount = submissions.filter(
    (submission) =>
      submission.status === "SUBMITTED" || submission.status === "NEEDS_REVIEW",
  ).length;

  const approvedCount = submissions.filter(
    (submission) => submission.status === "APPROVED",
  ).length;

  const rejectedCount = submissions.filter(
    (submission) => submission.status === "REJECTED",
  ).length;

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
              Quest Review
            </p>

            <h1 className="mt-3 text-3xl font-black md:text-5xl">
              {language === "id"
                ? "Review Submission Quest"
                : "Review Quest Submissions"}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              {language === "id"
                ? "Setujui submission, tambahkan catatan review, bagikan XP, dan ubah submission menjadi sinyal proof/readiness yang lebih rapi."
                : "Approve submissions, add review notes, grant XP, and turn submissions into cleaner proof/readiness signals."}
            </p>
          </div>

          <Link
            href="/quests"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-black text-white transition hover:border-emerald-400/40"
          >
            View Quests
          </Link>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <MetricCard label="Pending" value={pendingCount} hint="needs admin review" />
        <MetricCard label="Approved" value={approvedCount} />
        <MetricCard label="Rejected" value={rejectedCount} />
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Review Queue
            </p>
            <h2 className="mt-2 text-2xl font-black">
              {language === "id" ? "Daftar Submission" : "Submission List"}
            </h2>
          </div>
          <p className="text-sm text-slate-500">{submissions.length} total submissions</p>
        </div>

        <div className="mt-6 grid gap-5">
          {submissions.length > 0 ? (
            submissions.map((submission) => {
              const evidenceText = getEvidenceText(submission.evidence);
              const isFinal =
                submission.status === "APPROVED" ||
                submission.status === "REJECTED";

              return (
                <article
                  key={submission.id}
                  className="rounded-3xl border border-white/10 bg-slate-950/60 p-5"
                >
                  <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-wide">
                        <span className={`rounded-full px-3 py-1 ${statusTone(submission.status)}`}>
                          {formatStatus(submission.status)}
                        </span>
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                          {submission.quest.type}
                        </span>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                          {submission.quest.difficulty}
                        </span>
                        {submission.quest.chainKey ? (
                          <span className="rounded-full bg-sky-400/10 px-3 py-1 text-sky-300">
                            {submission.quest.chainKey}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="mt-4 text-xl font-black md:text-2xl">
                        {submission.quest.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-400">
                        Learner: {submission.user.displayName} (@{submission.user.username}) • Level{" "}
                        {submission.user.level} • {submission.user.xp} XP
                      </p>

                      <p className="mt-2 text-sm font-black text-emerald-300">
                        Reward: {submission.quest.xpReward} XP
                      </p>

                      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950 p-4">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                          Evidence
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                          {evidenceText}
                        </p>
                      </div>

                      {submission.reviewNote ? (
                        <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                          <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                            Review Note
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            {submission.reviewNote}
                          </p>
                        </div>
                      ) : null}
                    </div>

                    <div className="w-full">
                      {isFinal ? (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                          <p className="font-black">
                            {language === "id" ? "Sudah direview" : "Already reviewed"}
                          </p>
                          <p className="mt-2 text-sm text-slate-400">
                            {submission.reviewedAt
                              ? new Date(submission.reviewedAt).toLocaleString("id-ID")
                              : "-"}
                          </p>
                        </div>
                      ) : (
                        <div className="grid gap-3">
                          <form action={approveQuestSubmissionAction} className="grid gap-3">
                            <input type="hidden" name="submissionId" value={submission.id} />

                            <textarea
                              name="reviewNote"
                              rows={4}
                              placeholder={
                                language === "id"
                                  ? "Catatan approval opsional..."
                                  : "Optional approval note..."
                              }
                              className="rounded-2xl border border-white/10 bg-slate-950 p-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400/40"
                            />

                            <SubmitButton pendingText="Approving...">
                              Approve + Grant XP
                            </SubmitButton>
                          </form>

                          <form action={rejectQuestSubmissionAction} className="grid gap-3">
                            <input type="hidden" name="submissionId" value={submission.id} />

                            <textarea
                              name="reviewNote"
                              rows={4}
                              placeholder={
                                language === "id" ? "Alasan reject..." : "Rejection reason..."
                              }
                              className="rounded-2xl border border-white/10 bg-slate-950 p-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-rose-400/40"
                            />

                            <SubmitButton variant="secondary" pendingText="Rejecting...">
                              Reject
                            </SubmitButton>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 p-6">
              <p className="text-sm text-slate-300">
                {language === "id"
                  ? "Belum ada submission quest."
                  : "No quest submissions yet."}
              </p>

              <Link
                href="/quests"
                className="mt-5 inline-flex min-h-12 items-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950"
              >
                Submit Quest Demo
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
