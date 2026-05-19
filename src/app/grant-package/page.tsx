import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";
import type { Language } from "@/lib/i18n";

type PackageCard = {
  href: string;
  label: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
};

const reviewerLinks: PackageCard[] = [
  {
    href: "/demo",
    label: "Demo",
    titleId: "Demo Path",
    titleEn: "Demo Path",
    descriptionId: "Ikuti alur 8 checkpoint untuk mencoba MVP dari learner sampai proof archive.",
    descriptionEn: "Follow an 8-checkpoint path to try the MVP from learner flow to proof archive.",
  },
  {
    href: "/reviewer-guide",
    label: "Guide",
    titleId: "Reviewer Guide",
    titleEn: "Reviewer Guide",
    descriptionId: "Panduan cepat untuk memahami positioning, fitur, dan bukti progres Karyra.",
    descriptionEn: "A quick guide to understand Karyra positioning, features, and progress evidence.",
  },
  {
    href: "/mvp-map",
    label: "Map",
    titleId: "MVP Map",
    titleEn: "MVP Map",
    descriptionId: "Peta hubungan learner flow, admin review, passport, Filecoin, dan Stellar.",
    descriptionEn: "A map connecting learner flow, admin review, passport, Filecoin, and Stellar.",
  },
  {
    href: "/impact",
    label: "Impact",
    titleId: "Impact Report",
    titleEn: "Impact Report",
    descriptionId: "Ringkasan dampak awal dari learning, proof, reward, workshop, dan readiness.",
    descriptionEn: "Early impact summary across learning, proof, reward, workshop, and readiness.",
  },
  {
    href: "/transparency",
    label: "Transparency",
    titleId: "Transparency Portal",
    titleEn: "Transparency Portal",
    descriptionId: "Portal untuk melihat progress, proof, submissions, dan demo path secara terbuka.",
    descriptionEn: "A portal to view progress, proofs, submissions, and demo path openly.",
  },
  {
    href: "/roadmap",
    label: "Roadmap",
    titleId: "Roadmap",
    titleEn: "Roadmap",
    descriptionId: "Fase shipped, in progress, dan next untuk pengembangan Karyra.",
    descriptionEn: "Shipped, in-progress, and next development phases for Karyra.",
  },
];

const proofLinks: PackageCard[] = [
  {
    href: "/passport",
    label: "Passport",
    titleId: "Readiness Passport",
    titleEn: "Readiness Passport",
    descriptionId: "Lihat score, level, badge, proof record, dan status archive learner.",
    descriptionEn: "View learner score, level, badges, proof records, and archive status.",
  },
  {
    href: "/passport/share",
    label: "Share",
    titleId: "Passport Share",
    titleEn: "Passport Share",
    descriptionId: "Ringkasan passport yang siap dibagikan ke mentor, reviewer, atau organizer.",
    descriptionEn: "A passport summary ready to share with mentors, reviewers, or organizers.",
  },
  {
    href: "/passport/timeline",
    label: "Timeline",
    titleId: "Readiness Timeline",
    titleEn: "Readiness Timeline",
    descriptionId: "Riwayat badge, submission, reward, proof, workshop, dan archive event.",
    descriptionEn: "History of badges, submissions, rewards, proofs, workshops, and archive events.",
  },
  {
    href: "/admin/proofs",
    label: "Filecoin",
    titleId: "Filecoin Proof Archive",
    titleEn: "Filecoin Proof Archive",
    descriptionId: "Demo manifest, checksum, CID, dan verifikasi proof untuk arah Filecoin.",
    descriptionEn: "Demo manifest, checksum, CID, and proof verification for the Filecoin direction.",
  },
];

const stellarLinks: PackageCard[] = [
  {
    href: "/stacks/stellar-readiness",
    label: "Stellar",
    titleId: "Stellar Readiness Stack",
    titleEn: "Stellar Readiness Stack",
    descriptionId: "Jalur kesiapan pembayaran Web3 untuk komunitas lokal non-teknikal.",
    descriptionEn: "A Web3 payment-readiness path for local non-technical communities.",
  },
  {
    href: "/stacks/stellar-readiness/checklist",
    label: "Checklist",
    titleId: "Pre-Transaction Checklist",
    titleEn: "Pre-Transaction Checklist",
    descriptionId: "Checklist interaktif untuk wallet safety, memo awareness, dan confidence.",
    descriptionEn: "Interactive checklist for wallet safety, memo awareness, and confidence.",
  },
  {
    href: "/quests?track=stellar-readiness",
    label: "Quests",
    titleId: "Stellar Quests",
    titleEn: "Stellar Quests",
    descriptionId: "Quest untuk menghasilkan Proof-of-Readiness dari jalur Stellar.",
    descriptionEn: "Quests to produce Proof-of-Readiness from the Stellar track.",
  },
  {
    href: "/courses/stellar-readiness-for-local-communities",
    label: "Course",
    titleId: "Stellar Course",
    titleEn: "Stellar Course",
    descriptionId: "Course seed untuk wallet safety, address/memo, stablecoin, dan scam prevention.",
    descriptionEn: "Seeded course for wallet safety, address/memo, stablecoins, and scam prevention.",
  },
];

const localPilotLinks: PackageCard[] = [
  {
    href: "/workshop-kit",
    label: "Workshop",
    titleId: "Workshop Kit",
    titleEn: "Workshop Kit",
    descriptionId: "Panduan fasilitator lokal, agenda workshop, checklist, dan expected outcomes.",
    descriptionEn: "Local facilitator guide, workshop agenda, checklist, and expected outcomes.",
  },
  {
    href: "/pilot-plan",
    label: "Pilot",
    titleId: "Pilot Plan",
    titleEn: "Pilot Plan",
    descriptionId: "Rencana pilot 4 minggu, success metrics, dan risk controls.",
    descriptionEn: "A 4-week pilot plan, success metrics, and risk controls.",
  },
  {
    href: "/workshops",
    label: "Events",
    titleId: "Workshop Registry",
    titleEn: "Workshop Registry",
    descriptionId: "Daftar workshop publik dan registrasi learner.",
    descriptionEn: "Public workshop list and learner registration.",
  },
  {
    href: "/docs/grant-readiness",
    label: "Docs",
    titleId: "Grant Readiness Docs",
    titleEn: "Grant Readiness Docs",
    descriptionId: "Checklist kesiapan Karyra untuk diskusi grant dan reviewer.",
    descriptionEn: "Karyra readiness checklist for grant discussions and reviewers.",
  },
];

function localize(language: Language, valueId: string, valueEn: string) {
  return language === "id" ? valueId : valueEn;
}

function PackageSection({
  language,
  eyebrow,
  titleId,
  titleEn,
  descriptionId,
  descriptionEn,
  items,
}: {
  language: Language;
  eyebrow: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  items: PackageCard[];
}) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold">
        {localize(language, titleId, titleEn)}
      </h2>
      <p className="mt-3 max-w-3xl leading-8 text-slate-300">
        {localize(language, descriptionId, descriptionEn)}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-emerald-400/40 hover:bg-slate-900"
          >
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-300">
              {item.label}
            </span>
            <h3 className="mt-4 text-xl font-bold">
              {localize(language, item.titleId, item.titleEn)}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {localize(language, item.descriptionId, item.descriptionEn)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function GrantPackagePage() {
  const language = await getServerLanguage();

  const [
    learnerCount,
    courseCount,
    questCount,
    stellarQuestCount,
    proofRecordCount,
    archivedProofCount,
    readinessProfileCount,
    workshopCount,
  ] = await Promise.all([
    prisma.user.count({
      where: {
        role: "LEARNER",
      },
    }),
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
    prisma.quest.count({
      where: {
        status: "PUBLISHED",
        chainKey: "stellar-readiness",
      },
    }),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({
      where: {
        archivedToFilecoin: true,
      },
    }),
    prisma.readinessProfile.count(),
    prisma.workshop.count(),
  ]);

  const metrics = [
    {
      label: language === "id" ? "Learner" : "Learners",
      value: learnerCount,
    },
    {
      label: language === "id" ? "Course Published" : "Published Courses",
      value: courseCount,
    },
    {
      label: language === "id" ? "Quest Published" : "Published Quests",
      value: questCount,
    },
    {
      label: language === "id" ? "Quest Stellar" : "Stellar Quests",
      value: stellarQuestCount,
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
      label: language === "id" ? "Passport Profile" : "Passport Profiles",
      value: readinessProfileCount,
    },
    {
      label: language === "id" ? "Workshop" : "Workshops",
      value: workshopCount,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="rounded-[2.5rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Karyra Grant Package
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-bold tracking-tight md:text-6xl">
            {language === "id"
              ? "Satu halaman untuk meninjau MVP, impact, proof, dan pilot Karyra."
              : "One page to review Karyra's MVP, impact, proof, and pilot package."}
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 md:text-lg">
            {language === "id"
              ? "Halaman ini dirancang sebagai index reviewer: mulai dari demo path, readiness passport, Filecoin proof archive, Stellar readiness, workshop kit, pilot plan, sampai dokumen grant readiness."
              : "This page is designed as a reviewer index: from demo path, readiness passport, Filecoin proof archive, Stellar readiness, workshop kit, pilot plan, to grant-readiness documentation."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              {language === "id" ? "Mulai Demo Path" : "Start Demo Path"}
            </Link>
            <Link
              href="/reviewer-guide"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Reviewer Guide
            </Link>
            <Link
              href="/mvp-map"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              MVP Map
            </Link>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-2 text-3xl font-bold text-emerald-300">
                {metric.value}
              </p>
            </div>
          ))}
        </section>

        <PackageSection
          language={language}
          eyebrow="01 / Review"
          titleId="Reviewer Evidence"
          titleEn="Reviewer Evidence"
          descriptionId="Jalur tercepat untuk memahami fitur, flow, bukti progres, dan kesiapan MVP."
          descriptionEn="The fastest path to understand features, flows, progress evidence, and MVP readiness."
          items={reviewerLinks}
        />

        <PackageSection
          language={language}
          eyebrow="02 / Proof"
          titleId="Passport & Filecoin Proof"
          titleEn="Passport & Filecoin Proof"
          descriptionId="Bukti kesiapan learner: score, level, badge, proof record, timeline, manifest, dan archive status."
          descriptionEn="Learner readiness evidence: score, level, badges, proof records, timeline, manifest, and archive status."
          items={proofLinks}
        />

        <PackageSection
          language={language}
          eyebrow="03 / Stellar"
          titleId="Stellar Payment Readiness"
          titleEn="Stellar Payment Readiness"
          descriptionId="Jalur non-transaction-first untuk wallet safety, memo awareness, stablecoin literacy, dan pre-transaction confidence."
          descriptionEn="A non-transaction-first path for wallet safety, memo awareness, stablecoin literacy, and pre-transaction confidence."
          items={stellarLinks}
        />

        <PackageSection
          language={language}
          eyebrow="04 / Local Pilot"
          titleId="Workshop & Pilot Package"
          titleEn="Workshop & Pilot Package"
          descriptionId="Paket untuk menjalankan pilot lokal: workshop kit, pilot plan, workshop registry, dan grant readiness docs."
          descriptionEn="A package for running a local pilot: workshop kit, pilot plan, workshop registry, and grant-readiness docs."
          items={localPilotLinks}
        />

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Positioning
          </p>
          <h2 className="mt-4 text-3xl font-bold">
            {language === "id"
              ? "Karyra bukan learn-to-earn biasa."
              : "Karyra is not a generic learn-to-earn app."}
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            {language === "id"
              ? "Karyra diposisikan sebagai infrastruktur kesiapan Web3 lokal: learner membangun literasi, partisipasi, dan confidence terlebih dahulu, lalu menghasilkan proof record yang dapat ditinjau, diarsipkan, dan dibagikan."
              : "Karyra is positioned as local Web3 readiness infrastructure: learners build literacy, participation, and confidence first, then generate proof records that can be reviewed, archived, and shared."}
          </p>
        </section>
      </section>
    </main>
  );
}
