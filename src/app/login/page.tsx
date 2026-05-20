import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n-server";

const demoProfiles = [
  {
    href: "/learner",
    titleId: "Learner",
    titleEn: "Learner",
    noteId: "Masuk ke pengalaman belajar, quest, workshop, dan passport.",
    noteEn: "Enter learning, quests, workshops, and passport.",
    badge: "Public",
  },
  {
    href: "/admin",
    titleId: "Admin / Developer",
    titleEn: "Admin / Developer",
    noteId: "Area internal untuk mengelola course, review, proof archive, dan health.",
    noteEn: "Internal area for courses, reviews, proof archive, and health.",
    badge: "Internal",
  },
  {
    href: "/reviewer",
    titleId: "Reviewer Preview",
    titleEn: "Reviewer Preview",
    noteId: "Area evaluasi internal untuk grant/demo, tidak ditampilkan sebagai navigasi publik.",
    noteEn: "Internal evaluation area for grants/demo, not shown in public navigation.",
    badge: "Internal",
  },
];

export default async function LoginPage() {
  const language = await getServerLanguage();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-[82vh] w-full max-w-6xl flex-col justify-center gap-6 px-4 py-8 pb-24 md:px-8">
        <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 md:p-7">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-400 text-2xl font-black text-slate-950">
              K
            </div>
            <h1 className="mt-5 text-2xl font-black md:text-3xl">
              {language === "id" ? "Masuk ke Karyra" : "Enter Karyra"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {language === "id"
                ? "Pilih profil demo. Versi produksi nanti akan memakai akun, autentikasi, dan permission sungguhan."
                : "Choose a demo profile. Production will use real accounts, authentication, and permissions."}
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            {demoProfiles.map((profile) => (
              <Link
                key={profile.href}
                href={profile.href}
                className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-bold text-white">
                      {language === "id" ? profile.titleId : profile.titleEn}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {language === "id" ? profile.noteId : profile.noteEn}
                    </p>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
                    {profile.badge}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-5 text-slate-400">
            {language === "id"
              ? "Catatan: Learner adalah pengalaman publik utama. Admin dan reviewer adalah alat internal untuk pengembangan, demo, dan evaluasi."
              : "Note: Learner is the main public experience. Admin and reviewer are internal tools for development, demo, and evaluation."}
          </div>
        </div>
      </section>
    </main>
  );
}
