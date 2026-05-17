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
    <div className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Super Admin Demo
              </p>
              <h1 className="mt-2 text-2xl font-bold md:text-4xl">
                Karyra Admin Console
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
                {language === "id"
                  ? "Satu panel untuk mengelola course, lesson, quest, submission, workshop, reward, dan transparency layer Karyra."
                  : "One console to manage courses, lessons, quests, submissions, workshops, rewards, and Karyra transparency layer."}
              </p>
            </div>

            <Link
              href="/"
              className="rounded-2xl border border-white/15 px-5 py-3 text-center font-bold text-white"
            >
              {language === "id" ? "Lihat App" : "View App"}
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit lg:sticky lg:top-28">
            <AdminConsoleNav language={language} />
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}