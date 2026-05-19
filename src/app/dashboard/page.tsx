import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";
import { t } from "@/lib/i18n";
import { PageShell } from "@/components/ui/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { CompactCard, MetricCard } from "@/components/ui/compact-card";
import { ModePill } from "@/components/ui/mode-pill";

function getEvidenceText(evidence: unknown) {
  if (evidence && typeof evidence === "object" && "text" in evidence && typeof evidence.text === "string") return evidence.text;
  return "-";
}

function statusClass(status: string) {
  switch (status) {
    case "APPROVED": return "bg-emerald-400/15 text-emerald-300";
    case "REJECTED": return "bg-rose-400/15 text-rose-300";
    default: return "bg-amber-400/15 text-amber-300";
  }
}

export default async function DashboardPage() {
  const language = await getServerLanguage();
  const learner = await prisma.user.findUnique({
    where: { username: "demo" },
    select: {
      id: true, username: true, displayName: true, city: true, xp: true, level: true, streakCount: true,
      enrollments: { orderBy: { createdAt: "desc" }, select: { id: true, status: true, progressPct: true, course: { select: { id: true, slug: true, title: true, subtitle: true, difficulty: true, modules: { orderBy: { order: "asc" }, select: { id: true, order: true, title: true, lessons: { where: { status: "PUBLISHED" }, orderBy: { order: "asc" }, select: { id: true, slug: true, title: true, order: true, estimatedMinutes: true, xpReward: true } } } }, quests: { where: { status: "PUBLISHED" }, orderBy: { createdAt: "asc" }, select: { id: true, slug: true, title: true, description: true, xpReward: true, type: true, difficulty: true, tasks: { orderBy: { order: "asc" }, select: { id: true, order: true, title: true } } } } } } } },
      lessonProgress: { select: { id: true, status: true, lesson: { select: { id: true, slug: true, title: true, estimatedMinutes: true, xpReward: true } } } },
      badges: { orderBy: { awardedAt: "desc" }, select: { id: true, awardedAt: true, badge: { select: { slug: true, name: true, description: true } } } },
      rewardLedger: { orderBy: { createdAt: "desc" }, take: 5, select: { id: true, kind: true, xpAmount: true, reason: true, createdAt: true } },
      questSubmissions: { orderBy: { submittedAt: "desc" }, take: 5, select: { id: true, status: true, evidence: true, submittedAt: true, reviewNote: true, quest: { select: { slug: true, title: true, xpReward: true, chainKey: true } } } },
      workshopRegistrations: { orderBy: { createdAt: "desc" }, take: 3, select: { id: true, status: true, workshop: { select: { slug: true, title: true, city: true, startsAt: true } } } },
    },
  });

  if (!learner) {
    return (
      <PageShell size="narrow">
        <PageHero eyebrow="Learner Mode" title={t(language, "learnerDashboard")} description="Demo learner belum tersedia. Jalankan seed data terlebih dahulu." />
        <pre className="rounded-2xl border border-white/10 bg-slate-900 p-4 text-sm text-slate-300">npm run db:seed</pre>
      </PageShell>
    );
  }

  const activeEnrollment = learner.enrollments[0];
  const activeCourse = activeEnrollment?.course;
  const continueLesson = learner.lessonProgress[0]?.lesson ?? activeCourse?.modules.flatMap((module) => module.lessons)[0];
  const activeQuest = activeCourse?.quests[0];

  return (
    <PageShell>
      <PageHero
        eyebrow={t(language, "learnerDashboard")}
        title={language === "id" ? `Halo, ${learner.displayName}` : `Hello, ${learner.displayName}`}
        description={language === "id" ? "Lanjutkan progres belajar Web3, kumpulkan XP, dan selesaikan quest komunitas." : "Continue your Web3 learning progress, collect XP, and complete community quests."}
        actions={[
          ...(continueLesson ? [{ href: `/lessons/${continueLesson.slug}`, label: t(language, "continueLearning"), variant: "primary" as const }] : []),
          { href: "/passport", label: language === "id" ? "Passport" : "Passport" },
          { href: "/stacks/stellar-readiness", label: "Stellar" },
        ]}
      >
        <ModePill mode="Learner" />
      </PageHero>

      <section className="grid grid-cols-3 gap-3">
        <MetricCard label={t(language, "totalXp")} value={learner.xp} />
        <MetricCard label={t(language, "currentLevel")} value={learner.level} />
        <MetricCard label={t(language, "dayStreak")} value={learner.streakCount} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold md:text-2xl">{t(language, "learningProgress")}</h2>
              {activeCourse ? <p className="mt-1 text-sm text-slate-400">{activeCourse.title}</p> : null}
            </div>
            {activeEnrollment ? <p className="text-2xl font-bold text-emerald-300">{activeEnrollment.progressPct}%</p> : null}
          </div>
          {activeEnrollment ? <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${activeEnrollment.progressPct}%` }} /></div> : null}
          {continueLesson ? <CompactCard href={`/lessons/${continueLesson.slug}`} title={continueLesson.title} eyebrow={language === "id" ? "Lesson aktif" : "Active lesson"} description={`${continueLesson.estimatedMinutes} menit • ${continueLesson.xpReward} XP`} className="mt-4 bg-slate-950/40" /> : null}
          {activeCourse ? <div className="mt-4 grid gap-2">{activeCourse.modules.slice(0, 4).map((module) => <div key={module.id} className="rounded-2xl bg-slate-950/50 p-3"><p className="text-xs text-slate-500">Module {module.order}</p><h3 className="mt-1 text-sm font-bold">{module.title}</h3><p className="mt-1 text-xs text-slate-500">{module.lessons.length} lesson</p></div>)}</div> : null}
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4 md:p-5">
            <h2 className="text-lg font-bold md:text-2xl">{t(language, "activeQuest")}</h2>
            {activeQuest ? <div className="mt-3"><div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide"><span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-300">{activeQuest.type}</span><span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">{activeQuest.difficulty}</span></div><h3 className="mt-3 font-bold">{activeQuest.title}</h3>{activeQuest.description ? <p className="mt-2 text-sm leading-6 text-slate-300">{activeQuest.description}</p> : null}<p className="mt-3 text-sm font-bold text-emerald-300">Reward {activeQuest.xpReward} XP</p></div> : <p className="mt-2 text-sm text-slate-300">{language === "id" ? "Belum ada quest aktif." : "No active quest yet."}</p>}
          </div>

          <div className="rounded-3xl border border-sky-400/20 bg-sky-400/10 p-4 md:p-5">
            <div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold md:text-2xl">{language === "id" ? "Status Submission" : "Submission Status"}</h2><Link href="/quests?track=stellar-readiness" className="text-sm font-bold text-sky-200">Quest →</Link></div>
            <div className="mt-3 grid gap-2">{learner.questSubmissions.length > 0 ? learner.questSubmissions.map((submission) => <div key={submission.id} className="rounded-2xl bg-slate-950/50 p-3"><div className="flex flex-wrap gap-2"><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${statusClass(submission.status)}`}>{submission.status}</span>{submission.quest.chainKey ? <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-slate-300">{submission.quest.chainKey}</span> : null}</div><h3 className="mt-2 text-sm font-bold">{submission.quest.title}</h3><p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{getEvidenceText(submission.evidence)}</p><p className="mt-2 text-xs font-bold text-sky-300">{submission.quest.xpReward} XP</p></div>) : <p className="rounded-2xl bg-slate-950/50 p-3 text-sm text-slate-300">{language === "id" ? "Belum ada submission quest." : "No quest submissions yet."}</p>}</div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:p-5"><h2 className="text-lg font-bold md:text-2xl">{t(language, "earnedBadges")}</h2><div className="mt-3 grid gap-2">{learner.badges.length > 0 ? learner.badges.map((userBadge) => <div key={userBadge.id} className="flex gap-3 rounded-2xl bg-slate-950/50 p-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/15">🏅</div><div><h3 className="text-sm font-bold">{userBadge.badge.name}</h3>{userBadge.badge.description ? <p className="mt-1 text-xs leading-5 text-slate-400">{userBadge.badge.description}</p> : null}</div></div>) : <p className="text-sm text-slate-300">{language === "id" ? "Belum ada badge." : "No badges yet."}</p>}</div></div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:p-5"><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold md:text-2xl">{language === "id" ? "Workshop" : "Workshops"}</h2><Link href="/workshops" className="text-sm font-bold text-emerald-300">{t(language, "workshops")} →</Link></div><div className="mt-3 grid gap-2">{learner.workshopRegistrations.length > 0 ? learner.workshopRegistrations.map((registration) => <div key={registration.id} className="rounded-2xl bg-slate-950/50 p-3"><p className="text-xs font-bold uppercase tracking-wide text-emerald-300">{registration.status}</p><h3 className="mt-1 text-sm font-bold">{registration.workshop.title}</h3><p className="mt-1 text-xs text-slate-500">{registration.workshop.city ?? "Community"} • {new Date(registration.workshop.startsAt).toLocaleString()}</p></div>) : <p className="rounded-2xl bg-slate-950/50 p-3 text-sm text-slate-300">{language === "id" ? "Belum terdaftar di workshop." : "Not registered in any workshop yet."}</p>}</div></div>
      </section>
    </PageShell>
  );
}
