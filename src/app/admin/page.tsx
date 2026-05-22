import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";
import { CompactCard, MetricCard } from "@/components/ui/compact-card";
import { ModePill } from "@/components/ui/mode-pill";

function formatStatus(status: string) {
  return status.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

const adminFocus = [
  {
    title: "Content Control",
    text: "Course, lesson, quest, workshop, dan public product narrative dikelola dari satu console.",
  },
  {
    title: "Learning Operations",
    text: "Submission, XP, badge, proof record, learner readiness, dan Passport dipantau secara terstruktur.",
  },
  {
    title: "Reviewer Readiness",
    text: "Status, roadmap, Stellar readiness, dan Filecoin proof archive tetap mudah dicek tanpa membuka dokumen grant internal.",
  },
];

export default async function AdminOverviewPage() {
  const language = await getServerLanguage();
  const [
    learnerCount,
    courseCount,
    publishedCourseCount,
    lessonCount,
    questCount,
    pendingSubmissionCount,
    workshopCount,
    rewardAggregate,
    readinessProfileCount,
    readyLearnerCount,
    proofRecordCount,
    archivedProofCount,
    stellarQuestCount,
    recentCourses,
    recentSubmissions,
    recentProofs,
  ] = await Promise.all([
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
    prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      select: { id: true, slug: true, title: true, status: true, difficulty: true },
    }),
    prisma.questSubmission.findMany({
      orderBy: { submittedAt: "desc" },
      take: 4,
      select: {
        id: true,
        status: true,
        user: { select: { displayName: true, username: true } },
        quest: { select: { title: true, xpReward: true, chainKey: true } },
      },
    }),
    prisma.proofRecord.findMany({
      orderBy: { issuedAt: "desc" },
      take: 4,
      select: {
        id: true,
        title: true,
        type: true,
        archivedToFilecoin: true,
        filecoinCid: true,
        user: { select: { displayName: true, username: true } },
      },
    }),
  ]);

  const stats = [
    { label: "Learners", value: learnerCount, hint: "registered demo/user records" },
    { label: "Published", value: publishedCourseCount, hint: `${courseCount} total courses` },
    { label: "Lessons", value: lessonCount },
    { label: "Quests", value: questCount },
    { label: "Pending", value: pendingSubmissionCount, hint: "needs review" },
    { label: "Workshops", value: workshopCount },
    { label: "XP", value: rewardAggregate._sum.xpAmount ?? 0, hint: "credited" },
    { label: "Profiles", value: readinessProfileCount },
    { label: "Ready", value: readyLearnerCount },
    { label: "Proofs", value: proofRecordCount },
    { label: "Archived", value: archivedProofCount },
    { label: "Stellar", value: stellarQuestCount, hint: "readiness quests" },
  ];

  const quickActions = [
    { href: "/admin/courses/new", title: "Create Course", description: "Buat course baru dengan struktur awal yang siap dipoles.", badge: "Content" },
    { href: "/admin/submissions", title: "Review Submissions", description: "Approve quest, bagikan XP, dan sinkronkan readiness/proof.", badge: `${pendingSubmissionCount} pending` },
    { href: "/admin/learners", title: "Learner Readiness", description: "Pantau Passport, readiness score, proof record, dan archive status.", badge: "Passport" },
    { href: "/admin/proofs", title: "Proof Archive", description: "Kelola proof record, Filecoin direction, dan verification signal.", badge: "Proof" },
    { href: "/admin/workshops/new", title: "Create Workshop", description: "Siapkan sesi komunitas lokal atau demo kecil.", badge: "Community" },
    { href: "/admin/health", title: "System Health", description: "Cek database, pending work, Filecoin/Stellar signal, dan health produk.", badge: "Health" },
  ];

  return (
    <div className="grid gap-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-emerald-400/15 via-white/[0.04] to-sky-400/10 p-5 shadow-2xl shadow-black/10 md:p-7">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-2">
              <ModePill mode="Admin" label="Clean CMS v1" />
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-300">
                Public MVP
              </span>
            </div>
            <h2 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
              {language === "id"
                ? "CMS internal yang lebih bersih, modern, dan siap dikelola."
                : "A cleaner, modern internal CMS ready for product management."}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
              {language === "id"
                ? "Gunakan console ini untuk mengelola konten, submission, learner readiness, proof, workshop, dan reviewer readiness tanpa mencampur dokumen grant ke public repo."
                : "Use this console to manage content, submissions, learner readiness, proofs, workshops, and reviewer readiness without mixing grant documents into the public repo."}
            </p>
          </div>

          <div className="grid gap-3 rounded-3xl border border-white/10 bg-slate-950/60 p-4">
            {adminFocus.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white/[0.04] p-4">
                <h3 className="text-sm font-black text-emerald-200">{item.title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
        {stats.map((stat) => (
          <MetricCard key={stat.label} label={stat.label} value={stat.value} hint={stat.hint} />
        ))}
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {quickActions.map((action) => (
          <CompactCard key={action.href} href={action.href} eyebrow="Admin Action" title={action.title} description={action.description} badge={action.badge} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">Content</p>
              <h2 className="mt-1 text-2xl font-black">Recent Courses</h2>
            </div>
            <Link href="/admin/courses" className="text-sm font-black text-emerald-300">View all</Link>
          </div>
          <div className="mt-4 grid gap-2">
            {recentCourses.map((course) => (
              <Link key={course.id} href={`/courses/${course.slug}`} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 transition hover:border-emerald-400/40">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-300">{formatStatus(course.status)}</span>
                  <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">{formatStatus(course.difficulty)}</span>
                </div>
                <h3 className="mt-2 text-sm font-black">{course.title}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">Review</p>
              <h2 className="mt-1 text-2xl font-black">Recent Submissions</h2>
            </div>
            <Link href="/admin/submissions" className="text-sm font-black text-emerald-300">Review</Link>
          </div>
          <div className="mt-4 grid gap-2">
            {recentSubmissions.length > 0 ? recentSubmissions.map((submission) => (
              <div key={submission.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">{formatStatus(submission.status)}</span>
                  <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">{submission.quest.xpReward} XP</span>
                </div>
                <h3 className="mt-2 text-sm font-black">{submission.quest.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{submission.user.displayName} (@{submission.user.username})</p>
              </div>
            )) : <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">No submissions yet.</p>}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">Proof</p>
              <h2 className="mt-1 text-2xl font-black">Recent Proofs</h2>
            </div>
            <Link href="/admin/proofs" className="text-sm font-black text-emerald-300">Archive</Link>
          </div>
          <div className="mt-4 grid gap-2">
            {recentProofs.length > 0 ? recentProofs.map((proof) => (
              <div key={proof.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-violet-400/10 px-2 py-0.5 text-[10px] font-bold text-violet-300">{formatStatus(proof.type)}</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-300">{proof.archivedToFilecoin ? "Archived" : "Pending"}</span>
                </div>
                <h3 className="mt-2 text-sm font-black">{proof.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{proof.user.displayName} (@{proof.user.username})</p>
                {proof.filecoinCid ? <p className="mt-1 truncate text-[11px] text-slate-600">{proof.filecoinCid}</p> : null}
              </div>
            )) : <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">No proof records yet.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
