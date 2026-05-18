import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { QuestSubmissionForm } from "@/components/quest-submission-form";

type QuestsPageProps = {
  searchParams?: Promise<{
    track?: string;
  }>;
};

function getTrackTitle(track?: string) {
  if (track === "stellar-readiness") {
    return "Stellar Readiness Quests";
  }

  return "Quest Karyra";
}

function getTrackDescription(track?: string) {
  if (track === "stellar-readiness") {
    return "Selesaikan quest kesiapan Stellar untuk membangun Proof-of-Readiness sebelum praktik pembayaran Web3.";
  }

  return "Selesaikan misi belajar dan aktivitas komunitas untuk mendapatkan XP.";
}

export default async function QuestsPage({ searchParams }: QuestsPageProps) {
  const params = searchParams ? await searchParams : {};
  const track = params.track;

  const quests = await prisma.quest.findMany({
    where: {
      status: "PUBLISHED",
      ...(track
        ? {
            chainKey: track,
          }
        : {}),
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

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto max-w-6xl">
        <Link href="/dashboard" className="text-sm font-bold text-emerald-300">
          ← Kembali
        </Link>

        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              {track === "stellar-readiness"
                ? "Stellar Readiness Track"
                : "Karyra Quest"}
            </p>

            <h1 className="mt-4 text-4xl font-bold">
              {getTrackTitle(track)}
            </h1>

            <p className="mt-3 max-w-2xl text-slate-300">
              {getTrackDescription(track)}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/quests"
              className={`rounded-2xl border px-5 py-3 text-sm font-bold transition ${
                !track
                  ? "border-emerald-400 bg-emerald-400 text-slate-950"
                  : "border-white/10 bg-white/5 text-white hover:border-emerald-400/40"
              }`}
            >
              Semua Quest
            </Link>

            <Link
              href="/quests?track=stellar-readiness"
              className={`rounded-2xl border px-5 py-3 text-sm font-bold transition ${
                track === "stellar-readiness"
                  ? "border-sky-300 bg-sky-300 text-slate-950"
                  : "border-sky-400/30 bg-sky-400/10 text-sky-300 hover:bg-sky-400/20"
              }`}
            >
              Stellar Readiness
            </Link>
          </div>
        </div>

        {track === "stellar-readiness" ? (
          <div className="mt-6 rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6">
            <h2 className="text-2xl font-bold text-sky-200">
              Jalur quest kesiapan pembayaran Web3
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Quest ini membantu learner membuktikan pemahaman wallet safety,
              memo awareness, scam prevention, dan checklist sebelum transaksi.
              Setelah submission disetujui admin, proof record akan ikut masuk
              ke Readiness Passport.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/stacks/stellar-readiness"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-sky-400/40"
              >
                Lihat Stellar Stack
              </Link>

              <Link
                href="/passport"
                className="rounded-2xl bg-sky-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-200"
              >
                Lihat Passport
              </Link>
            </div>
          </div>
        ) : null}

        <div className="mt-8 grid gap-5">
          {quests.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-slate-300">
              Belum ada quest untuk filter ini.
            </div>
          ) : (
            quests.map((quest) => (
              <article
                key={quest.id}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
              >
                <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-300">
                    {quest.type}
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

                <h2 className="mt-4 text-2xl font-bold">{quest.title}</h2>

                {quest.description ? (
                  <p className="mt-2 leading-7 text-slate-300">
                    {quest.description}
                  </p>
                ) : null}

                <p className="mt-4 font-bold text-emerald-300">
                  Reward {quest.xpReward} XP
                </p>

                {quest.course ? (
                  <Link
                    href={`/courses/${quest.course.slug}`}
                    className="mt-3 inline-flex text-sm font-bold text-sky-300 hover:text-sky-200"
                  >
                    Course: {quest.course.title}
                  </Link>
                ) : null}

                <div className="mt-5 grid gap-3">
                  {quest.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-2xl bg-slate-950/50 p-4"
                    >
                      <p className="text-sm text-slate-400">
                        Task {task.order} • {task.verificationType}
                      </p>
                      <h3 className="mt-1 font-semibold">{task.title}</h3>
                    </div>
                  ))}
                </div>

                <QuestSubmissionForm
                  questId={quest.id}
                  questSlug={quest.slug}
                  minCharacters={40}
                />
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}