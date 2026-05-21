import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";
import { QuestSubmissionForm } from "@/components/quest-submission-form";

type QuestsPageProps = {
  searchParams?: Promise<{ track?: string }>;
};

function getTrackTitle(language: "id" | "en", track?: string) {
  if (track === "stellar-readiness") {
    return language === "id"
      ? "Latihan Kesiapan Stellar"
      : "Stellar Readiness Practice";
  }

  return language === "id" ? "Latihan & Quest Karyra" : "Karyra Practice & Quests";
}

function getTrackDescription(language: "id" | "en", track?: string) {
  if (track === "stellar-readiness") {
    return language === "id"
      ? "Latihan kecil untuk membangun Proof-of-Readiness sebelum menyentuh wallet, memo, payment, stablecoin, atau transaksi nyata."
      : "Small practice tasks to build Proof-of-Readiness before touching wallets, memos, payments, stablecoins, or real transactions.";
  }

  return language === "id"
    ? "Quest di Karyra adalah latihan pendukung setelah belajar. Reward adalah apresiasi proses, bukan janji penghasilan atau spekulasi."
    : "Karyra quests are supporting practice after learning. Rewards are appreciation for progress, not income promises or speculation.";
}

function questCategory(type: string, chainKey?: string | null) {
  const normalizedType = type.toLowerCase();
  const normalizedChain = chainKey?.toLowerCase() ?? "";

  if (normalizedChain.includes("stellar") || normalizedType.includes("readiness")) {
    return {
      label: "Readiness Quest",
      description: "Latihan untuk membuktikan kesiapan sebelum praktik lebih serius.",
      tone: "bg-amber-400/10 text-amber-300",
    };
  }

  if (normalizedType.includes("workshop") || normalizedType.includes("participation")) {
    return {
      label: "Participation Quest",
      description: "Latihan yang terhubung dengan aktivitas komunitas atau workshop.",
      tone: "bg-sky-400/10 text-sky-300",
    };
  }

  return {
    label: "Learning Quest",
    description: "Latihan refleksi untuk membuktikan pemahaman setelah belajar.",
    tone: "bg-emerald-400/10 text-emerald-300",
  };
}

export default async function QuestsPage({ searchParams }: QuestsPageProps) {
  const language = await getServerLanguage();
  const params = searchParams ? await searchParams : {};
  const track = params.track;

  const quests = await prisma.quest.findMany({
    where: {
      status: "PUBLISHED",
      ...(track ? { chainKey: track } : {}),
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      type: true,
      difficulty: true,
      xpReward: true,
      chainKey: true,
      course: {
        select: {
          slug: true,
          title: true,
        },
      },
      tasks: {
        orderBy: {
          order: "asc",
        },
        select: {
          id: true,
          order: true,
          title: true,
          verificationType: true,
        },
      },
    },
  });

  const totalTasks = quests.reduce((total, quest) => total + quest.tasks.length, 0);
  const totalXp = quests.reduce((total, quest) => total + quest.xpReward, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.1fr_0.75fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Practice Layer
            </p>

            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              {getTrackTitle(language, track)}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              {getTrackDescription(language, track)}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quests"
                className={`inline-flex min-h-12 items-center justify-center rounded-2xl px-6 py-3 text-sm font-black transition ${
                  !track
                    ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                    : "border border-white/10 bg-white/5 text-white hover:border-emerald-400/40"
                }`}
              >
                Semua Latihan
              </Link>
              <Link
                href="/quests?track=stellar-readiness"
                className={`inline-flex min-h-12 items-center justify-center rounded-2xl px-6 py-3 text-sm font-black transition ${
                  track === "stellar-readiness"
                    ? "bg-sky-300 text-slate-950 hover:bg-sky-200"
                    : "border border-sky-400/30 bg-sky-400/10 text-sky-200 hover:bg-sky-400/20"
                }`}
              >
                Stellar Readiness
              </Link>
              <Link
                href="/passport"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                Lihat Paspor
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Latihan</p>
              <p className="mt-1 text-2xl font-black">{quests.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Task</p>
              <p className="mt-1 text-2xl font-black">{totalTasks}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">XP</p>
              <p className="mt-1 text-2xl font-black">{totalXp}</p>
            </div>
          </div>
        </header>

        <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                Mekanisme Quest & Reward
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Belajar → Latihan → Submit → Review → Reward → Paspor
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-950/60 p-4">
                <p className="text-sm font-black text-emerald-300">Learning</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Refleksi setelah pelajaran atau kursus.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-950/60 p-4">
                <p className="text-sm font-black text-sky-300">Participation</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Aktivitas komunitas, workshop, atau praktik bersama.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-950/60 p-4">
                <p className="text-sm font-black text-amber-300">Readiness</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Bukti kesiapan sebelum praktik blockchain lebih lanjut.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-5 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm leading-7 text-slate-300">
            Reward di Karyra diposisikan sebagai XP, badge, proof record, dan pengakuan komunitas. Reward bukan janji pendapatan, bukan trading incentive, dan bukan dorongan spekulatif.
          </p>
        </section>

        {track === "stellar-readiness" ? (
          <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              Financial Web3 Readiness
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Latihan sebelum praktik pembayaran Web3.
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
              Track ini membantu learner memahami wallet safety, memo awareness, scam prevention, dan checklist transaksi sebelum mencoba aktivitas bernilai nyata.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/stacks/stellar-readiness/checklist"
                className="inline-flex min-h-11 items-center rounded-2xl bg-sky-300 px-4 py-2.5 text-sm font-black text-slate-950"
              >
                Buka Checklist
              </Link>
              <Link
                href="/stacks/stellar-readiness"
                className="inline-flex min-h-11 items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white"
              >
                Stellar Stack
              </Link>
            </div>
          </section>
        ) : null}

        <section className="grid gap-4">
          {quests.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-300">
              Belum ada latihan untuk filter ini.
            </div>
          ) : (
            quests.map((quest) => {
              const category = questCategory(quest.type, quest.chainKey);

              return (
                <article
                  key={quest.id}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
                >
                  <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-wide">
                    <span className={`rounded-full px-3 py-1 ${category.tone}`}>
                      {category.label}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                      {quest.difficulty}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 ${
                        quest.chainKey === "stellar-readiness"
                          ? "bg-sky-400/15 text-sky-300"
                          : "bg-white/10 text-slate-300"
                      }`}
                    >
                      {quest.chainKey ?? "chain-agnostic"}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_0.42fr]">
                    <div>
                      <h2 className="text-2xl font-black">{quest.title}</h2>

                      {quest.description ? (
                        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
                          {quest.description}
                        </p>
                      ) : null}

                      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                        {category.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <p className="text-sm font-black text-emerald-300">
                          {quest.xpReward} XP apresiasi
                        </p>
                        {quest.course ? (
                          <Link
                            href={`/courses/${quest.course.slug}`}
                            className="text-sm font-black text-sky-300"
                          >
                            Terhubung ke kursus: {quest.course.title}
                          </Link>
                        ) : null}
                      </div>

                      <div className="mt-5 grid gap-2 md:grid-cols-2">
                        {quest.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="rounded-2xl bg-slate-950/60 p-3"
                          >
                            <p className="text-xs text-slate-500">
                              Task {task.order} • {task.verificationType}
                            </p>
                            <h3 className="mt-1 text-sm font-black">{task.title}</h3>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-3xl bg-slate-950/60 p-4">
                      <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                        Kirim bukti
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Tulis jawaban, refleksi, atau bukti penyelesaian. Submission masuk ke review admin sebelum menjadi proof di Paspor.
                      </p>
                      <QuestSubmissionForm
                        questId={quest.id}
                        questSlug={quest.slug}
                        minCharacters={40}
                      />
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </section>
    </main>
  );
}
