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

function getReadinessHint(progressPct: number) {
  if (progressPct >= 80) {
    return "Progres belajarmu sudah kuat. Cek Paspor untuk melihat bukti kesiapan yang mulai terbentuk.";
  }

  if (progressPct >= 40) {
    return "Kamu sudah masuk fase membangun kebiasaan belajar. Lanjutkan pelajaran aktif agar Paspor makin terisi.";
  }

  return "Mulai dari satu pelajaran kecil dulu. Dashboard akan membantu menentukan langkah berikutnya.";
}

export default async function DashboardPage() {
  const {
    learner,
    courses,
    lessons,
    activeCourse,
    continueLesson,
    completedCourses,
    overallProgress,
  } = await getLearnerProgressOverview();

  const recentLessons = lessons
    .filter((lesson) => lesson.status !== "NOT_STARTED")
    .slice(0, 5);

  const notStartedLessons = lessons.filter(
    (lesson) => lesson.status === "NOT_STARTED",
  ).length;

  const inProgressLessons = lessons.filter(
    (lesson) => lesson.status === "IN_PROGRESS",
  ).length;

  const completedLessons = lessons.filter(
    (lesson) => lesson.status === "COMPLETED",
  ).length;

  const nextActions = [
    continueLesson
      ? {
          title: "Lanjutkan pelajaran aktif",
          text: `${continueLesson.title} · ${continueLesson.estimatedMinutes} menit · ${continueLesson.xpReward} XP`,
          href: `/lessons/${continueLesson.slug}`,
          label: "Buka Pelajaran",
          primary: true,
        }
      : {
          title: "Pilih kursus pertama",
          text: "Mulai dari kursus blockchain dasar agar alur belajar lebih terarah.",
          href: "/courses",
          label: "Lihat Kursus",
          primary: true,
        },
    {
      title: "Cek bukti kesiapan",
      text: "Lihat bagaimana progres belajar berubah menjadi bukti di Paspor Kesiapan.",
      href: "/passport",
      label: "Buka Paspor",
      primary: false,
    },
    {
      title: "Ikuti aktivitas komunitas",
      text: "Workshop membantu mengubah pemahaman menjadi partisipasi nyata.",
      href: "/workshops",
      label: "Lihat Workshop",
      primary: false,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.05fr_0.75fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Dasbor Belajar Harian
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-6xl">
              Halo, {learner.displayName}. Hari ini lanjut dari sini.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Dasbor adalah ruang kerja harian learner: melihat langkah berikutnya, memantau progres kursus, dan menjaga ritme belajar sebelum hasilnya dirangkum di Paspor Kesiapan.
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
                Semua Kursus
              </Link>
              <Link
                href="/passport"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-6 py-3 text-sm font-bold text-emerald-200 transition hover:border-emerald-400/40"
              >
                Lihat Paspor
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
            <p className="text-sm font-bold text-emerald-300">Progres hari ini</p>
            <p className="mt-2 text-5xl font-black">
              {overallProgress.progressPct}%
            </p>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-400"
                style={{ width: `${overallProgress.progressPct}%` }}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {overallProgress.completedLessons}/{overallProgress.totalLessons} pelajaran selesai. {getReadinessHint(overallProgress.progressPct)}
            </p>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">XP</p>
            <p className="mt-1 text-2xl font-black">{learner.xp}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Level</p>
            <p className="mt-1 text-2xl font-black">{learner.level}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Kursus</p>
            <p className="mt-1 text-2xl font-black">{courses.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Kursus selesai</p>
            <p className="mt-1 text-2xl font-black">{completedCourses}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Berjalan</p>
            <p className="mt-1 text-2xl font-black">{inProgressLessons}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Belum mulai</p>
            <p className="mt-1 text-2xl font-black">{notStartedLessons}</p>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
              Langkah Berikutnya
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Fokus kecil yang bisa dilakukan sekarang.
            </h2>
            <div className="mt-5 grid gap-3">
              {nextActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`rounded-2xl border p-4 transition hover:scale-[1.01] ${
                    action.primary
                      ? "border-emerald-400/20 bg-emerald-400/10"
                      : "border-white/10 bg-slate-950/60 hover:border-emerald-400/40"
                  }`}
                >
                  <h3 className="text-base font-black">{action.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {action.text}
                  </p>
                  <p className="mt-3 text-sm font-black text-emerald-300">
                    {action.label} →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                  Kursus Aktif
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  {activeCourse?.title ?? "Belum ada kursus aktif"}
                </h2>
                {activeCourse?.subtitle ? (
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {activeCourse.subtitle}
                  </p>
                ) : (
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Pilih satu kursus untuk memulai perjalanan belajar yang lebih terarah.
                  </p>
                )}
              </div>

              {activeCourse ? (
                <Link
                  href={`/courses/${activeCourse.slug}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:border-emerald-400/40"
                >
                  Buka Kursus
                </Link>
              ) : (
                <Link
                  href="/courses"
                  className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-emerald-400 px-4 py-2.5 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                >
                  Pilih Kursus
                </Link>
              )}
            </div>

            {activeCourse ? (
              <>
                <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-400"
                    style={{ width: `${activeCourse.progress.progressPct}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {activeCourse.progress.completedLessons}/{activeCourse.progress.totalLessons} pelajaran · {activeCourse.progress.progressPct}% selesai
                </p>

                <div className="mt-5 grid gap-3">
                  {activeCourse.lessons.slice(0, 6).map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/lessons/${lesson.slug}`}
                      className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-emerald-400/40"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                            Modul {lesson.moduleOrder}
                          </p>
                          <h3 className="mt-1 font-black">{lesson.title}</h3>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-[11px] font-black ${getLearningStatusTone(lesson.status)}`}>
                          {statusLabel(lesson.status)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                  Aktivitas Terbaru
                </p>
                <h2 className="mt-1 text-2xl font-black">
                  Riwayat belajar singkat
                </h2>
              </div>
              <Link href="/lessons" className="text-sm font-black text-emerald-300">
                Semua pelajaran →
              </Link>
            </div>

            <div className="mt-4 grid gap-3">
              {recentLessons.length > 0 ? (
                recentLessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/lessons/${lesson.slug}`}
                    className="rounded-2xl bg-slate-950/60 p-4 transition hover:bg-emerald-400/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-slate-500">{lesson.courseTitle}</p>
                        <h3 className="mt-1 text-sm font-black">{lesson.title}</h3>
                      </div>
                      <span className="shrink-0 rounded-full bg-white/5 px-3 py-1 text-xs font-black text-emerald-300">
                        {statusLabel(lesson.status)}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm leading-6 text-slate-400">
                  Belum ada aktivitas pelajaran. Mulai dari kursus pertama.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
              Hubungan dengan Paspor
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Dashboard menggerakkan. Paspor membuktikan.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Setiap pelajaran yang diselesaikan, aktivitas yang diikuti, dan progres yang dibangun akan menjadi sinyal untuk Paspor Kesiapan. Jadi Dashboard dipakai untuk bergerak hari ini, sedangkan Paspor dipakai untuk melihat hasil perjalanan.
            </p>
            <Link
              href="/passport"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              Lihat Bukti di Paspor
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
