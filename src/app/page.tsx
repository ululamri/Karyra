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
    workshopCount,
    xpAggregate,
    readinessProfileCount,
    proofRecordCount,
    archivedProofCount,
    stellarQuestCount,
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
    prisma.readinessProfile.count(),
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

  const proofLinks = [
    {
      href: "/mvp-map",
      title: "MVP Map",
      description:
        language === "id"
          ? "Peta alur produk dari learning, quest, proof, Filecoin, Stellar, sampai impact."
          : "A product-flow map from learning, quests, proofs, Filecoin, Stellar, and impact.",
    },
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
          ? "Laporan dampak awal dari learning, quest, reward, readiness, dan workshop."
          : "Early impact report from learning, quests, rewards, readiness, and workshops.",
    },
    {
      href: "/stacks/stellar-readiness",
      title: "Stellar Readiness",
      description:
        language === "id"
          ? "Jalur kesiapan pembayaran Web3: wallet safety, memo awareness, stablecoin literacy, dan kesiapan transaksi."
          : "A Web3 payment-readiness track covering wallet safety, memo awareness, stablecoin literacy, and transaction confidence.",
    },
    {
      href: "/admin/proofs",
      title: "Filecoin Proof Archive",
      description:
        language === "id"
          ? "Demo archive layer untuk proof record, manifest, checksum, dan CID placeholder."
          : "A demo archive layer for proof records, manifests, checksums, and placeholder CIDs.",
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
            title: "Quest, review, dan reward",
            description:
              "Learner submit quest, admin review, XP reward tercatat di RewardLedger, dan status submission tampil di dashboard.",
          },
          {
            title: "Readiness Passport",
            description:
              "Proof record, badge, readiness score, timeline, dan share summary membentuk identitas kesiapan learner.",
          },
          {
            title: "Filecoin + Stellar layer",
            description:
              "Filecoin menjadi arah proof archive, sementara Stellar menjadi jalur payment-readiness sebelum transaksi nyata.",
          },
          {
            title: "Onboarding komunitas offline",
            description:
              "Workshop registration menghubungkan pembelajaran online dengan kegiatan komunitas lokal.",
          },
          {
            title: "Admin Console internal",
            description:
              "Karyra Admin Console mengelola course, submission, workshop, learner readiness, reward, dan proof archive.",
          },
        ]
      : [
          {
            title: "Learn Web3 from zero",
            description:
              "Courses, lessons, quizzes, and progress dashboard help beginners understand wallets, blockchain, and basic safety.",
          },
          {
            title: "Quests, review, and rewards",
            description:
              "Learners submit quests, admins review them, XP rewards are recorded in RewardLedger, and submission status appears on the dashboard.",
          },
          {
            title: "Readiness Passport",
            description:
              "Proof records, badges, readiness score, timeline, and share summary form learner readiness identity.",
          },
          {
            title: "Filecoin + Stellar layer",
            description:
              "Filecoin is positioned as proof archive, while Stellar is the payment-readiness path before real transactions.",
          },
          {
            title: "Offline community onboarding",
            description:
              "Workshop registration connects online learning with local community activities.",
          },
          {
            title: "Internal Admin Console",
            description:
              "Karyra Admin Console manages courses, submissions, workshops, learner readiness, rewards, and proof archive.",
          },
        ];

  const metrics = [
    {
      label: t(language, "activeCourses"),
      value: courseCount,
    },
    {
      label: t(language, "availableLessons"),
      value: lessonCount,
    },
    {
      label: t(language, "activeQuests"),
      value: questCount,
    },
    {
      label: t(language, "totalLearners"),
      value: learnerCount,
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
      label: language === "id" ? "Workshop aktif" : "Active workshops",
      value: workshopCount,
    },
    {
      label: language === "id" ? "Readiness Profile" : "Readiness Profiles",
      value: readinessProfileCount,
    },
    {
      label: language === "id" ? "Proof Record" : "Proof Records",
      value: proofRecordCount,
    },
    {
      label: language === "id" ? "Proof Archived" : "Archived Proofs",
      value: archivedProofCount,
    },
    {
      label: language === "id" ? "Quest Stellar" : "Stellar Quests",
      value: stellarQuestCount,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra V2
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {t(language, "heroTitle")}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {t(language, "heroDescription")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="rounded-2xl bg-emerald-400 px-6 py-4 text-base font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                {t(language, "startLearning")}
              </Link>
              <Link
                href="/quests?track=stellar-readiness"
                className="rounded-2xl border border-sky-400/30 bg-sky-400/10 px-6 py-4 text-base font-bold text-sky-300 transition hover:bg-sky-400/20"
              >
                Stellar Quests
              </Link>
              <Link
                href="/mvp-map"
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-bold text-white transition hover:border-emerald-400/40"
              >
                MVP Map
              </Link>
              <Link
                href="/reviewer-guide"
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-bold text-white transition hover:border-emerald-400/40"
              >
                Reviewer Guide
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              {language === "id" ? "Grant Demo Snapshot" : "Grant Demo Snapshot"}
            </p>
            <h2 className="mt-4 text-3xl font-bold">
              {language === "id"
                ? "MVP aktif, bukan landing page kosong."
                : "Active MVP, not an empty landing page."}
            </h2>
            <p className="mt-4 leading-8 text-slate-300">
              {language === "id"
                ? "Karyra sudah memiliki database, learner dashboard, quest review, reward ledger, workshop registration, admin console, readiness passport, Filecoin proof archive, dan Stellar readiness track."
                : "Karyra already includes a database, learner dashboard, quest review, reward ledger, workshop registration, admin console, readiness passport, Filecoin proof archive, and Stellar readiness track."}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">Filecoin</p>
                <p className="mt-2 font-bold text-emerald-300">Proof Archive</p>
              </div>
              <div className="rounded-3xl bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">Stellar</p>
                <p className="mt-2 font-bold text-sky-300">Payment Readiness</p>
              </div>
              <div className="rounded-3xl bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">Passport</p>
                <p className="mt-2 font-bold text-amber-300">Learning Identity</p>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-3xl font-bold text-emerald-300">{metric.value}</p>
              <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
            </div>
          ))}
        </section>

        <section>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                {language === "id" ? "Product Pillars" : "Product Pillars"}
              </p>
              <h2 className="mt-4 text-3xl font-bold">
                {language === "id" ? "Apa yang sudah bisa diuji?" : "What can already be tested?"}
              </h2>
              <p className="mt-3 max-w-3xl text-slate-300">
                {language === "id"
                  ? "Karyra saat ini sudah punya beberapa loop utama yang bisa langsung dicoba oleh reviewer."
                  : "Karyra currently has several core loops that reviewers can directly test."}
              </p>
            </div>

            <Link href="/mvp-map" className="text-sm font-bold text-emerald-300 hover:text-emerald-200">
              View MVP Map →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {productPillars.map((pillar) => (
              <article key={pillar.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-xl font-bold">{pillar.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
            {language === "id" ? "Grant Readiness" : "Grant Readiness"}
          </p>
          <h2 className="mt-4 text-3xl font-bold">
            {language === "id"
              ? "Siap ditinjau sebagai MVP aktif."
              : "Ready to review as an active MVP."}
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-300">
            {language === "id"
              ? "Halaman bukti publik membantu reviewer melihat progress, impact, roadmap, transparency, dan readiness infrastructure tanpa harus menebak kondisi proyek."
              : "Public proof pages help reviewers see progress, impact, roadmap, transparency, and readiness infrastructure without guessing the project's status."}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {proofLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-emerald-400/40"
              >
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
                <p className="mt-4 text-sm font-bold text-emerald-300">Open →</p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
