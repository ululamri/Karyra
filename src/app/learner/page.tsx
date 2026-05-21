import Link from "next/link";
import {
  getLearnerProgressOverview,
  getLearningStatusTone,
} from "@/lib/learning";

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

const focusCards = [
  {
    href: "/courses",
    label: "Kursus",
    title: "Mulai dari jalur belajar yang terarah.",
    text:
      "Kursus menjadi peta utama agar pemula tidak melompat langsung ke istilah teknis tanpa konteks.",
  },
  {
    href: "/lessons",
    label: "Pelajaran",
    title: "Baca materi pendek secara bertahap.",
    text:
      "Pelajaran membantu pengguna memahami satu konsep kecil sebelum bergerak ke bagian berikutnya.",
  },
  {
    href: "/passport",
    label: "Paspor",
    title: "Lihat bukti progres dan kesiapan.",
    text:
      "Paspor merangkum bukti belajar, partisipasi, badge, dan kesiapan yang terus berkembang.",
  },
];

export default async function LearnerPage() {
  const {
    learner,
    courses,
    lessons,
    activeCourse,
    continueLesson,
    completedCourses,
    totalMinutes,
    overallProgress,
  } = await getLearnerProgressOverview();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.08fr_0.72fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Ruang Belajar
            </p>

            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              Lanjutkan belajar dari fondasi blockchain.
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Karyra menempatkan kursus dan pelajaran sebagai inti. Quest, XP, dan reward tetap bisa hadir sebagai latihan tambahan, bukan wajah utama produk.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {continueLesson ? (
                <Link
                  href={`/lessons/${continueLesson.slug}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                >
                  Lanjutkan Pelajaran
                </Link>
              ) : null}

              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                Lihat Kursus
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
            <p className="text-sm text-emerald-300">Progres Belajar</p>
            <p className="mt-2 text-4xl font-black">
              {overallProgress.progressPct}%
            </p>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-400"
                style={{ width: `${overallProgress.progressPct}%` }}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {overallProgress.completedLessons}/{overallProgress.totalLessons} pelajaran selesai.
              {activeCourse ? ` Kursus aktif: ${activeCourse.title}.` : ""}
            </p>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Learner</p>
            <p className="mt-1 truncate text-lg font-black">{learner.displayName}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Kursus</p>
            <p className="mt-1 text-2xl font-black">{courses.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Selesai</p>
            <p className="mt-1 text-2xl font-black">{completedCourses}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Pelajaran</p>
            <p className="mt-1 text-2xl font-black">{lessons.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Menit</p>
            <p className="mt-1 text-2xl font-black">{totalMinutes}</p>
          </div>
        </section>

        {continueLesson ? (
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                  Lanjutkan dari sini
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  {continueLesson.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {continueLesson.courseTitle} · Modul {continueLesson.moduleOrder} · {continueLesson.estimatedMinutes} menit
                </p>
              </div>

              <Link
                href={`/lessons/${continueLesson.slug}`}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Buka Pelajaran
              </Link>
            </div>
          </section>
        ) : null}

        <section className="grid gap-4 md:grid-cols-3">
          {focusCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 md:p-6"
            >
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                {card.label}
              </p>
              <h2 className="mt-3 text-xl font-black">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{card.text}</p>
            </Link>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {courses.slice(0, 4).map((course) => {
            const status = course.enrollment?.status ?? "NOT_STARTED";

            return (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                      Kursus
                    </p>
                    <h2 className="mt-2 text-xl font-black">{course.title}</h2>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[11px] font-black ${getLearningStatusTone(status)}`}>
                    {statusLabel(status)}
                  </span>
                </div>

                {course.subtitle ? (
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {course.subtitle}
                  </p>
                ) : null}

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-400"
                    style={{ width: `${course.progress.progressPct}%` }}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {course.progress.completedLessons}/{course.progress.totalLessons} pelajaran · {course.progress.progressPct}% selesai
                </p>
              </Link>
            );
          })}
        </section>
      </section>
    </main>
  );
}
