import Link from "next/link";
import {
  formatDifficulty,
  getCoursesCatalogState,
  getLearningStatusTone,
} from "@/lib/learning";

export default async function CoursesPage() {
  const { courses } = await getCoursesCatalogState();

  const totalLessons = courses.reduce((total, course) => total + course.progress.totalLessons, 0);
  const totalMinutes = courses.reduce((total, course) => total + course.totalMinutes, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.08fr_0.72fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Proof-of-Learning</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-6xl">Course untuk membangun fondasi Web3 secara bertahap.</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">Pilih course, ikuti lesson secara berurutan, selesaikan progress, lalu gunakan Readiness Passport untuk melihat bukti belajarmu.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/lessons" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300">Buka Lesson Library</Link>
              <Link href="/passport" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40">Readiness Passport</Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-xs text-slate-400">Courses</p><p className="mt-1 text-2xl font-black">{courses.length}</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-xs text-slate-400">Lessons</p><p className="mt-1 text-2xl font-black">{totalLessons}</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-xs text-slate-400">Minutes</p><p className="mt-1 text-2xl font-black">{totalMinutes}</p></div>
          </div>
        </header>
        <section className="grid gap-4 md:grid-cols-2">
          {courses.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.04] p-6 text-sm leading-7 text-slate-300 md:col-span-2">Belum ada course published. Buat course dari Admin Console atau jalankan seed data demo.</div>
          ) : courses.map((course) => {
            const enrollmentStatus = course.enrollment?.status ?? "NOT_STARTED";
            return (
              <Link key={course.id} href={`/courses/${course.slug}`} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 md:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div><p className="text-xs font-black uppercase tracking-wide text-emerald-300">{formatDifficulty(course.difficulty)}</p><h2 className="mt-3 text-2xl font-black text-white">{course.title}</h2></div>
                  <span className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-black ${getLearningStatusTone(enrollmentStatus)}`}>{course.progress.progressPct}%</span>
                </div>
                {course.subtitle ? <p className="mt-3 text-sm leading-6 text-slate-400">{course.subtitle}</p> : null}
                <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${course.progress.progressPct}%` }} /></div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">{course.progress.totalLessons} lessons</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">{course.totalMinutes} min</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">{course.totalXp} XP</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">{course.questCount} optional challenges</span>
                </div>
              </Link>
            );
          })}
        </section>
      </section>
    </main>
  );
}
