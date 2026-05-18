import Link from "next/link";
import { getOrCreateDemoLearner } from "@/lib/readiness";
import { prisma } from "@/lib/prisma";

type TimelineItem = {
  id: string;
  type:
    | "BADGE"
    | "QUEST_SUBMITTED"
    | "QUEST_REVIEWED"
    | "PROOF"
    | "FILECOIN_ARCHIVE"
    | "WORKSHOP"
    | "REWARD";
  title: string;
  description: string;
  date: Date;
  meta?: string;
  href?: string;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getTypeLabel(type: TimelineItem["type"]) {
  switch (type) {
    case "BADGE":
      return "Badge";
    case "QUEST_SUBMITTED":
      return "Quest Submitted";
    case "QUEST_REVIEWED":
      return "Quest Reviewed";
    case "PROOF":
      return "Proof Issued";
    case "FILECOIN_ARCHIVE":
      return "Filecoin Archive";
    case "WORKSHOP":
      return "Workshop";
    case "REWARD":
      return "Reward";
    default:
      return "Activity";
  }
}

function getTypeClass(type: TimelineItem["type"]) {
  switch (type) {
    case "BADGE":
      return "border-amber-400/30 bg-amber-400/10 text-amber-300";
    case "QUEST_SUBMITTED":
      return "border-sky-400/30 bg-sky-400/10 text-sky-300";
    case "QUEST_REVIEWED":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    case "PROOF":
      return "border-violet-400/30 bg-violet-400/10 text-violet-300";
    case "FILECOIN_ARCHIVE":
      return "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300";
    case "WORKSHOP":
      return "border-cyan-400/30 bg-cyan-400/10 text-cyan-300";
    case "REWARD":
      return "border-lime-400/30 bg-lime-400/10 text-lime-300";
    default:
      return "border-zinc-700 bg-zinc-800 text-zinc-300";
  }
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

export default async function PassportTimelinePage() {
  const learner = await getOrCreateDemoLearner();

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: learner.id,
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      city: true,
      readinessProfile: true,
      badges: {
        orderBy: {
          awardedAt: "desc",
        },
        include: {
          badge: true,
        },
      },
      questSubmissions: {
        orderBy: {
          submittedAt: "desc",
        },
        include: {
          quest: {
            select: {
              title: true,
              slug: true,
              xpReward: true,
              chainKey: true,
            },
          },
        },
      },
      proofRecords: {
        orderBy: {
          issuedAt: "desc",
        },
      },
      rewardLedger: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          quest: {
            select: {
              title: true,
              slug: true,
              chainKey: true,
            },
          },
        },
      },
      workshopRegistrations: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          workshop: {
            select: {
              title: true,
              slug: true,
              city: true,
              startsAt: true,
            },
          },
        },
      },
    },
  });

  const timelineItems: TimelineItem[] = [
    ...user.badges.map((userBadge) => ({
      id: `badge-${userBadge.id}`,
      type: "BADGE" as const,
      title: `Badge awarded: ${userBadge.badge.name}`,
      description:
        userBadge.badge.description ??
        "Learner mendapatkan badge dari milestone Karyra.",
      date: userBadge.awardedAt,
      meta: "Readiness identity",
    })),

    ...user.questSubmissions.map((submission) => ({
      id: `quest-submitted-${submission.id}`,
      type: "QUEST_SUBMITTED" as const,
      title: `Submitted quest: ${submission.quest.title}`,
      description:
        getEvidenceText(submission.evidence) ||
        "Learner mengirim jawaban atau bukti penyelesaian quest.",
      date: submission.submittedAt,
      meta: `${submission.status} · ${submission.quest.chainKey ?? "chain-agnostic"}`,
      href: `/quests${
        submission.quest.chainKey
          ? `?track=${submission.quest.chainKey}`
          : ""
      }`,
    })),

    ...user.questSubmissions
      .filter((submission) => submission.reviewedAt)
      .map((submission) => ({
        id: `quest-reviewed-${submission.id}`,
        type: "QUEST_REVIEWED" as const,
        title: `${submission.status}: ${submission.quest.title}`,
        description:
          submission.reviewNote ??
          "Submission sudah direview oleh admin Karyra.",
        date: submission.reviewedAt ?? submission.updatedAt,
        meta: `${submission.quest.xpReward} XP reward`,
        href: "/admin/submissions",
      })),

    ...user.proofRecords.map((proof) => ({
      id: `proof-${proof.id}`,
      type: "PROOF" as const,
      title: proof.title,
      description:
        proof.description ??
        "Proof record diterbitkan sebagai bagian dari Readiness Passport.",
      date: proof.issuedAt,
      meta: `${proof.type} · ${proof.xpValue} XP value`,
      href: `/proofs/${proof.id}`,
    })),

    ...user.proofRecords
      .filter((proof) => proof.archivedToFilecoin)
      .map((proof) => ({
        id: `filecoin-${proof.id}`,
        type: "FILECOIN_ARCHIVE" as const,
        title: `Archived to Filecoin: ${proof.title}`,
        description: proof.filecoinCid
          ? `CID: ${proof.filecoinCid}`
          : "Proof record sudah ditandai sebagai archived.",
        date: proof.issuedAt,
        meta: "Proof Archive",
        href: `/proofs/${proof.id}`,
      })),

    ...user.rewardLedger.map((reward) => ({
      id: `reward-${reward.id}`,
      type: "REWARD" as const,
      title: `Reward credited${reward.quest ? `: ${reward.quest.title}` : ""}`,
      description:
        reward.reason ??
        "Reward diberikan dari aktivitas belajar atau quest Karyra.",
      date: reward.createdAt,
      meta: `${reward.kind} · ${reward.xpAmount ?? 0} XP`,
    })),

    ...user.workshopRegistrations.map((registration) => ({
      id: `workshop-${registration.id}`,
      type: "WORKSHOP" as const,
      title: `${registration.status}: ${registration.workshop.title}`,
      description: `${registration.workshop.city ?? "Community"} · ${formatDate(
        registration.workshop.startsAt,
      )}`,
      date: registration.attendedAt ?? registration.createdAt,
      meta: "Offline participation",
      href: "/workshops",
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-400">
              Karyra Readiness Passport
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              Readiness Timeline
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
              Riwayat perjalanan learner dari badge, quest, reward, workshop,
              proof record, sampai status arsip Filecoin.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/passport"
              className="rounded-2xl border border-zinc-800 px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-emerald-500 hover:text-emerald-300"
            >
              Back to Passport
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Learner</p>
            <p className="mt-2 text-xl font-bold">{user.displayName}</p>
            <p className="mt-1 text-xs text-zinc-500">
              @{user.username}
              {user.city ? ` · ${user.city}` : ""}
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Readiness Score</p>
            <p className="mt-2 text-3xl font-bold text-emerald-300">
              {user.readinessProfile?.readinessScore ?? 0}/100
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Readiness Level</p>
            <p className="mt-2 text-xl font-bold text-emerald-300">
              {user.readinessProfile?.level ?? "BEGINNER"}
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Timeline Items</p>
            <p className="mt-2 text-3xl font-bold">{timelineItems.length}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 md:p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-400">
                Learning Identity Journey
              </p>
              <h2 className="mt-1 text-2xl font-semibold">
                Aktivitas terbaru learner
              </h2>
            </div>

            <p className="text-sm text-zinc-500">
              {timelineItems.length} activity
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            {timelineItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-800 p-6 text-sm text-zinc-400">
                Belum ada aktivitas timeline. Mulai belajar, submit quest, atau
                ikuti workshop untuk membangun readiness journey.
              </div>
            ) : (
              timelineItems.map((item) => (
                <article
                  key={item.id}
                  className="relative rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${getTypeClass(
                            item.type,
                          )}`}
                        >
                          {getTypeLabel(item.type)}
                        </span>

                        {item.meta ? (
                          <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">
                            {item.meta}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="mt-3 text-lg font-semibold text-zinc-100">
                        {item.title}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">
                        {item.description}
                      </p>

                      {item.href ? (
                        <Link
                          href={item.href}
                          className="mt-3 inline-flex text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                        >
                          Open detail
                        </Link>
                      ) : null}
                    </div>

                    <p className="shrink-0 text-sm text-zinc-500">
                      {formatDate(item.date)}
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
}