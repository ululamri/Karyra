import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { getServerLanguage } from "../../../lib/i18n-server";
import { archiveCourseAction, publishCourseAction } from "../../actions/admin";
import { SubmitButton } from "../../../components/submit-button";

export default async function AdminCoursesPage() {
  const language = await getServerLanguage();

  const [courseCount, draftCourseCount, publishedCourseCount, courses] =
    await Promise.all([
      prisma.course.count(),
      prisma.course.count({
        where: {
          status: "DRAFT",
        },
      }),
      prisma.course.count({
        where: {
          status: "PUBLISHED",
        },
      }),
      prisma.course.findMany({
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          slug: true,
          title: true,
          subtitle: true,
          difficulty: true,
          status: true,
          createdAt: true,
          modules: {
            select: {
              id: true,
              lessons: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      }),
    ]);

  const stats = [
    {
      label: language === "id" ? "Total Course" : "Total Courses",
      value: courseCount,
    },
    {
      label: language === "id" ? "Published" : "Published",
      value: publishedCourseCount,
    },
    {
      label: language === "id" ? "Draft" : "Draft",
      value: draftCourseCount,
    },
  ];

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Content Management
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              {language === "id" ? "Kelola Course" : "Manage Courses"}
            </h2>

            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              {language === "id"
                ? "Kelola konten belajar, publish course, archive course, dan preview halaman publik."
                : "Manage learning content, publish courses, archive courses, and preview public pages."}
            </p>
          </div>

          <Link
            href="/admin/courses/new"
            className="rounded-2xl bg-emerald-400 px-6 py-4 text-center font-bold text-slate-950"
          >
            + Course
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl bg-white/5 p-6">
            <p className="text-4xl font-bold text-emerald-300">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
        <h2 className="text-2xl font-bold">
          {language === "id" ? "Daftar Course" : "Course List"}
        </h2>

        <div className="mt-6 grid gap-4">
          {courses.map((course) => {
            const lessonCount = course.modules.reduce(
              (total, module) => total + module.lessons.length,
              0,
            );

            return (
              <article key={course.id} className="rounded-3xl bg-slate-900 p-5">
                <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
                  <div>
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                        {course.status}
                      </span>
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                        {course.difficulty}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-bold">{course.title}</h3>

                    {course.subtitle ? (
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {course.subtitle}
                      </p>
                    ) : null}

                    <p className="mt-3 text-sm text-slate-500">
                      {lessonCount} lesson • slug: {course.slug}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="rounded-2xl border border-white/15 px-5 py-3 text-center font-bold text-white"
                    >
                      Preview
                    </Link>

                    {course.status !== "PUBLISHED" ? (
                      <form action={publishCourseAction}>
                        <input
                          type="hidden"
                          name="courseSlug"
                          value={course.slug}
                        />
                        <SubmitButton pendingText="Publishing...">
                          Publish
                        </SubmitButton>
                      </form>
                    ) : null}

                    {course.status !== "ARCHIVED" ? (
                      <form action={archiveCourseAction}>
                        <input
                          type="hidden"
                          name="courseSlug"
                          value={course.slug}
                        />
                        <SubmitButton
                          variant="secondary"
                          pendingText="Archiving..."
                        >
                          Archive
                        </SubmitButton>
                      </form>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}