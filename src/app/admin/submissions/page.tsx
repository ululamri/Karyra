import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { getServerLanguage } from "../../../lib/i18n-server";
import { SubmitButton } from "../../../components/submit-button";
import {
  approveQuestSubmissionAction,
  rejectQuestSubmissionAction,
} from "../../actions/admin";

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

export default async function AdminSubmissionsPage() {
  const language = await getServerLanguage();

  const submissions = await prisma.questSubmission.findMany({
    orderBy: {
      submittedAt: "desc",
    },
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
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <Link href="/admin" className="text-sm text-emerald-300">
          ← Admin
        </Link>

        <div className="mt-5 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Quest Review
            </p>

            <h1 className="mt-4 text-3xl font-bold md:text-5xl">
              {language === "id"
                ? "Review Submission Quest"
                : "Review Quest Submissions"}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Admin dapat menyetujui submission quest dan membagikan XP ke learner."
                : "Admins can approve quest submissions and distribute XP to learners."}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
            <div className="rounded-3xl bg-white/5 p-6">
              <p className="text-sm text-slate-400">Pending</p>
              <p className="mt-2 text-4xl font-bold text-emerald-300">
                {pendingCount}
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 p-6">
              <p className="text-sm text-slate-400">Approved</p>
              <p className="mt-2 text-4xl font-bold">{approvedCount}</p>
            </div>

            <div className="rounded-3xl bg-white/5 p-6">
              <p className="text-sm text-slate-400">Rejected</p>
              <p className="mt-2 text-4xl font-bold">{rejectedCount}</p>
            </div>
          </div>
        </div>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">
                {language === "id" ? "Daftar Submission" : "Submission List"}
              </h2>
              <p className="mt-2 text-slate-400">
                {language === "id"
                  ? "Submission yang disetujui akan memberikan XP quest ke learner."
                  : "Approved submissions will grant quest XP to learners."}
              </p>
            </div>

            <Link
              href="/quests"
              className="rounded-2xl bg-white/10 px-5 py-3 text-center font-bold text-white"
            >
              View Quests
            </Link>
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
                    className="rounded-3xl bg-slate-900 p-5"
                  >
                    <div className="flex flex-col justify-between gap-5 lg:flex-row">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                          <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                            {submission.status}
                          </span>
                          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                            {submission.quest.type}
                          </span>
                          <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                            {submission.quest.difficulty}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-bold">
                          {submission.quest.title}
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                          Learner: {submission.user.displayName} (@
                          {submission.user.username}) • Level{" "}
                          {submission.user.level} • {submission.user.xp} XP
                        </p>

                        <p className="mt-2 text-sm font-semibold text-emerald-300">
                          Reward: {submission.quest.xpReward} XP
                        </p>

                        <div className="mt-5 rounded-2xl bg-slate-950 p-4">
                          <p className="text-sm font-semibold text-slate-400">
                            Evidence
                          </p>
                          <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-300">
                            {evidenceText}
                          </p>
                        </div>

                        {submission.reviewNote ? (
                          <div className="mt-4 rounded-2xl bg-white/5 p-4">
                            <p className="text-sm font-semibold text-slate-400">
                              Review Note
                            </p>
                            <p className="mt-2 text-slate-300">
                              {submission.reviewNote}
                            </p>
                          </div>
                        ) : null}
                      </div>

                      <div className="w-full lg:max-w-sm">
                        {isFinal ? (
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="font-bold">
                              {language === "id"
                                ? "Sudah direview"
                                : "Already reviewed"}
                            </p>
                            <p className="mt-2 text-sm text-slate-400">
                              {submission.reviewedAt
                                ? new Date(
                                    submission.reviewedAt,
                                  ).toLocaleString()
                                : "-"}
                            </p>
                          </div>
                        ) : (
                          <div className="grid gap-3">
                            <form
                              action={approveQuestSubmissionAction}
                              className="grid gap-3"
                            >
                              <input
                                type="hidden"
                                name="submissionId"
                                value={submission.id}
                              />

                              <textarea
                                name="reviewNote"
                                rows={3}
                                placeholder={
                                  language === "id"
                                    ? "Catatan approval opsional..."
                                    : "Optional approval note..."
                                }
                                className="rounded-2xl border border-white/10 bg-slate-950 p-4 text-sm text-white outline-none placeholder:text-slate-500"
                              />

                              <SubmitButton pendingText="Approving...">
                                Approve + Grant XP
                              </SubmitButton>
                            </form>

                            <form
                              action={rejectQuestSubmissionAction}
                              className="grid gap-3"
                            >
                              <input
                                type="hidden"
                                name="submissionId"
                                value={submission.id}
                              />

                              <textarea
                                name="reviewNote"
                                rows={3}
                                placeholder={
                                  language === "id"
                                    ? "Alasan reject..."
                                    : "Rejection reason..."
                                }
                                className="rounded-2xl border border-white/10 bg-slate-950 p-4 text-sm text-white outline-none placeholder:text-slate-500"
                              />

                              <SubmitButton
                                variant="secondary"
                                pendingText="Rejecting..."
                              >
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
              <div className="rounded-3xl bg-slate-900 p-6">
                <p className="text-slate-300">
                  {language === "id"
                    ? "Belum ada submission quest."
                    : "No quest submissions yet."}
                </p>

                <Link
                  href="/quests"
                  className="mt-5 inline-flex rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-slate-950"
                >
                  Submit Quest Demo
                </Link>
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
