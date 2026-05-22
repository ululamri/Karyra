import Link from "next/link";
import {
  getPublicAdminUsernameHint,
  isAdminProtectionEnabled,
} from "@/lib/admin-auth";
import { loginAdminAction } from "./actions";

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;
  const invalidCredentials = params?.error === "1";
  const protectionEnabled = isAdminProtectionEnabled();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-4 py-10 md:px-8">
        <div className="grid w-full gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Karyra Admin Access
            </p>
            <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              Masuk ke Admin Console.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              Halaman admin dipakai untuk mengelola course, submission, learner readiness, proof archive, workshop, dan status produk. Public learner flow tetap terbuka.
            </p>

            <div className="mt-6 rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
                Security note
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Guard ini adalah hardening MVP berbasis cookie httpOnly. Ini bukan full production auth, tetapi sudah lebih aman daripada admin route terbuka.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 md:p-7">
            {protectionEnabled ? (
              <form action={loginAdminAction} className="grid gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                    Admin Login
                  </p>
                  <h2 className="mt-2 text-2xl font-black">Protected Console</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Gunakan credential dari environment variable server.
                  </p>
                </div>

                {invalidCredentials ? (
                  <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm font-bold text-rose-200">
                    Username atau password salah.
                  </div>
                ) : null}

                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-300">Username</span>
                  <input
                    name="username"
                    type="text"
                    defaultValue={getPublicAdminUsernameHint()}
                    autoComplete="username"
                    className="min-h-12 rounded-2xl border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-emerald-400/50"
                    required
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-300">Password</span>
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="min-h-12 rounded-2xl border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-emerald-400/50"
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="min-h-12 rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                >
                  Masuk Admin
                </button>
              </form>
            ) : (
              <div className="grid gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">
                    Admin guard belum aktif
                  </p>
                  <h2 className="mt-2 text-2xl font-black">Development Mode</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Set `KARYRA_ADMIN_PASSWORD` di server untuk mengaktifkan admin login.
                  </p>
                </div>

                <Link
                  href="/admin"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                >
                  Buka Admin Console
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
