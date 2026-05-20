import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";

const journeySteps = [
  {
    href: "/courses",
    number: "01",
    label: "Proof-of-Learning",
    titleId: "Mulai dari pemahaman dasar.",
    titleEn: "Start with the fundamentals.",
    textId:
      "Pelajari Web3 dari sisi keamanan, wallet, pembayaran, dan kebiasaan digital yang aman.",
    textEn:
      "Learn Web3 through safety, wallets, payments, and safer digital habits.",
  },
  {
    href: "/quests?track=stellar-readiness",
    number: "02",
    label: "Proof-of-Readiness",
    titleId: "Latih kesiapan sebelum transaksi.",
    titleEn: "Practice readiness before transactions.",
    textId:
      "Kerjakan quest dan checklist agar pemula tidak langsung masuk ke praktik berisiko.",
    textEn:
      "Complete quests and checklists so beginners do not jump into risky practice.",
  },
  {
    href: "/workshops",
    number: "03",
    label: "Proof-of-Participation",
    titleId: "Ikut kegiatan komunitas.",
    titleEn: "Join community activities.",
    textId:
      "Workshop dan onboarding lokal menjadi bagian dari bukti partisipasi, bukan sekadar kehadiran.",
    textEn:
      "Workshops and local onboarding become participation evidence, not just attendance.",
  },
  {
    href: "/passport",
    number: "04",
    label: "Readiness Passport",
    titleId: "Lihat bukti kesiapanmu.",
    titleEn: "See your readiness proof.",
    textId:
      "Readiness Passport merangkum progress, badge, proof record, dan level kesiapan learner.",
    textEn:
      "The Readiness Passport summarizes progress, badges, proof records, and readiness level.",
  },
];

export default async function LearnerPage() {
  const language = await getServerLanguage();

  const [
    courseCount,
    questCount,
    workshopCount,
    proofCount,
    passportCount,
  ] = await Promise.all([
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.workshop.count({ where: { status: { in: ["OPEN", "COMPLETED"] } } }),
    prisma.proofRecord.count(),
    prisma.readinessProfile.count(),
  ]);

  const stats = [
    { label: language === "id" ? "Course aktif" : "Active courses", value: courseCount },
    { label: language === "id" ? "Quest tersedia" : "Available quests", value: questCount },
    { label: language === "id" ? "Workshop" : "Workshops", value: workshopCount },
    { label: language === "id" ? "Proof record" : "Proof records", value: proofCount },
    { label: language === "id" ? "Passport" : "Passports", value: passportCount },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              {language === "id" ? "Ruang Belajar" : "Learning Space"}
            </p>

            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              {language === "id"
                ? "Belajar Web3 dengan aman, bertahap, dan bisa dibuktikan."
                : "Learn Web3 safely, step by step, with proof."}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              {language === "id"
                ? "Karyra membantu pemula memahami Web3 sebelum menyentuh transaksi nyata. Kamu belajar, ikut aktivitas, menyelesaikan quest, lalu membangun Readiness Passport."
                : "Karyra helps beginners understand Web3 before touching real transactions. You learn, participate, complete quests, then build a Readiness Passport."}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                {language === "id" ? "Buka Dashboard" : "Open Dashboard"}
              </Link>
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                {language === "id" ? "Mulai Belajar" : "Start Learning"}
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              {language === "id" ? "Alur Karyra" : "Karyra Flow"}
            </p>
            <div className="mt-4 grid gap-3">
              {journeySteps.map((step) => (
                <Link
                  key={step.href}
                  href={step.href}
                  className="group rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-sm font-black text-slate-950">
                      {step.number}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                        {step.label}
                      </p>
                      <h2 className="mt-1 text-base font-black text-white">
                        {language === "id" ? step.titleId : step.titleEn}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {language === "id" ? step.textId : step.textEn}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <p className="text-xs text-slate-400">{stat.label}</p>
              <p className="mt-1 text-2xl font-black">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
            {language === "id" ? "Catatan untuk pemula" : "Beginner note"}
          </p>
          <h2 className="mt-2 text-2xl font-black">
            {language === "id"
              ? "Karyra bukan tempat untuk langsung berspekulasi."
              : "Karyra is not a place to jump into speculation."}
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
            {language === "id"
              ? "Fokus Karyra adalah membangun literasi, kebiasaan aman, partisipasi komunitas, dan kesiapan sebelum seseorang menggunakan wallet, payment, stablecoin, atau aplikasi Web3 sungguhan."
              : "Karyra focuses on literacy, safe habits, community participation, and readiness before someone uses real wallets, payments, stablecoins, or Web3 apps."}
          </p>
        </section>
      </section>
    </main>
  );
}
