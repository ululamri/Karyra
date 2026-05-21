import Link from "next/link";
import {
  getLearningStatusTone,
  getLessonsLibraryState,
} from "@/lib/learning";

function difficultyLabel(value: string) {
  switch (value) {
    case "BEGINNER":
      return "Pemula";
    case "INTERMEDIATE":
      return "Menengah";
    case "ADVANCED":
      return "Lanjutan";
    default:
      return value.replaceAll("_", " ").toLowerCase();
  }
}

function statusLabel(value: string) {
  switch (value) {
    case "COMPLETED":
      return "Selesai";
    case "IN_PROGRESS":
      return "Berjalan";
    case "NOT_STARTED":
      return "Belum mulai";
    default:
      return value.replaceAll("_", " ").toLowerCase();
  }
}

export default async function LessonsPage() {
  const { courses, lessons, totalMinutes, totalXp, progress } = await getLessonsLibraryState();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.08fr_0.72fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
              Pelajaran
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-6xl">
              Ruang baca untuk memahami materi secara bertahap.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Pelajaran adalah bagian kecil dari kursus. Setiap pelajaran membantu pengguna memahami satu konsep sebelum lanjut ke bagian berikutnya.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Lihat Kursus
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                Lihat Dasbor
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
            <p className="text-sm text-emerald-300">Progres Belajar</p>
            <p className="mt-2 text-4xl font-black">{progress.progressPct}%</p>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-400"
                style={{ width: `${progress.progressPct}%` }}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-2xl bg-slate-950/50 p-3">
                <p className="font-black text-white">{lessons.length}</p>
                <p className="mt-1 text-slate-500">Pelajaran</p>
              </div>
              <div className="rounded-2xl bg-slate-950/50 p-3">
                <p className="font-black text-white">{totalMinutes}</p>
                <p className="mt-1 text-slate-500">Menit</p>
              </div>
              <div className="rounded-2xl bg-slate-950/50 p-3">
                <p className="font-black text-white">{totalXp}</p>
                <p className="mt-1 text-slate-500">XP</p>
              </div>
            </div>
          </div>
        </header>

        {lessons.length === 0 ? (
          <section className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.04] p-6 text-sm leading-7 text-slate-300">
            Belum ada pelajaran yang diterbitkan. Jalankan seed data demo atau buat kursus dari Karyra Admin Console.
          </section>
        ) : (
          <section className="grid gap-4">
            {courses.map((course) => {
              const courseLessons = course.modules.flatMap((module) => module.lessons);
              if (courseLessons.length === 0) return null;

              return (
                <article
                  key={course.id}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                        {difficultyLabel(course.difficulty)}
                      </p>
                      <h2 className="mt-2 text-2xl font-black">{course.title}</h2>
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
                      Detail Kursus
                    </Link>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {course.modules.map((module) =>
                      module.lessons.map((lesson) => {
                        const status = lesson.progress[0]?.status ?? "NOT_STARTED";

                        return (
                          <Link
                            key={lesson.id}
                            href={`/lessons/${lesson.slug}`}
                            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                  Modul {module.order} · Pelajaran {lesson.order}
                                </p>
                                <h3 className="mt-2 text-base font-black text-white">
                                  {lesson.title}
                                </h3>
                              </div>
                              <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-black ${getLearningStatusTone(status)}`}>
                                {statusLabel(status)}
                              </span>
                            </div>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                              {module.title}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                                {lesson.estimatedMinutes} menit
                              </span>
                              <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                                {lesson.xpReward} XP
                              </span>
                            </div>
                          </Link>
                        );
                      }),
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
