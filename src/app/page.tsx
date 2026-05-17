import Link from "next/link";
import { prisma } from "../lib/prisma";
import { getServerLanguage } from "../lib/i18n-server";
import { t } from "../lib/i18n";

export default async function HomePage() {
  const language = await getServerLanguage();

 const [
  courseCount,
  questCount,
  lessonCount,
  learnerCount,
  submissionCount,
  _workshopCount,
  xpAggregate,
] = await Promise.all([
  prisma.course.count({
    where: {
      status: "PUBLISHED",
    },
  }),
  prisma.quest.count({
    where: {
      status: "PUBLISHED",
    },
  }),
  prisma.lesson.count({
    where: {
      status: "PUBLISHED",
    },
  }),
  prisma.user.count({
    where: {
      role: "LEARNER",
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
  prisma.rewardLedger.aggregate({
    where: {
      kind: "XP",
      direction: "CREDIT",
    },
    _sum: {
      xpAmount: true,
    },
  }),
]);

const totalXp = xpAggregate._sum.xpAmount ?? 0;
  
  const proofLinks = [
    {
      href: "/reviewer-guide",
      title: "Reviewer Guide",
      description:
        language === "id"
          ? "Panduan cepat untuk mengevaluasi alur demo Karyra."
          : "A quick guide to evaluate the Karyra demo flow.",
    },
    {
      href: "/status",
      title: t(language, "projectStatus"),
      description:
        language === "id"
          ? "Metrik platform, roadmap, tech stack, dan status proyek."
          : "Platform metrics, roadmap, tech stack, and project status.",
    },
    {
      href: "/impact",
      title: t(language, "impact"),
      description:
        language === "id"
          ? "Laporan dampak awal dari learning, quest, reward, dan workshop."
          : "Early impact report from learning, quests, rewards, and workshops.",
    },
    {
      href: "/changelog",
      title: t(language, "changelog"),
      description:
        language === "id"
          ? "Riwayat update dan milestone pengembangan Karyra."
          : "Development updates and completed Karyra milestones.",
    },
  ];

  const productPillars =
    language === "id"
      ? [
          {
            title: "Belajar Web3 dari nol",
            description:
              "Course, lesson, quiz, dan dashboard progress untuk membantu pemula memahami wallet, blockchain, dan keamanan dasar.",
          },
          {
            title: "Quest dan reward",
            description:
              "Learner dapat submit quest, admin dapat review, dan XP reward tercatat melalui RewardLedger.",
          },
          {
            title: "Onboarding komunitas offline",
            description:
              "Workshop registration menghubungkan pembelajaran online dengan kegiatan komunitas lokal.",
          },
          {
            title: "Admin Console internal",
            description:
              "Karyra Admin Console mengelola course, submission, workshop, reward, dan proof layer dari satu panel.",
          },
        ]
      : [
          {
            title: "Learn Web3 from zero",
            description:
              "Courses, lessons, quizzes, and progress dashboard help beginners understand wallets, blockchain, and basic safety.",
          },
          {
            title: "Quests and rewards",
            description:
              "Learners can submit quests, admins can review, and XP rewards are recorded through RewardLedger.",
          },
          {
            title: "Offline community onboarding",
            description:
              "Workshop registration connects online learning with local community activities.",
          },
          {
            title: "Internal Admin Console",
            description:
              "Karyra Admin Console manages courses, submissions, workshops, rewards, and proof layers from one panel.",
          },
        ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300 md:text-base">
            Karyra V2
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            {t(language, "heroTitle")}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-xl md:leading-9">
            {t(language, "heroDescription")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/courses"
              className="rounded-2xl bg-emerald-400 px-6 py-4 text-center text-base font-bold text-slate-950 md:px-8 md:text-lg"
            >
              {t(language, "startLearning")}
            </Link>

            <Link
              href="/quests"
              className="rounded-2xl border border-white/15 px-6 py-4 text-center text-base font-bold text-white md:px-8 md:text-lg"
            >
              {t(language, "viewQuests")}
            </Link>

            <Link
              href="/reviewer-guide"
              className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-6 py-4 text-center text-base font-bold text-emerald-300 md:px-8 md:text-lg"
            >
              Reviewer Guide
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl md:p-8">
          <div className="rounded-3xl bg-slate-900 p-5 md:p-6">
            <p className="text-sm font-semibold text-emerald-300">
              {language === "id" ? "Grant Demo Snapshot" : "Grant Demo Snapshot"}
            </p>

            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
              {language === "id"
                ? "MVP aktif, bukan landing page kosong."
                : "Active MVP, not an empty landing page."}
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              {language === "id"
                ? "Karyra sudah memiliki database, learner dashboard, quest review, reward ledger, workshop registration, admin console, dan halaman bukti publik."
                : "Karyra already includes a database, learner dashboard, quest review, reward ledger, workshop registration, admin console, and public proof pages."}
            </p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="font-semibold">01. Learning</p>
                <p className="mt-1 text-sm text-slate-400">
                  {language === "id"
                    ? "Course, lesson, quiz, progress, dan XP."
                    : "Courses, lessons, quizzes, progress, and XP."}
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <p className="font-semibold">02. Quest Review</p>
                <p className="mt-1 text-sm text-slate-400">
                  {language === "id"
                    ? "Submit quest, admin review, reward approval."
                    : "Quest submission, admin review, reward approval."}
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <p className="font-semibold">03. Community</p>
                <p className="mt-1 text-sm text-slate-400">
                  {language === "id"
                    ? "Workshop onboarding untuk komunitas lokal."
                    : "Workshop onboarding for local communities."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-4 md:mt-16 md:grid-cols-3 xl:grid-cols-6">
        <div className="rounded-3xl bg-white/5 p-6 md:p-7">
          <p className="text-4xl font-bold text-emerald-300 md:text-5xl">
            {courseCount}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {t(language, "activeCourses")}
          </p>
        </div>

        <div className="rounded-3xl bg-white/5 p-6 md:p-7">
          <p className="text-4xl font-bold text-emerald-300 md:text-5xl">
            {lessonCount}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {t(language, "availableLessons")}
          </p>
        </div>

        <div className="rounded-3xl bg-white/5 p-6 md:p-7">
          <p className="text-4xl font-bold text-emerald-300 md:text-5xl">
            {questCount}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {t(language, "activeQuests")}
          </p>
        </div>

        <div className="rounded-3xl bg-white/5 p-6 md:p-7">
          <p className="text-4xl font-bold text-emerald-300 md:text-5xl">
            {learnerCount}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {t(language, "totalLearners")}
          </p>
        </div>

        <div className="rounded-3xl bg-white/5 p-6 md:p-7">
          <p className="text-4xl font-bold text-emerald-300 md:text-5xl">
            {submissionCount}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {t(language, "totalSubmissions")}
          </p>
        </div>

        <div className="rounded-3xl bg-white/5 p-6 md:p-7">
          <p className="text-4xl font-bold text-emerald-300 md:text-5xl">
            {totalXp}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {t(language, "totalXpDistributed")}
          </p>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl md:mt-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                {language === "id" ? "Product Pillars" : "Product Pillars"}
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                {language === "id"
                  ? "Apa yang sudah bisa diuji?"
                  : "What can already be tested?"}
              </h2>

              <p className="mt-3 max-w-3xl leading-8 text-slate-300">
                {language === "id"
                  ? "Karyra saat ini sudah punya beberapa loop utama yang bisa langsung dicoba oleh reviewer."
                  : "Karyra currently has several core loops that reviewers can directly test."}
              </p>
            </div>

            <Link
              href="/reviewer-guide"
              className="rounded-2xl bg-emerald-400 px-6 py-4 text-center font-bold text-slate-950"
            >
              Reviewer Guide
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {productPillars.map((pillar) => (
              <div key={pillar.title} className="rounded-3xl bg-slate-900 p-5">
                <h3 className="text-xl font-bold">{pillar.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl md:mt-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              {language === "id" ? "Grant Readiness" : "Grant Readiness"}
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              {language === "id"
                ? "Siap ditinjau sebagai MVP aktif."
                : "Ready to review as an active MVP."}
            </h2>

            <p className="mt-4 leading-8 text-slate-300">
              {language === "id"
                ? "Halaman bukti publik membantu reviewer melihat progress, impact, roadmap, dan transparency tanpa harus menebak kondisi proyek."
                : "Public proof pages help reviewers see progress, impact, roadmap, and transparency without guessing the project's status."}
            </p>

            <div className="mt-6 grid gap-3">
              <Link
                href="/workshops"
                className="rounded-2xl bg-slate-950/50 p-4 font-bold text-white"
              >
                {t(language, "workshops")} →
              </Link>

              <Link
                href="/admin"
                className="rounded-2xl bg-slate-950/50 p-4 font-bold text-white"
              >
                Karyra Admin Console →
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {proofLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
              >
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  {item.description}
                </p>
                <p className="mt-5 text-sm font-bold text-emerald-300">
                  Open →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}