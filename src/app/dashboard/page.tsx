import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { getServerLanguage } from "../../lib/i18n-server";
import { t } from "../../lib/i18n";

export default async function DashboardPage() {
  const language = await getServerLanguage();

  const learner = await prisma.user.findUnique({
    where: {
      username: "demo",
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      city: true,
      xp: true,
      level: true,
      streakCount: true,
      enrollments: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          status: true,
          progressPct: true,
          course: {
            select: {
              id: true,
              slug: true,
              title: true,
              subtitle: true,
              difficulty: true,
              modules: {
                orderBy: {
                  order: "asc",
                },
                select: {
                  id: true,
                  order: true,
                  title: true,
                  lessons: {
                    where: {
                      status: "PUBLISHED",
                    },
                    orderBy: {
                      order: "asc",
                    },
                    select: {
                      id: true,
                      slug: true,
                      title: true,
                      order: true,
                      estimatedMinutes: true,
                      xpReward: true,
                    },
                  },
                },
              },
              quests: {
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
                  xpReward: true,
                  type: true,
                  difficulty: true,
                  tasks: {
                    orderBy: {
                      order: "asc",
                    },
                    select: {
                      id: true,
                      order: true,
                      title: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      lessonProgress: {
        select: {
          id: true,
          status: true,
          lessonId: true,
          lesson: {
            select: {
              id: true,
              slug: true,
              title: true,
              estimatedMinutes: true,
              xpReward: true,
              module: {
                select: {
                  course: {
                    select: {
                      slug: true,
                      title: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      badges: {
        orderBy: {
          awardedAt: "desc",
        },
        select: {
          id: true,
          awardedAt: true,
          badge: {
            select: {
              slug: true,
              name: true,
              description: true,
              imageUrl: true,
            },
          },
        },
      },
      rewardLedger: {
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
        select: {
          id: true,
          kind: true,
          xpAmount: true,
          reason: true,
          createdAt: true,
        },
      },
      workshopRegistrations: {
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
        select: {
          id: true,
          status: true,
          workshop: {
            select: {
              slug: true,
              title: true,
              city: true,
              startsAt: true,
            },
          },
        },
      },
    },
  });

  if (!learner) {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
        <section className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-3xl font-bold">
            {t(language, "learnerDashboard")}
          </h1>
          <p className="mt-4 text-slate-300">
            Demo learner belum tersedia. Jalankan:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-900 p-4 text-sm text-emerald-300">
            npm run db:seed:demo
          </pre>
        </section>
      </main>
    );
  }

  const activeEnrollment = learner.enrollments[0];
  const activeCourse = activeEnrollment?.course;
  const activeLessonProgress = learner.lessonProgress[0];
  const continueLesson =
    activeLessonProgress?.lesson ??
    activeCourse?.modules.flatMap((module) => module.lessons)[0];

  const activeQuest = activeCourse?.quests[0];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              {t(language, "learnerDashboard")}
            </p>

            <h1 className="mt-4 text-3xl font-bold md:text-5xl">
              {language === "id"
                ? `Halo, ${learner.displayName}`
                : `Hello, ${learner.displayName}`}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Lanjutkan progres belajar Web3, kumpulkan XP, dan selesaikan quest komunitas."
                : "Continue your Web3 learning progress, collect XP, and complete community quests."}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {continueLesson ? (
                <Link
                  href={`/lessons/${continueLesson.slug}`}
                  className="inline-flex rounded-2xl bg-emerald-400 px-6 py-4 text-base font-bold text-slate-950 md:px-8 md:text-lg"
                >
                  {t(language, "continueLearning")}
                </Link>
              ) : null}

              <Link
                href="/passport"
                className="inline-flex rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-6 py-4 text-base font-bold text-emerald-300 transition hover:bg-emerald-400/20 md:px-8 md:text-lg"
              >
                {language === "id"
                  ? "Lihat Readiness Passport"
                  : "View Readiness Passport"}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
            <div className="rounded-3xl bg-white/5 p-6">
              <p className="text-sm text-slate-400">{t(language, "totalXp")}</p>
              <p className="mt-2 text-4xl font-bold text-emerald-300">
                {learner.xp}
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 p-6">
              <p className="text-sm text-slate-400">
                {t(language, "currentLevel")}
              </p>
              <p className="mt-2 text-4xl font-bold">{learner.level}</p>
            </div>

            <div className="rounded-3xl bg-white/5 p-6">
              <p className="text-sm text-slate-400">
                {t(language, "dayStreak")}
              </p>
              <p className="mt-2 text-4xl font-bold">{learner.streakCount}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {t(language, "learningProgress")}
                </h2>
                {activeCourse ? (
                  <p className="mt-2 text-slate-400">{activeCourse.title}</p>
                ) : null}
              </div>

              {activeEnrollment ? (
                <p className="text-3xl font-bold text-emerald-300">
                  {activeEnrollment.progressPct}%
                </p>
              ) : null}
            </div>

            {activeEnrollment ? (
              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-emerald-400"
                  style={{
                    width: `${activeEnrollment.progressPct}%`,
                  }}
                />
              </div>
            ) : null}

            {continueLesson ? (
              <Link
                href={`/lessons/${continueLesson.slug}`}
                className="mt-6 block rounded-3xl bg-slate-900 p-5"
              >
                <p className="text-sm text-slate-400">
                  {language === "id" ? "Lesson aktif" : "Active lesson"}
                </p>
                <h3 className="mt-2 text-xl font-bold">
                  {continueLesson.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {continueLesson.estimatedMinutes} menit •{" "}
                  {continueLesson.xpReward} XP
                </p>
              </Link>
            ) : null}

            {activeCourse ? (
              <div className="mt-6 grid gap-3">
                {activeCourse.modules.map((module) => (
                  <div
                    key={module.id}
                    className="rounded-2xl bg-slate-900/70 p-4"
                  >
                    <p className="text-sm text-slate-400">
                      Module {module.order}
                    </p>
                    <h3 className="mt-1 font-semibold">{module.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {module.lessons.length} lesson
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </section>

          <section className="grid gap-6">
            <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
              <h2 className="text-2xl font-bold">
                {t(language, "activeQuest")}
              </h2>

              {activeQuest ? (
                <div className="mt-5">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-300">
                      {activeQuest.type}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                      {activeQuest.difficulty}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold">
                    {activeQuest.title}
                  </h3>

                  {activeQuest.description ? (
                    <p className="mt-2 leading-7 text-slate-300">
                      {activeQuest.description}
                    </p>
                  ) : null}

                  <p className="mt-4 font-bold text-emerald-300">
                    Reward {activeQuest.xpReward} XP
                  </p>

                  <div className="mt-5 grid gap-2">
                    {activeQuest.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="rounded-2xl bg-slate-950/50 p-4"
                      >
                        <p className="text-sm text-slate-400">
                          Task {task.order}
                        </p>
                        <p className="mt-1 font-semibold">{task.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-slate-300">
                  {language === "id"
                    ? "Belum ada quest aktif."
                    : "No active quest yet."}
                </p>
              )}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="text-2xl font-bold">
                {t(language, "earnedBadges")}
              </h2>

              <div className="mt-5 grid gap-3">
                {learner.badges.length > 0 ? (
                  learner.badges.map((userBadge) => (
                    <div
                      key={userBadge.id}
                      className="flex items-center gap-4 rounded-2xl bg-slate-900 p-4"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-xl">
                        🏅
                      </div>

                      <div>
                        <h3 className="font-bold">{userBadge.badge.name}</h3>
                        {userBadge.badge.description ? (
                          <p className="mt-1 text-sm text-slate-400">
                            {userBadge.badge.description}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-300">
                    {language === "id" ? "Belum ada badge." : "No badges yet."}
                  </p>
                )}
              </div>
            </div>
            <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    {language === "id"
                      ? "Workshop Terdaftar"
                      : "Registered Workshops"}
                  </h2>
                  <p className="mt-2 text-slate-400">
                    {language === "id"
                      ? "Aktivitas offline/community onboarding yang diikuti learner."
                      : "Offline/community onboarding activities joined by the learner."}
                  </p>
                </div>

                <Link
                  href="/workshops"
                  className="rounded-2xl bg-white/10 px-5 py-3 text-center font-bold text-white"
                >
                  {t(language, "workshops")}
                </Link>
              </div>

              <div className="mt-5 grid gap-3">
                {learner.workshopRegistrations.length > 0 ? (
                  learner.workshopRegistrations.map((registration) => (
                    <div
                      key={registration.id}
                      className="rounded-2xl bg-slate-900 p-4"
                    >
                      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">
                            {registration.status}
                          </p>
                          <h3 className="mt-2 font-bold">
                            {registration.workshop.title}
                          </h3>
                          <p className="mt-1 text-sm text-slate-400">
                            {registration.workshop.city ?? "Community"} •{" "}
                            {new Date(
                              registration.workshop.startsAt,
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="rounded-2xl bg-slate-900 p-4 text-slate-300">
                    {language === "id"
                      ? "Belum terdaftar di workshop."
                      : "Not registered in any workshop yet."}
                  </p>
                )}
              </div>
            </section>
          </section>
        </div>
      </section>
    </main>
  );
}
