import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { getServerLanguage } from "../../lib/i18n-server";
import { t } from "../../lib/i18n";

export default async function StatusPage() {
  const language = await getServerLanguage();

  const [
    learnerCount,
    enrollmentCount,
    courseCount,
    lessonCount,
    questCount,
    submissionCount,
    workshopCount,
    completedLessons,
    xpAggregate,
    readinessProfileCount,
    readyLearnerCount,
    proofRecordCount,
    archivedProofCount,
    stellarQuestCount,
  ] = await Promise.all([
    prisma.user.count({
      where: {
        role: "LEARNER",
      },
    }),
    prisma.enrollment.count(),
    prisma.course.count({
      where: {
        status: "PUBLISHED",
      },
    }),
    prisma.lesson.count({
      where: {
        status: "PUBLISHED",
      },
    }),
    prisma.quest.count({
      where: {
        status: "PUBLISHED",
      },
    }),
    prisma.questSubmission.count(),
    prisma.workshop.count({
      where: {
        status: {
          in: ["OPEN", "COMPLETED"],
        },
      },
    }),
    prisma.lessonProgress.count({
      where: {
        status: "COMPLETED",
      },
    }),
    prisma.rewardLedger.aggregate({
      where: {
        kind: "XP",
        direction: "CREDIT",
      },
      _sum: {
        xpAmount: true,
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
  ]);

  const totalXp = xpAggregate._sum.xpAmount ?? 0;

  const metrics = [
    {
      label: t(language, "totalLearners"),
      value: learnerCount,
    },
    {
      label: t(language, "totalEnrollments"),
      value: enrollmentCount,
    },
    {
      label: t(language, "publishedCourses"),
      value: courseCount,
    },
    {
      label: t(language, "publishedLessons"),
      value: lessonCount,
    },
    {
      label: t(language, "publishedQuests"),
      value: questCount,
    },
    {
      label: t(language, "totalSubmissions"),
      value: submissionCount,
    },
    {
      label: t(language, "totalXpDistributed"),
      value: totalXp,
    },
    {
      label: t(language, "activeWorkshops"),
      value: workshopCount,
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
    {
      label: language === "id" ? "Quest Stellar" : "Stellar Quests",
      value: stellarQuestCount,
    },
  ];

  const roadmap =
    language === "id"
      ? [
          {
            phase: "Phase 1",
            title: "Core Foundation",
            status: "In Progress",
            items: [
              "Prisma 7.8.0 + PostgreSQL setup",
              "Course, lesson, quiz, quest schema",
              "Seed data awal",
              "Public learning pages",
              "Learner action flow",
            ],
          },
          {
            phase: "Phase 2",
            title: "Learning & Quest Expansion",
            status: "Next",
            items: [
                   "Readiness Passport dan timeline",
                   "Quest submission + admin review flow",
                   "Badge, XP rule, dan reward ledger",
                   "Filecoin Proof Archive demo",
                   "Stellar Readiness course dan quest",
            ],
          },
          {
            phase: "Phase 3",
            title: "Community Onboarding",
            status: "Planned",
            items: [
              "Workshop registration",
              "Local community dashboard",
              "Offline onboarding flow",
              "Beginner wallet guidance",
            ],
          },
          {
            phase: "Phase 4",
            title: "Grant-ready Pilot",
            status: "Planned",
            items: [
              "Pilot workshop",
              "Content localization",
              "Public changelog",
              "Impact report",
            ],
          },
        ]
      : [
          {
            phase: "Phase 1",
            title: "Core Foundation",
            status: "In Progress",
            items: [
              "Prisma 7.8.0 + PostgreSQL setup",
              "Course, lesson, quiz, and quest schema",
              "Initial seed data",
              "Public learning pages",
              "Learner action flow",
            ],
          },
          {
            phase: "Phase 2",
            title: "Learning & Quest Expansion",
            status: "Next",
            items: [
              "More detailed lesson progress",
              "Quest review flow",
              "Badge and XP rules",
              "Internal mini CMS",
            ],
          },
          {
            phase: "Phase 3",
            title: "Community Onboarding",
            status: "Planned",
            items: [
              "Workshop registration",
              "Local community dashboard",
              "Offline onboarding flow",
              "Beginner wallet guidance",
            ],
          },
          {
            phase: "Phase 4",
            title: "Grant-ready Pilot",
            status: "Planned",
            items: [
              "Pilot workshop",
              "Content localization",
              "Public changelog",
              "Impact report",
            ],
          },
        ];

  const stack = [
    "Next.js App Router",
    "TypeScript",
    "Prisma 7.8.0",
    "PostgreSQL",
    "Prisma PostgreSQL Adapter",
    "Self-hosted VPS-first architecture",
    "Internal ID/EN localization",
    "Mobile-first responsive UI",
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              {t(language, "grantProof")}
            </p>

            <h1 className="mt-4 text-3xl font-bold md:text-5xl">
              {t(language, "projectStatus")}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Karyra adalah platform edukasi Web3 mobile-first untuk membantu komunitas lokal belajar wallet, blockchain, keamanan dasar, quest, dan aktivitas onboarding secara bertahap."
                : "Karyra is a mobile-first Web3 education platform that helps local communities learn wallets, blockchain, basic safety, quests, and onboarding activities step by step."}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="rounded-2xl bg-emerald-400 px-6 py-4 text-center font-bold text-slate-950"
              >
                {t(language, "courses")}
              </Link>

              <Link
                href="/workshops"
                className="rounded-2xl border border-white/15 px-6 py-4 text-center font-bold text-white"
              >
                {t(language, "workshops")}
              </Link>
              
              <Link
                href="/dashboard"
                className="rounded-2xl border border-white/15 px-6 py-4 text-center font-bold text-white"
              >
                {t(language, "dashboard")}
              </Link>
              
              <Link
                href="/changelog"
                className="rounded-2xl border border-white/15 px-6 py-4 text-center font-bold text-white"
              >
                {t(language, "changelog")}
              </Link>
              
              <Link
                href="/impact"
                className="rounded-2xl border border-white/15 px-6 py-4 text-center font-bold text-white"
              >
                {t(language, "impact")}
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
            <h2 className="text-2xl font-bold">
              {language === "id" ? "Status Saat Ini" : "Current Status"}
            </h2>

            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">
                  {language === "id" ? "Produk" : "Product"}
                </p>
                <p className="mt-1 text-xl font-bold">
                  {language === "id"
                    ? "MVP aktif dan bisa diuji"
                    : "Active MVP and testable"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">
                  {language === "id" ? "Learning Engine" : "Learning Engine"}
                </p>
                <p className="mt-1 text-xl font-bold">
                  {completedLessons}{" "}
                  {language === "id" ? "lesson selesai" : "completed lessons"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">
                  {language === "id" ? "Arah Grant" : "Grant Direction"}
                </p>
                <p className="mt-1 text-xl font-bold">
                  {language === "id"
                    ? "Edukasi + quest + komunitas lokal"
                    : "Education + quests + local community"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            {t(language, "platformMetrics")}
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-3xl bg-white/5 p-6">
                <p className="text-4xl font-bold text-emerald-300">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                {language === "id" ? "Readiness Infrastructure" : "Readiness Infrastructure"}
              </p>

              <h2 className="mt-4 text-3xl font-bold">
               {language === "id"
                ? "Filecoin + Stellar sudah terlihat di MVP."
                : "Filecoin + Stellar are visible in the MVP."}
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-300">
                {language === "id"
                 ? "Karyra memakai Filecoin sebagai arah Proof Archive dan Stellar sebagai jalur kesiapan pembayaran Web3. Untuk MVP, archive masih berupa demo CID, sementara Stellar Readiness sudah tersedia sebagai stack, course, quest, badge, dan submission flow."
                 : "Karyra positions Filecoin as the Proof Archive direction and Stellar as the Web3 payment-readiness track. For the MVP, archive uses demo CIDs, while Stellar Readiness is already available as a stack, course, quest, badge, and submission flow."}
              </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link
                 href="/admin/proofs"
                 className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-emerald-400/40"
              >
              <p className="text-sm text-slate-400">Filecoin</p>
              <h3 className="mt-2 text-xl font-bold">
                {language === "id" ? "Proof Archive" : "Proof Archive"}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {archivedProofCount}/{proofRecordCount} proof archived
              </p>
            </Link>

            <Link
               href="/stacks/stellar-readiness"
               className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-sky-400/40"
            >
              <p className="text-sm text-slate-400">Stellar</p>
              <h3 className="mt-2 text-xl font-bold">
               {language === "id" ? "Payment Readiness" : "Payment Readiness"}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
               {stellarQuestCount} readiness quests
              </p>
            </Link>

            <Link
                 href="/admin/learners"
                 className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-emerald-400/40"
              >
              <p className="text-sm text-slate-400">Passport</p>
              <h3 className="mt-2 text-xl font-bold">
                {language === "id" ? "Learner Readiness" : "Learner Readiness"}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {readyLearnerCount}/{readinessProfileCount} ready
              </p>
            </Link>

            <Link
                 href="/passport/timeline"
                 className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-amber-400/40"
              >
              <p className="text-sm text-slate-400">Timeline</p>
              <h3 className="mt-2 text-xl font-bold">
               {language === "id" ? "Learning Journey" : "Learning Journey"}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {language === "id"
                ? "Riwayat proof, reward, badge, dan quest."
                : "Proof, reward, badge, and quest history."}
              </p>
            </Link>
          </div>
        </section>        
        
        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold md:text-3xl">
              {t(language, "roadmap")}
            </h2>

            <div className="mt-6 grid gap-4">
              {roadmap.map((phase) => (
                <div key={phase.phase} className="rounded-3xl bg-slate-900 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-emerald-300">
                        {phase.phase}
                      </p>
                      <h3 className="mt-1 text-xl font-bold">{phase.title}</h3>
                    </div>

                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-300">
                      {phase.status}
                    </span>
                  </div>

                  <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-300">
                    {phase.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="text-2xl font-bold">
                {t(language, "techStack")}
              </h2>

              <div className="mt-5 grid gap-2">
                {stack.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="text-2xl font-bold">
                {t(language, "communityDirection")}
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                {language === "id"
                  ? "Karyra diarahkan untuk komunitas lokal Indonesia, crypto beginner, workshop offline, dan onboarding Web3 yang lebih ramah untuk pemula."
                  : "Karyra is designed for Indonesian local communities, crypto beginners, offline workshops, and beginner-friendly Web3 onboarding."}
              </p>

              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl bg-slate-900 p-4">
                  <p className="font-bold">
                    {language === "id"
                      ? "Target awal"
                      : "Initial target"}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {language === "id"
                      ? "Komunitas lokal, pemula Web3, workshop kecil."
                      : "Local communities, Web3 beginners, small workshops."}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900 p-4">
                  <p className="font-bold">
                    {language === "id"
                      ? "Arah jangka panjang"
                      : "Long-term direction"}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {language === "id"
                      ? "Learning identity, quest reputation, dan edukasi komunitas."
                      : "Learning identity, quest reputation, and community education."}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </section>
    </main>
  );
}