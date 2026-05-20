import Link from "next/link";
import { getOrCreateDemoLearner, getReadinessPassport } from "@/lib/readiness";

function formatLevel(level?: string | null) {
  if (!level) return "Beginner";

  return level.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
  }).format(date);
}

export default async function PassportSharePage() {
  const learner = await getOrCreateDemoLearner();
  const passport = await getReadinessPassport(learner.id);

  const profile = passport.readinessProfile;
  const proofCount = passport.proofRecords.length;
  const archivedProofCount = passport.proofRecords.filter((proof) => proof.archivedToFilecoin).length;
  const latestProofs = passport.proofRecords.slice(0, 4);
  const topBadges = passport.badges.slice(0, 4);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 pb-24 md:px-8 md:py-12">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
          <Link href="/learner" className="rounded-full border border-white/10 px-3 py-1.5 hover:border-emerald-400/40 hover:text-emerald-300">Learn</Link>
          <span>/</span>
          <Link href="/passport" className="rounded-full border border-white/10 px-3 py-1.5 hover:border-emerald-400/40 hover:text-emerald-300">Passport</Link>
          <span>/</span>
          <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-emerald-300">Share</span>
        </nav>

        <header className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Shareable Readiness Summary</p>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-6xl">A clean summary of learner readiness.</h1>
          <p className="mt-4 text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
            This page is a preview of how a learner could share proof records, badges, and readiness signals with a mentor, community organizer, or future partner.
          </p>
        </header>

        <section className="overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-white/[0.04] shadow-2xl shadow-emerald-950/20">
          <div className="border-b border-white/10 bg-emerald-400/10 p-5 md:p-7">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">Karyra Readiness Passport</p>
            <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-black md:text-5xl">{passport.displayName}</h2>
                <p className="mt-2 text-sm text-slate-400">@{passport.username}{passport.city ? ` · ${passport.city}` : ""}</p>
              </div>
              <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4">
                <p className="text-sm text-emerald-300">Readiness Level</p>
                <p className="mt-1 text-2xl font-black text-emerald-100">{formatLevel(profile?.level)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-4 md:p-7">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs text-slate-400">Score</p>
              <p className="mt-1 text-2xl font-black text-emerald-300">{profile?.readinessScore ?? 0}/100</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs text-slate-400">Proofs</p>
              <p className="mt-1 text-2xl font-black">{proofCount}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs text-slate-400">Archived</p>
              <p className="mt-1 text-2xl font-black text-fuchsia-300">{archivedProofCount}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs text-slate-400">Badges</p>
              <p className="mt-1 text-2xl font-black text-amber-300">{passport.badges.length}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Evidence Snapshot</p>
            <h2 className="mt-2 text-2xl font-black">What this learner has built</h2>
            <div className="mt-5 grid gap-3">
              <div className="flex justify-between rounded-2xl bg-slate-950/60 p-4 text-sm"><span className="text-slate-400">Completed Courses</span><strong>{profile?.completedCourses ?? 0}</strong></div>
              <div className="flex justify-between rounded-2xl bg-slate-950/60 p-4 text-sm"><span className="text-slate-400">Approved Quests</span><strong>{profile?.approvedQuests ?? 0}</strong></div>
              <div className="flex justify-between rounded-2xl bg-slate-950/60 p-4 text-sm"><span className="text-slate-400">Workshops Joined</span><strong>{profile?.workshopsJoined ?? 0}</strong></div>
              <div className="flex justify-between rounded-2xl bg-slate-950/60 p-4 text-sm"><span className="text-slate-400">Total XP</span><strong>{profile?.totalXp ?? passport.xp}</strong></div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Share Meaning</p>
            <h2 className="mt-2 text-2xl font-black">More than a score</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              This passport summarizes learning, participation, and readiness evidence. In a production version, this can evolve into a public profile, signed credential, downloadable PDF, or community verification link.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/passport/timeline" className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-emerald-400 px-4 py-2.5 text-sm font-black text-slate-950">Open Timeline</Link>
              <Link href="/proof-system" className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white">Proof System</Link>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Verification Links</p>
              <h2 className="mt-1 text-2xl font-black">Latest proof records</h2>
            </div>
            <p className="text-sm text-slate-500">{latestProofs.length} latest</p>
          </div>

          <div className="mt-5 grid gap-3">
            {latestProofs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-slate-400">No proof records yet.</div>
            ) : (
              latestProofs.map((proof) => (
                <Link key={proof.id} href={`/proofs/${proof.id}`} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-emerald-400/40">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-emerald-300">{proof.type}</p>
                      <h3 className="mt-1 font-black text-white">{proof.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">Issued {formatDate(proof.issuedAt)}</p>
                    </div>
                    <span className="text-sm font-black text-emerald-300">Open proof →</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {topBadges.length > 0 ? (
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Badges</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {topBadges.map((userBadge) => (
                <article key={userBadge.id} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10 text-xl">🏅</div>
                  <div>
                    <h3 className="font-black text-white">{userBadge.badge.name}</h3>
                    {userBadge.badge.description ? <p className="mt-2 text-sm leading-6 text-slate-400">{userBadge.badge.description}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
