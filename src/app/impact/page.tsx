import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { getServerLanguage } from "../../lib/i18n-server";
import { t } from "../../lib/i18n";

export default async function ImpactPage() {
  const language = await getServerLanguage();

  const [
    learnerCount,
    enrollmentCount,
    completedLessonCount,
    questSubmissionCount,
    approvedSubmissionCount,
    workshopCount,
    workshopRegistrationCount,
    badgeCount,
    userBadgeCount,
    xpAggregate,
    progressAggregate,
    recentRewards,
    recentRegistrations,
  ] = await Promise.all([
    prisma.user.count({
      where: {
        role: "LEARNER",
      },
    }),
    prisma.enrollment.count(),
    prisma.lessonProgress.count({
      where: {
        status: "COMPLETED",
      },
    }),
    prisma.questSubmission.count(),
    prisma.questSubmission.count({
      where: {
        status: "APPROVED",
      },
    }),
    prisma.workshop.count({
      where: {
        status: {
          in: ["OPEN", "COMPLETED"],
        },
      },
    }),
    prisma.workshopRegistration.count({
      where: {
        status: {
          in: ["REGISTERED", "ATTENDED"],
        },
      },
    }),
    prisma.badge.count(),
    prisma.userBadge.count(),
    prisma.rewardLedger.aggregate({
      where: {
        kind: "XP",
        direction: "CREDIT",
      },
      _sum: {
        xpAmount: true,
      },
    }),
    prisma.enrollment.aggregate({
      _avg: {
        progressPct: true,
      },
    }),
    prisma.rewardLedger.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        kind: true,
        xpAmount: true,
        reason: true,
        createdAt: true,
        user: {
          select: {
            displayName: true,
            username: true,
          },
        },
      },
    }),
    prisma.workshopRegistration.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            displayName: true,
            username: true,
          },
        },
        workshop: {
          select: {
            title: true,
            city: true,
            startsAt: true,
          },
        },
      },
    }),
  ]);

  const totalXp = xpAggregate._sum.xpAmount ?? 0;
  const averageProgress = Math.round(progressAggregate._avg.progressPct ?? 0);

  const learningMetrics = [
    {
      label: t(language, "totalLearners"),
      value: learnerCount,
    },
    {
      label: t(language, "totalEnrollments"),
      value: enrollmentCount,
    },
    {
      label: t(language, "completedLessons"),
      value: completedLessonCount,
    },
    {
      label: t(language, "averageProgress"),
      value: `${averageProgress}%`,
    },
  ];

  const questMetrics = [
    {
      label: t(language, "totalSubmissions"),
      value: questSubmissionCount,
    },
    {
      label: t(language, "approvedSubmissions"),
      value: approvedSubmissionCount,
    },
    {
      label: t(language, "totalXpDistributed"),
      value: totalXp,
    },
    {
      label: t(language, "earnedBadges"),
      value: userBadgeCount,
    },
  ];

  const communityMetrics = [
    {
      label: t(language, "activeWorkshops"),
      value: workshopCount,
    },
    {
      label: t(language, "workshopRegistrations"),
      value: workshopRegistrationCount,
    },
    {
      label: language === "id" ? "Badge Tersedia" : "Available Badges",
      value: badgeCount,
    },
  ];

  const grantSignals =
    language === "id"
      ? [
          "Produk sudah punya database PostgreSQL dan Prisma 7.8.0 yang berjalan.",
          "Learner dapat enroll course, start lesson, complete lesson, dan mendapatkan XP.",
          "Quest submission dapat direview admin sebelum reward diberikan.",
          "Workshop registration memperkuat narasi onboarding komunitas offline.",
          "Status page dan changelog publik menunjukkan transparansi pengembangan.",
          "Karyra Admin Console menunjukkan kemampuan pengelolaan konten internal.",
        ]
      : [
          "The product already runs on PostgreSQL and Prisma 7.8.0.",
          "Learners can enroll in courses, start lessons, complete lessons, and earn XP.",
          "Quest submissions can be reviewed by admins before rewards are granted.",
          "Workshop registration strengthens the offline community onboarding narrative.",
          "Public status and changelog pages provide development transparency.",
          "Karyra Admin Console shows internal content management capability.",
        ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              {t(language, "grantReadiness")}
            </p>

            <h1 className="mt-4 text-3xl font-bold md:text-5xl">
              {t(language, "impactReport")}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Laporan ini menampilkan dampak awal Karyra berdasarkan aktivitas belajar, quest, reward, workshop, dan onboarding komunitas yang tersimpan di database."
                : "This report shows Karyra's early impact based on learning, quests, rewards, workshops, and community onboarding activity stored in the database."}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/status"
                className="rounded-2xl bg-emerald-400 px-6 py-4 text-center font-bold text-slate-950"
              >
                {t(language, "projectStatus")}
              </Link>

              <Link
                href="/changelog"
                className="rounded-2xl border border-white/15 px-6 py-4 text-center font-bold text-white"
              >
                {t(language, "changelog")}
              </Link>

              <Link
                href="/admin"
                className="rounded-2xl border border-white/15 px-6 py-4 text-center font-bold text-white"
              >
                Admin Console
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
            <h2 className="text-2xl font-bold">
              {language === "id" ? "Ringkasan Dampak" : "Impact Summary"}
            </h2>

            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">
                  {language === "id" ? "Learning Loop" : "Learning Loop"}
                </p>
                <p className="mt-1 text-xl font-bold">
                  {completedLessonCount}{" "}
                  {language === "id" ? "lesson selesai" : "completed lessons"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">
                  {language === "id" ? "Quest Reward" : "Quest Reward"}
                </p>
                <p className="mt-1 text-xl font-bold">
                  {totalXp} XP{" "}
                  {language === "id" ? "dibagikan" : "distributed"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">
                  {language === "id" ? "Community Onboarding" : "Community Onboarding"}
                </p>
                <p className="mt-1 text-xl font-bold">
                  {workshopRegistrationCount}{" "}
                  {language === "id" ? "registrasi workshop" : "workshop registrations"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10 grid gap-6 xl:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">
              {t(language, "learningImpact")}
            </h2>

            <div className="mt-5 grid gap-4">
              {learningMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl bg-slate-900 p-5">
                  <p className="text-3xl font-bold text-emerald-300">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">Quest & Reward</h2>

            <div className="mt-5 grid gap-4">
              {questMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl bg-slate-900 p-5">
                  <p className="text-3xl font-bold text-emerald-300">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">
              {t(language, "communityImpact")}
            </h2>

            <div className="mt-5 grid gap-4">
              {communityMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl bg-slate-900 p-5">
                  <p className="text-3xl font-bold text-emerald-300">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">
              {language === "id" ? "Sinyal Kesiapan Grant" : "Grant Readiness Signals"}
            </h2>

            <div className="mt-5 grid gap-3">
              {grantSignals.map((signal) => (
                <div key={signal} className="rounded-2xl bg-slate-900 p-4">
                  <p className="leading-7 text-slate-300">✓ {signal}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="text-2xl font-bold">
                {language === "id" ? "Reward Terbaru" : "Recent Rewards"}
              </h2>

              <div className="mt-5 grid gap-3">
                {recentRewards.length > 0 ? (
                  recentRewards.map((reward) => (
                    <div key={reward.id} className="rounded-2xl bg-slate-900 p-4">
                      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                        <div>
                          <p className="font-bold">
                            {reward.user.displayName} (@{reward.user.username})
                          </p>
                          <p className="mt-1 text-sm text-slate-400">
                            {reward.reason ?? reward.kind}
                          </p>
                        </div>

                        <p className="font-bold text-emerald-300">
                          +{reward.xpAmount ?? 0} XP
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="rounded-2xl bg-slate-900 p-4 text-slate-300">
                    {language === "id"
                      ? "Belum ada reward."
                      : "No rewards yet."}
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="text-2xl font-bold">
                {language === "id"
                  ? "Registrasi Workshop Terbaru"
                  : "Recent Workshop Registrations"}
              </h2>

              <div className="mt-5 grid gap-3">
                {recentRegistrations.length > 0 ? (
                  recentRegistrations.map((registration) => (
                    <div
                      key={registration.id}
                      className="rounded-2xl bg-slate-900 p-4"
                    >
                      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                        <div>
                          <p className="font-bold">
                            {registration.user.displayName} (@
                            {registration.user.username})
                          </p>
                          <p className="mt-1 text-sm text-slate-400">
                            {registration.workshop.title} •{" "}
                            {registration.workshop.city ?? "Community"}
                          </p>
                        </div>

                        <p className="font-bold text-emerald-300">
                          {registration.status}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="rounded-2xl bg-slate-900 p-4 text-slate-300">
                    {language === "id"
                      ? "Belum ada registrasi workshop."
                      : "No workshop registrations yet."}
                  </p>
                )}
              </div>
            </section>
          </div>
        </section>
      </section>
    </main>
  );
}