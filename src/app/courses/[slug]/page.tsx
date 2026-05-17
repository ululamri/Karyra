import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { SubmitButton } from "../../../components/submit-button";
import { enrollCourseAction, startLessonAction } from "../../actions/learner";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      description: true,
      difficulty: true,
      status: true,
      modules: {
        orderBy: {
          order: "asc",
        },
        select: {
          id: true,
          order: true,
          title: true,
          description: true,
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
      quests: {
        where: {
          status: "PUBLISHED",
        },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          type: true,
          difficulty: true,
          xpReward: true,
          chainKey: true,
        },
      },
    },
  });

  if (!course || course.status !== "PUBLISHED") {
    notFound();
  }

  const firstLesson = course.modules.flatMap((module) => module.lessons)[0];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto max-w-5xl">
        <Link href="/courses" className="text-sm text-emerald-300">
          ← Semua Course
        </Link>

        <div className="mt-5 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300 md:text-sm">
            {course.difficulty}
          </p>

          <h1 className="mt-3 text-3xl font-bold md:text-5xl">
            {course.title}
          </h1>

          {course.subtitle ? (
            <p className="mt-4 text-base text-slate-300 md:text-xl">
              {course.subtitle}
            </p>
          ) : null}

          {course.description ? (
            <p className="mt-5 max-w-3xl leading-8 text-slate-300">
              {course.description}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <form action={enrollCourseAction}>
              <input type="hidden" name="courseSlug" value={course.slug} />
              <SubmitButton pendingText="Enrolling...">
               Enroll Course
              </SubmitButton>
              </form>

            {firstLesson ? (
              <form action={startLessonAction}>
                <input
                  type="hidden"
                  name="lessonSlug"
                  value={firstLesson.slug}
                />
                <SubmitButton variant="secondary" pendingText="Starting...">
                 Start First Lesson
                </SubmitButton>
              </form>
            ) : null}
          </div>
        </div>

        <div className="mt-8 grid gap-5">
          {course.modules.map((module) => (
            <section
              key={module.id}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-5 md:p-6"
            >
              <p className="text-sm text-slate-400">Module {module.order}</p>

              <h2 className="mt-1 text-xl font-bold md:text-2xl">
                {module.title}
              </h2>

              {module.description ? (
                <p className="mt-2 text-sm leading-6 text-slate-300 md:text-base">
                  {module.description}
                </p>
              ) : null}

              <div className="mt-5 grid gap-3">
                {module.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/lessons/${lesson.slug}`}
                    className="rounded-2xl bg-slate-900 p-4 transition hover:bg-slate-800"
                  >
                    <p className="text-sm text-slate-400">
                      Lesson {lesson.order} • {lesson.estimatedMinutes} menit •{" "}
                      {lesson.xpReward} XP
                    </p>

                    <h3 className="mt-1 font-semibold">{lesson.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {course.quests.length > 0 ? (
          <section className="mt-8 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
            <h2 className="text-xl font-bold md:text-2xl">Quest terkait</h2>

            <div className="mt-4 grid gap-3">
              {course.quests.map((quest) => (
                <div key={quest.id} className="rounded-2xl bg-slate-950/50 p-4">
                  <h3 className="font-semibold">{quest.title}</h3>

                  {quest.description ? (
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {quest.description}
                    </p>
                  ) : null}

                  <p className="mt-2 text-sm font-semibold text-emerald-300">
                    Reward {quest.xpReward} XP
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}