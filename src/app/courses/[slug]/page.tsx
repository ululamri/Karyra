import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SubmitButton } from "@/components/submit-button";
import { enrollCourseAction, startLessonAction } from "@/app/actions/learner";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDifficulty(value: string) {
  return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

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

  const lessons = course.modules.flatMap((module) => module.lessons);
  const firstLesson = lessons[0];
  const lessonCount = lessons.length;
  const totalMinutes = lessons.reduce((total, lesson) => total + lesson.estimatedMinutes, 0);
  const totalXp = lessons.reduce((total, lesson) => total + lesson.xpReward, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 pb-24 md:px-8 md:py-12">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
          <Link href="/learner" className="rounded-full border border-white/10 px-3 py-1.5 hover:border-emerald-400/40 hover:text-emerald-300">
            Learn
          </Link>
          <span>/</span>
          <Link href="/courses" className="rounded-full border border-white/10 px-3 py-1.5 hover:border-emerald-400/40 hover:text-emerald-300">
            Courses
          </Link>
          <span>/</span>
          <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-emerald-300">
            {course.title}
          </span>
        </nav>

        <header className="grid gap-5 lg:grid-cols-[1.1fr_0.55fr] lg:items-end">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
              Proof-of-Learning Course
            </p>
            <h1 className="mt-3 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
              {course.title}
            </h1>
            {course.subtitle ? (
              <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-slate-200 md:text-lg">
                {course.subtitle}
              </p>
            ) : null}
            {course.description ? (
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 md:text-base md:leading-8">
                {course.description}
              </p>
            ) : null}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <form action={enrollCourseAction}>
                <input type="hidden" name="courseSlug" value={course.slug} />
                <SubmitButton pendingText="Enrolling...">Enroll Course</SubmitButton>
              </form>

              {firstLesson ? (
                <form action={startLessonAction}>
                  <input type="hidden" name="lessonSlug" value={firstLesson.slug} />
                  <SubmitButton variant="secondary" pendingText="Starting...">
                    Start First Lesson
                  </SubmitButton>
                </form>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Level</p>
              <p className="mt-1 text-lg font-black text-emerald-300">{formatDifficulty(course.difficulty)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Lessons</p>
              <p className="mt-1 text-2xl font-black">{lessonCount}</p>
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

        <section className="grid gap-4 lg:grid-cols-[0.72fr_0.28fr]">
          <div className="grid gap-4">
            {course.modules.map((module) => (
              <section key={module.id} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
                <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Module {module.order}</p>
                <h2 className="mt-2 text-2xl font-black">{module.title}</h2>
                {module.description ? <p className="mt-2 text-sm leading-7 text-slate-400">{module.description}</p> : null}

                <div className="mt-5 grid gap-3">
                  {module.lessons.map((lesson) => (
                    <Link key={lesson.id} href={`/lessons/${lesson.slug}`} className="group rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-emerald-400/40 hover:bg-emerald-400/10">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-slate-500">
                            Lesson {lesson.order} • {lesson.type} • {lesson.estimatedMinutes} min
                          </p>
                          <h3 className="mt-1 font-black text-white group-hover:text-emerald-200">{lesson.title}</h3>
                        </div>
                        <span className="shrink-0 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                          {lesson.xpReward} XP
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="grid content-start gap-4">
            <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Learning outcome</p>
              <h2 className="mt-2 text-xl font-black">Build Proof-of-Learning</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Complete lessons to build learning progress, XP, and readiness signals that can appear in your Passport.
              </p>
            </div>

            {course.quests.length > 0 ? (
              <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5">
                <p className="text-xs font-black uppercase tracking-wide text-sky-300">Related quests</p>
                <div className="mt-4 grid gap-3">
                  {course.quests.map((quest) => (
                    <Link key={quest.id} href={`/quests${quest.chainKey ? `?track=${quest.chainKey}` : ""}`} className="rounded-2xl bg-slate-950/60 p-3 transition hover:bg-slate-950/90">
                      <h3 className="text-sm font-black">{quest.title}</h3>
                      <p className="mt-1 text-xs text-slate-400">{quest.xpReward} XP • {quest.difficulty}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </section>
      </section>
    </main>
  );
}
