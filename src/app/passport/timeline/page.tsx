import Link from "next/link";
import { getOrCreateDemoLearner } from "@/lib/readiness";
import { prisma } from "@/lib/prisma";

type TimelineItem = {
  id: string;
  type: "BADGE" | "QUEST_SUBMITTED" | "QUEST_REVIEWED" | "PROOF" | "FILECOIN_ARCHIVE" | "WORKSHOP" | "REWARD";
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
      return "Proof Archived";
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
      return "border-slate-700 bg-slate-800 text-slate-300";
  }
}

function getEvidenceText(evidence: unknown) {
  if (evidence && typeof evidence === "object" && "text" in evidence && typeof evidence.text === "string") {
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
        orderBy: { awardedAt: "desc" },
        include: { badge: true },
      },
      questSubmissions: {
        orderBy: { submittedAt: "desc" },
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
        orderBy: { issuedAt: "desc" },
      },
      rewardLedger: {
        orderBy: { createdAt: "desc" },
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
        orderBy: { createdAt: "desc" },
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
      title: `Badge earned: ${userBadge.badge.name}`,
      description: userBadge.badge.description ?? "A readiness badge was added to the learner identity.",
      date: userBadge.awardedAt,
      meta: "Identity milestone",
      href: "/passport",
    })),
    ...user.questSubmissions.map((submission) => ({
      id: `quest-submitted-${submission.id}`,
      type: "QUEST_SUBMITTED" as const,
      title: `Quest submitted: ${submission.quest.title}`,
      description: getEvidenceText(submission.evidence) || "The learner submitted evidence for a readiness quest.",
      date: submission.submittedAt,
      meta: `${submission.status} · ${submission.quest.chainKey ?? "general"}`,
      href: `/quests${submission.quest.chainKey ? `?track=${submission.quest.chainKey}` : ""}`,
    })),
    ...user.questSubmissions
      .filter((submission) => submission.reviewedAt)
      .map((submission) => ({
        id: `quest-reviewed-${submission.id}`,
        type: "QUEST_REVIEWED" as const,
        title: `${submission.status}: ${submission.quest.title}`,
        description: submission.reviewNote ?? "The quest evidence was reviewed and updated.",
        date: submission.reviewedAt ?? submission.updatedAt,
        meta: `${submission.quest.xpReward} XP reward`,
        href: "/passport",
      })),
    ...user.proofRecords.map((proof) => ({
      id: `proof-${proof.id}`,
      type: "PROOF" as const,
      title: proof.title,
      description: proof.description ?? "A proof record was issued as part of the Readiness Passport.",
      date: proof.issuedAt,
      meta: `${proof.type} · ${proof.xpValue} XP`,
      href: `/proofs/${proof.id}`,
    })),
    ...user.proofRecords
      .filter((proof) => proof.archivedToFilecoin)
      .map((proof) => ({
        id: `filecoin-${proof.id}`,
        type: "FILECOIN_ARCHIVE" as const,
        title: `Archived proof: ${proof.title}`,
        description: proof.filecoinCid ? `CID: ${proof.filecoinCid}` : "The proof was marked as archived.",
        date: proof.issuedAt,
        meta: "Proof Archive",
        href: `/proofs/${proof.id}`,
      })),
    ...user.rewardLedger.map((reward) => ({
      id: `reward-${reward.id}`,
      type: "REWARD" as const,
      title: `Reward credited${reward.quest ? `: ${reward.quest.title}` : ""}`,
      description: reward.reason ?? "A learning or quest reward was credited.",
      date: reward.createdAt,
      meta: `${reward.kind} · ${reward.xpAmount ?? 0} XP`,
      href: "/passport",
    })),
    ...user.workshopRegistrations.map((registration) => ({
      id: `workshop-${registration.id}`,
      type: "WORKSHOP" as const,
      title: `${registration.status}: ${registration.workshop.title}`,
      description: `${registration.workshop.city ?? "Community"} · ${formatDate(registration.workshop.startsAt)}`,
      date: registration.attendedAt ?? registration.createdAt,
      meta: "Proof-of-Participation",
      href: "/workshops",
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 pb-24 md:px-8 md:py-12">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
          <Link href="/learner" className="rounded-full border border-white/10 px-3 py-1.5 hover:border-emerald-400/40 hover:text-emerald-300">Learn</Link>
          <span>/</span>
          <Link href="/passport" className="rounded-full border border-white/10 px-3 py-1.5 hover:border-emerald-400/40 hover:text-emerald-300">Passport</Link>
          <span>/</span>
          <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-emerald-300">Timeline</span>
        </nav>

        <header className="grid gap-5 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Readiness Journey</p>
            <h1 className="mt-4 text-3xl font-black tracking-tight md:text-6xl">A timeline of learning, participation, and readiness.</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Follow how a learner moves from lessons and quests into badges, rewards, proof records, and participation evidence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Score</p>
              <p className="mt-1 text-2xl font-black text-emerald-300">{user.readinessProfile?.readinessScore ?? 0}/100</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Activities</p>
              <p className="mt-1 text-2xl font-black">{timelineItems.length}</p>
            </div>
          </div>
        </header>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 md:p-6">
          <div className="grid gap-3">
            {timelineItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-slate-400">
                No timeline activity yet. Start learning, submit a quest, or join a workshop to build your readiness journey.
              </div>
            ) : (
              timelineItems.map((item) => (
                <article key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className={`rounded-full border px-3 py-1 text-xs font-black ${getTypeClass(item.type)}`}>{getTypeLabel(item.type)}</span>
                        {item.meta ? <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">{item.meta}</span> : null}
                      </div>
                      <h3 className="mt-3 font-black text-white">{item.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{item.description}</p>
                      {item.href ? <Link href={item.href} className="mt-3 inline-flex text-sm font-black text-emerald-300">Open detail →</Link> : null}
                    </div>
                    <p className="shrink-0 text-sm text-slate-500">{formatDate(item.date)}</p>
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
