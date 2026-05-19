import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { QuestSubmissionForm } from "@/components/quest-submission-form";
import { PageShell } from "@/components/ui/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { ModePill } from "@/components/ui/mode-pill";

type QuestsPageProps = {
  searchParams?: Promise<{ track?: string }>;
};

function getTrackTitle(track?: string) {
  return track === "stellar-readiness" ? "Stellar Readiness Quests" : "Quest Karyra";
}

function getTrackDescription(track?: string) {
  return track === "stellar-readiness"
    ? "Selesaikan quest kesiapan Stellar untuk membangun Proof-of-Readiness sebelum praktik pembayaran Web3."
    : "Selesaikan misi belajar dan aktivitas komunitas untuk mendapatkan XP.";
}

export default async function QuestsPage({ searchParams }: QuestsPageProps) {
  const params = searchParams ? await searchParams : {};
  const track = params.track;

  const quests = await prisma.quest.findMany({
    where: { status: "PUBLISHED", ...(track ? { chainKey: track } : {}) },
    orderBy: { createdAt: "asc" },
    select: {
      id: true, slug: true, title: true, description: true, type: true, difficulty: true, xpReward: true, chainKey: true,
      course: { select: { slug: true, title: true } },
      tasks: { orderBy: { order: "asc" }, select: { id: true, order: true, title: true, verificationType: true } },
    },
  });

  return (
    <PageShell>
      <PageHero
        eyebrow={track === "stellar-readiness" ? "Stellar Readiness Track" : "Learner Quest"}
        title={getTrackTitle(track)}
        description={getTrackDescription(track)}
        actions={[
          { href: "/dashboard", label: "Dashboard", variant: "ghost" },
          { href: "/quests", label: "Semua Quest", variant: track ? "secondary" : "primary" },
          { href: "/quests?track=stellar-readiness", label: "Stellar", variant: track === "stellar-readiness" ? "primary" : "secondary" },
        ]}
      >
        <ModePill mode="Learner" />
      </PageHero>

      {track === "stellar-readiness" ? (
        <section className="rounded-3xl border border-sky-400/20 bg-sky-400/10 p-4 md:p-5">
          <h2 className="text-lg font-bold text-sky-100 md:text-2xl">Jalur quest kesiapan pembayaran Web3</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Quest ini membantu learner membuktikan pemahaman wallet safety, memo awareness, scam prevention, dan checklist sebelum transaksi. Setelah disetujui admin, proof record masuk ke Readiness Passport.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/stacks/stellar-readiness" className="min-h-11 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white">Stellar Stack</Link>
            <Link href="/passport" className="min-h-11 rounded-2xl bg-sky-300 px-4 py-2.5 text-sm font-bold text-slate-950">Passport</Link>
          </div>
        </section>
      ) : null}

      <section className="grid gap-4">
        {quests.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">Belum ada quest untuk filter ini.</div>
        ) : (
          quests.map((quest) => (
            <article key={quest.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:p-5">
              <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-300">{quest.type}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">{quest.difficulty}</span>
                <span className={`rounded-full px-3 py-1 ${quest.chainKey === "stellar-readiness" ? "bg-sky-400/15 text-sky-300" : "bg-white/10 text-slate-300"}`}>{quest.chainKey ?? "chain-agnostic"}</span>
              </div>
              <h2 className="mt-3 text-xl font-bold md:text-2xl">{quest.title}</h2>
              {quest.description ? <p className="mt-2 text-sm leading-6 text-slate-300">{quest.description}</p> : null}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <p className="text-sm font-bold text-emerald-300">Reward {quest.xpReward} XP</p>
                {quest.course ? <Link href={`/courses/${quest.course.slug}`} className="text-sm font-bold text-sky-300">Course: {quest.course.title}</Link> : null}
              </div>
              <div className="mt-4 grid gap-2 md:grid-cols-2">
                {quest.tasks.map((task) => (
                  <div key={task.id} className="rounded-2xl bg-slate-950/50 p-3">
                    <p className="text-xs text-slate-500">Task {task.order} • {task.verificationType}</p>
                    <h3 className="mt-1 text-sm font-bold">{task.title}</h3>
                  </div>
                ))}
              </div>
              <QuestSubmissionForm questId={quest.id} questSlug={quest.slug} minCharacters={40} />
            </article>
          ))
        )}
      </section>
    </PageShell>
  );
}
