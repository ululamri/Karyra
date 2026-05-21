import Link from "next/link";
import {
  getCoursesCatalogState,
  getLearningStatusTone,
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

function isBlockchainPrimary(course: { title: string; slug: string }) {
  return `${course.title} ${course.slug}`.toLowerCase().includes("blockchain");
}

function coursePriority(course: { title: string; slug: string }) {
  if (isBlockchainPrimary(course)) return 0;
  return 1;
}

export default async function CoursesPage() {
  const { courses } = await getCoursesCatalogState();
  const sortedCourses = [...courses].sort((a, b) => {
    const priorityDiff = coursePriority(a) - coursePriority(b);
    if (priorityDiff !== 0) return priorityDiff;
    return a.title.localeCompare(b.title, "id");
  });

  const totalLessons = courses.reduce((total, course) => total + course.progress.totalLessons, 0);
  const totalMinutes = courses.reduce((total, course) => total + course.totalMinutes, 0);
  const totalOptionalQuests = courses.reduce((total, course) => total + course.questCount, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.08fr_0.72fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Jalur Belajar Utama
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-6xl">
              Kursus adalah pintu utama Karyra.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Karyra dimulai dari kursus dan pelajaran. Quest dan reward tetap tersedia sebagai latihan kecil setelah belajar, tetapi fondasi utamanya adalah pemahaman blockchain yang bertahap dan aman.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/learner"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Masuk ke Ruang Belajar
              </Link>
              <Link
                href="/lessons"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                Buka Perpustakaan Pelajaran
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Kursus</p>
              <p className="mt-1 text-2xl font-black">{courses.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Pelajaran</p>
              <p className="mt-1 text-2xl font-black">{totalLessons}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Menit</p>
              <p className="mt-1 text-2xl font-black">{totalMinutes}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Latihan</p>
              <p className="mt-1 text-2xl font-black">{totalOptionalQuests}</p>
            </div>
          </div>
        </header>

        <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-[0.85fr_1.15fr] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
                Cara belajar di Karyra
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Belajar dulu, latihan kemudian, bukti masuk ke Paspor.
              </h2>
            </div>
            <p className="text-sm leading-7 text-slate-300">
              Setiap kursus membawa learner dari konsep dasar menuju pemahaman yang lebih siap. Setelah itu, quest opsional bisa dipakai untuk refleksi, latihan komunitas, dan bukti kesiapan yang direview.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {sortedCourses.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.04] p-6 text-sm leading-7 text-slate-300 md:col-span-2">
              Belum ada kursus yang diterbitkan. Jalankan seed data demo atau buat kursus dari Karyra Admin Console.
            </div>
          ) : (
            sortedCourses.map((course) => {
              const enrollmentStatus = course.enrollment?.status ?? "NOT_STARTED";
              const primary = isBlockchainPrimary(course);

              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className={`rounded-[2rem] border p-5 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 md:p-6 ${
                    primary
                      ? "border-emerald-400/30 bg-emerald-400/10"
                      : "border-white/10 bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <p className="rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-300">
                          {difficultyLabel(course.difficulty)}
                        </p>
                        {primary ? (
                          <p className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-black text-slate-950">
                            Fondasi utama
                          </p>
                        ) : null}
                        {course.questCount > 0 ? (
                          <p className="rounded-full bg-sky-400/10 px-3 py-1 text-xs font-black text-sky-300">
                            Ada latihan opsional
                          </p>
                        ) : null}
                      </div>
                      <h2 className="mt-3 text-2xl font-black text-white">
                        {course.title}
                      </h2>
                    </div>
                    <span className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-black ${getLearningStatusTone(enrollmentStatus)}`}>
                      {course.progress.progressPct}%
                    </span>
                  </div>

                  {course.subtitle ? (
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {course.subtitle}
                    </p>
                  ) : null}

                  <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{ width: `${course.progress.progressPct}%` }}
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                      {course.progress.totalLessons} pelajaran
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                      {course.totalMinutes} menit
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                      {course.totalXp} XP belajar
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                      {course.questCount} latihan opsional
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </section>
      </section>
    </main>
  );
}
