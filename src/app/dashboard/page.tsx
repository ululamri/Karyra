import Link from "next/link";
import {
  formatLearningStatus,
  getLearnerProgressOverview,
  getLearningStatusTone,
} from "@/lib/learning";
import { getServerLanguage } from "@/lib/i18n-server";

export default async function DashboardPage() {
  const language = await getServerLanguage();
  const {
    learner,
    courses,
    lessons,
    activeCourse,
    continueLesson,
    completedCourses,
    overallProgress,
  } = await getLearnerProgressOverview();

  const recentLessons = lessons
    .filter((lesson) => lesson.status !== "NOT_STARTED")
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.08fr_0.72fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
              {language === "id" ? "Dashboard Belajar" : "Learning Dashboard"}
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-6xl">
              {language === "id"
                ? `Halo, ${learner.displayName}. Lanjutkan progres belajarmu.`
                : `Hello, ${learner.displayName}. Continue your learning progress.`}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              {language === "id"
                ? "Dashboard ini memusatkan course, lesson, progress, dan langkah berikutnya. Quest dan reward tetap ada, tapi bukan jalur utama belajar."
                : "This dashboard centers courses, lessons, progress, and the next step. Quests and rewards still exist, but they are not the main learning path."}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {continueLesson ? (
                <Link
                  href={`/lessons/${continueLesson.slug}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                >
                  {language === "id" ? "Lanjutkan Lesson" : "Continue Lesson"}
                </Link>
              ) : null}
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                {language === "id" ? "Semua Course" : "All Courses"}
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
            <p className="text-sm text-emerald-300">Overall Learning</p>
            <p className="mt-2 text-4xl font-black">
              {overallProgress.progressPct}%
            </p>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-400"
                style={{ width: `${overallProgress.progressPct}%` }}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {overallProgress.completedLessons}/{overallProgress.totalLessons} lessons complete.
            </p>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">XP</p>
            <p className="mt-1 text-2xl font-black">{learner.xp}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Level</p>
            <p className="mt-1 text-2xl font-black">{learner.level}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Courses</p>
            <p className="mt-1 text-2xl font-black">{courses.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Completed</p>
            <p className="mt-1 text-2xl font-black">{completedCourses}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Lessons</p>
            <p className="mt-1 text-2xl font-black">{lessons.length}</p>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.08fr_0.72fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                  {language === "id" ? "Course Aktif" : "Active Course"}
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  {activeCourse?.title ?? "No active course"}
                </h2>
                {activeCourse?.subtitle ? (
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {activeCourse.subtitle}
                  </p>
                ) : null}
              </div>

              {activeCourse ? (
                <Link
                  href={`/courses/${activeCourse.slug}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:border-emerald-400/40"
                >
                  Open Course
                </Link>
              ) : null}
            </div>

            {activeCourse ? (
              <>
                <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-400"
                    style={{ width: `${activeCourse.progress.progressPct}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {activeCourse.progress.completedLessons}/{activeCourse.progress.totalLessons} lessons · {activeCourse.progress.progressPct}% complete
                </p>

                <div className="mt-5 grid gap-3">
                  {activeCourse.lessons.slice(0, 6).map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/lessons/${lesson.slug}`}
                      className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-emerald-400/40"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                            Module {lesson.moduleOrder}
                          </p>
                          <h3 className="mt-1 font-black">{lesson.title}</h3>
                        </div>
                        <span
                          className={`rounded-full border px-3 py-1 text-[11px] font-black ${getLearningStatusTone(
                            lesson.status,
                          )}`}
                        >
                          {formatLearningStatus(lesson.status)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : null}
          </div>

          <div className="grid gap-4">
            {continueLesson ? (
              <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
                <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                  Next Step
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  {continueLesson.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {continueLesson.courseTitle} · {continueLesson.estimatedMinutes} min · {continueLesson.xpReward} XP
                </p>
                <Link
                  href={`/lessons/${continueLesson.slug}`}
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-2xl bg-emerald-400 px-4 py-2.5 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                >
                  Open Lesson
                </Link>
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                Recent Learning Activity
              </p>
              <div className="mt-4 grid gap-3">
                {recentLessons.length > 0 ? (
                  recentLessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/lessons/${lesson.slug}`}
                      className="rounded-2xl bg-slate-950/60 p-3 transition hover:bg-emerald-400/10"
                    >
                      <p className="text-xs text-slate-500">{lesson.courseTitle}</p>
                      <h3 className="mt-1 text-sm font-black">{lesson.title}</h3>
                      <p className="mt-1 text-xs text-emerald-300">
                        {formatLearningStatus(lesson.status)}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm leading-6 text-slate-400">
                    Belum ada aktivitas lesson. Mulai dari course pertama.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
