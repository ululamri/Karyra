import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";

type RoadmapItem = {
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  status: "SHIPPED" | "IN_PROGRESS" | "NEXT" | "PLANNED";
};

const roadmapPhases: Array<{
  phase: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  status: "SHIPPED" | "IN_PROGRESS" | "NEXT" | "PLANNED";
  items: RoadmapItem[];
}> = [
  {
    phase: "Phase 1",
    titleId: "Fondasi Produk & Data",
    titleEn: "Product & Data Foundation",
    descriptionId:
      "Membangun dasar Karyra sebagai produk aktif: database, course, lesson, quest, learner dashboard, dan admin console.",
    descriptionEn:
      "Build Karyra as an active product: database, courses, lessons, quests, learner dashboard, and admin console.",
    status: "SHIPPED",
    items: [
      {
        titleId: "Prisma 7.8.0 + PostgreSQL",
        titleEn: "Prisma 7.8.0 + PostgreSQL",
        descriptionId: "Schema inti, migration, seed data, dan Prisma Client aktif.",
        descriptionEn: "Core schema, migration, seed data, and Prisma Client are active.",
        status: "SHIPPED",
      },
      {
        titleId: "Learning Engine",
        titleEn: "Learning Engine",
        descriptionId: "Course, module, lesson, quiz, progress, dan dashboard learner.",
        descriptionEn: "Courses, modules, lessons, quizzes, progress, and learner dashboard.",
        status: "SHIPPED",
      },
      {
        titleId: "Admin Console",
        titleEn: "Admin Console",
        descriptionId:
          "Admin dapat mengelola course, submissions, workshops, learner readiness, dan proof archive.",
        descriptionEn:
          "Admins can manage courses, submissions, workshops, learner readiness, and proof archive.",
        status: "SHIPPED",
      },
    ],
  },
  {
    phase: "Phase 2",
    titleId: "Readiness Infrastructure",
    titleEn: "Readiness Infrastructure",
    descriptionId:
      "Mengubah Karyra dari platform belajar biasa menjadi infrastruktur kesiapan Web3 lokal berbasis proof.",
    descriptionEn:
      "Evolve Karyra from a learning platform into local Web3 readiness infrastructure based on proofs.",
    status: "SHIPPED",
    items: [
      {
        titleId: "Readiness Passport",
        titleEn: "Readiness Passport",
        descriptionId: "Score, level, badge, proof records, share summary, dan timeline learner.",
        descriptionEn: "Score, level, badges, proof records, share summary, and learner timeline.",
        status: "SHIPPED",
      },
      {
        titleId: "Proof Verification",
        titleEn: "Proof Verification",
        descriptionId: "Setiap proof memiliki halaman verifikasi publik.",
        descriptionEn: "Each proof has a public verification page.",
        status: "SHIPPED",
      },
      {
        titleId: "Quest Review + Reward Ledger",
        titleEn: "Quest Review + Reward Ledger",
        descriptionId: "Submission, validasi form, admin approval, XP reward, dan readiness sync.",
        descriptionEn: "Submission, form validation, admin approval, XP reward, and readiness sync.",
        status: "SHIPPED",
      },
    ],
  },
  {
    phase: "Phase 3",
    titleId: "Filecoin + Stellar Layer",
    titleEn: "Filecoin + Stellar Layer",
    descriptionId:
      "Menampilkan arah strategis Filecoin sebagai Proof Archive dan Stellar sebagai payment-readiness track.",
    descriptionEn:
      "Show the strategic direction: Filecoin as Proof Archive and Stellar as the payment-readiness track.",
    status: "IN_PROGRESS",
    items: [
      {
        titleId: "Filecoin Archive Manifest",
        titleEn: "Filecoin Archive Manifest",
        descriptionId: "Demo CID, manifest JSON, checksum SHA-256, dan verification page.",
        descriptionEn: "Demo CID, JSON manifest, SHA-256 checksum, and verification page.",
        status: "SHIPPED",
      },
      {
        titleId: "Stellar Readiness Track",
        titleEn: "Stellar Readiness Track",
        descriptionId: "Course, quest, badge, checklist, dan filter quest Stellar.",
        descriptionEn: "Course, quests, badge, checklist, and Stellar quest filter.",
        status: "SHIPPED",
      },
      {
        titleId: "Real archive provider integration",
        titleEn: "Real archive provider integration",
        descriptionId: "Mengganti demo CID dengan integrasi IPFS/Filecoin asli.",
        descriptionEn: "Replace demo CIDs with real IPFS/Filecoin integration.",
        status: "NEXT",
      },
    ],
  },
  {
    phase: "Phase 4",
    titleId: "Community Pilot & Grant Readiness",
    titleEn: "Community Pilot & Grant Readiness",
    descriptionId:
      "Menyiapkan Karyra untuk pilot komunitas lokal, review grant, dan dokumentasi publik yang lebih matang.",
    descriptionEn:
      "Prepare Karyra for local community pilots, grant review, and stronger public documentation.",
    status: "NEXT",
    items: [
      {
        titleId: "Workshop pilot toolkit",
        titleEn: "Workshop pilot toolkit",
        descriptionId: "Materi, checklist, dan alur fasilitator untuk workshop lokal.",
        descriptionEn: "Materials, checklists, and facilitator flow for local workshops.",
        status: "NEXT",
      },
      {
        titleId: "Public impact report",
        titleEn: "Public impact report",
        descriptionId: "Menguatkan laporan dampak dari learning, quest, workshop, proof, dan readiness.",
        descriptionEn: "Strengthen the impact report across learning, quests, workshops, proofs, and readiness.",
        status: "IN_PROGRESS",
      },
      {
        titleId: "Grant submission package",
        titleEn: "Grant submission package",
        descriptionId: "README, reviewer guide, demo path, architecture docs, dan MVP checklist.",
        descriptionEn: "README, reviewer guide, demo path, architecture docs, and MVP checklist.",
        status: "IN_PROGRESS",
      },
    ],
  },
];

function statusLabel(status: RoadmapItem["status"], language: "id" | "en") {
  const labels = {
    SHIPPED: language === "id" ? "Sudah dikirim" : "Shipped",
    IN_PROGRESS: language === "id" ? "Berjalan" : "In progress",
    NEXT: language === "id" ? "Berikutnya" : "Next",
    PLANNED: language === "id" ? "Direncanakan" : "Planned",
  };

  return labels[status];
}

function statusClass(status: RoadmapItem["status"]) {
  switch (status) {
    case "SHIPPED":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    case "IN_PROGRESS":
      return "border-sky-400/30 bg-sky-400/10 text-sky-300";
    case "NEXT":
      return "border-amber-400/30 bg-amber-400/10 text-amber-300";
    default:
      return "border-white/10 bg-white/5 text-slate-300";
  }
}

export default async function RoadmapPage() {
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

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra Public Roadmap
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {language === "id"
                ? "Roadmap pengembangan Karyra"
                : "Karyra development roadmap"}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Roadmap ini menunjukkan apa yang sudah dikirim, sedang berjalan, dan akan dibangun berikutnya untuk menjadikan Karyra sebagai infrastruktur kesiapan Web3 lokal."
                : "This roadmap shows what has shipped, what is in progress, and what comes next as Karyra grows into local Web3 readiness infrastructure."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/status"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Status
            </Link>
            <Link
              href="/transparency"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Transparency
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Courses", value: courseCount },
            { label: "Quests", value: questCount },
            { label: "Proofs", value: proofCount },
            { label: "Archived", value: archivedProofCount },
            { label: "Passports", value: readinessProfileCount },
            { label: "Stellar", value: stellarQuestCount },
          ].map((metric) => (
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

        <section className="grid gap-5">
          {roadmapPhases.map((phase) => (
            <article
              key={phase.phase}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-300">
                      {phase.phase}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusClass(
                        phase.status,
                      )}`}
                    >
                      {statusLabel(phase.status, language)}
                    </span>
                  </div>

                  <h2 className="mt-4 text-3xl font-bold">
                    {language === "id" ? phase.titleId : phase.titleEn}
                  </h2>
                  <p className="mt-3 max-w-3xl leading-8 text-slate-300">
                    {language === "id"
                      ? phase.descriptionId
                      : phase.descriptionEn}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {phase.items.map((item) => (
                  <div
                    key={item.titleEn}
                    className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"
                  >
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusClass(
                        item.status,
                      )}`}
                    >
                      {statusLabel(item.status, language)}
                    </span>

                    <h3 className="mt-4 text-xl font-bold">
                      {language === "id" ? item.titleId : item.titleEn}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {language === "id"
                        ? item.descriptionId
                        : item.descriptionEn}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
          <h2 className="text-3xl font-bold">
            {language === "id"
              ? "Arah setelah MVP"
              : "Direction after the MVP"}
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            {language === "id"
              ? "Karyra berikutnya akan fokus pada pilot workshop lokal, bukti partisipasi yang lebih kuat, integrasi archive nyata, dan paket grant-review yang lebih rapi tanpa mengubah arah utama: non-teknikal first, teknikal later."
              : "Karyra will next focus on local workshop pilots, stronger participation proofs, real archive integration, and a cleaner grant-review package while preserving the main direction: non-technical first, technical later."}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/docs/grant-readiness"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Grant Readiness Docs
            </Link>
            <Link
              href="/mvp-map"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              MVP Map
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
