import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SubmitButton } from "@/components/submit-button";
import { completeLessonAction, startLessonAction } from "@/app/actions/learner";

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

type QuestionOption = {
  id: string;
  text: string;
};

function getContentBlocks(content: unknown): ContentBlock[] {
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return [];
  }

  const blocks = (content as LessonContent).blocks;

  if (!Array.isArray(blocks)) {
    return [];
  }

  return blocks.filter((block) => block && typeof block === "object" && typeof block.type === "string");
}

function getQuestionOptions(options: unknown): QuestionOption[] {
  if (!Array.isArray(options)) {
    return [];
  }

  return options.filter(
    (option): option is QuestionOption =>
      Boolean(option) &&
      typeof option === "object" &&
      "id" in option &&
      "text" in option &&
      typeof option.id === "string" &&
      typeof option.text === "string",
  );
}

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
          order: true,
          title: true,
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

  const blocks = getContentBlocks(lesson.content);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 pb-24 md:px-8 md:py-12">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
          <Link href="/learner" className="rounded-full border border-white/10 px-3 py-1.5 hover:border-emerald-400/40 hover:text-emerald-300">
            Learn
          </Link>
          <span>/</span>
          <Link href="/courses" className="rounded-full border border-white/10 px-3 py-1.5 hover:border-emerald-400/40 hover:text-emerald-300">
            Courses
          </Link>
          <span>/</span>
          <Link href={`/courses/${lesson.module.course.slug}`} className="rounded-full border border-white/10 px-3 py-1.5 hover:border-emerald-400/40 hover:text-emerald-300">
            {lesson.module.course.title}
          </Link>
        </nav>

        <header className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
            Proof-of-Learning Lesson
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
            {lesson.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-300">
            <span className="rounded-full bg-white/10 px-3 py-1.5">{lesson.type}</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">{lesson.estimatedMinutes} min</span>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-emerald-300">{lesson.xpReward} XP</span>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
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
        </header>

        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="mx-auto max-w-3xl space-y-5">
            {blocks.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm leading-6 text-slate-400">
                Lesson content is not available yet.
              </p>
            ) : (
              blocks.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <h2 key={`${block.type}-${index}`} className="pt-2 text-2xl font-black tracking-tight text-white md:text-3xl">
                      {block.text}
                    </h2>
                  );
                }

                return (
                  <p key={`${block.type}-${index}`} className="text-base leading-8 text-slate-300">
                    {block.text}
                  </p>
                );
              })
            )}
          </div>
        </article>

        {lesson.questions.length > 0 ? (
          <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-wide text-sky-300">Quick Check</p>
            <h2 className="mt-2 text-2xl font-black">Review your understanding</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              These questions help you reflect before completing the lesson. Formal scoring can be added later.
            </p>

            <div className="mt-5 grid gap-4">
              {lesson.questions.map((question) => {
                const options = getQuestionOptions(question.options);

                return (
                  <div key={question.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Question {question.order} • {question.points} points
                    </p>
                    <h3 className="mt-2 font-black">{question.prompt}</h3>
                    <div className="mt-4 grid gap-2">
                      {options.map((option) => (
                        <div key={option.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-300">
                          <strong className="text-slate-100">{option.id.toUpperCase()}.</strong> {option.text}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
