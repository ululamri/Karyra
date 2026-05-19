import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";
import { RoleModeBanner } from "@/components/role-mode-banner";

function formatStatus(status: string) {
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

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
    prisma.rewardLedger.aggregate({
      where: { kind: "XP", direction: "CREDIT" },
      _sum: { xpAmount: true },
    }),
    prisma.readinessProfile.count(),
    prisma.readinessProfile.count({ where: { level: { in: ["READY", "COMMUNITY_READY"] } } }),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.quest.count({ where: { status: "PUBLISHED", chainKey: "stellar-readiness" } }),
    prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, slug: true, title: true, status: true, difficulty: true },
    }),
    prisma.questSubmission.findMany({
      orderBy: { submittedAt: "desc" },
      take: 3,
      select: {
        id: true,
        status: true,
        submittedAt: true,
        user: { select: { displayName: true, username: true } },
        quest: { select: { title: true, xpReward: true, chainKey: true } },
      },
    }),
    prisma.proofRecord.findMany({
      orderBy: { issuedAt: "desc" },
      take: 3,
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
    { label: language === "id" ? "Learner" : "Learners", value: learnerCount },
    { label: language === "id" ? "Course Published" : "Published Courses", value: publishedCourseCount },
    { label: language === "id" ? "Lesson" : "Lessons", value: lessonCount },
    { label: "Quest", value: questCount },
    { label: language === "id" ? "Pending Review" : "Pending Review", value: pendingSubmissionCount },
    { label: "Workshop", value: workshopCount },
    { label: language === "id" ? "XP Dibagikan" : "XP Distributed", value: rewardAggregate._sum.xpAmount ?? 0 },
    { label: language === "id" ? "Readiness Profile" : "Readiness Profiles", value: readinessProfileCount },
    { label: language === "id" ? "Learner Siap" : "Ready Learners", value: readyLearnerCount },
    { label: language === "id" ? "Proof Record" : "Proof Records", value: proofRecordCount },
    { label: language === "id" ? "Proof Diarsipkan" : "Archived Proofs", value: archivedProofCount },
    { label: language === "id" ? "Quest Stellar" : "Stellar Quests", value: stellarQuestCount },
  ];

  const quickActions = [
    { href: "/admin/health", titleId: "System Health", titleEn: "System Health", descriptionId: "Cek koneksi database, metrics readiness, proof, submission, dan Stellar track.", descriptionEn: "Check database connection, readiness metrics, proofs, submissions, and Stellar track.", badge: "Health" },
    { href: "/admin/submissions", titleId: "Review Submission", titleEn: "Review Submissions", descriptionId: "Approve quest, bagikan XP, dan sinkronkan readiness/proof.", descriptionEn: "Approve quests, grant XP, and sync readiness/proofs.", badge: `${pendingSubmissionCount} pending` },
    { href: "/admin/learners", titleId: "Learner Readiness", titleEn: "Learner Readiness", descriptionId: "Pantau passport, readiness score, proof record, dan status arsip Filecoin.", descriptionEn: "Monitor passports, readiness scores, proof records, and Filecoin archive status.", badge: "Passport" },
    { href: "/admin/proofs", titleId: "Filecoin Proof Archive", titleEn: "Filecoin Proof Archive", descriptionId: "Kelola manifest, checksum, CID demo, dan proof verification.", descriptionEn: "Manage manifest, checksum, demo CID, and proof verification.", badge: "Filecoin" },
    { href: "/admin/courses/new", titleId: "Buat Course Baru", titleEn: "Create New Course", descriptionId: "Tambah course, module pertama, dan lesson pertama.", descriptionEn: "Add a course, first module, and first lesson.", badge: "Content" },
    { href: "/admin/courses", titleId: "Kelola Course", titleEn: "Manage Courses", descriptionId: "Publish, archive, dan preview konten belajar.", descriptionEn: "Publish, archive, and preview learning content.", badge: `${courseCount} total` },
    { href: "/admin/workshops", titleId: "Kelola Workshop", titleEn: "Manage Workshops", descriptionId: "Buat workshop dan pantau registrasi learner.", descriptionEn: "Create workshops and monitor learner registrations.", badge: "Offline" },
    { href: "/reviewer", titleId: "Reviewer Mode", titleEn: "Reviewer Mode", descriptionId: "Keluar dari admin tools dan masuk ke jalur evaluator/grantee.", descriptionEn: "Leave admin tools and enter the evaluator/grantee path.", badge: "Switch" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <RoleModeBanner mode="admin" language={language} />

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
            Karyra Admin Console
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
            {language === "id" ? "Kendali internal untuk MVP Karyra." : "Internal control center for the Karyra MVP."}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            {language === "id"
              ? "Area ini bukan halaman learner. Ini adalah demo super-admin untuk mengelola konten, review quest, readiness passport, workshop, Filecoin archive, dan health check."
              : "This is not a learner page. It is a demo super-admin area for managing content, quest review, readiness passports, workshops, Filecoin archive, and health checks."}
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-sky-300">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-sky-400/40 hover:bg-sky-400/10"
            >
              <span className="rounded-full bg-sky-400/10 px-3 py-1 text-xs font-bold text-sky-300">
                {action.badge}
              </span>
              <h2 className="mt-4 text-xl font-bold">
                {language === "id" ? action.titleId : action.titleEn}
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                {language === "id" ? action.descriptionId : action.descriptionEn}
              </p>
            </Link>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">{language === "id" ? "Course Terbaru" : "Recent Courses"}</h2>
              <Link href="/admin/courses" className="text-sm font-bold text-sky-300">View all</Link>
            </div>
            <div className="mt-5 grid gap-3">
              {recentCourses.map((course) => (
                <Link key={course.id} href={`/courses/${course.slug}`} className="rounded-2xl bg-slate-950/50 p-4">
                  <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                    <span>{formatStatus(course.status)}</span>
                    <span>{formatStatus(course.difficulty)}</span>
                  </div>
                  <h3 className="mt-2 font-bold">{course.title}</h3>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">{language === "id" ? "Submission Terbaru" : "Recent Submissions"}</h2>
              <Link href="/admin/submissions" className="text-sm font-bold text-sky-300">Review</Link>
            </div>
            <div className="mt-5 grid gap-3">
              {recentSubmissions.length > 0 ? (
                recentSubmissions.map((submission) => (
                  <div key={submission.id} className="rounded-2xl bg-slate-950/50 p-4">
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                      <span>{formatStatus(submission.status)}</span>
                      <span>{submission.quest.xpReward} XP</span>
                      {submission.quest.chainKey ? <span>{submission.quest.chainKey}</span> : null}
                    </div>
                    <h3 className="mt-2 font-bold">{submission.quest.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{submission.user.displayName} (@{submission.user.username})</p>
                  </div>
                ))
              ) : (
                <p className="rounded-2xl bg-slate-950/50 p-4 text-slate-300">
                  {language === "id" ? "Belum ada submission." : "No submissions yet."}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">{language === "id" ? "Proof Terbaru" : "Recent Proofs"}</h2>
              <Link href="/admin/proofs" className="text-sm font-bold text-sky-300">Archive</Link>
            </div>
            <div className="mt-5 grid gap-3">
              {recentProofs.length > 0 ? (
                recentProofs.map((proof) => (
                  <Link key={proof.id} href={`/proofs/${proof.id}`} className="rounded-2xl bg-slate-950/50 p-4">
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                      <span>{formatStatus(proof.type)}</span>
                      <span>{proof.archivedToFilecoin ? "Archived" : "Pending"}</span>
                    </div>
                    <h3 className="mt-2 font-bold">{proof.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{proof.user.displayName} (@{proof.user.username})</p>
                    {proof.filecoinCid ? <p className="mt-2 truncate font-mono text-xs text-slate-500">{proof.filecoinCid}</p> : null}
                  </Link>
                ))
              ) : (
                <p className="rounded-2xl bg-slate-950/50 p-4 text-slate-300">
                  {language === "id" ? "Belum ada proof record." : "No proof records yet."}
                </p>
              )}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
