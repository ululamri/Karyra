import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";

function formatDifficulty(value?: string | null) {
  if (!value) return "Beginner";

  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default async function LessonsPage() {
  const language = await getServerLanguage();

  const courses = await prisma.course.findMany({
    where: {
      status: "PUBLISHED",
      modules: {
        some: {
          lessons: {
            some: {
              status: "PUBLISHED",
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
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
              order: true,
              title: true,
              type: true,
              estimatedMinutes: true,
              xpReward: true,
            },
          },
        },
      },
    },
  });

  const lessons = courses.flatMap((course) =>
    course.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({
        ...lesson,
        course: {
          slug: course.slug,
          title: course.title,
          subtitle: course.subtitle,
          difficulty: course.difficulty,
        },
        module: {
          order: module.order,
          title: module.title,
        },
      })),
    ),
  );

  const totalMinutes = lessons.reduce(
    (total, lesson) => total + lesson.estimatedMinutes,
    0,
  );

  const totalXp = lessons.reduce((total, lesson) => total + lesson.xpReward, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.08fr_0.72fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
              Proof-of-Learning
            </p>

            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-6xl">
              {language === "id"
                ? "Pilih lesson dan mulai membangun bukti belajar."
                : "Choose a lesson and start building learning proof."}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              {language === "id"
                ? "Lesson adalah langkah kecil dalam alur Karyra: baca materi, selesaikan aktivitas, lalu lanjutkan ke quest untuk membangun Readiness Passport."
                : "Lessons are small steps in the Karyra journey: read the material, complete activities, then continue to quests to build the Readiness Passport."}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                {language === "id" ? "Lihat Courses" : "View Courses"}
              </Link>

              <Link
                href="/learner"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                {language === "id" ? "Kembali ke Learner" : "Back to Learner"}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Lessons</p>
              <p className="mt-1 text-2xl font-black">{lessons.length}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Minutes</p>
              <p className="mt-1 text-2xl font-black">{totalMinutes}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">XP</p>
              <p className="mt-1 text-2xl font-black">{totalXp}</p>
            </div>
          </div>
        </header>

        {lessons.length === 0 ? (
          <section className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.04] p-6 text-sm leading-7 text-slate-300">
            {language === "id"
              ? "Belum ada lesson published. Buka Admin Console untuk membuat course dan lesson, atau jalankan seed data demo."
              : "No published lessons yet. Open the Admin Console to create courses and lessons, or run the demo seed data."}
          </section>
        ) : (
          <section className="grid gap-4">
            {courses.map((course) => {
              const courseLessons = course.modules.flatMap(
                (module) => module.lessons,
              );

              if (courseLessons.length === 0) return null;

              return (
                <article
                  key={course.id}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                        {formatDifficulty(course.difficulty)}
                      </p>

                      <h2 className="mt-2 text-2xl font-black">
                        {course.title}
                      </h2>

                      {course.subtitle ? (
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                          {course.subtitle}
                        </p>
                      ) : null}
                    </div>

                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:border-emerald-400/40"
                    >
                      {language === "id" ? "Course Detail" : "Course Detail"}
                    </Link>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {course.modules.map((module) =>
                      module.lessons.map((lesson) => (
                        <Link
                          key={lesson.id}
                          href={`/lessons/${lesson.slug}`}
                          className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                        >
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                            Module {module.order} · Lesson {lesson.order}
                          </p>

                          <h3 className="mt-2 text-base font-black text-white">
                            {lesson.title}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-slate-400">
                            {module.title}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                              {lesson.estimatedMinutes} min
                            </span>
                            <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                              {lesson.xpReward} XP
                            </span>
                            <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                              {lesson.type}
                            </span>
                          </div>
                        </Link>
                      )),
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </section>
    </main>
  );
}
