import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { getServerLanguage } from "../../../lib/i18n-server";
import { archiveCourseAction, publishCourseAction } from "../../actions/admin";
import { SubmitButton } from "../../../components/submit-button";
import { MetricCard } from "@/components/ui/compact-card";

function formatStatus(status: string) {
  return status.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

function statusTone(status: string) {
  if (status === "PUBLISHED") return "bg-emerald-400/10 text-emerald-300";
  if (status === "DRAFT") return "bg-amber-400/10 text-amber-300";
  if (status === "ARCHIVED") return "bg-white/10 text-slate-400";
  return "bg-white/10 text-slate-300";
}

export default async function AdminCoursesPage() {
  const language = await getServerLanguage();

  const [courseCount, draftCourseCount, publishedCourseCount, archivedCourseCount, courses] =
    await Promise.all([
      prisma.course.count(),
      prisma.course.count({ where: { status: "DRAFT" } }),
      prisma.course.count({ where: { status: "PUBLISHED" } }),
      prisma.course.count({ where: { status: "ARCHIVED" } }),
      prisma.course.findMany({
        orderBy: { createdAt: "desc" },
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
              lessons: { select: { id: true } },
            },
          },
        },
      }),
    ]);

  const stats = [
    { label: language === "id" ? "Total Course" : "Total Courses", value: courseCount },
    { label: "Published", value: publishedCourseCount },
    { label: "Draft", value: draftCourseCount },
    { label: "Archived", value: archivedCourseCount },
  ];

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
              Content Management
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              {language === "id" ? "Kelola Course" : "Manage Courses"}
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              {language === "id"
                ? "Kelola konten belajar, publish course, archive course, dan preview halaman publik dari satu daftar yang rapi."
                : "Manage learning content, publish courses, archive courses, and preview public pages from one clean list."}
            </p>
          </div>

          <Link
            href="/admin/courses/new"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
          >
            + Course
          </Link>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <MetricCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Course Library
            </p>
            <h2 className="mt-2 text-2xl font-black">
              {language === "id" ? "Daftar Course" : "Course List"}
            </h2>
          </div>
          <p className="text-sm text-slate-500">{courseCount} total records</p>
        </div>

        <div className="mt-6 grid gap-4">
          {courses.map((course) => {
            const moduleCount = course.modules.length;
            const lessonCount = course.modules.reduce(
              (total, module) => total + module.lessons.length,
              0,
            );

            return (
              <article key={course.id} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="grid gap-5 xl:grid-cols-[1fr_340px] xl:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-wide">
                      <span className={`rounded-full px-3 py-1 ${statusTone(course.status)}`}>
                        {formatStatus(course.status)}
                      </span>
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                        {formatStatus(course.difficulty)}
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                        {moduleCount} module
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                        {lessonCount} lesson
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-black md:text-2xl">{course.title}</h3>

                    {course.subtitle ? (
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                        {course.subtitle}
                      </p>
                    ) : null}

                    <p className="mt-3 truncate text-xs text-slate-500">
                      slug: {course.slug}
                    </p>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-center text-sm font-black text-white transition hover:border-emerald-400/40"
                    >
                      Preview
                    </Link>

                    {course.status !== "PUBLISHED" ? (
                      <form action={publishCourseAction}>
                        <input type="hidden" name="courseSlug" value={course.slug} />
                        <SubmitButton pendingText="Publishing...">Publish</SubmitButton>
                      </form>
                    ) : (
                      <div className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2.5 text-center text-sm font-black text-emerald-300">
                        Live
                      </div>
                    )}

                    {course.status !== "ARCHIVED" ? (
                      <form action={archiveCourseAction}>
                        <input type="hidden" name="courseSlug" value={course.slug} />
                        <SubmitButton variant="secondary" pendingText="Archiving...">
                          Archive
                        </SubmitButton>
                      </form>
                    ) : (
                      <div className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-center text-sm font-black text-slate-400">
                        Archived
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

          {courses.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 p-6 text-sm text-slate-400">
              Belum ada course.
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
