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
    readinessProfileCount,
    readyLearnerCount,
    communityReadyLearnerCount,
    proofRecordCount,
    archivedProofCount,
    stellarQuestCount,
    stellarSubmissionCount,
    recentRewards,
    recentRegistrations,
    recentProofs,
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
    prisma.readinessProfile.count(),
    prisma.readinessProfile.count({
      where: {
        level: {
          in: ["READY", "COMMUNITY_READY"],
        },
      },
    }),
    prisma.readinessProfile.count({
      where: {
        level: "COMMUNITY_READY",
      },
    }),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({
      where: {
        archivedToFilecoin: true,
      },
    }),
    prisma.quest.count({
      where: {
        status: "PUBLISHED",
        chainKey: "stellar-readiness",
      },
    }),
    prisma.questSubmission.count({
      where: {
        quest: {
          chainKey: "stellar-readiness",
        },
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
    prisma.proofRecord.findMany({
      orderBy: {
        issuedAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        type: true,
        title: true,
        archivedToFilecoin: true,
        filecoinCid: true,
        issuedAt: true,
        user: {
          select: {
            displayName: true,
            username: true,
          },
        },
      },
    }),
  ]);

  const totalXp = xpAggregate._sum.xpAmount ?? 0;
  const averageProgress = Math.round(progressAggregate._avg.progressPct ?? 0);
  const approvalRate =
    questSubmissionCount > 0
      ? Math.round((approvedSubmissionCount / questSubmissionCount) * 100)
      : 0;
  const archiveRate =
    proofRecordCount > 0
      ? Math.round((archivedProofCount / proofRecordCount) * 100)
      : 0;

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
      label: language === "id" ? "Approval Rate" : "Approval Rate",
      value: `${approvalRate}%`,
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

  const readinessMetrics = [
    {
      label: language === "id" ? "Readiness Profile" : "Readiness Profiles",
      value: readinessProfileCount,
    },
    {
      label: language === "id" ? "Learner Siap" : "Ready Learners",
      value: readyLearnerCount,
    },
    {
      label: language === "id" ? "Community Ready" : "Community Ready",
      value: communityReadyLearnerCount,
    },
    {
      label: language === "id" ? "Proof Record" : "Proof Records",
      value: proofRecordCount,
    },
    {
      label: language === "id" ? "Proof Diarsipkan" : "Archived Proofs",
      value: archivedProofCount,
    },
    {
      label: language === "id" ? "Archive Rate" : "Archive Rate",
      value: `${archiveRate}%`,
    },
  ];

  const stellarMetrics = [
    {
      label: language === "id" ? "Quest Stellar" : "Stellar Quests",
      value: stellarQuestCount,
    },
    {
      label: language === "id" ? "Submission Stellar" : "Stellar Submissions",
      value: stellarSubmissionCount,
    },
    {
      label: language === "id" ? "Checklist" : "Checklist",
      value: "Active",
    },
  ];

  const grantSignals =
    language === "id"
      ? [
          "Produk sudah punya database PostgreSQL dan Prisma 7.8.0 yang berjalan.",
          "Learner dapat enroll course, start lesson, complete lesson, dan mendapatkan XP.",
          "Quest submission memiliki validasi client-side, counter karakter, dan review admin sebelum reward diberikan.",
          "Readiness Passport mengubah aktivitas belajar menjadi score, level, badge, proof record, dan timeline.",
          "Filecoin Proof Archive memiliki manifest JSON, checksum, dan demo CID sebagai placeholder integrasi nyata.",
          "Stellar Readiness tersedia sebagai stack, course, quest, badge, checklist, dan pre-transaction confidence flow.",
          "Workshop registration memperkuat narasi onboarding komunitas offline.",
          "Status, changelog, reviewer guide, impact report, dan passport share memperkuat transparansi proyek.",
        ]
      : [
          "The product already runs on PostgreSQL and Prisma 7.8.0.",
          "Learners can enroll in courses, start lessons, complete lessons, and earn XP.",
          "Quest submission includes client-side validation, character counter, and admin review before rewards are granted.",
          "Readiness Passport turns learning activity into score, level, badges, proof records, and timeline.",
          "Filecoin Proof Archive includes manifest JSON, checksum, and demo CID as a real integration placeholder.",
          "Stellar Readiness is available as stack, course, quest, badge, checklist, and pre-transaction confidence flow.",
          "Workshop registration strengthens the offline community onboarding narrative.",
          "Status, changelog, reviewer guide, impact report, and passport share strengthen project transparency.",
        ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
          {t(language, "grantReadiness")}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
          {t(language, "impactReport")}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
          {language === "id"
            ? "Laporan ini menampilkan dampak awal Karyra berdasarkan aktivitas belajar, quest, reward, workshop, readiness passport, Filecoin proof archive, dan Stellar payment-readiness yang tersimpan di database."
            : "This report shows Karyra's early impact based on learning, quests, rewards, workshops, readiness passport, Filecoin proof archive, and Stellar payment-readiness activity stored in the database."}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/status"
            className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
          >
            {t(language, "projectStatus")}
          </Link>
          <Link
            href="/changelog"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
          >
            {t(language, "changelog")}
          </Link>
          <Link
            href="/reviewer-guide"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
          >
            Reviewer Guide
          </Link>
          <Link
            href="/passport/share"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
          >
            Passport Share
          </Link>
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
            <p className="text-sm text-emerald-200">
              {language === "id" ? "Learning Loop" : "Learning Loop"}
            </p>
            <p className="mt-2 text-4xl font-bold">
              {completedLessonCount}
            </p>
            <p className="mt-2 text-slate-300">
              {language === "id" ? "lesson selesai" : "completed lessons"}
            </p>
          </div>

          <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 md:p-8">
            <p className="text-sm text-sky-200">
              {language === "id" ? "Quest Reward" : "Quest Reward"}
            </p>
            <p className="mt-2 text-4xl font-bold">{totalXp} XP</p>
            <p className="mt-2 text-slate-300">
              {language === "id" ? "dibagikan" : "distributed"}
            </p>
          </div>

          <div className="rounded-[2rem] border border-violet-400/20 bg-violet-400/10 p-6 md:p-8">
            <p className="text-sm text-violet-200">
              {language === "id" ? "Proof Layer" : "Proof Layer"}
            </p>
            <p className="mt-2 text-4xl font-bold">{proofRecordCount}</p>
            <p className="mt-2 text-slate-300">
              {language === "id" ? "proof record" : "proof records"}
            </p>
          </div>
        </section>

        <MetricSection
          title={t(language, "learningImpact")}
          metrics={learningMetrics}
        />

        <MetricSection title="Quest & Reward" metrics={questMetrics} />

        <MetricSection
          title={language === "id" ? "Readiness & Proof Impact" : "Readiness & Proof Impact"}
          metrics={readinessMetrics}
        />

        <MetricSection
          title={language === "id" ? "Stellar Readiness Impact" : "Stellar Readiness Impact"}
          metrics={stellarMetrics}
        />

        <MetricSection
          title={t(language, "communityImpact")}
          metrics={communityMetrics}
        />

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Filecoin + Stellar
              </p>
              <h2 className="mt-4 text-3xl font-bold">
                {language === "id"
                  ? "Dampak readiness mulai bisa diverifikasi."
                  : "Readiness impact is becoming verifiable."}
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-300">
                {language === "id"
                  ? "Filecoin diposisikan sebagai proof archive layer, sementara Stellar menjadi jalur kesiapan pembayaran Web3. Keduanya sudah terlihat dalam MVP melalui proof manifest, passport, course, quest, checklist, dan timeline."
                  : "Filecoin is positioned as the proof archive layer, while Stellar serves as the Web3 payment-readiness track. Both are visible in the MVP through proof manifests, passport, course, quests, checklist, and timeline."}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/admin/proofs"
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-emerald-400/40"
              >
                <p className="text-sm text-slate-400">Filecoin</p>
                <p className="mt-2 text-2xl font-bold text-emerald-300">
                  {archivedProofCount}/{proofRecordCount}
                </p>
                <p className="mt-1 text-sm text-slate-400">proof archived</p>
              </Link>

              <Link
                href="/stacks/stellar-readiness"
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-sky-400/40"
              >
                <p className="text-sm text-slate-400">Stellar</p>
                <p className="mt-2 text-2xl font-bold text-sky-300">
                  {stellarQuestCount}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  readiness quests
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-3xl font-bold">
            {language === "id" ? "Sinyal Kesiapan Grant" : "Grant Readiness Signals"}
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {grantSignals.map((signal) => (
              <div key={signal} className="rounded-3xl bg-slate-950/50 p-5">
                <p className="leading-7 text-slate-300">✓ {signal}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">
                {language === "id" ? "Reward Terbaru" : "Recent Rewards"}
              </h2>
              <Link href="/dashboard" className="text-sm font-bold text-emerald-300">
                Dashboard →
              </Link>
            </div>

            <div className="mt-5 grid gap-3">
              {recentRewards.length > 0 ? (
                recentRewards.map((reward) => (
                  <div key={reward.id} className="rounded-2xl bg-slate-950/50 p-4">
                    <p className="font-bold">
                      {reward.user.displayName} (@{reward.user.username})
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {reward.reason ?? reward.kind}
                    </p>
                    <p className="mt-2 font-bold text-emerald-300">
                      +{reward.xpAmount ?? 0} XP
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-2xl bg-slate-950/50 p-4 text-slate-300">
                  {language === "id" ? "Belum ada reward." : "No rewards yet."}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">
                {language === "id" ? "Proof Terbaru" : "Recent Proofs"}
              </h2>
              <Link href="/admin/proofs" className="text-sm font-bold text-emerald-300">
                Proof Archive →
              </Link>
            </div>

            <div className="mt-5 grid gap-3">
              {recentProofs.length > 0 ? (
                recentProofs.map((proof) => (
                  <Link
                    key={proof.id}
                    href={`/proofs/${proof.id}`}
                    className="rounded-2xl bg-slate-950/50 p-4 transition hover:bg-slate-900"
                  >
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                      <span className="rounded-full bg-violet-400/10 px-3 py-1 text-violet-300">
                        {proof.type}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 ${
                          proof.archivedToFilecoin
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-amber-400/10 text-amber-300"
                        }`}
                      >
                        {proof.archivedToFilecoin ? "Archived" : "Pending"}
                      </span>
                    </div>
                    <p className="mt-3 font-bold">{proof.title}</p>
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
                  {language === "id" ? "Belum ada proof." : "No proofs yet."}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            {language === "id"
              ? "Registrasi Workshop Terbaru"
              : "Recent Workshop Registrations"}
          </h2>

          <div className="mt-5 grid gap-3">
            {recentRegistrations.length > 0 ? (
              recentRegistrations.map((registration) => (
                <div key={registration.id} className="rounded-2xl bg-slate-950/50 p-4">
                  <p className="font-bold">
                    {registration.user.displayName} (@{registration.user.username})
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {registration.workshop.title} • {registration.workshop.city ?? "Community"}
                  </p>
                  <p className="mt-2 font-bold text-emerald-300">
                    {registration.status}
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-2xl bg-slate-950/50 p-4 text-slate-300">
                {language === "id"
                  ? "Belum ada registrasi workshop."
                  : "No workshop registrations yet."}
              </p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

function MetricSection({
  title,
  metrics,
}: {
  title: string;
  metrics: Array<{
    label: string;
    value: string | number;
  }>;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-3xl font-bold">{title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
          >
            <p className="text-3xl font-bold text-emerald-300">
              {metric.value}
            </p>
            <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
