import Link from "next/link";
import {
  formatLearningStatus,
  getLearnerProgressOverview,
  getLearningStatusTone,
} from "@/lib/learning";
import { getServerLanguage } from "@/lib/i18n-server";

const focusCards = [
  {
    href: "/courses",
    label: "Course & Lesson Engine",
    titleId: "Belajar lewat course dan lesson.",
    titleEn: "Learn through courses and lessons.",
    textId:
      "Course dan lesson adalah jalur utama Karyra. Mulai dari konsep dasar, baca lesson pendek, lalu lanjutkan progress secara bertahap.",
    textEn:
      "Courses and lessons are Karyra's main path. Start from fundamentals, read short lessons, then continue progress step by step.",
  },
  {
    href: "/lessons",
    label: "Lesson Library",
    titleId: "Lanjutkan pelajaran berikutnya.",
    titleEn: "Continue the next lesson.",
    textId:
      "Lesson Library membantu learner melihat seluruh pelajaran yang tersedia tanpa harus menebak URL atau urutan course.",
    textEn:
      "The Lesson Library helps learners see every available lesson without guessing URLs or course order.",
  },
  {
    href: "/passport",
    label: "Readiness Passport",
    titleId: "Lihat bukti progres belajar.",
    titleEn: "See learning progress proof.",
    textId:
      "Passport menjadi ringkasan perjalanan belajar, badge, proof record, dan kesiapan yang terus berkembang.",
    textEn:
      "The Passport summarizes learning journey, badges, proof records, and growing readiness.",
  },
];

export default async function LearnerPage() {
  const language = await getServerLanguage();
  const {
    learner,
    courses,
    lessons,
    activeCourse,
    continueLesson,
    completedCourses,
    totalMinutes,
    overallProgress,
  } = await getLearnerProgressOverview();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.08fr_0.72fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              {language === "id" ? "Ruang Belajar" : "Learning Space"}
            </p>

            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              {language === "id"
                ? "Lanjutkan belajar, bukan sekadar mengejar reward."
                : "Continue learning, not just chasing rewards."}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              {language === "id"
                ? "Karyra menempatkan course dan lesson sebagai inti pengalaman. Quest dan reward hanyalah pelengkap untuk memperkuat kebiasaan belajar dan readiness."
                : "Karyra puts courses and lessons at the center of the experience. Quests and rewards are only supporting layers to strengthen learning habits and readiness."}
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
                {language === "id" ? "Lihat Course" : "View Courses"}
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
            <p className="text-sm text-emerald-300">
              {language === "id" ? "Progress Belajar" : "Learning Progress"}
            </p>
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
              {overallProgress.completedLessons}/{overallProgress.totalLessons} lesson selesai.
              {activeCourse ? ` Active course: ${activeCourse.title}.` : ""}
            </p>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Learner</p>
            <p className="mt-1 truncate text-lg font-black">{learner.displayName}</p>
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
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Minutes</p>
            <p className="mt-1 text-2xl font-black">{totalMinutes}</p>
          </div>
        </section>

        {continueLesson ? (
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                  {language === "id" ? "Lanjutkan dari sini" : "Continue from here"}
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  {continueLesson.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {continueLesson.courseTitle} · Module {continueLesson.moduleOrder} · {continueLesson.estimatedMinutes} min
                </p>
              </div>

              <Link
                href={`/lessons/${continueLesson.slug}`}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                {language === "id" ? "Buka Lesson" : "Open Lesson"}
              </Link>
            </div>
          </section>
        ) : null}

        <section className="grid gap-4 md:grid-cols-3">
          {focusCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 md:p-6"
            >
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                {card.label}
              </p>
              <h2 className="mt-3 text-xl font-black">
                {language === "id" ? card.titleId : card.titleEn}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {language === "id" ? card.textId : card.textEn}
              </p>
            </Link>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {courses.slice(0, 4).map((course) => {
            const status = course.enrollment?.status ?? "NOT_STARTED";

            return (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                      Course
                    </p>
                    <h2 className="mt-2 text-xl font-black">{course.title}</h2>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-[11px] font-black ${getLearningStatusTone(
                      status,
                    )}`}
                  >
                    {formatLearningStatus(status)}
                  </span>
                </div>

                {course.subtitle ? (
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {course.subtitle}
                  </p>
                ) : null}

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-400"
                    style={{ width: `${course.progress.progressPct}%` }}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {course.progress.completedLessons}/{course.progress.totalLessons} lesson · {course.progress.progressPct}% complete
                </p>
              </Link>
            );
          })}
        </section>
      </section>
    </main>
  );
}
