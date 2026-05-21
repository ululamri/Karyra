import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto grid min-h-[86vh] w-full max-w-6xl gap-8 px-4 py-8 pb-24 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="hidden lg:block">
          <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            Karyra — Ruang Belajar
          </p>
          <h1 className="mt-5 max-w-xl text-5xl font-black tracking-tight">
            Masuk ke ruang belajar blockchain lokal.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
            Lanjutkan kursus, baca pelajaran berikutnya, pantau progres, dan bangun Paspor Kesiapan secara bertahap.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 md:p-7">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-3xl border border-emerald-400/20 bg-white">
              <img src="/brand/karyra-icon.svg" alt="Logo Karyra" className="h-10 w-10" />
            </div>
            <h1 className="mt-5 text-2xl font-black md:text-3xl">
              Karyra — Masuk ke ruang belajar
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Gunakan akun belajar kamu, atau lanjut sebagai Demo Learner untuk melihat alur belajar MVP.
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-bold text-slate-200">
              Username atau email
              <input
                name="identity"
                type="text"
                placeholder="contoh: learner@karyra.local"
                className="min-h-12 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-medium text-white outline-none placeholder:text-slate-600 focus:border-emerald-400"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-200">
              Password
              <input
                name="password"
                type="password"
                placeholder="Masukkan password"
                className="min-h-12 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-medium text-white outline-none placeholder:text-slate-600 focus:border-emerald-400"
              />
            </label>

            <Link
              href="/learner"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              Masuk
            </Link>
          </div>

          <div className="my-5 flex items-center gap-3 text-xs font-bold uppercase tracking-wide text-slate-600">
            <span className="h-px flex-1 bg-white/10" />
            atau
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <Link
            href="/learner"
            className="flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:border-emerald-400/40 hover:bg-white/10"
          >
            Lanjut sebagai Demo Learner
          </Link>

          <p className="mt-5 text-center text-sm leading-6 text-slate-400">
            Belum punya akun?{" "}
            <Link href="/register" className="font-black text-emerald-300 hover:text-emerald-200">
              Daftar di Karyra
            </Link>
          </p>

          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            Pada fase MVP, tombol masuk membawa pengguna ke ruang belajar demo tanpa mengirim password ke URL.
          </p>
        </div>
      </section>
    </main>
  );
}
