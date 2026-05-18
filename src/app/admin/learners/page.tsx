import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { syncReadinessProfile } from "@/lib/readiness";
import { UserRole } from "@/generated/prisma/enums";

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
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    case "READY":
      return "border-sky-500/30 bg-sky-500/10 text-sky-300";
    case "LEARNING":
      return "border-amber-500/30 bg-amber-500/10 text-amber-300";
    default:
      return "border-zinc-700 bg-zinc-800 text-zinc-300";
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

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-400">
              Karyra Admin Console
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              Learner Readiness
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
              Pantau kesiapan learner berdasarkan pembelajaran, quest,
              partisipasi workshop, dan proof record. Halaman ini menjadi pusat
              awal untuk melihat siapa yang masih beginner, sedang belajar,
              siap praktik, atau siap menjadi bagian aktif komunitas.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="rounded-2xl border border-zinc-800 px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-emerald-500 hover:text-emerald-300"
            >
              Admin Home
            </Link>

            <Link
              href="/passport"
              className="rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
            >
              View Demo Passport
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Total Learners</p>
            <p className="mt-2 text-3xl font-bold">{totalLearners}</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Ready Learners</p>
            <p className="mt-2 text-3xl font-bold">{readyLearners}</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Proof Records</p>
            <p className="mt-2 text-3xl font-bold">{totalProofs}</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Filecoin Archived</p>
            <p className="mt-2 text-3xl font-bold">{archivedProofs}</p>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70">
          <div className="border-b border-zinc-800 p-5">
            <h2 className="text-xl font-semibold">Learner List</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Readiness score dihitung dari XP, completed courses, approved
              quests, dan attended workshops.
            </p>
          </div>

          {refreshedLearners.length === 0 ? (
            <div className="p-6 text-sm text-zinc-400">
              Belum ada learner. Jalankan seed data atau buka halaman learner
              demo terlebih dahulu.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead className="border-b border-zinc-800 bg-zinc-950/60 text-xs uppercase tracking-wide text-zinc-500">
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

                <tbody className="divide-y divide-zinc-800">
                  {refreshedLearners.map((learner) => {
                    const profile = learner.readinessProfile;
                    const archived = learner.proofRecords.filter(
                      (proof) => proof.archivedToFilecoin,
                    ).length;

                    return (
                      <tr key={learner.id} className="hover:bg-zinc-950/40">
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-medium text-zinc-100">
                              {learner.displayName}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500">
                              @{learner.username}
                              {learner.city ? ` · ${learner.city}` : ""}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4 font-semibold">
                          {learner.xp}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-24 overflow-hidden rounded-full bg-zinc-800">
                              <div
                                className="h-full rounded-full bg-emerald-400"
                                style={{
                                  width: `${profile?.readinessScore ?? 0}%`,
                                }}
                              />
                            </div>
                            <span className="text-zinc-300">
                              {profile?.readinessScore ?? 0}/100
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${getLevelBadge(
                              profile?.level,
                            )}`}
                          >
                            {formatLevel(profile?.level)}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          {profile?.completedCourses ?? 0}
                        </td>

                        <td className="px-5 py-4">
                          {profile?.approvedQuests ?? 0}
                        </td>

                        <td className="px-5 py-4">
                          {profile?.workshopsJoined ?? 0}
                        </td>

                        <td className="px-5 py-4">
                          <span className="text-zinc-300">
                            {learner.proofRecords.length}
                          </span>
                          <span className="ml-1 text-xs text-zinc-500">
                            / {archived} archived
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <Link
                            href="/passport"
                            className="text-sm font-medium text-emerald-300 hover:text-emerald-200"
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
      </section>
    </main>
  );
}