import Link from "next/link";
import { getOrCreateDemoLearner, getReadinessPassport } from "@/lib/readiness";

function formatLevel(level?: string) {
  if (!level) return "Beginner";

  return level
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getLevelDescription(level?: string) {
  switch (level) {
    case "COMMUNITY_READY":
      return "Siap menjadi peserta aktif komunitas, mengikuti workshop lanjutan, dan membantu onboarding pengguna baru.";
    case "READY":
      return "Sudah punya fondasi kuat untuk masuk ke praktik Web3 yang lebih serius dan aman.";
    case "LEARNING":
      return "Sedang membangun pemahaman dasar Web3 melalui pembelajaran, quest, dan partisipasi.";
    default:
      return "Baru memulai perjalanan kesiapan Web3 dengan pendekatan non-teknikal terlebih dahulu.";
  }
}

function proofTypeLabel(type: string) {
  switch (type) {
    case "LEARNING":
      return "Proof-of-Learning";
    case "PARTICIPATION":
      return "Proof-of-Participation";
    case "READINESS":
      return "Proof-of-Readiness";
    default:
      return type;
  }
}

export default async function PassportPage() {
  const learner = await getOrCreateDemoLearner();
  const passport = await getReadinessPassport(learner.id);

  const profile = passport.readinessProfile;
  const readinessScore = profile?.readinessScore ?? 0;
  const readinessLevel = profile?.level ?? "BEGINNER";

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-400">
              Karyra Readiness Passport
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              Bukti kesiapan Web3 untuk komunitas lokal.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
              Passport ini merangkum Proof-of-Learning, Proof-of-Participation,
              dan Proof-of-Readiness. Untuk MVP, semua bukti masih tersimpan
              offchain di PostgreSQL. Nantinya snapshot dapat diarsipkan ke
              Filecoin sebagai Proof Archive.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
              <Link
                 href="/passport/timeline"
                 className="rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
              >
              View Timeline
              </Link>

              <Link
                 href="/dashboard"
                 className="rounded-2xl border border-zinc-800 px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-emerald-500 hover:text-emerald-300"
              >
              Back to Dashboard
              </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.4fr_0.8fr]">
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-2xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-zinc-400">Learner</p>
                <h2 className="mt-1 text-2xl font-semibold">
                  {passport.displayName}
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  @{passport.username}
                  {passport.city ? ` · ${passport.city}` : ""}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-left md:text-right">
                <p className="text-sm text-emerald-300">Readiness Level</p>
                <p className="mt-1 text-xl font-bold text-emerald-200">
                  {formatLevel(readinessLevel)}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Readiness Score</span>
                <span className="font-semibold text-zinc-100">
                  {readinessScore}/100
                </span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-emerald-400"
                  style={{ width: `${readinessScore}%` }}
                />
              </div>

              <p className="mt-4 text-sm leading-6 text-zinc-400">
                {getLevelDescription(readinessLevel)}
              </p>
            </div>
          </section>

          <section className="grid gap-4">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
              <p className="text-sm text-zinc-400">Total XP</p>
              <p className="mt-2 text-3xl font-bold">{profile?.totalXp ?? 0}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
                <p className="text-xs text-zinc-500">Courses</p>
                <p className="mt-2 text-2xl font-bold">
                  {profile?.completedCourses ?? 0}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
                <p className="text-xs text-zinc-500">Quests</p>
                <p className="mt-2 text-2xl font-bold">
                  {profile?.approvedQuests ?? 0}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
                <p className="text-xs text-zinc-500">Workshops</p>
                <p className="mt-2 text-2xl font-bold">
                  {profile?.workshopsJoined ?? 0}
                </p>
              </div>
            </div>
          </section>
        </div>
        
      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-400">
             Readiness Badges
            </p>
            <h2 className="mt-1 text-2xl font-semibold">
             Identitas kesiapan learner
            </h2>
          </div>

            <p className="text-sm text-zinc-500">
              {passport.badges.length} badge
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
             {passport.badges.length === 0 ? (
             <div className="rounded-2xl border border-dashed border-zinc-800 p-6 text-sm text-zinc-400 md:col-span-2">
                 Belum ada badge. Selesaikan course, quest, atau milestone readiness
                 untuk mendapatkan badge.
             </div>
             ) : (
              passport.badges.map((userBadge) => (
             <article
                key={userBadge.id}
                className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4"
             > 
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-xl">
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

            <p className="mt-2 text-xs text-zinc-500">
              Awarded{" "}
              {new Intl.DateTimeFormat("id-ID", {
                dateStyle: "medium",
              }).format(userBadge.awardedAt)}
            </p>
          </div>
              </article>
          ))
        )}
      </div>
    </section>
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-400">
                Proof Records
              </p>
              <h2 className="mt-1 text-2xl font-semibold">
                Catatan bukti pembelajaran dan partisipasi
              </h2>
            </div>

            <p className="text-sm text-zinc-500">
              {passport.proofRecords.length} record
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            {passport.proofRecords.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-800 p-6 text-sm text-zinc-400">
                Belum ada proof record. Selesaikan course, approve quest, atau
                tandai kehadiran workshop untuk mulai membuat bukti kesiapan.
              </div>
            ) : (
              passport.proofRecords.map((proof) => (
                <article
                  key={proof.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-medium text-emerald-300">
                        {proofTypeLabel(proof.type)}
                      </p>
                      <h3 className="mt-1 font-semibold text-zinc-100">
                        {proof.title}
                      </h3>
                      {proof.description ? (
                        <p className="mt-2 text-sm leading-6 text-zinc-400">
                          {proof.description}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex shrink-0 flex-col gap-1 text-left text-xs text-zinc-500 md:text-right">
                      <span>
                        XP Value:{" "}
                        <strong className="text-zinc-300">
                          {proof.xpValue}
                        </strong>
                      </span>
                      <span>
                        {new Intl.DateTimeFormat("id-ID", {
                          dateStyle: "medium",
                        }).format(proof.issuedAt)}
                      </span>
                    </div>
                  </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">
                       Source: {proof.source ?? "manual"}
                      </span>

                      <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">
                       Filecoin:{" "}
                       {proof.archivedToFilecoin
                        ? proof.filecoinCid ?? "archived"
                        : "not archived yet"}
                      </span>

                  <Link
                      href={`/proofs/${proof.id}`}
                      className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
                  >
                      View Proof
                  </Link>
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