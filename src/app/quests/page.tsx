import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { submitQuestAction } from "../actions/learner";
import { SubmitButton } from "../../components/submit-button";

export default async function QuestsPage() {
  const quests = await prisma.quest.findMany({
    where: {
      status: "PUBLISHED",
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
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white">
      <section className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-emerald-300">
          ← Kembali
        </Link>

        <h1 className="mt-5 text-3xl font-bold">Quest Karyra</h1>

        <p className="mt-3 text-slate-300">
          Selesaikan misi belajar dan aktivitas komunitas untuk mendapatkan XP.
        </p>

        <div className="mt-8 grid gap-4">
          {quests.map((quest) => (
            <article
              key={quest.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                  {quest.type}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                  {quest.difficulty}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                  {quest.chainKey ?? "chain-agnostic"}
                </span>
              </div>

              <h2 className="mt-4 text-xl font-bold">{quest.title}</h2>

              {quest.description ? (
                <p className="mt-2 leading-6 text-slate-300">
                  {quest.description}
                </p>
              ) : null}

              <p className="mt-4 font-semibold text-emerald-300">
                Reward {quest.xpReward} XP
              </p>

              {quest.course ? (
                <Link
                  href={`/courses/${quest.course.slug}`}
                  className="mt-3 inline-block text-sm text-slate-300 underline"
                >
                  Course: {quest.course.title}
                </Link>
              ) : null}

              <div className="mt-5 grid gap-2">
                {quest.tasks.map((task) => (
                  <div key={task.id} className="rounded-2xl bg-slate-900 p-4">
                    <p className="text-sm text-slate-400">
                      Task {task.order} • {task.verificationType}
                    </p>
                    <h3 className="mt-1 font-semibold">{task.title}</h3>
                  </div>
                ))}
              </div>
              
              <form action={submitQuestAction} className="mt-5 grid gap-3">
                <input type="hidden" name="questSlug" value={quest.slug} />

                <textarea
                    name="evidenceText"
                    minLength={20}
                    required
                    rows={4}
                    placeholder="Tulis pemahaman atau bukti penyelesaian quest..."
                    className="w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-sm text-white outline-none placeholder:text-slate-500"
                />

                <SubmitButton pendingText="Submitting...">Submit Quest</SubmitButton>
              </form>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}