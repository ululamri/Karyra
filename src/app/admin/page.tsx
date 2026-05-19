import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";
import { PageShell } from "@/components/ui/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { CompactCard, MetricCard } from "@/components/ui/compact-card";
import { ModePill } from "@/components/ui/mode-pill";

function formatStatus(status: string) {
  return status.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export default async function AdminOverviewPage() {
  const language = await getServerLanguage();
  const [learnerCount, courseCount, publishedCourseCount, lessonCount, questCount, pendingSubmissionCount, workshopCount, rewardAggregate, readinessProfileCount, readyLearnerCount, proofRecordCount, archivedProofCount, stellarQuestCount, recentCourses, recentSubmissions, recentProofs] = await Promise.all([
    prisma.user.count({ where: { role: "LEARNER" } }),
    prisma.course.count(),
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.lesson.count(),
    prisma.quest.count(),
    prisma.questSubmission.count({ where: { status: { in: ["SUBMITTED", "NEEDS_REVIEW"] } } }),
    prisma.workshop.count(),
    prisma.rewardLedger.aggregate({ where: { kind: "XP", direction: "CREDIT" }, _sum: { xpAmount: true } }),
    prisma.readinessProfile.count(),
    prisma.readinessProfile.count({ where: { level: { in: ["READY", "COMMUNITY_READY"] } } }),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.quest.count({ where: { status: "PUBLISHED", chainKey: "stellar-readiness" } }),
    prisma.course.findMany({ orderBy: { createdAt: "desc" }, take: 3, select: { id: true, slug: true, title: true, status: true, difficulty: true } }),
    prisma.questSubmission.findMany({ orderBy: { submittedAt: "desc" }, take: 3, select: { id: true, status: true, submittedAt: true, user: { select: { displayName: true, username: true } }, quest: { select: { title: true, xpReward: true, chainKey: true } } } }),
    prisma.proofRecord.findMany({ orderBy: { issuedAt: "desc" }, take: 3, select: { id: true, title: true, type: true, archivedToFilecoin: true, filecoinCid: true, user: { select: { displayName: true, username: true } } } }),
  ]);

  const stats = [
    { label: "Learners", value: learnerCount },
    { label: "Published", value: publishedCourseCount },
    { label: "Lessons", value: lessonCount },
    { label: "Quests", value: questCount },
    { label: "Pending", value: pendingSubmissionCount },
    { label: "Workshops", value: workshopCount },
    { label: "XP", value: rewardAggregate._sum.xpAmount ?? 0 },
    { label: "Profiles", value: readinessProfileCount },
    { label: "Ready", value: readyLearnerCount },
    { label: "Proofs", value: proofRecordCount },
    { label: "Archived", value: archivedProofCount },
    { label: "Stellar", value: stellarQuestCount },
  ];

  const quickActions = [
    { href: "/admin/health", title: "System Health", description: "Database, readiness, proof, Filecoin, Stellar, dan pending submission.", badge: "Health" },
    { href: "/admin/submissions", title: "Review Submissions", description: "Approve quest, bagikan XP, dan sinkronkan readiness/proof.", badge: `${pendingSubmissionCount} pending` },
    { href: "/admin/learners", title: "Learner Readiness", description: "Pantau passport, readiness score, proof record, dan archive status.", badge: "Passport" },
    { href: "/admin/proofs", title: "Filecoin Proof Archive", description: "Kelola manifest, checksum, CID demo, dan proof verification.", badge: "Filecoin" },
    { href: "/admin/courses", title: "Manage Courses", description: "Publish, archive, dan preview konten belajar.", badge: `${courseCount} total` },
    { href: "/admin/workshops", title: "Manage Workshops", description: "Buat workshop dan pantau registrasi learner.", badge: "Offline" },
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow="Karyra Admin Console · Admin Mode"
        title={language === "id" ? "Kendali internal untuk demo Super Admin MVP." : "Internal control center for the MVP Super Admin demo."}
        description={language === "id" ? "Halaman ini adalah mode admin, bukan alur learner publik. Gunakan console ini untuk mengelola konten, review quest, readiness, proof archive, workshop, dan system health." : "This page is admin mode, not the public learner journey. Use this console to manage content, quest review, readiness, proof archive, workshops, and system health."}
        actions={[{ href: "/admin/health", label: "System Health", variant: "primary" }, { href: "/reviewer", label: "Reviewer" }, { href: "/menu", label: "Full Menu", variant: "ghost" }]}
      >
        <ModePill mode="Admin" label="Internal MVP Tools" />
      </PageHero>

      <section className="grid grid-cols-3 gap-3 md:grid-cols-6 lg:grid-cols-12">
        {stats.map((stat) => <MetricCard key={stat.label} label={stat.label} value={stat.value} />)}
      </section>

      <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => <CompactCard key={action.href} href={action.href} eyebrow="Admin Action" title={action.title} description={action.description} badge={action.badge} />)}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:p-5"><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold md:text-2xl">Recent Courses</h2><Link href="/admin/courses" className="text-sm font-bold text-emerald-300">View all</Link></div><div className="mt-3 grid gap-2">{recentCourses.map((course) => <div key={course.id} className="rounded-2xl bg-slate-950/50 p-3"><div className="flex gap-2"><span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-300">{formatStatus(course.status)}</span><span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-300">{formatStatus(course.difficulty)}</span></div><h3 className="mt-2 text-sm font-bold">{course.title}</h3></div>)}</div></div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:p-5"><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold md:text-2xl">Recent Submissions</h2><Link href="/admin/submissions" className="text-sm font-bold text-emerald-300">Review</Link></div><div className="mt-3 grid gap-2">{recentSubmissions.length > 0 ? recentSubmissions.map((submission) => <div key={submission.id} className="rounded-2xl bg-slate-950/50 p-3"><div className="flex gap-2"><span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">{formatStatus(submission.status)}</span><span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">{submission.quest.xpReward} XP</span></div><h3 className="mt-2 text-sm font-bold">{submission.quest.title}</h3><p className="mt-1 text-xs text-slate-500">{submission.user.displayName} (@{submission.user.username})</p></div>) : <p className="text-sm text-slate-400">No submissions yet.</p>}</div></div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:p-5"><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold md:text-2xl">Recent Proofs</h2><Link href="/admin/proofs" className="text-sm font-bold text-emerald-300">Archive</Link></div><div className="mt-3 grid gap-2">{recentProofs.length > 0 ? recentProofs.map((proof) => <div key={proof.id} className="rounded-2xl bg-slate-950/50 p-3"><div className="flex gap-2"><span className="rounded-full bg-violet-400/10 px-2 py-0.5 text-[10px] font-bold text-violet-300">{formatStatus(proof.type)}</span><span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-300">{proof.archivedToFilecoin ? "Archived" : "Pending"}</span></div><h3 className="mt-2 text-sm font-bold">{proof.title}</h3><p className="mt-1 text-xs text-slate-500">{proof.user.displayName} (@{proof.user.username})</p>{proof.filecoinCid ? <p className="mt-1 truncate text-[11px] text-slate-600">{proof.filecoinCid}</p> : null}</div>) : <p className="text-sm text-slate-400">No proof records yet.</p>}</div></div>
      </section>
    </PageShell>
  );
}
