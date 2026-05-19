import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";

const roleCards = [
  {
    href: "/learner",
    role: "Learner",
    titleId: "Masuk sebagai Learner",
    titleEn: "Enter as Learner",
    descriptionId:
      "Belajar Web3 dari nol, ikut quest, buka Readiness Passport, dan coba Stellar readiness track.",
    descriptionEn:
      "Learn Web3 from zero, complete quests, open the Readiness Passport, and try the Stellar readiness track.",
    ctaId: "Mulai belajar",
    ctaEn: "Start learning",
  },
  {
    href: "/admin",
    role: "Admin",
    titleId: "Masuk sebagai Admin",
    titleEn: "Enter as Admin",
    descriptionId:
      "Kelola course, review submission, pantau learner readiness, archive proof, dan cek system health.",
    descriptionEn:
      "Manage courses, review submissions, monitor learner readiness, archive proofs, and check system health.",
    ctaId: "Buka admin",
    ctaEn: "Open admin",
  },
  {
    href: "/reviewer",
    role: "Reviewer",
    titleId: "Masuk sebagai Reviewer / Grantee",
    titleEn: "Enter as Reviewer / Grantee",
    descriptionId:
      "Evaluasi MVP melalui grant package, demo path, impact report, transparency, QA checklist, dan docs.",
    descriptionEn:
      "Evaluate the MVP through the grant package, demo path, impact report, transparency, QA checklist, and docs.",
    ctaId: "Review MVP",
    ctaEn: "Review MVP",
  },
];

export default async function HomePage() {
  const language = await getServerLanguage();

  const [courseCount, questCount, learnerCount, proofRecordCount, archivedProofCount, stellarQuestCount] =
    await Promise.all([
      prisma.course.count({ where: { status: "PUBLISHED" } }),
      prisma.quest.count({ where: { status: "PUBLISHED" } }),
      prisma.user.count({ where: { role: "LEARNER" } }),
      prisma.proofRecord.count(),
      prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
      prisma.quest.count({
        where: { status: "PUBLISHED", chainKey: "stellar-readiness" },
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
      label: language === "id" ? "Learner demo" : "Demo learners",
      value: learnerCount,
    },
    {
      label: language === "id" ? "Proof record" : "Proof records",
      value: proofRecordCount,
    },
    {
      label: language === "id" ? "Proof archived" : "Archived proofs",
      value: archivedProofCount,
    },
    {
      label: language === "id" ? "Quest Stellar" : "Stellar quests",
      value: stellarQuestCount,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="rounded-[2.5rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-300">
            Karyra MVP Preview
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight md:text-7xl">
            {language === "id"
              ? "Local Web3 Readiness Infrastructure."
              : "Local Web3 Readiness Infrastructure."}
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300 md:text-xl">
            {language === "id"
              ? "Karyra adalah MVP pembelajaran dan readiness untuk komunitas lokal: belajar, quest, proof record, Filecoin archive, dan Stellar payment-readiness. Pilih mode di bawah agar pengalaman learner, admin, dan reviewer tidak bercampur."
              : "Karyra is a learning and readiness MVP for local communities: learning, quests, proof records, Filecoin archive, and Stellar payment-readiness. Choose a mode below so learner, admin, and reviewer experiences stay separated."}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {roleCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 transition hover:border-emerald-400/50 hover:bg-slate-900"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
                  {card.role} Mode
                </p>
                <h2 className="mt-4 text-2xl font-black">
                  {language === "id" ? card.titleId : card.titleEn}
                </h2>
                <p className="mt-3 min-h-28 leading-7 text-slate-300">
                  {language === "id" ? card.descriptionId : card.descriptionEn}
                </p>
                <span className="mt-5 inline-flex rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition group-hover:bg-emerald-300">
                  {language === "id" ? card.ctaId : card.ctaEn} →
                </span>
              </Link>
            ))}
          </div>
        </div>

        <section className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6 md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
            {language === "id" ? "Catatan MVP" : "MVP Note"}
          </p>
          <h2 className="mt-4 text-3xl font-black">
            {language === "id"
              ? "Ini adalah demo/preview environment, bukan produk final."
              : "This is a demo/preview environment, not the final product."}
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            {language === "id"
              ? "Role dipisahkan secara visual untuk memudahkan evaluasi. Versi produksi nanti akan memakai autentikasi, permission, dashboard per role, dan onboarding yang lebih sederhana untuk pengguna awam."
              : "Roles are visually separated for easier evaluation. The production version will use authentication, permissions, per-role dashboards, and a simpler onboarding experience for non-technical users."}
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-3xl font-black text-emerald-300">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <Link
            href="/stacks/stellar-readiness"
            className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 transition hover:border-sky-300/50"
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-300">
              Stellar
            </p>
            <h3 className="mt-3 text-2xl font-black">Payment Readiness</h3>
            <p className="mt-3 leading-7 text-slate-300">
              Wallet safety, memo awareness, stablecoin literacy, scam
              prevention, dan pre-transaction confidence.
            </p>
          </Link>

          <Link
            href="/admin/proofs"
            className="rounded-[2rem] border border-fuchsia-400/20 bg-fuchsia-400/10 p-6 transition hover:border-fuchsia-300/50"
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-fuchsia-300">
              Filecoin
            </p>
            <h3 className="mt-3 text-2xl font-black">Proof Archive</h3>
            <p className="mt-3 leading-7 text-slate-300">
              Proof records, archive manifest, checksum, dan demo CID sebagai
              pondasi decentralized evidence preservation.
            </p>
          </Link>

          <Link
            href="/grant-package"
            className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 transition hover:border-emerald-300/50"
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
              Reviewer
            </p>
            <h3 className="mt-3 text-2xl font-black">Grant Package</h3>
            <p className="mt-3 leading-7 text-slate-300">
              Demo path, impact, transparency, QA checklist, workshop kit,
              pilot plan, dan technical docs dalam satu pusat review.
            </p>
          </Link>
        </section>
      </section>
    </main>
  );
}
