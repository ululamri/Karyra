import Link from "next/link";
import { getOrCreateDemoLearner, getReadinessPassport } from "@/lib/readiness";
import { getServerLanguage } from "@/lib/i18n-server";

function formatLevel(level?: string) {
  if (!level) return "Beginner";

  return level
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
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

function proofTone(type: string) {
  switch (type) {
    case "LEARNING":
      return "bg-emerald-400/10 text-emerald-300";
    case "PARTICIPATION":
      return "bg-sky-400/10 text-sky-300";
    case "READINESS":
      return "bg-amber-400/10 text-amber-300";
    default:
      return "bg-white/10 text-slate-300";
  }
}

function levelDescription(language: "id" | "en", level?: string) {
  if (language === "id") {
    switch (level) {
      case "COMMUNITY_READY":
        return "Siap berpartisipasi aktif dalam onboarding komunitas dan membantu pemula lain mulai dengan aman.";
      case "READY":
        return "Memiliki sinyal kesiapan yang kuat sebelum masuk ke praktik Web3 yang lebih serius.";
      case "LEARNING":
        return "Sedang membangun literasi dasar melalui belajar, quest, dan partisipasi komunitas.";
      default:
        return "Memulai perjalanan readiness melalui pembelajaran non-teknikal dan safety-first.";
    }
  }

  switch (level) {
    case "COMMUNITY_READY":
      return "Ready to participate actively in community onboarding and help others start safely.";
    case "READY":
      return "Has strong readiness signals before entering more serious Web3 practice.";
    case "LEARNING":
      return "Building basic literacy through learning, quests, and community participation.";
    default:
      return "Starting a readiness journey through non-technical, safety-first learning.";
  }
}

export default async function PassportPage() {
  const language = await getServerLanguage();
  const learner = await getOrCreateDemoLearner();
  const passport = await getReadinessPassport(learner.id);
  const profile = passport.readinessProfile;
  const readinessScore = profile?.readinessScore ?? 0;
  const readinessLevel = profile?.level ?? "BEGINNER";

  const proofCounts = passport.proofRecords.reduce(
    (counts, proof) => {
      if (proof.type === "LEARNING") counts.learning += 1;
      if (proof.type === "PARTICIPATION") counts.participation += 1;
      if (proof.type === "READINESS") counts.readiness += 1;
      if (proof.archivedToFilecoin) counts.archived += 1;
      return counts;
    },
    {
      learning: 0,
      participation: 0,
      readiness: 0,
      archived: 0,
    },
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Readiness Passport
            </p>

            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              {language === "id"
                ? "Hasil akhir dari perjalanan belajar Karyra."
                : "The outcome of the Karyra learning journey."}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              {language === "id"
                ? "Passport ini merangkum proof, badge, XP, workshop, dan readiness score agar learner punya bukti proses sebelum masuk ke praktik Web3 nyata."
                : "This passport summarizes proofs, badges, XP, workshops, and readiness score so learners have process evidence before entering real Web3 practice."}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/passport/timeline"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Timeline
              </Link>
              <Link
                href="/passport/share"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                {language === "id" ? "Bagikan Ringkasan" : "Share Summary"}
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
            <p className="text-sm text-emerald-300">{passport.displayName}</p>
            <h2 className="mt-1 text-4xl font-black">{readinessScore}/100</h2>
            <p className="mt-1 text-lg font-bold text-emerald-100">
              {formatLevel(readinessLevel)}
            </p>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-400"
                style={{ width: `${readinessScore}%` }}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {levelDescription(language, readinessLevel)}
            </p>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">XP</p>
            <p className="mt-1 text-2xl font-black">{profile?.totalXp ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">
              {language === "id" ? "Course selesai" : "Courses"}
            </p>
            <p className="mt-1 text-2xl font-black">
              {profile?.completedCourses ?? 0}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">
              {language === "id" ? "Quest disetujui" : "Approved quests"}
            </p>
            <p className="mt-1 text-2xl font-black">
              {profile?.approvedQuests ?? 0}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Workshops</p>
            <p className="mt-1 text-2xl font-black">
              {profile?.workshopsJoined ?? 0}
            </p>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
              Proof-of-Learning
            </p>
            <p className="mt-2 text-2xl font-black">{proofCounts.learning}</p>
          </div>
          <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-sky-300">
              Proof-of-Participation
            </p>
            <p className="mt-2 text-2xl font-black">{proofCounts.participation}</p>
          </div>
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-amber-300">
              Proof-of-Readiness
            </p>
            <p className="mt-2 text-2xl font-black">{proofCounts.readiness}</p>
          </div>
          <div className="rounded-2xl border border-violet-400/20 bg-violet-400/10 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-violet-300">
              Filecoin Archive
            </p>
            <p className="mt-2 text-2xl font-black">{proofCounts.archived}</p>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                  {language === "id" ? "Badge" : "Badges"}
                </p>
                <h2 className="mt-1 text-2xl font-black">
                  {language === "id" ? "Identitas yang didapat" : "Earned identity"}
                </h2>
              </div>
              <p className="text-sm text-slate-500">{passport.badges.length}</p>
            </div>

            <div className="mt-5 grid gap-3">
              {passport.badges.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
                  {language === "id" ? "Belum ada badge." : "No badges yet."}
                </p>
              ) : (
                passport.badges.map((userBadge) => (
                  <article
                    key={userBadge.id}
                    className="flex gap-3 rounded-2xl bg-slate-950/60 p-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10">
                      🏅
                    </div>
                    <div>
                      <h3 className="text-sm font-black">
                        {userBadge.badge.name}
                      </h3>
                      {userBadge.badge.description ? (
                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          {userBadge.badge.description}
                        </p>
                      ) : null}
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                  Proof Records
                </p>
                <h2 className="mt-1 text-2xl font-black">
                  {language === "id" ? "Bukti perjalanan learner" : "Learner evidence"}
                </h2>
              </div>
              <p className="text-sm text-slate-500">
                {passport.proofRecords.length}
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              {passport.proofRecords.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
                  {language === "id"
                    ? "Belum ada proof record."
                    : "No proof records yet."}
                </p>
              ) : (
                passport.proofRecords.map((proof) => (
                  <article
                    key={proof.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${proofTone(
                            proof.type,
                          )}`}
                        >
                          {proofTypeLabel(proof.type)}
                        </p>
                        <h3 className="mt-3 font-black">{proof.title}</h3>
                        {proof.description ? (
                          <p className="mt-1 text-sm leading-6 text-slate-400">
                            {proof.description}
                          </p>
                        ) : null}
                      </div>
                      <p className="shrink-0 text-sm font-black text-slate-300">
                        {proof.xpValue} XP
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                        {proof.archivedToFilecoin
                          ? "Archived"
                          : "Not archived"}
                      </span>
                      <Link
                        href={`/proofs/${proof.id}`}
                        className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300"
                      >
                        Verify
                      </Link>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
