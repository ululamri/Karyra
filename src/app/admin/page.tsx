import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { getServerLanguage } from "../../lib/i18n-server";

export default async function AdminOverviewPage() {
  const language = await getServerLanguage();

  const [
    learnerCount,
    courseCount,
    publishedCourseCount,
    lessonCount,
    questCount,
    submissionCount,
    pendingSubmissionCount,
    workshopCount,
    rewardAggregate,
    recentCourses,
    recentSubmissions,
  ] = await Promise.all([
    prisma.user.count({
      where: {
        role: "LEARNER",
      },
    }),
    prisma.course.count(),
    prisma.course.count({
      where: {
        status: "PUBLISHED",
      },
    }),
    prisma.lesson.count(),
    prisma.quest.count(),
    prisma.questSubmission.count(),
    prisma.questSubmission.count({
      where: {
        status: {
          in: ["SUBMITTED", "NEEDS_REVIEW"],
        },
      },
    }),
    prisma.workshop.count(),
    prisma.rewardLedger.aggregate({
      where: {
        kind: "XP",
        direction: "CREDIT",
      },
      _sum: {
        xpAmount: true,
      },
    }),
    prisma.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
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
      orderBy: {
        submittedAt: "desc",
      },
      take: 3,
      select: {
        id: true,
        status: true,
        user: {
          select: {
            displayName: true,
            username: true,
          },
        },
        quest: {
          select: {
            title: true,
            xpReward: true,
          },
        },
      },
    }),
  ]);

  const stats = [
    {
      label: language === "id" ? "Learner" : "Learners",
      value: learnerCount,
    },
    {
      label: language === "id" ? "Total Course" : "Total Courses",
      value: courseCount,
    },
    {
      label: language === "id" ? "Course Published" : "Published Courses",
      value: publishedCourseCount,
    },
    {
      label: language === "id" ? "Lesson" : "Lessons",
      value: lessonCount,
    },
    {
      label: "Quest",
      value: questCount,
    },
    {
      label: language === "id" ? "Submission" : "Submissions",
      value: submissionCount,
    },
    {
      label: language === "id" ? "Pending Review" : "Pending Review",
      value: pendingSubmissionCount,
    },
    {
      label: "Workshop",
      value: workshopCount,
    },
    {
      label: language === "id" ? "XP Dibagikan" : "XP Distributed",
      value: rewardAggregate._sum.xpAmount ?? 0,
    },
  ];

  const quickActions = [
    {
      href: "/admin/courses/new",
      titleId: "Buat Course Baru",
      titleEn: "Create New Course",
      descriptionId: "Tambah course, module pertama, dan lesson pertama.",
      descriptionEn: "Add a course, first module, and first lesson.",
    },
    {
      href: "/admin/courses",
      titleId: "Kelola Course",
      titleEn: "Manage Courses",
      descriptionId: "Publish, archive, dan preview konten belajar.",
      descriptionEn: "Publish, archive, and preview learning content.",
    },
    {
      href: "/admin/submissions",
      titleId: "Review Submission",
      titleEn: "Review Submissions",
      descriptionId: "Approve quest dan bagikan XP ke learner.",
      descriptionEn: "Approve quests and grant XP to learners.",
    },
    {
      href: "/admin/workshops",
      titleId: "Kelola Workshop",
      titleEn: "Manage Workshops",
      descriptionId: "Buat workshop dan pantau registrasi learner.",
      descriptionEn: "Create workshops and monitor learner registrations.",
    },
    {
      href: "/admin/learners",
      titleId: "Learner Readiness",
      titleEn: "Learner Readiness",
      descriptionId:
        "Pantau passport, readiness score, proof record, dan status arsip Filecoin.",
      descriptionEn:
        "Monitor passports, readiness scores, proof records, and Filecoin archive status.",
    },
    {
      href: "/admin/proofs",
      titleId: "Filecoin Proof Archive",
      titleEn: "Filecoin Proof Archive",
      descriptionId:
        "Kelola Proof-of-Learning, Proof-of-Participation, dan Proof-of-Readiness sebelum diarsipkan ke Filecoin.",
      descriptionEn:
        "Manage Proof-of-Learning, Proof-of-Participation, and Proof-of-Readiness before archiving them to Filecoin.",
    },
    {
      href: "/stacks/stellar-readiness",       titleId: "Stellar Readiness Track",
      titleEn: "Stellar Readiness Track",
      descriptionId:
        "Lihat jalur kesiapan pembayaran Web3: wallet safety, memo awareness, stablecoin literacy, dan pre-transaction confidence.",
      descriptionEn:
        "View the Web3 payment-readiness track: wallet safety, memo awareness, stablecoin literacy, and pre-transaction confidence.",
    },
  ];

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
          Overview
        </p>

        <h2 className="mt-4 text-3xl font-bold md:text-5xl">
          {language === "id"
            ? "Kendali utama platform Karyra"
            : "Main control center for Karyra"}
        </h2>

        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
          {language === "id"
            ? "Pantau konten, quest, reward, workshop, dan progres platform dari satu console."
            : "Monitor content, quests, rewards, workshops, and platform progress from one console."}
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl bg-white/5 p-6">
            <p className="text-4xl font-bold text-emerald-300">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
        <h2 className="text-2xl font-bold">
          {language === "id" ? "Aksi Cepat" : "Quick Actions"}
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-3xl bg-slate-900 p-5 transition hover:bg-slate-800"
            >
              <h3 className="text-xl font-bold">
                {language === "id" ? action.titleId : action.titleEn}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {language === "id"
                  ? action.descriptionId
                  : action.descriptionEn}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">
              {language === "id" ? "Course Terbaru" : "Recent Courses"}
            </h2>

            <Link href="/admin/courses" className="text-sm text-emerald-300">
              View all
            </Link>
          </div>

          <div className="mt-5 grid gap-3">
            {recentCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="rounded-2xl bg-slate-900 p-4"
              >
                <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                    {course.status}
                  </span>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                    {course.difficulty}
                  </span>
                </div>
                <h3 className="mt-3 font-bold">{course.title}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">
              {language === "id" ? "Submission Terbaru" : "Recent Submissions"}
            </h2>

            <Link
              href="/admin/submissions"
              className="text-sm text-emerald-300"
            >
              Review
            </Link>
          </div>

          <div className="mt-5 grid gap-3">
            {recentSubmissions.length > 0 ? (
              recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="rounded-2xl bg-slate-900 p-4"
                >
                  <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                      {submission.status}
                    </span>
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
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
              <p className="rounded-2xl bg-slate-900 p-4 text-slate-300">
                {language === "id"
                  ? "Belum ada submission."
                  : "No submissions yet."}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
