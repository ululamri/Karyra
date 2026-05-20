import Link from "next/link";
import { notFound } from "next/navigation";
import { SubmitButton } from "../../../components/submit-button";
import { enrollCourseAction, startLessonAction } from "../../actions/learner";
import {
  formatDifficulty,
  formatLearningStatus,
  getCourseLearningState,
  getLearningStatusTone,
} from "@/lib/learning";

type PageProps = { params: Promise<{ slug: string }> };

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const state = await getCourseLearningState(slug);
  if (!state) notFound();
  const { course, progress, nextLesson, enrollment, totalMinutes, totalXp } = state;

  return (
    <main className="min-h-screen bg-slate-950 text-white"><section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
      <Link href="/courses" className="text-sm font-bold text-emerald-300">← Courses</Link>
      <header className="grid gap-6 lg:grid-cols-[1.08fr_0.72fr] lg:items-end"><div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Proof-of-Learning Course</p>
        <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-6xl">{course.title}</h1>
        {course.subtitle ? <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">{course.subtitle}</p> : null}
        {course.description ? <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">{course.description}</p> : null}
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-black"><span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">{formatDifficulty(course.difficulty)}</span><span className={`rounded-full border px-3 py-1 ${getLearningStatusTone(enrollment?.status ?? "NOT_STARTED")}`}>{formatLearningStatus(enrollment?.status ?? "NOT_STARTED")}</span><span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">{progress.totalLessons} lessons</span></div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row"><form action={enrollCourseAction}><input type="hidden" name="courseSlug" value={course.slug} /><input type="hidden" name="redirectTo" value={nextLesson ? `/lessons/${nextLesson.slug}` : `/courses/${course.slug}`} /><SubmitButton pendingText="Opening course...">{enrollment ? "Continue Course" : "Start Course"}</SubmitButton></form>{nextLesson ? <form action={startLessonAction}><input type="hidden" name="lessonSlug" value={nextLesson.slug} /><SubmitButton variant="secondary" pendingText="Starting...">{progress.completedLessons > 0 ? "Continue Lesson" : "Start First Lesson"}</SubmitButton></form> : null}</div>
      </div><div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6"><p className="text-sm text-emerald-300">Course Progress</p><p className="mt-2 text-4xl font-black">{progress.progressPct}%</p><div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${progress.progressPct}%` }} /></div><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs"><div className="rounded-2xl bg-slate-950/50 p-3"><p className="font-black text-white">{progress.totalLessons}</p><p className="mt-1 text-slate-500">Lessons</p></div><div className="rounded-2xl bg-slate-950/50 p-3"><p className="font-black text-white">{totalMinutes}</p><p className="mt-1 text-slate-500">Minutes</p></div><div className="rounded-2xl bg-slate-950/50 p-3"><p className="font-black text-white">{totalXp}</p><p className="mt-1 text-slate-500">XP</p></div></div></div></header>
      <section className="grid gap-5">{course.modules.map((module) => <article key={module.id} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"><div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-black uppercase tracking-wide text-emerald-300">Module {module.order}</p><h2 className="mt-2 text-2xl font-black">{module.title}</h2>{module.description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{module.description}</p> : null}</div><p className="text-sm text-slate-500">{module.lessons.length} lessons</p></div><div className="mt-5 grid gap-3">{module.lessons.map((lesson) => { const status = lesson.progress[0]?.status ?? "NOT_STARTED"; return <div key={lesson.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><Link href={`/lessons/${lesson.slug}`}><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Lesson {lesson.order} · {lesson.estimatedMinutes} min · {lesson.xpReward} XP</p><h3 className="mt-1 text-base font-black text-white">{lesson.title}</h3></Link><div className="flex flex-wrap gap-2"><span className={`rounded-full border px-3 py-1 text-xs font-black ${getLearningStatusTone(status)}`}>{formatLearningStatus(status)}</span><form action={startLessonAction}><input type="hidden" name="lessonSlug" value={lesson.slug} /><button type="submit" className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300 transition hover:bg-emerald-400 hover:text-slate-950">{status === "COMPLETED" ? "Review" : "Open"}</button></form></div></div></div>; })}</div></article>)}</section>
      {course.quests.length > 0 ? <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 md:p-6"><div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-black uppercase tracking-wide text-slate-500">Optional practice</p><h2 className="mt-2 text-2xl font-black">Practice challenges</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Quest dan reward adalah pelengkap setelah belajar. Fokus utama course ini tetap lesson dan pemahaman.</p></div><Link href="/quests" className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:border-emerald-400/40">View Optional Quests</Link></div></section> : null}
    </section></main>
  );
}
