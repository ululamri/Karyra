import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";
import { SubmitButton } from "@/components/submit-button";
import {
  cancelWorkshopRegistrationAction,
  registerWorkshopAction,
} from "@/app/actions/learner";

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
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Proof-of-Participation
            </p>

            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              {language === "id"
                ? "Web3 readiness juga dibangun lewat komunitas."
                : "Web3 readiness is also built through community."}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              {language === "id"
                ? "Workshop Karyra menghubungkan pembelajaran digital dengan aktivitas lokal: diskusi, onboarding, praktik aman, dan partisipasi yang bisa dibuktikan."
                : "Karyra workshops connect digital learning with local activity: discussion, onboarding, safer practice, and provable participation."}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                {language === "id" ? "Mulai dari Course" : "Start with Courses"}
              </Link>
              <Link
                href="/passport"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                Passport
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Workshops</p>
              <p className="mt-1 text-2xl font-black">{workshops.length}</p>
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

        <section className="grid gap-4">
          {workshops.length > 0 ? (
            workshops.map((workshop) => {
              const registeredCount = workshop.registrations.length;
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
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
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
                      </div>

                      <h2 className="mt-4 text-2xl font-black">{workshop.title}</h2>

                      {workshop.description ? (
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                          {workshop.description}
                        </p>
                      ) : null}

                      <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
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

                      <p className="mt-3 text-xs leading-5 text-slate-500">
                        {language === "id"
                          ? "Registrasi menjadi sinyal partisipasi. Attendance dapat berubah menjadi Proof-of-Participation."
                          : "Registration is a participation signal. Attendance can become Proof-of-Participation."}
                      </p>

                      <div className="mt-5">
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
                              {language === "id" ? "Batalkan" : "Cancel"}
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
                                  ? "Daftar"
                                  : "Register"}
                            </SubmitButton>
                          </form>
                        )}
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
                {language === "id" ? "Kembali ke learner" : "Back to learner"} →
              </Link>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
