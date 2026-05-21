import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";
import { SubmitButton } from "@/components/submit-button";
import {
  cancelWorkshopRegistrationAction,
  registerWorkshopAction,
} from "@/app/actions/learner";

const participationFlow = [
  {
    title: "Belajar",
    text: "Peserta datang dengan fondasi dari kursus dan pelajaran Karyra.",
  },
  {
    title: "Berdiskusi",
    text: "Workshop membuka ruang tanya jawab dengan bahasa lokal dan contoh sehari-hari.",
  },
  {
    title: "Latihan",
    text: "Peserta mencoba refleksi, checklist, atau quest pendek tanpa tekanan transaksi nyata.",
  },
  {
    title: "Terbukti",
    text: "Kehadiran dan aktivitas bisa menjadi Bukti Partisipasi di Paspor Kesiapan.",
  },
];

export default async function WorkshopsPage() {
  const language = await getServerLanguage();

  const learner = await prisma.user.findUnique({
    where: { username: "demo" },
    select: { id: true },
  });

  const workshops = await prisma.workshop.findMany({
    where: { status: { in: ["OPEN", "COMPLETED"] } },
    orderBy: { startsAt: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      city: true,
      location: true,
      capacity: true,
      status: true,
      startsAt: true,
      registrations: {
        where: { status: { in: ["REGISTERED", "ATTENDED"] } },
        select: { id: true, userId: true, status: true },
      },
    },
  });

  const openWorkshops = workshops.filter((workshop) => workshop.status === "OPEN").length;

  const totalRegistrations = workshops.reduce(
    (total, workshop) => total + workshop.registrations.length,
    0,
  );

  const attendedCount = workshops.reduce(
    (total, workshop) =>
      total +
      workshop.registrations.filter(
        (registration) => registration.status === "ATTENDED",
      ).length,
    0,
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.08fr_0.78fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              Proof-of-Participation
            </p>

            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              {language === "id"
                ? "Belajar blockchain tidak harus sendirian."
                : "Blockchain learning does not have to be lonely."}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              {language === "id"
                ? "Workshop Karyra menjadi jembatan antara belajar online dan komunitas lokal: diskusi, onboarding, latihan aman, refleksi, dan bukti partisipasi yang bisa masuk ke Paspor Kesiapan."
                : "Karyra workshops bridge online learning and local community: discussion, onboarding, safer practice, reflection, and participation proof that can enter the Readiness Passport."}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/workshop-kit"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                {language === "id" ? "Lihat Alur Workshop" : "View Workshop Flow"}
              </Link>
              <Link
                href="/quests"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                {language === "id" ? "Latihan Setelah Workshop" : "Post-Workshop Practice"}
              </Link>
              <Link
                href="/passport"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 px-6 py-3 text-sm font-bold text-sky-200 transition hover:border-sky-400/40"
              >
                Passport
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Total</p>
              <p className="mt-1 text-2xl font-black">{workshops.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Open</p>
              <p className="mt-1 text-2xl font-black">{openWorkshops}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Registered</p>
              <p className="mt-1 text-2xl font-black">{totalRegistrations}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Attended</p>
              <p className="mt-1 text-2xl font-black">{attendedCount}</p>
            </div>
          </div>
        </header>

        <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                Community Journey
              </p>
              <h2 className="mt-2 text-2xl font-black">
                {language === "id"
                  ? "Dari belajar online ke partisipasi lokal."
                  : "From online learning to local participation."}
              </h2>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              {participationFlow.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <p className="text-xs font-black text-emerald-300">
                    0{index + 1}
                  </p>
                  <h3 className="mt-2 text-sm font-black">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          {workshops.length > 0 ? (
            workshops.map((workshop) => {
              const registeredCount = workshop.registrations.length;
              const attendedForWorkshop = workshop.registrations.filter(
                (registration) => registration.status === "ATTENDED",
              ).length;
              const isRegistered = Boolean(
                learner &&
                  workshop.registrations.some(
                    (registration) => registration.userId === learner.id,
                  ),
              );

              const isFull =
                typeof workshop.capacity === "number" &&
                registeredCount >= workshop.capacity;

              const capacityPct =
                typeof workshop.capacity === "number" && workshop.capacity > 0
                  ? Math.min(
                      100,
                      Math.round((registeredCount / workshop.capacity) * 100),
                    )
                  : 0;

              return (
                <article
                  key={workshop.id}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
                >
                  <div className="grid gap-5 lg:grid-cols-[1fr_0.38fr]">
                    <div>
                      <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-wide">
                        <span
                          className={`rounded-full px-3 py-1 ${
                            workshop.status === "OPEN"
                              ? "bg-emerald-400/10 text-emerald-300"
                              : "bg-white/10 text-slate-300"
                          }`}
                        >
                          {workshop.status}
                        </span>
                        {workshop.city ? (
                          <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                            {workshop.city}
                          </span>
                        ) : null}
                        <span className="rounded-full bg-sky-400/10 px-3 py-1 text-sky-300">
                          Participation Proof
                        </span>
                        <span className="rounded-full bg-amber-400/10 px-3 py-1 text-amber-300">
                          Reflection Quest Ready
                        </span>
                      </div>

                      <h2 className="mt-4 text-2xl font-black">{workshop.title}</h2>

                      {workshop.description ? (
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                          {workshop.description}
                        </p>
                      ) : null}

                      <div className="mt-5 grid gap-3 text-sm md:grid-cols-3">
                        <div className="rounded-2xl bg-slate-950/60 p-4">
                          <p className="text-xs text-slate-500">
                            {language === "id" ? "Tanggal" : "Date"}
                          </p>
                          <p className="mt-1 font-bold">
                            {new Intl.DateTimeFormat("id-ID", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            }).format(workshop.startsAt)}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-950/60 p-4">
                          <p className="text-xs text-slate-500">
                            {language === "id" ? "Lokasi" : "Location"}
                          </p>
                          <p className="mt-1 font-bold">
                            {workshop.location ?? "Community venue"}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-950/60 p-4">
                          <p className="text-xs text-slate-500">
                            {language === "id" ? "Hasil" : "Outcome"}
                          </p>
                          <p className="mt-1 font-bold">
                            {language === "id"
                              ? "Bukti Partisipasi"
                              : "Participation Proof"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                        <p className="text-xs font-black uppercase tracking-wide text-sky-300">
                          {language === "id" ? "Setelah workshop" : "After workshop"}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {language === "id"
                            ? "Peserta dapat menulis refleksi singkat sebagai quest pendukung. Setelah direview, aktivitas ini bisa memperkuat Bukti Partisipasi di Paspor."
                            : "Participants can write a short reflection as supporting practice. After review, it can strengthen Participation Proof in the Passport."}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-3xl bg-slate-950/60 p-5">
                      <p className="text-sm text-slate-400">Capacity</p>
                      <p className="mt-1 text-3xl font-black">
                        {registeredCount}
                        {typeof workshop.capacity === "number"
                          ? ` / ${workshop.capacity}`
                          : ""}
                      </p>

                      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-emerald-400"
                          style={{ width: `${capacityPct}%` }}
                        />
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded-2xl bg-white/5 p-3">
                          <p className="text-slate-500">Registered</p>
                          <p className="mt-1 text-lg font-black">{registeredCount}</p>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-3">
                          <p className="text-slate-500">Attended</p>
                          <p className="mt-1 text-lg font-black">{attendedForWorkshop}</p>
                        </div>
                      </div>

                      <p className="mt-3 text-xs leading-5 text-slate-500">
                        {language === "id"
                          ? "Registrasi adalah sinyal awal. Kehadiran dan refleksi bisa menjadi Proof-of-Participation."
                          : "Registration is an early signal. Attendance and reflection can become Proof-of-Participation."}
                      </p>

                      <div className="mt-5 grid gap-3">
                        {isRegistered ? (
                          <form action={cancelWorkshopRegistrationAction}>
                            <input
                              type="hidden"
                              name="workshopSlug"
                              value={workshop.slug}
                            />
                            <SubmitButton
                              variant="secondary"
                              pendingText="Cancelling..."
                            >
                              {language === "id" ? "Batalkan Registrasi" : "Cancel Registration"}
                            </SubmitButton>
                          </form>
                        ) : (
                          <form action={registerWorkshopAction}>
                            <input
                              type="hidden"
                              name="workshopSlug"
                              value={workshop.slug}
                            />
                            <SubmitButton
                              pendingText="Registering..."
                              className={isFull ? "opacity-60" : ""}
                            >
                              {isFull
                                ? language === "id"
                                  ? "Penuh"
                                  : "Full"
                                : language === "id"
                                  ? "Daftar Workshop"
                                  : "Register"}
                            </SubmitButton>
                          </form>
                        )}

                        <Link
                          href="/quests"
                          className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black text-white transition hover:border-emerald-400/40"
                        >
                          {language === "id" ? "Buka Latihan Refleksi" : "Open Reflection Practice"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-300">
              {language === "id"
                ? "Belum ada workshop yang dibuka."
                : "No workshops are open yet."}
              <Link href="/learner" className="ml-2 font-bold text-emerald-300">
                {language === "id" ? "Kembali ke ruang belajar" : "Back to learner"} →
              </Link>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
