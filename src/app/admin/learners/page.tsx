import Link from "next/link";
import { MetricCard } from "@/components/ui/compact-card";
import { UserRole } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { syncReadinessProfile } from "@/lib/readiness";

function formatLevel(level?: string | null) {
  if (!level) return "Beginner";

  return level
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getLevelBadge(level?: string | null) {
  switch (level) {
    case "COMMUNITY_READY":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    case "READY":
      return "border-sky-400/30 bg-sky-400/10 text-sky-300";
    case "LEARNING":
      return "border-amber-400/30 bg-amber-400/10 text-amber-300";
    default:
      return "border-white/10 bg-white/5 text-slate-300";
  }
}

export default async function AdminLearnersPage() {
  const learners = await prisma.user.findMany({
    where: {
      role: UserRole.LEARNER,
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      readinessProfile: true,
      proofRecords: {
        select: {
          id: true,
          archivedToFilecoin: true,
        },
      },
      enrollments: {
        select: {
          id: true,
        },
      },
      questSubmissions: {
        select: {
          id: true,
        },
      },
      workshopRegistrations: {
        select: {
          id: true,
        },
      },
    },
  });

  for (const learner of learners) {
    await syncReadinessProfile(learner.id);
  }

  const refreshedLearners = await prisma.user.findMany({
    where: {
      role: UserRole.LEARNER,
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      readinessProfile: true,
      proofRecords: {
        select: {
          id: true,
          archivedToFilecoin: true,
        },
      },
      enrollments: {
        select: {
          id: true,
        },
      },
      questSubmissions: {
        select: {
          id: true,
        },
      },
      workshopRegistrations: {
        select: {
          id: true,
        },
      },
    },
  });

  const totalLearners = refreshedLearners.length;

  const readyLearners = refreshedLearners.filter((learner) => {
    const level = learner.readinessProfile?.level;
    return level === "READY" || level === "COMMUNITY_READY";
  }).length;

  const totalProofs = refreshedLearners.reduce(
    (sum, learner) => sum + learner.proofRecords.length,
    0,
  );

  const archivedProofs = refreshedLearners.reduce(
    (sum, learner) =>
      sum +
      learner.proofRecords.filter((proof) => proof.archivedToFilecoin).length,
    0,
  );

  const totalEnrollments = refreshedLearners.reduce(
    (sum, learner) => sum + learner.enrollments.length,
    0,
  );

  const totalSubmissions = refreshedLearners.reduce(
    (sum, learner) => sum + learner.questSubmissions.length,
    0,
  );

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
              Learner Operations
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Learner Readiness
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              Pantau kesiapan learner berdasarkan pembelajaran, quest, workshop, dan proof record. Halaman ini menjadi pusat awal untuk melihat siapa yang masih beginner, sedang belajar, siap praktik, atau siap menjadi bagian aktif komunitas.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/passport"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              View Demo Passport
            </Link>
            <Link
              href="/admin/proofs"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Proof Records
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Learners" value={totalLearners} />
        <MetricCard label="Ready Learners" value={readyLearners} />
        <MetricCard label="Enrollments" value={totalEnrollments} />
        <MetricCard label="Quest Submissions" value={totalSubmissions} />
        <MetricCard label="Proof Records" value={totalProofs} />
        <MetricCard label="Filecoin Archived" value={archivedProofs} />
        <MetricCard label="Readiness Rate" value={`${totalLearners ? Math.round((readyLearners / totalLearners) * 100) : 0}%`} />
        <MetricCard label="Archive Rate" value={`${totalProofs ? Math.round((archivedProofs / totalProofs) * 100) : 0}%`} />
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Learner Table
            </p>
            <h2 className="mt-2 text-2xl font-black">Learner List</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              Readiness score dihitung dari XP, completed courses, approved quests, dan attended workshops.
            </p>
          </div>
          <p className="text-sm text-slate-500">{totalLearners} learner records</p>
        </div>

        {refreshedLearners.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-white/10 p-6 text-sm text-slate-400">
            Belum ada learner. Jalankan seed data atau buka halaman learner demo terlebih dahulu.
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-3xl border border-white/10">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="border-b border-white/10 bg-slate-950/80 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Learner</th>
                  <th className="px-5 py-4">XP</th>
                  <th className="px-5 py-4">Score</th>
                  <th className="px-5 py-4">Readiness</th>
                  <th className="px-5 py-4">Courses</th>
                  <th className="px-5 py-4">Quests</th>
                  <th className="px-5 py-4">Workshops</th>
                  <th className="px-5 py-4">Proofs</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10 bg-slate-950/40">
                {refreshedLearners.map((learner) => {
                  const profile = learner.readinessProfile;
                  const archived = learner.proofRecords.filter(
                    (proof) => proof.archivedToFilecoin,
                  ).length;

                  return (
                    <tr key={learner.id} className="transition hover:bg-white/[0.03]">
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-black text-white">{learner.displayName}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            @{learner.username}
                            {learner.city ? ` · ${learner.city}` : ""}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4 font-black text-emerald-300">
                        {learner.xp}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-emerald-400"
                              style={{
                                width: `${profile?.readinessScore ?? 0}%`,
                              }}
                            />
                          </div>
                          <span className="text-slate-300">
                            {profile?.readinessScore ?? 0}/100
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-black ${getLevelBadge(
                            profile?.level,
                          )}`}
                        >
                          {formatLevel(profile?.level)}
                        </span>
                      </td>

                      <td className="px-5 py-4">{profile?.completedCourses ?? 0}</td>
                      <td className="px-5 py-4">{profile?.approvedQuests ?? 0}</td>
                      <td className="px-5 py-4">{profile?.workshopsJoined ?? 0}</td>

                      <td className="px-5 py-4">
                        <span className="font-black text-slate-200">
                          {learner.proofRecords.length}
                        </span>
                        <span className="ml-1 text-xs text-slate-500">
                          / {archived} archived
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <Link
                          href="/passport"
                          className="text-sm font-black text-emerald-300 hover:text-emerald-200"
                        >
                          View Passport
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
