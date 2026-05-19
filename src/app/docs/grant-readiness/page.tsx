import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";

const checklist = [
  {
    titleId: "MVP berjalan, bukan hanya proposal",
    titleEn: "Running MVP, not just a proposal",
    descriptionId:
      "Course, quest, dashboard, admin review, reward ledger, workshop registration, passport, proof archive, dan public proof verification sudah bisa diuji.",
    descriptionEn:
      "Courses, quests, dashboard, admin review, reward ledger, workshop registration, passport, proof archive, and public proof verification are testable.",
    status: "Ready",
  },
  {
    titleId: "Local-first positioning jelas",
    titleEn: "Clear local-first positioning",
    descriptionId:
      "Karyra fokus pada komunitas lokal non-teknikal, pre-transaction readiness, keamanan, dan literasi sebelum penggunaan onchain.",
    descriptionEn:
      "Karyra focuses on non-technical local communities, pre-transaction readiness, safety, and literacy before onchain usage.",
    status: "Ready",
  },
  {
    titleId: "Filecoin punya peran produk",
    titleEn: "Filecoin has a product role",
    descriptionId:
      "Filecoin diposisikan sebagai Proof Archive: manifest JSON, checksum, demo CID, dan proof verification page.",
    descriptionEn:
      "Filecoin is positioned as Proof Archive: JSON manifest, checksum, demo CID, and proof verification page.",
    status: "Demo",
  },
  {
    titleId: "Stellar punya peran produk",
    titleEn: "Stellar has a product role",
    descriptionId:
      "Stellar diposisikan sebagai payment-readiness track: course, quest, checklist, badge, dan proof-of-readiness.",
    descriptionEn:
      "Stellar is positioned as a payment-readiness track: course, quests, checklist, badge, and proof-of-readiness.",
    status: "Ready",
  },
  {
    titleId: "Public transparency tersedia",
    titleEn: "Public transparency is available",
    descriptionId:
      "Status, changelog, impact, reviewer guide, MVP map, architecture docs, dan passport share tersedia sebagai halaman publik.",
    descriptionEn:
      "Status, changelog, impact, reviewer guide, MVP map, architecture docs, and passport share are available as public pages.",
    status: "Ready",
  },
  {
    titleId: "Batasan MVP dijelaskan",
    titleEn: "MVP boundaries are explained",
    descriptionId:
      "Real Filecoin/IPFS upload, real Stellar transaction flow, auth production, dan permission detail masih tahap berikutnya.",
    descriptionEn:
      "Real Filecoin/IPFS upload, real Stellar transaction flow, production auth, and detailed permissions are next-stage work.",
    status: "Next",
  },
];

const nextProofTargets = [
  "Integrasi Filecoin/IPFS asli untuk mengganti demo CID.",
  "Stellar dry-run simulator atau testnet learning flow.",
  "Role-based admin permission yang lebih detail.",
  "Workshop attendance proof dan organizer verification.",
  "Export/share readiness summary dalam format PDF atau image card.",
];

export default async function GrantReadinessPage() {
  const language = await getServerLanguage();

  const [
    courseCount,
    questCount,
    proofCount,
    archivedProofCount,
    readinessProfileCount,
    stellarQuestCount,
    badgeCount,
  ] = await Promise.all([
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.readinessProfile.count(),
    prisma.quest.count({
      where: { status: "PUBLISHED", chainKey: "stellar-readiness" },
    }),
    prisma.badge.count(),
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
    {
      label: language === "id" ? "Badge" : "Badges",
      value: badgeCount,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Grant Readiness
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {language === "id"
                ? "Checklist kesiapan Karyra untuk evaluasi grant."
                : "Karyra readiness checklist for grant evaluation."}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Halaman ini merangkum sinyal bahwa Karyra sudah menjadi MVP aktif: ada alur produk, data nyata di database, halaman publik, admin review, proof layer, dan strategi Filecoin + Stellar yang terlihat di produk."
                : "This page summarizes signals that Karyra is an active MVP: product flows, real database data, public pages, admin review, proof layer, and Filecoin + Stellar strategy visible in product."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Docs
            </Link>
            <Link
              href="/reviewer-guide"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Reviewer Guide
            </Link>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-3xl font-bold text-emerald-300">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Checklist
          </p>
          <h2 className="mt-4 text-3xl font-bold">
            {language === "id"
              ? "Apa yang sudah siap ditinjau?"
              : "What is ready to review?"}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {checklist.map((item) => (
              <article
                key={item.titleEn}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"
              >
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                    item.status === "Ready"
                      ? "bg-emerald-400/10 text-emerald-300"
                      : item.status === "Demo"
                        ? "bg-sky-400/10 text-sky-300"
                        : "bg-amber-400/10 text-amber-300"
                  }`}
                >
                  {item.status}
                </span>
                <h3 className="mt-4 text-xl font-bold">
                  {language === "id" ? item.titleId : item.titleEn}
                </h3>
                <p className="mt-3 leading-7 text-slate-300">
                  {language === "id" ? item.descriptionId : item.descriptionEn}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Reviewer Demo Path
            </p>
            <h2 className="mt-4 text-3xl font-bold">
              {language === "id"
                ? "Jalur cek cepat."
                : "Quick review path."}
            </h2>
            <div className="mt-6 grid gap-3">
              {[
                ["/reviewer-guide", "Reviewer Guide"],
                ["/mvp-map", "MVP Map"],
                ["/stacks/stellar-readiness", "Stellar Readiness"],
                ["/passport", "Readiness Passport"],
                ["/admin/proofs", "Filecoin Proof Archive"],
                ["/impact", "Impact Report"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 px-5 py-4 font-bold text-white transition hover:border-emerald-400/40"
                >
                  {label} →
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
              Next Proof Targets
            </p>
            <h2 className="mt-4 text-3xl font-bold">
              {language === "id"
                ? "Yang masih perlu diperkuat setelah MVP."
                : "What to strengthen after the MVP."}
            </h2>
            <div className="mt-6 grid gap-3">
              {nextProofTargets.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                >
                  <p className="leading-7 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
