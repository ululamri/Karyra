import Link from "next/link";
import { AdminConsoleNav } from "../../components/admin-console-nav";
import { getServerLanguage } from "../../lib/i18n-server";

export default async function AdminConsoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getServerLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
              Karyra Admin Console
            </p>
            <h1 className="mt-1 text-xl font-black tracking-tight md:text-2xl">
              {language === "id" ? "Pusat kendali konten, learner, proof, dan komunitas." : "Control center for content, learners, proofs, and community."}
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/status"
              className="inline-flex min-h-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Status
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex min-h-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Roadmap
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-10 items-center justify-center rounded-2xl bg-emerald-400 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              {language === "id" ? "Lihat App" : "View App"}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 pb-24 md:px-8 md:py-8 lg:grid-cols-[292px_1fr]">
        <aside className="h-fit lg:sticky lg:top-6">
          <AdminConsoleNav language={language} />
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
