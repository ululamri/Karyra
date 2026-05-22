import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";

type RoadmapStatus = "SHIPPED" | "IN_PROGRESS" | "NEXT" | "PLANNED";

type RoadmapItem = {
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  status: RoadmapStatus;
};

const roadmapPhases: Array<{
  phase: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  status: RoadmapStatus;
  items: RoadmapItem[];
}> = [
  {
    phase: "Phase 1",
    titleId: "Fondasi Public MVP",
    titleEn: "Public MVP Foundation",
    descriptionId:
      "Membangun dasar Karyra sebagai produk aktif: database, course, lesson, learner dashboard, passport, dan navigasi publik.",
    descriptionEn:
      "Build Karyra as an active product: database, courses, lessons, learner dashboard, passport, and public navigation.",
    status: "SHIPPED",
    items: [
      {
        titleId: "Learning Engine",
        titleEn: "Learning Engine",
        descriptionId: "Course, module, lesson, quiz preview, progress, dan completion flow.",
        descriptionEn: "Courses, modules, lessons, quiz preview, progress, and completion flow.",
        status: "SHIPPED",
      },
      {
        titleId: "Public UX Cleanup",
        titleEn: "Public UX Cleanup",
        descriptionId: "Navigasi publik, login demo, learner entry, homepage, dan mobile bottom nav.",
        descriptionEn: "Public navigation, demo login, learner entry, homepage, and mobile bottom nav.",
        status: "SHIPPED",
      },
      {
        titleId: "Dashboard + Passport",
        titleEn: "Dashboard + Passport",
        descriptionId: "Dashboard sebagai ruang aktivitas, Paspor sebagai bukti hasil perjalanan.",
        descriptionEn: "Dashboard as activity space, Passport as proof identity.",
        status: "SHIPPED",
      },
    ],
  },
  {
    phase: "Phase 2",
    titleId: "Engagement & Proof Layer",
    titleEn: "Engagement & Proof Layer",
    descriptionId:
      "Menjadikan quest, reward, workshop, dan proof sebagai lapisan pendukung yang memperkuat proses belajar.",
    descriptionEn:
      "Make quests, rewards, workshops, and proofs a supporting layer that strengthens the learning journey.",
    status: "SHIPPED",
    items: [
      {
        titleId: "Quest & Reward Mechanism",
        titleEn: "Quest & Reward Mechanism",
        descriptionId: "Learning Quest, Participation Quest, Readiness Quest, review flow, XP, badge, dan proof record.",
        descriptionEn: "Learning Quest, Participation Quest, Readiness Quest, review flow, XP, badges, and proof records.",
        status: "SHIPPED",
      },
      {
        titleId: "Workshop Engagement",
        titleEn: "Workshop Engagement",
        descriptionId: "Workshop sebagai jembatan belajar online, komunitas lokal, refleksi, dan Bukti Partisipasi.",
        descriptionEn: "Workshops as a bridge between online learning, local community, reflection, and Participation Proof.",
        status: "SHIPPED",
      },
      {
        titleId: "Public Trust Layer",
        titleEn: "Public Trust Layer",
        descriptionId: "About, FAQ, Terms, Product Narrative, Status, dan Roadmap dibuat lebih jelas untuk pengguna baru.",
        descriptionEn: "About, FAQ, Terms, Product Narrative, Status, and Roadmap are clarified for new users.",
        status: "IN_PROGRESS",
      },
    ],
  },
  {
    phase: "Phase 3",
    titleId: "Filecoin + Stellar Readiness",
    titleEn: "Filecoin + Stellar Readiness",
    descriptionId:
      "Memperjelas Filecoin sebagai proof archive direction dan Stellar sebagai wallet integration + mainnet-readiness track.",
    descriptionEn:
      "Clarify Filecoin as proof archive direction and Stellar as wallet integration + mainnet-readiness track.",
    status: "IN_PROGRESS",
    items: [
      {
        titleId: "Filecoin Proof Archive",
        titleEn: "Filecoin Proof Archive",
        descriptionId: "Proof manifest, demo archive, verification page, dan arah storage policy.",
        descriptionEn: "Proof manifest, demo archive, verification page, and storage policy direction.",
        status: "IN_PROGRESS",
      },
      {
        titleId: "Stellar Readiness Track",
        titleEn: "Stellar Readiness Track",
        descriptionId: "Wallet safety, connect prep, testnet practice, checklist, dan payment readiness.",
        descriptionEn: "Wallet safety, connect prep, testnet practice, checklist, and payment readiness.",
        status: "IN_PROGRESS",
      },
      {
        titleId: "Guided Mainnet Graduation",
        titleEn: "Guided Mainnet Graduation",
        descriptionId: "Mainnet diperlakukan sebagai tahap kelulusan terbimbing, kecil, dan opt-in; bukan pintu pertama pemula.",
        descriptionEn: "Mainnet is treated as a guided, small-value, opt-in graduation step; not the first door for beginners.",
        status: "NEXT",
      },
    ],
  },
  {
    phase: "Phase 4",
    titleId: "Pilot Komunitas Lokal",
    titleEn: "Local Community Pilot",
    descriptionId:
      "Menyiapkan Karyra untuk pilot komunitas lokal, fasilitator, feedback loop, dan laporan dampak publik.",
    descriptionEn:
      "Prepare Karyra for local community pilots, facilitators, feedback loops, and public impact reporting.",
    status: "NEXT",
    items: [
      {
        titleId: "Workshop Pilot",
        titleEn: "Workshop Pilot",
        descriptionId: "Menjalankan sesi lokal dengan alur belajar, diskusi, refleksi, dan Bukti Partisipasi.",
        descriptionEn: "Run local sessions with learning, discussion, reflection, and Participation Proof.",
        status: "NEXT",
      },
      {
        titleId: "Local Pilot Notes",
        titleEn: "Local Pilot Notes",
        descriptionId: "Mencatat jumlah peserta, pertanyaan umum, kebingungan learner, feedback, dan bukti aktivitas komunitas.",
        descriptionEn: "Track participants, common questions, learner confusion, feedback, and community activity evidence.",
        status: "NEXT",
      },
      {
        titleId: "Impact Reporting",
        titleEn: "Impact Reporting",
        descriptionId: "Melaporkan learning, quest, workshop, proof, dan readiness tanpa mencampur dokumen internal.",
        descriptionEn: "Report learning, quests, workshops, proofs, and readiness without mixing internal docs.",
        status: "PLANNED",
      },
    ],
  },
];

const reviewerRoute = [
  { label: "Start", href: "/", text: "Public homepage and product positioning." },
  { label: "Learn", href: "/courses", text: "Course and lesson engine." },
  { label: "Dashboard", href: "/dashboard", text: "Learner activity space." },
  { label: "Passport", href: "/passport", text: "Proof and readiness identity." },
  { label: "Stellar", href: "/stacks/stellar-readiness", text: "Wallet readiness and mainnet graduation path." },
  { label: "Filecoin", href: "/filecoin-proof-archive", text: "Proof archive direction." },
];

function statusLabel(status: RoadmapStatus, language: "id" | "en") {
  const labels = {
    SHIPPED: language === "id" ? "Sudah dikirim" : "Shipped",
    IN_PROGRESS: language === "id" ? "Berjalan" : "In progress",
    NEXT: language === "id" ? "Berikutnya" : "Next",
    PLANNED: language === "id" ? "Direncanakan" : "Planned",
  };

  return labels[status];
}

function statusClass(status: RoadmapStatus) {
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
    workshopCount,
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
    prisma.workshop.count({ where: { status: { in: ["OPEN", "COMPLETED"] } } }),
  ]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.08fr_0.72fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Karyra Public Roadmap
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              {language === "id"
                ? "Roadmap produk dan jalur review Karyra."
                : "Karyra product roadmap and reviewer path."}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              {language === "id"
                ? "Roadmap ini menunjukkan apa yang sudah dikirim, sedang berjalan, dan akan dibangun berikutnya sebagai produk public MVP. Halaman ini juga menyediakan jalur singkat bagi reviewer untuk mengecek bukti produk."
                : "This roadmap shows what has shipped, what is in progress, and what comes next for the public MVP. It also provides a short route for reviewers to check product proof."}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/status"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              Status Produk
            </Link>
            <Link
              href="/stacks/stellar-readiness"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-sky-400/30 bg-sky-400/10 px-5 py-3 text-sm font-black text-sky-200 transition hover:bg-sky-400/20"
            >
              Stellar Readiness
            </Link>
            <Link
              href="/changelog"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:border-emerald-400/40"
            >
              Changelog
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
          {[
            { label: "Courses", value: courseCount },
            { label: "Quests", value: questCount },
            { label: "Proofs", value: proofCount },
            { label: "Archived", value: archivedProofCount },
            { label: "Passports", value: readinessProfileCount },
            { label: "Stellar", value: stellarQuestCount },
            { label: "Workshops", value: workshopCount },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-2 text-3xl font-black text-emerald-300">
                {metric.value}
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 md:p-7">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
            Reviewer Route
          </p>
          <h2 className="mt-2 text-2xl font-black md:text-4xl">
            Jalur cepat untuk melihat bukti produk.
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {reviewerRoute.map((route, index) => (
              <Link
                key={route.href}
                href={route.href}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-sky-400/40"
              >
                <p className="text-xs font-black uppercase tracking-wide text-sky-300">
                  0{index + 1} — {route.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{route.text}</p>
                <p className="mt-4 text-sm font-black text-white">Buka →</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-5">
          {roadmapPhases.map((phase) => (
            <article
              key={phase.phase}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7"
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

                  <h2 className="mt-4 text-3xl font-black">
                    {language === "id" ? phase.titleId : phase.titleEn}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
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

                    <h3 className="mt-4 text-xl font-black">
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

        <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-7">
          <h2 className="text-2xl font-black md:text-3xl">
            {language === "id" ? "Arah sambil menunggu grant" : "Direction while grants are under review"}
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 md:text-base">
            {language === "id"
              ? "Karyra akan fokus pada stabilitas public MVP, reviewer clarity, pilot komunitas kecil, dan feedback loop. Perubahan besar seperti integrasi wallet penuh atau upload archive nyata tetap diposisikan sebagai milestone berikutnya."
              : "Karyra will focus on public MVP stability, reviewer clarity, small community pilots, and feedback loops. Major changes such as full wallet integration or real archive upload remain positioned as next milestones."}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/workshops"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              Workshop
            </Link>
            <Link
              href="/status"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:border-emerald-400/40"
            >
              Status
            </Link>
            <Link
              href="/docs/filecoin-stellar"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:border-emerald-400/40"
            >
              Filecoin + Stellar
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
