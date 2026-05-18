import Link from "next/link";
import { getOrCreateDemoLearner, getReadinessPassport } from "@/lib/readiness";

function formatLevel(level?: string | null) {
  if (!level) return "Beginner";

  return level
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
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
  const archivedProofCount = passport.proofRecords.filter(
    (proof) => proof.archivedToFilecoin,
  ).length;
  const latestProofs = passport.proofRecords.slice(0, 5);
  const topBadges = passport.badges.slice(0, 4);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-400">
              Karyra Readiness Passport
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              Shareable Passport Summary
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
              Ringkasan siap-bagikan untuk mentor, reviewer, workshop organizer,
              atau komunitas. Untuk MVP, ini adalah placeholder export/share
              sebelum PDF, signed credential, atau public profile permanen.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/passport/timeline"
              className="rounded-2xl border border-zinc-800 px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-emerald-500 hover:text-emerald-300"
            >
              Timeline
            </Link>
            <Link
              href="/passport"
              className="rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
            >
              Back to Passport
            </Link>
          </div>
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-zinc-900/70 shadow-2xl">
          <div className="border-b border-zinc-800 bg-emerald-500/10 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra Proof-of-Readiness
            </p>
            <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-bold md:text-5xl">
                  {passport.displayName}
                </h2>
                <p className="mt-2 text-sm text-zinc-400">
                  @{passport.username}
                  {passport.city ? ` · ${passport.city}` : ""}
                </p>
              </div>

              <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4">
                <p className="text-sm text-emerald-300">Readiness Level</p>
                <p className="mt-1 text-2xl font-bold text-emerald-100">
                  {formatLevel(profile?.level)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-6 md:grid-cols-4 md:p-8">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-5">
              <p className="text-sm text-zinc-400">Score</p>
              <p className="mt-2 text-3xl font-bold text-emerald-300">
                {profile?.readinessScore ?? 0}/100
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-5">
              <p className="text-sm text-zinc-400">Proofs</p>
              <p className="mt-2 text-3xl font-bold">{proofCount}</p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-5">
              <p className="text-sm text-zinc-400">Archived</p>
              <p className="mt-2 text-3xl font-bold text-fuchsia-300">
                {archivedProofCount}
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-5">
              <p className="text-sm text-zinc-400">Badges</p>
              <p className="mt-2 text-3xl font-bold text-amber-300">
                {passport.badges.length}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 md:p-6">
            <p className="text-sm font-medium text-emerald-400">
              Readiness Evidence
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Ringkasan bukti kesiapan
            </h2>

            <div className="mt-5 grid gap-3">
              <div className="flex justify-between rounded-2xl bg-zinc-950/60 p-4 text-sm">
                <span className="text-zinc-400">Completed Courses</span>
                <strong>{profile?.completedCourses ?? 0}</strong>
              </div>
              <div className="flex justify-between rounded-2xl bg-zinc-950/60 p-4 text-sm">
                <span className="text-zinc-400">Approved Quests</span>
                <strong>{profile?.approvedQuests ?? 0}</strong>
              </div>
              <div className="flex justify-between rounded-2xl bg-zinc-950/60 p-4 text-sm">
                <span className="text-zinc-400">Workshops Joined</span>
                <strong>{profile?.workshopsJoined ?? 0}</strong>
              </div>
              <div className="flex justify-between rounded-2xl bg-zinc-950/60 p-4 text-sm">
                <span className="text-zinc-400">Total XP</span>
                <strong>{profile?.totalXp ?? passport.xp}</strong>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 md:p-6">
            <p className="text-sm font-medium text-emerald-400">
              Share Note
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Apa arti passport ini?
            </h2>
            <p className="mt-4 leading-7 text-zinc-400">
              Passport ini menunjukkan bahwa learner telah melewati aktivitas
              belajar, quest, badge, proof record, dan readiness checkpoint di
              Karyra. Proof dapat diverifikasi dari halaman proof detail dan
              sebagian dapat memiliki demo Filecoin archive manifest.
            </p>

            <div className="mt-5 rounded-2xl border border-dashed border-zinc-700 p-4 text-sm leading-6 text-zinc-400">
              Export PDF, signed public profile, dan shareable credential masih
              placeholder untuk tahap berikutnya. Struktur data saat ini sudah
              siap menjadi fondasi fitur tersebut.
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 md:p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-400">
                Public Verification Links
              </p>
              <h2 className="mt-1 text-2xl font-semibold">
                Proof terbaru yang bisa dibuka
              </h2>
            </div>
            <p className="text-sm text-zinc-500">
              {latestProofs.length} latest proof
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            {latestProofs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-800 p-6 text-sm text-zinc-400">
                Belum ada proof record untuk dibagikan.
              </div>
            ) : (
              latestProofs.map((proof) => (
                <Link
                  key={proof.id}
                  href={`/proofs/${proof.id}`}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4 transition hover:border-emerald-500/40"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                        {proof.type}
                      </p>
                      <h3 className="mt-1 font-semibold text-zinc-100">
                        {proof.title}
                      </h3>
                      <p className="mt-2 text-sm text-zinc-500">
                        Issued {formatDate(proof.issuedAt)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-emerald-300">
                      Open proof →
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 md:p-6">
          <p className="text-sm font-medium text-emerald-400">
            Readiness Badges
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {topBadges.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-zinc-800 p-6 text-sm text-zinc-400 md:col-span-2">
                Belum ada badge.
              </p>
            ) : (
              topBadges.map((userBadge) => (
                <article
                  key={userBadge.id}
                  className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10 text-xl">
                    🏅
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-100">
                      {userBadge.badge.name}
                    </h3>
                    {userBadge.badge.description ? (
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {userBadge.badge.description}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
