import Link from "next/link";
import { prisma } from "../../lib/prisma";

export default async function CoursesPage() {
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

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white">
      <section className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-emerald-300">
          ← Kembali
        </Link>

        <h1 className="mt-5 text-3xl font-bold">Course Karyra</h1>

        <p className="mt-3 text-slate-300">
          Pilih jalur belajar Web3 yang tersedia.
        </p>

        <div className="mt-8 grid gap-4">
          {courses.map((course) => {
            const lessonCount = course.modules.reduce(
              (total, module) => total + module.lessons.length,
              0,
            );

            return (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                  {course.difficulty}
                </p>

                <h2 className="mt-2 text-xl font-bold">{course.title}</h2>

                {course.subtitle ? (
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {course.subtitle}
                  </p>
                ) : null}

                <div className="mt-4 flex gap-3 text-sm text-slate-400">
                  <span>{lessonCount} lesson</span>
                  <span>•</span>
                  <span>{course.quests.length} quest</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}