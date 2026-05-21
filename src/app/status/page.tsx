import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { getServerLanguage } from "../../lib/i18n-server";

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
    prisma.user.count({ where: { role: "LEARNER" } }),
    prisma.enrollment.count(),
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.lesson.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.questSubmission.count(),
    prisma.workshop.count({ where: { status: { in: ["OPEN", "COMPLETED"] } } }),
    prisma.lessonProgress.count({ where: { status: "COMPLETED" } }),
    prisma.rewardLedger.aggregate({
      where: { kind: "XP", direction: "CREDIT" },
      _sum: { xpAmount: true },
    }),
    prisma.readinessProfile.count(),
    prisma.readinessProfile.count({
      where: { level: { in: ["READY", "COMMUNITY_READY"] } },
    }),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.quest.count({ where: { status: "PUBLISHED", chainKey: "stellar-readiness" } }),
  ]);

  const totalXp = xpAggregate._sum.xpAmount ?? 0;

  const metrics = [
    { label: "Learner", value: learnerCount },
    { label: "Enrollment", value: enrollmentCount },
    { label: "Course", value: courseCount },
    { label: "Lesson", value: lessonCount },
    { label: "Quest", value: questCount },
    { label: "Submission", value: submissionCount },
    { label: "XP credited", value: totalXp },
    { label: "Workshop", value: workshopCount },
    { label: "Readiness profile", value: readinessProfileCount },
    { label: "Ready learner", value: readyLearnerCount },
    { label: "Proof record", value: proofRecordCount },
    { label: "Archived proof", value: archivedProofCount },
    { label: "Stellar quest", value: stellarQuestCount },
    { label: "Completed lesson", value: completedLessons },
  ];

  const productHealth = [
    {
      title: "Learning Engine",
      status: "Aktif",
      text: "Course, lesson, progress, dashboard, dan completion flow sudah menjadi inti produk.",
    },
    {
      title: "Quest & Reward",
      status: "Pendukung",
      text: "Quest diposisikan sebagai latihan/refleksi. Reward adalah XP, badge, proof record, dan apresiasi komunitas.",
    },
    {
      title: "Workshop",
      status: "Community bridge",
      text: "Workshop menghubungkan belajar online dengan Proof-of-Participation.",
    },
    {
      title: "Readiness Passport",
      status: "Proof identity",
      text: "Paspor merangkum bukti belajar, partisipasi, readiness score, badge, dan proof records.",
    },
    {
      title: "Filecoin",
      status: "Proof archive direction",
      text: "Filecoin diposisikan sebagai arah arsip bukti. Integrasi penuh dapat ditingkatkan setelah MVP stabil.",
    },
    {
      title: "Stellar",
      status: "Readiness track",
      text: "Stellar dipakai sebagai jalur latihan kesiapan finansial blockchain secara aman dan bertahap.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Status Produk
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              {language === "id"
                ? "Karyra Public MVP sedang aktif dan terus dipoles."
                : "Karyra Public MVP is active and continuously polished."}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Halaman ini menampilkan status produk, metrik internal MVP, dan area yang sudah terlihat secara publik. Angka di sini membantu membaca progres produk tanpa mencampurnya dengan dokumen grant internal.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/learner" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300">
                Ruang Belajar
              </Link>
              <Link href="/roadmap" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40">
                Roadmap
              </Link>
              <Link href="/changelog" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40">
                Changelog
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
            <p className="text-sm font-bold text-emerald-300">Current Status</p>
            <h2 className="mt-2 text-3xl font-black">Public MVP</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Learning flow, Dashboard, Passport, Quest/Reward, Workshop, Filecoin direction, dan Stellar readiness sudah tampil sebagai satu ekosistem produk.
            </p>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-3xl font-black text-emerald-300">{metric.value}</p>
              <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
            Product Health
          </p>
          <h2 className="mt-2 text-2xl font-black md:text-4xl">
            Area utama yang sudah tersambung.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {productHealth.map((item) => (
              <article key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <p className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300 w-fit">
                  {item.status}
                </p>
                <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Link href="/filecoin-proof-archive" className="rounded-[2rem] border border-violet-400/20 bg-violet-400/10 p-5 transition hover:scale-[1.01] md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">
              Filecoin
            </p>
            <h2 className="mt-2 text-2xl font-black">Proof Archive Direction</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {archivedProofCount}/{proofRecordCount} proof sudah bertanda archived. Arah berikutnya adalah memperkuat integrasi archive nyata setelah MVP stabil.
            </p>
          </Link>

          <Link href="/stacks/stellar-readiness" className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 transition hover:scale-[1.01] md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              Stellar
            </p>
            <h2 className="mt-2 text-2xl font-black">Payment Readiness Track</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {stellarQuestCount} quest Stellar readiness tersedia sebagai latihan aman sebelum pengalaman finansial blockchain yang lebih serius.
            </p>
          </Link>
        </section>
      </section>
    </main>
  );
}
