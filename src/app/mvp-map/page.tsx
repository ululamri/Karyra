import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { getServerLanguage } from "../../lib/i18n-server";

type MapItem = {
  href: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  status: string;
};

const learnerFlow: MapItem[] = [
  {
    href: "/courses",
    titleId: "Mulai dari course",
    titleEn: "Start from courses",
    descriptionId:
      "Learner memilih materi belajar yang sudah dipublikasikan dan masuk ke alur progress.",
    descriptionEn:
      "Learners choose published learning content and enter the progress flow.",
    status: "Learning",
  },
  {
    href: "/stacks/stellar-readiness",
    titleId: "Masuk ke Stellar Readiness",
    titleEn: "Enter Stellar Readiness",
    descriptionId:
      "Jalur kesiapan pembayaran Web3: wallet safety, memo awareness, stablecoin literacy, dan checklist sebelum transaksi.",
    descriptionEn:
      "A Web3 payment-readiness path covering wallet safety, memo awareness, stablecoin literacy, and pre-transaction checklist.",
    status: "Stellar",
  },
  {
    href: "/quests?track=stellar-readiness",
    titleId: "Submit quest kesiapan",
    titleEn: "Submit readiness quests",
    descriptionId:
      "Learner mengirim bukti pemahaman melalui quest yang direview admin.",
    descriptionEn:
      "Learners submit evidence of understanding through admin-reviewed quests.",
    status: "Quest",
  },
  {
    href: "/passport",
    titleId: "Lihat Readiness Passport",
    titleEn: "View Readiness Passport",
    descriptionId:
      "Score, badge, proof record, dan status arsip proof terkumpul sebagai identitas kesiapan.",
    descriptionEn:
      "Score, badges, proof records, and proof archive status come together as readiness identity.",
    status: "Passport",
  },
];

const proofFlow: MapItem[] = [
  {
    href: "/admin/submissions",
    titleId: "Admin review submission",
    titleEn: "Admin reviews submissions",
    descriptionId:
      "Submission disetujui atau ditolak, reward XP dicatat, dan readiness profile disinkronkan.",
    descriptionEn:
      "Submissions are approved or rejected, XP rewards are recorded, and readiness profiles are synced.",
    status: "Review",
  },
  {
    href: "/admin/proofs",
    titleId: "Kelola Proof Archive",
    titleEn: "Manage Proof Archive",
    descriptionId:
      "Proof-of-Learning, Proof-of-Participation, dan Proof-of-Readiness dapat diarsipkan ke demo Filecoin layer.",
    descriptionEn:
      "Proof-of-Learning, Proof-of-Participation, and Proof-of-Readiness can be archived into the demo Filecoin layer.",
    status: "Filecoin",
  },
  {
    href: "/passport/timeline",
    titleId: "Timeline perjalanan learner",
    titleEn: "Learner journey timeline",
    descriptionId:
      "Badge, quest, reward, workshop, proof, dan arsip Filecoin tersusun sebagai learning identity journey.",
    descriptionEn:
      "Badges, quests, rewards, workshops, proofs, and Filecoin archives form a learning identity journey.",
    status: "Timeline",
  },
  {
    href: "/passport/share",
    titleId: "Share readiness summary",
    titleEn: "Share readiness summary",
    descriptionId:
      "Ringkasan readiness dapat dibuka untuk reviewer, mentor, dan organizer workshop.",
    descriptionEn:
      "Readiness summaries can be opened by reviewers, mentors, and workshop organizers.",
    status: "Share",
  },
];

const reviewerFlow: MapItem[] = [
  {
    href: "/reviewer-guide",
    titleId: "Reviewer Guide",
    titleEn: "Reviewer Guide",
    descriptionId:
      "Panduan cepat untuk menilai MVP Karyra dari sudut pandang grant reviewer.",
    descriptionEn:
      "A quick guide to review the Karyra MVP from a grant-review perspective.",
    status: "Guide",
  },
  {
    href: "/status",
    titleId: "Status & Metrics",
    titleEn: "Status & Metrics",
    descriptionId:
      "Metrik platform, readiness infrastructure, tech stack, dan roadmap transparansi.",
    descriptionEn:
      "Platform metrics, readiness infrastructure, tech stack, and transparency roadmap.",
    status: "Status",
  },
  {
    href: "/impact",
    titleId: "Impact Report",
    titleEn: "Impact Report",
    descriptionId:
      "Laporan dampak awal dari learning, quest, readiness, Filecoin, dan Stellar.",
    descriptionEn:
      "Early impact report from learning, quests, readiness, Filecoin, and Stellar.",
    status: "Impact",
  },
  {
    href: "/changelog",
    titleId: "Changelog",
    titleEn: "Changelog",
    descriptionId:
      "Riwayat milestone pengembangan yang bisa dilacak secara publik.",
    descriptionEn:
      "Publicly trackable development milestones.",
    status: "Updates",
  },
];

function FlowCard({ item, language }: { item: MapItem; language: "id" | "en" }) {
  return (
    <Link
      href={item.href}
      className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-emerald-400/40 hover:bg-white/[0.07]"
    >
      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-300">
        {item.status}
      </span>
      <h3 className="mt-4 text-xl font-bold">
        {language === "id" ? item.titleId : item.titleEn}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        {language === "id" ? item.descriptionId : item.descriptionEn}
      </p>
      <p className="mt-4 text-sm font-bold text-emerald-300">Open →</p>
    </Link>
  );
}

export default async function MvpMapPage() {
  const language = await getServerLanguage();

  const [
    courseCount,
    questCount,
    proofCount,
    archivedProofCount,
    readinessProfileCount,
    stellarQuestCount,
  ] = await Promise.all([
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.readinessProfile.count(),
    prisma.quest.count({
      where: {
        status: "PUBLISHED",
        chainKey: "stellar-readiness",
      },
    }),
  ]);

  const metrics = [
    {
      label: language === "id" ? "Course aktif" : "Active courses",
      value: courseCount,
    },
    {
      label: language === "id" ? "Quest aktif" : "Active quests",
      value: questCount,
    },
    {
      label: language === "id" ? "Proof record" : "Proof records",
      value: proofCount,
    },
    {
      label: language === "id" ? "Proof archived" : "Archived proofs",
      value: archivedProofCount,
    },
    {
      label: language === "id" ? "Readiness profile" : "Readiness profiles",
      value: readinessProfileCount,
    },
    {
      label: language === "id" ? "Quest Stellar" : "Stellar quests",
      value: stellarQuestCount,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra MVP Map
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {language === "id"
                ? "Peta alur produk Karyra dari belajar sampai proof readiness."
                : "Karyra product flow map from learning to readiness proofs."}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Halaman ini membantu reviewer, mentor, dan contributor melihat bagaimana course, quest, admin review, Filecoin archive, Stellar readiness, Passport, dan impact page saling terhubung."
                : "This page helps reviewers, mentors, and contributors see how courses, quests, admin review, Filecoin archive, Stellar readiness, Passport, and impact pages connect."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Home
            </Link>
            <Link
              href="/reviewer-guide"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Reviewer Guide
            </Link>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-3xl font-bold text-emerald-300">{metric.value}</p>
              <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
            {language === "id" ? "Core Positioning" : "Core Positioning"}
          </p>
          <h2 className="mt-4 text-3xl font-bold">
            {language === "id"
              ? "Karyra bukan sekadar belajar-lalu-keluar."
              : "Karyra is not just learn-and-leave."}
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            {language === "id"
              ? "Karyra membangun pre-transaction readiness untuk komunitas lokal: learner belajar, mengerjakan quest, direview admin, menerima reward, menghasilkan proof, lalu membangun readiness identity yang bisa ditinjau dan diarsipkan."
              : "Karyra builds pre-transaction readiness for local communities: learners study, complete quests, get reviewed by admins, receive rewards, generate proofs, and build a reviewable, archivable readiness identity."}
          </p>
        </section>

        <section>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Learner Flow
              </p>
              <h2 className="mt-4 text-3xl font-bold">
                {language === "id" ? "Dari course ke passport." : "From course to passport."}
              </h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {learnerFlow.map((item) => (
              <FlowCard key={item.href} item={item} language={language} />
            ))}
          </div>
        </section>

        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Proof & Archive Flow
          </p>
          <h2 className="mt-4 text-3xl font-bold">
            {language === "id" ? "Dari review admin ke Filecoin demo archive." : "From admin review to Filecoin demo archive."}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {proofFlow.map((item) => (
              <FlowCard key={item.href} item={item} language={language} />
            ))}
          </div>
        </section>

        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Reviewer Flow
          </p>
          <h2 className="mt-4 text-3xl font-bold">
            {language === "id" ? "Halaman publik untuk evaluasi cepat." : "Public pages for quick evaluation."}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reviewerFlow.map((item) => (
              <FlowCard key={item.href} item={item} language={language} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
