import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n-server";

const internalProfiles = [
  {
    href: "/admin",
    label: "Admin / Developer",
    noteId: "Kelola konten, review submission, arsip proof, dan cek health.",
    noteEn: "Manage content, review submissions, archive proofs, and check health.",
  },
  {
    href: "/reviewer",
    label: "Reviewer Preview",
    noteId: "Area evaluasi internal untuk demo dan persiapan submission.",
    noteEn: "Internal evaluation area for demos and submission preparation.",
  },
];

export default async function LoginPage() {
  const language = await getServerLanguage();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto grid min-h-[86vh] w-full max-w-6xl gap-8 px-4 py-8 pb-24 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="hidden lg:block">
          <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            Karyra Account Preview
          </p>
          <h1 className="mt-5 max-w-xl text-5xl font-black tracking-tight">
            {language === "id"
              ? "Masuk ke perjalanan readiness kamu."
              : "Enter your readiness journey."}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
            {language === "id"
              ? "Versi produksi akan memakai akun, autentikasi, permission, dan dashboard per role. Untuk MVP ini, login dibuat sebagai preview pengalaman produk."
              : "Production will use real accounts, authentication, permissions, and per-role dashboards. For this MVP, login is a product experience preview."}
          </p>
        </div>

        <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 md:p-7">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-400 text-2xl font-black text-slate-950">
              K
            </div>
            <h1 className="mt-5 text-2xl font-black md:text-3xl">
              {language === "id" ? "Selamat datang kembali" : "Welcome back"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {language === "id"
                ? "Lanjutkan belajar, quest, workshop, dan Readiness Passport kamu."
                : "Continue your learning, quests, workshops, and Readiness Passport."}
            </p>
          </div>

          <Link
            href="/learner"
            className="mt-6 flex min-h-14 items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
          >
            {language === "id" ? "Lanjut sebagai Learner" : "Continue as Learner"}
          </Link>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link
              href="/courses"
              className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-center text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Courses
            </Link>
            <Link
              href="/passport"
              className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-center text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Passport
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              {language === "id" ? "Internal access" : "Internal access"}
            </p>
            <details className="group mt-2">
              <summary className="cursor-pointer list-none text-sm font-bold text-slate-300 transition hover:text-emerald-300">
                {language === "id"
                  ? "Buka area admin/developer"
                  : "Open admin/developer area"}
                <span className="ml-2 text-emerald-300 group-open:hidden">+</span>
                <span className="ml-2 hidden text-emerald-300 group-open:inline">−</span>
              </summary>

              <div className="mt-3 grid gap-2">
                {internalProfiles.map((profile) => (
                  <Link
                    key={profile.href}
                    href={profile.href}
                    className="rounded-2xl border border-white/10 bg-slate-950/50 p-3 transition hover:border-emerald-400/40"
                  >
                    <h2 className="text-sm font-bold text-white">{profile.label}</h2>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {language === "id" ? profile.noteId : profile.noteEn}
                    </p>
                  </Link>
                ))}
              </div>
            </details>
          </div>

          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            {language === "id"
              ? "MVP preview. Data demo digunakan untuk memperlihatkan alur produk."
              : "MVP preview. Demo data is used to show the product flow."}
          </p>
        </div>
      </section>
    </main>
  );
}
