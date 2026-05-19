import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";

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
    prisma.questSubmission.count({
      where: { status: { in: ["SUBMITTED", "NEEDS_REVIEW"] } },
    }),
    prisma.workshop.count(),
    prisma.rewardLedger.aggregate({
      where: { kind: "XP", direction: "CREDIT" },
      _sum: { xpAmount: true },
    }),
    prisma.readinessProfile.count(),
    prisma.readinessProfile.count({
      where: { level: { in: ["READY", "COMMUNITY_READY"] } },
    }),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.quest.count({
      where: { status: "PUBLISHED", chainKey: "stellar-readiness" },
    }),
    prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        slug: true,
        title: true,
        status: true,
        difficulty: true,
      },
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
    {
      label: language === "id" ? "Course Published" : "Published Courses",
      value: publishedCourseCount,
    },
    { label: language === "id" ? "Lesson" : "Lessons", value: lessonCount },
    { label: "Quest", value: questCount },
    { label: "Pending Review", value: pendingSubmissionCount },
    { label: "Workshop", value: workshopCount },
    {
      label: language === "id" ? "XP Dibagikan" : "XP Distributed",
      value: rewardAggregate._sum.xpAmount ?? 0,
    },
    {
      label: language === "id" ? "Readiness Profile" : "Readiness Profiles",
      value: readinessProfileCount,
    },
    {
      label: language === "id" ? "Learner Siap" : "Ready Learners",
      value: readyLearnerCount,
    },
    {
      label: language === "id" ? "Proof Record" : "Proof Records",
      value: proofRecordCount,
    },
    {
      label: language === "id" ? "Proof Diarsipkan" : "Archived Proofs",
      value: archivedProofCount,
    },
    { label: language === "id" ? "Quest Stellar" : "Stellar Quests", value: stellarQuestCount },
  ];

  const quickActions = [
    {
      href: "/admin/health",
      titleId: "System Health",
      titleEn: "System Health",
      descriptionId:
        "Cek database, readiness, proof, Filecoin, Stellar, dan pending submission.",
      descriptionEn:
        "Check database, readiness, proofs, Filecoin, Stellar, and pending submissions.",
      badge: "Health",
    },
    {
      href: "/admin/submissions",
      titleId: "Review Submission",
      titleEn: "Review Submissions",
      descriptionId: "Approve quest, bagikan XP, dan sinkronkan readiness/proof.",
      descriptionEn: "Approve quests, grant XP, and sync readiness/proofs.",
      badge: `${pendingSubmissionCount} pending`,
    },
    {
      href: "/admin/learners",
      titleId: "Learner Readiness",
      titleEn: "Learner Readiness",
      descriptionId:
        "Pantau passport, readiness score, proof record, dan status arsip Filecoin.",
      descriptionEn:
        "Monitor passports, readiness scores, proof records, and Filecoin archive status.",
      badge: "Passport",
    },
    {
      href: "/admin/proofs",
      titleId: "Filecoin Proof Archive",
      titleEn: "Filecoin Proof Archive",
      descriptionId: "Kelola manifest, checksum, CID demo, dan proof verification.",
      descriptionEn: "Manage manifest, checksum, demo CID, and proof verification.",
      badge: "Filecoin",
    },
    {
      href: "/admin/courses/new",
      titleId: "Buat Course Baru",
      titleEn: "Create New Course",
      descriptionId: "Tambah course, module pertama, dan lesson pertama.",
      descriptionEn: "Add a course, first module, and first lesson.",
      badge: "Content",
    },
    {
      href: "/admin/courses",
      titleId: "Kelola Course",
      titleEn: "Manage Courses",
      descriptionId: "Publish, archive, dan preview konten belajar.",
      descriptionEn: "Publish, archive, and preview learning content.",
      badge: `${courseCount} total`,
    },
    {
      href: "/admin/workshops",
      titleId: "Kelola Workshop",
      titleEn: "Manage Workshops",
      descriptionId: "Buat workshop dan pantau registrasi learner.",
      descriptionEn: "Create workshops and monitor learner registrations.",
      badge: "Offline",
    },
    {
      href: "/stacks/stellar-readiness",
      titleId: "Stellar Readiness Track",
      titleEn: "Stellar Readiness Track",
      descriptionId: "Lihat jalur kesiapan pembayaran Web3 dan checklist Stellar.",
      descriptionEn: "View the Web3 payment-readiness track and Stellar checklist.",
      badge: "Stellar",
    },
  ];

  const reviewerLinks = [
    {
      href: "/reviewer",
      label: "Reviewer Entry",
      descriptionId: "Entry point role-based untuk reviewer.",
      descriptionEn: "Role-based entry point for reviewers.",
    },
    {
      href: "/grant-package",
      label: "Grant Package",
      descriptionId: "Index utama semua bukti MVP dan signal grant.",
      descriptionEn: "Main index of MVP evidence and grant signals.",
    },
    {
      href: "/qa-checklist",
      label: "QA Checklist",
      descriptionId: "Checklist manual untuk memastikan flow utama berjalan.",
      descriptionEn: "Manual checklist to verify the main flow.",
    },
    {
      href: "/workshop-kit",
      label: "Workshop Kit",
      descriptionId: "Panduan fasilitator untuk pilot komunitas lokal.",
      descriptionEn: "Facilitator guide for local community pilots.",
    },
    {
      href: "/pilot-plan",
      label: "Pilot Plan",
      descriptionId: "Rencana pilot 4 minggu dan success metrics.",
      descriptionEn: "A 4-week pilot plan and success metrics.",
    },
    {
      href: "/menu",
      label: "Full Menu",
      descriptionId: "Navigasi lengkap berdasarkan role.",
      descriptionEn: "Full role-based navigation.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="rounded-[2rem] border border-rose-400/20 bg-rose-400/10 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-300">
            Karyra Admin Console · Admin Mode
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
            {language === "id"
              ? "Kendali internal untuk demo Super Admin MVP."
              : "Internal control center for the MVP Super Admin demo."}
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 md:text-lg">
            {language === "id"
              ? "Halaman ini adalah mode admin, bukan alur learner publik. Gunakan console ini untuk mengelola konten, review quest, readiness, proof archive, workshop, dan system health."
              : "This page is admin mode, not the public learner journey. Use this console to manage content, quest review, readiness, proof archive, workshops, and system health."}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin/health"
              className="rounded-2xl bg-rose-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-rose-200"
            >
              System Health
            </Link>
            <Link
              href="/reviewer"
              className="rounded-2xl border border-sky-400/30 bg-sky-400/10 px-5 py-3 text-sm font-bold text-sky-300 transition hover:bg-sky-400/20"
            >
              Reviewer Mode
            </Link>
            <Link
              href="/menu"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              {language === "id" ? "Menu Lengkap" : "Full Menu"}
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-emerald-300">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-300">
                Admin Actions
              </p>
              <h2 className="mt-4 text-3xl font-bold">
                {language === "id" ? "Aksi utama admin." : "Primary admin actions."}
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              {language === "id"
                ? "Mode internal / demo Super Admin"
                : "Internal mode / Super Admin demo"}
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-rose-400/40"
              >
                <span className="rounded-full bg-rose-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-rose-300">
                  {action.badge}
                </span>
                <h3 className="mt-4 text-xl font-bold">
                  {language === "id" ? action.titleId : action.titleEn}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {language === "id" ? action.descriptionId : action.descriptionEn}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                Reviewer Discovery
              </p>
              <h2 className="mt-4 text-3xl font-bold">
                {language === "id"
                  ? "Halaman review yang sering dibutuhkan."
                  : "Reviewer pages often needed."}
              </h2>
            </div>
            <Link
              href="/grant-package"
              className="rounded-2xl bg-sky-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-200"
            >
              Grant Package
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviewerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-sky-400/40"
              >
                <h3 className="text-xl font-bold">{link.label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {language === "id" ? link.descriptionId : link.descriptionEn}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold">
                {language === "id" ? "Course Terbaru" : "Recent Courses"}
              </h2>
              <Link href="/admin/courses" className="text-sm font-bold text-emerald-300">
                View all
              </Link>
            </div>
            <div className="mt-5 grid gap-3">
              {recentCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="rounded-2xl bg-slate-950/50 p-4"
                >
                  <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                      {formatStatus(course.status)}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                      {formatStatus(course.difficulty)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-bold">{course.title}</h3>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold">
                {language === "id" ? "Submission Terbaru" : "Recent Submissions"}
              </h2>
              <Link href="/admin/submissions" className="text-sm font-bold text-emerald-300">
                Review
              </Link>
            </div>
            <div className="mt-5 grid gap-3">
              {recentSubmissions.length > 0 ? (
                recentSubmissions.map((submission) => (
                  <div key={submission.id} className="rounded-2xl bg-slate-950/50 p-4">
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                      <span className="rounded-full bg-amber-400/10 px-3 py-1 text-amber-300">
                        {formatStatus(submission.status)}
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                        {submission.quest.xpReward} XP
                      </span>
                    </div>
                    <h3 className="mt-3 font-bold">{submission.quest.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {submission.user.displayName} (@{submission.user.username})
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-2xl bg-slate-950/50 p-4 text-slate-300">
                  {language === "id" ? "Belum ada submission." : "No submissions yet."}
                </p>
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold">
                {language === "id" ? "Proof Terbaru" : "Recent Proofs"}
              </h2>
              <Link href="/admin/proofs" className="text-sm font-bold text-emerald-300">
                Proof Archive
              </Link>
            </div>
            <div className="mt-5 grid gap-3">
              {recentProofs.length > 0 ? (
                recentProofs.map((proof) => (
                  <Link
                    key={proof.id}
                    href={`/proofs/${proof.id}`}
                    className="rounded-2xl bg-slate-950/50 p-4"
                  >
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                      <span className="rounded-full bg-violet-400/10 px-3 py-1 text-violet-300">
                        {formatStatus(proof.type)}
                      </span>
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                        {proof.archivedToFilecoin ? "Archived" : "Pending"}
                      </span>
                    </div>
                    <h3 className="mt-3 font-bold">{proof.title}</h3>
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
                <p className="rounded-2xl bg-slate-950/50 p-4 text-slate-300">
                  {language === "id" ? "Belum ada proof record." : "No proof records yet."}
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
