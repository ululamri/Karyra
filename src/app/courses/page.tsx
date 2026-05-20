import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";

export default async function CoursesPage() {
  const language = await getServerLanguage();

  const courses = await prisma.course.findMany({
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
      subtitle: true,
      description: true,
      difficulty: true,
      modules: {
        select: {
          id: true,
          lessons: {
            where: {
              status: "PUBLISHED",
            },
            select: {
              id: true,
            },
          },
        },
      },
      quests: {
        where: {
          status: "PUBLISHED",
        },
        select: {
          id: true,
        },
      },
    },
  });

  const totalLessons = courses.reduce(
    (total, course) =>
      total +
      course.modules.reduce(
        (moduleTotal, module) => moduleTotal + module.lessons.length,
        0,
      ),
    0,
  );

  const totalQuests = courses.reduce(
    (total, course) => total + course.quests.length,
    0,
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.1fr_0.75fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Proof-of-Learning
            </p>

            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              {language === "id"
                ? "Materi belajar untuk membangun dasar Web3 yang aman."
                : "Learning paths to build safer Web3 foundations."}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              {language === "id"
                ? "Course Karyra dirancang untuk pemula lokal: non-teknikal dulu, teknikal kemudian. Fokusnya adalah keamanan, pemahaman, dan kesiapan sebelum praktik."
                : "Karyra courses are designed for local beginners: non-technical first, technical later. The focus is safety, understanding, and readiness before practice."}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/learner"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                {language === "id" ? "Kembali ke Learner" : "Back to Learner"}
              </Link>
              <Link
                href="/quests?track=stellar-readiness"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                {language === "id" ? "Lanjut ke Quest" : "Continue to Quests"}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">
                {language === "id" ? "Course" : "Courses"}
              </p>
              <p className="mt-1 text-2xl font-black">{courses.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">
                {language === "id" ? "Lesson" : "Lessons"}
              </p>
              <p className="mt-1 text-2xl font-black">{totalLessons}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Quests</p>
              <p className="mt-1 text-2xl font-black">{totalQuests}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {courses.length > 0 ? (
            courses.map((course) => {
              const lessonCount = course.modules.reduce(
                (total, module) => total + module.lessons.length,
                0,
              );

              const isStellar = course.slug.includes("stellar");

              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 md:p-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-300">
                      {course.difficulty}
                    </span>
                    {isStellar ? (
                      <span className="rounded-full bg-sky-400/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-sky-300">
                        Stellar Readiness
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mt-4 text-2xl font-black text-white">
                    {course.title}
                  </h2>

                  {course.subtitle ? (
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {course.subtitle}
                    </p>
                  ) : course.description ? (
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">
                      {course.description}
                    </p>
                  ) : null}

                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl bg-slate-950/60 p-3">
                      <p className="text-xs text-slate-500">
                        {language === "id" ? "Lesson" : "Lessons"}
                      </p>
                      <p className="mt-1 font-black">{lessonCount}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-950/60 p-3">
                      <p className="text-xs text-slate-500">Quests</p>
                      <p className="mt-1 font-black">{course.quests.length}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm font-black text-emerald-300">
                    {language === "id" ? "Buka course" : "Open course"} →
                  </p>
                </Link>
              );
            })
          ) : (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-300 md:col-span-2">
              {language === "id"
                ? "Belum ada course yang dipublikasikan."
                : "No published courses yet."}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
