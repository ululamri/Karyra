import Link from "next/link";
import { prisma } from "@/lib/prisma";

const readinessModules = [
  {
    title: "Wallet Safety Basics",
    titleId: "Dasar Keamanan Wallet",
    description:
      "Understand seed phrase safety, wallet recovery risks, device hygiene, and why beginners should practice before holding real value.",
    descriptionId:
      "Memahami keamanan seed phrase, risiko recovery wallet, kebersihan perangkat, dan kenapa pemula perlu latihan sebelum menyimpan aset sungguhan.",
    status: "Foundation",
  },
  {
    title: "Address & Memo Awareness",
    titleId: "Kesadaran Address & Memo",
    description:
      "Learn why payment addresses, memos, and destination tags matter before sending assets on payment-focused networks.",
    descriptionId:
      "Belajar kenapa address, memo, dan destination tag penting sebelum mengirim aset di jaringan pembayaran.",
    status: "Critical",
  },
  {
    title: "Stablecoin & Payment Literacy",
    titleId: "Literasi Stablecoin & Pembayaran",
    description:
      "Introduce stablecoin concepts, payment flow, fees, confirmation expectations, and real-world use cases without forcing transactions early.",
    descriptionId:
      "Mengenalkan konsep stablecoin, alur pembayaran, biaya, ekspektasi konfirmasi, dan use case nyata tanpa memaksa transaksi terlalu awal.",
    status: "Learning",
  },
  {
    title: "Remittance Readiness",
    titleId: "Kesiapan Remitansi",
    description:
      "Prepare learners to understand cross-border payment scenarios, recipient confirmation, and local cash-in/cash-out risks.",
    descriptionId:
      "Menyiapkan learner memahami skenario pembayaran lintas negara, konfirmasi penerima, dan risiko cash-in/cash-out lokal.",
    status: "Practice",
  },
  {
    title: "Scam Prevention",
    titleId: "Pencegahan Scam",
    description:
      "Train learners to identify fake airdrops, impersonation, phishing links, wallet-draining tricks, and unrealistic earning promises.",
    descriptionId:
      "Melatih learner mengenali airdrop palsu, impersonator, link phishing, trik penguras wallet, dan janji keuntungan tidak realistis.",
    status: "Safety",
  },
  {
    title: "Pre-Transaction Confidence",
    titleId: "Kepercayaan Sebelum Transaksi",
    description:
      "Build confidence through checklists, dry-run simulations, peer review, and proof-of-readiness before real transactions.",
    descriptionId:
      "Membangun kepercayaan lewat checklist, simulasi dry-run, review komunitas, dan proof-of-readiness sebelum transaksi sungguhan.",
    status: "Readiness",
  },
];

const proofLayers = [
  "Proof-of-Learning: learner memahami konsep pembayaran dan stablecoin.",
  "Proof-of-Participation: learner ikut workshop atau simulasi lokal.",
  "Proof-of-Readiness: learner lolos checklist sebelum mencoba transaksi nyata.",
  "Proof Archive: readiness snapshot dapat diarsipkan ke Filecoin di tahap berikutnya.",
];

export default async function StellarReadinessPage() {
  const stellarCourse = await prisma.course.findUnique({
    where: {
      slug: "stellar-readiness-for-local-communities",
    },
    include: {
      modules: {
        include: {
          lessons: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  const stellarQuests = stellarCourse
    ? await prisma.quest.findMany({
        where: {
          courseId: stellarCourse.id,
        },
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
          title: true,
          xpReward: true,
          difficulty: true,
          status: true,
        },
      })
    : [];

  const totalLessons =
    stellarCourse?.modules.reduce(
      (sum, module) => sum + module.lessons.length,
      0,
    ) ?? 0;

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra Stack
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              Stellar Readiness Track
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              Jalur kesiapan finansial Web3 untuk komunitas lokal non-teknikal:
              mulai dari keamanan wallet, pemahaman address dan memo, literasi
              stablecoin, kesiapan pembayaran, hingga kepercayaan sebelum
              melakukan transaksi sungguhan.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Dashboard
            </Link>

            <Link
              href="/passport"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Readiness Passport
            </Link>

            <Link
              href="/stacks/stellar-readiness/checklist"
              className="rounded-2xl border border-sky-400/30 bg-sky-400/10 px-5 py-3 text-sm font-bold text-sky-300 transition hover:bg-sky-400/20"
            >
              Pre-Transaction Checklist
            </Link>
          </div>
        </div>

        <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                Live Course Status
              </p>
              <h2 className="mt-4 text-3xl font-bold">
                {stellarCourse
                  ? stellarCourse.title
                  : "Stellar Readiness Course belum tersedia"}
              </h2>
              <p className="mt-3 max-w-3xl leading-8 text-slate-300">
                {stellarCourse
                  ? stellarCourse.description
                  : "Jalankan seed data terlebih dahulu agar course Stellar muncul di database."}
              </p>
            </div>

            {stellarCourse ? (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/courses/${stellarCourse.slug}`}
                  className="rounded-2xl bg-sky-300 px-6 py-4 text-center text-base font-bold text-slate-950 transition hover:bg-sky-200"
                >
                  Start Stellar Course
                </Link>

                <Link
                  href="/quests?track=stellar-readiness"
                  className="rounded-2xl border border-sky-400/30 bg-sky-400/10 px-6 py-4 text-center text-base font-bold text-sky-300 transition hover:bg-sky-400/20"
                >
                  Stellar Quests
                </Link>

                <Link
                  href="/stacks/stellar-readiness/checklist"
                  className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-6 py-4 text-center text-base font-bold text-emerald-300 transition hover:bg-emerald-400/20"
                >
                  Readiness Checklist
                </Link>
              </div>
            ) : (
              <Link
                href="/courses"
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center text-base font-bold text-white transition hover:border-sky-400/40"
              >
                Explore Courses
              </Link>
            )}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-slate-950/50 p-5">
              <p className="text-sm text-slate-400">Status</p>
              <p className="mt-2 text-2xl font-bold text-sky-300">
                {stellarCourse?.status ?? "Missing"}
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950/50 p-5">
              <p className="text-sm text-slate-400">Modules</p>
              <p className="mt-2 text-2xl font-bold">
                {stellarCourse?.modules.length ?? 0}
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950/50 p-5">
              <p className="text-sm text-slate-400">Lessons</p>
              <p className="mt-2 text-2xl font-bold">{totalLessons}</p>
            </div>

            <div className="rounded-3xl bg-slate-950/50 p-5">
              <p className="text-sm text-slate-400">Quests</p>
              <p className="mt-2 text-2xl font-bold">{stellarQuests.length}</p>
            </div>
          </div>

          {stellarQuests.length > 0 ? (
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {stellarQuests.map((quest) => (
                <div
                  key={quest.id}
                  className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"
                >
                  <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                    <span className="rounded-full bg-sky-400/10 px-3 py-1 text-sky-300">
                      {quest.difficulty}
                    </span>
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                      {quest.status}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold">{quest.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-sky-300">
                    {quest.xpReward} XP Reward
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Why Stellar
            </p>
            <h2 className="mt-4 text-3xl font-bold">
              Payment-readiness, bukan transaction-first.
            </h2>
            <p className="mt-4 leading-8 text-slate-300">
              Di Karyra, Stellar diposisikan sebagai jalur edukasi kesiapan
              pembayaran: learner belajar memahami risiko, alur, dan
              kepercayaan diri sebelum benar-benar menggunakan aset digital
              untuk pembayaran, stablecoin, atau remitansi.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/50 p-5">
                <p className="text-sm text-slate-400">Focus</p>
                <p className="mt-2 text-xl font-bold text-emerald-300">
                  Financial Web3 Readiness
                </p>
              </div>

              <div className="rounded-3xl bg-slate-950/50 p-5">
                <p className="text-sm text-slate-400">Approach</p>
                <p className="mt-2 text-xl font-bold text-emerald-300">
                  Non-technical first
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
              Long-term Role
            </p>
            <h2 className="mt-4 text-3xl font-bold">
              Dari belajar menuju kesiapan nyata.
            </h2>
            <p className="mt-4 leading-8 text-slate-300">
              Track ini membantu Karyra membuktikan bahwa learner tidak hanya
              menonton materi, tetapi melewati proses kesiapan bertahap sebelum
              masuk ke praktik pembayaran Web3.
            </p>

            <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/50 p-5">
              <p className="text-sm text-slate-400">Future Integration</p>
              <p className="mt-2 text-lg font-bold">
                Simulasi transaksi → readiness checklist → proof record →
                optional Stellar practice flow.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Track Modules
              </p>
              <h2 className="mt-4 text-3xl font-bold">Modul kesiapan Stellar</h2>
            </div>

            <p className="text-sm text-slate-400">
              {readinessModules.length} readiness modules
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {readinessModules.map((module) => (
              <article
                key={module.title}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-300">
                    {module.status}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold">{module.titleId}</h3>
                <p className="mt-2 text-sm font-medium text-slate-400">
                  {module.title}
                </p>
                <p className="mt-4 leading-7 text-slate-300">
                  {module.descriptionId}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra Proof Logic
            </p>
            <h2 className="mt-4 text-3xl font-bold">
              Terhubung ke Readiness Passport.
            </h2>
            <p className="mt-4 leading-8 text-slate-300">
              Setiap aktivitas di track ini nantinya dapat menghasilkan proof
              record, masuk ke passport learner, dan diarsipkan sebagai bukti
              kesiapan komunitas.
            </p>
          </div>

          <div className="grid gap-3">
            {proofLayers.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <p className="leading-7 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                Next: gunakan checklist sebelum submit quest.
              </h2>
              <p className="mt-3 max-w-3xl leading-8 text-slate-300">
                Checklist membantu learner membangun kepercayaan diri sebelum
                menjawab quest Stellar dan sebelum mencoba transaksi digital
                bernilai nyata di tahap berikutnya.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/stacks/stellar-readiness/checklist"
                className="rounded-2xl bg-emerald-400 px-6 py-4 text-center text-base font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                Open Checklist
              </Link>

              <Link
                href="/quests?track=stellar-readiness"
                className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-6 py-4 text-center text-base font-bold text-emerald-300 transition hover:bg-emerald-400/20"
              >
                Start Stellar Quests
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
