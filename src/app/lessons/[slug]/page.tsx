import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { SubmitButton } from "../../../components/submit-button";
import { completeLessonAction, startLessonAction } from "../../actions/learner";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ContentBlock = {
  type: string;
  text?: string;
};

type LessonContent = {
  blocks?: ContentBlock[];
};

export default async function LessonDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const lesson = await prisma.lesson.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      type: true,
      content: true,
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
      questions: {
        orderBy: {
          order: "asc",
        },
        select: {
          id: true,
          order: true,
          prompt: true,
          options: true,
          points: true,
        },
      },
    },
  });

  if (!lesson) {
    notFound();
  }

  const content = lesson.content as LessonContent;
  const blocks = content.blocks ?? [];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white">
      <article className="mx-auto max-w-3xl">
        <Link
          href={`/courses/${lesson.module.course.slug}`}
          className="text-sm text-emerald-300"
        >
          ← {lesson.module.course.title}
        </Link>

        <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">
            {lesson.type} • {lesson.estimatedMinutes} menit • {lesson.xpReward} XP
          </p>

          <h1 className="mt-3 text-3xl font-bold">{lesson.title}</h1>
        </div>
        
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <form action={startLessonAction}>
            <input type="hidden" name="lessonSlug" value={lesson.slug} />
            <SubmitButton variant="secondary" pendingText="Starting...">
             Start Lesson
            </SubmitButton>
            </form>

            <form action={completeLessonAction}>
            <input type="hidden" name="lessonSlug" value={lesson.slug} />
            <SubmitButton pendingText="Completing...">Complete Lesson</SubmitButton>
            </form>
        </div>

        <div className="mt-8 space-y-5">
          {blocks.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2 key={index} className="text-2xl font-bold">
                  {block.text}
                </h2>
              );
            }

            return (
              <p key={index} className="leading-8 text-slate-300">
                {block.text}
              </p>
            );
          })}
        </div>

        {lesson.questions.length > 0 ? (
          <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-xl font-bold">Quiz singkat</h2>

            <div className="mt-5 grid gap-5">
              {lesson.questions.map((question) => {
                const options = question.options as {
                  id: string;
                  text: string;
                }[];

                return (
                  <div key={question.id} className="rounded-2xl bg-slate-900 p-4">
                    <p className="text-sm text-slate-400">
                      Pertanyaan {question.order} • {question.points} poin
                    </p>

                    <h3 className="mt-2 font-semibold">{question.prompt}</h3>

                    <div className="mt-4 grid gap-2">
                      {options.map((option) => (
                        <div
                          key={option.id}
                          className="rounded-xl border border-white/10 p-3 text-sm text-slate-300"
                        >
                          {option.id.toUpperCase()}. {option.text}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}