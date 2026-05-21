import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto grid min-h-[86vh] w-full max-w-6xl gap-8 px-4 py-8 pb-24 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="hidden lg:block">
          <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            Daftar Karyra
          </p>
          <h1 className="mt-5 max-w-xl text-5xl font-black tracking-tight">
            Mulai perjalanan belajar blockchain dari fondasi yang aman.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
            Akun Karyra nantinya menyimpan progres kursus, pelajaran yang selesai, aktivitas komunitas, dan Paspor Kesiapan.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 md:p-7">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-400 text-2xl font-black text-slate-950">
              K
            </div>
            <h1 className="mt-5 text-2xl font-black md:text-3xl">
              Buat akun belajar
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Form ini disiapkan sebagai tampilan awal pendaftaran. Autentikasi asli akan dihubungkan pada iterasi berikutnya.
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-bold text-slate-200">
              Nama pengguna
              <input
                name="name"
                type="text"
                placeholder="Nama kamu"
                className="min-h-12 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-medium text-white outline-none placeholder:text-slate-600 focus:border-emerald-400"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-200">
              Email
              <input
                name="email"
                type="email"
                placeholder="nama@email.com"
                className="min-h-12 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-medium text-white outline-none placeholder:text-slate-600 focus:border-emerald-400"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-200">
              Password
              <input
                name="password"
                type="password"
                placeholder="Buat password"
                className="min-h-12 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-medium text-white outline-none placeholder:text-slate-600 focus:border-emerald-400"
              />
            </label>

            <Link
              href="/dashboard"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              Buat Akun Demo
            </Link>
          </div>

          <p className="mt-5 text-center text-sm leading-6 text-slate-400">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-black text-emerald-300 hover:text-emerald-200">
              Masuk
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
