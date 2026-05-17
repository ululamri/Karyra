import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { getServerLanguage } from "../../lib/i18n-server";
import { t } from "../../lib/i18n";
import { SubmitButton } from "../../components/submit-button";
import {
  cancelWorkshopRegistrationAction,
  registerWorkshopAction,
} from "../actions/learner";

export default async function WorkshopsPage() {
  const language = await getServerLanguage();

  const learner = await prisma.user.findUnique({
    where: {
      username: "demo",
    },
    select: {
      id: true,
    },
  });

  const workshops = await prisma.workshop.findMany({
    where: {
      status: {
        in: ["OPEN", "COMPLETED"],
      },
    },
    orderBy: {
      startsAt: "asc",
    },
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
      endsAt: true,
      registrations: {
        where: {
          status: {
            in: ["REGISTERED", "ATTENDED"],
          },
        },
        select: {
          id: true,
          userId: true,
          status: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Community Onboarding
            </p>

            <h1 className="mt-4 text-3xl font-bold md:text-5xl">
              {t(language, "upcomingWorkshops")}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Workshop Karyra membantu pemula belajar Web3 secara langsung melalui komunitas lokal, pengenalan wallet, keamanan dasar, dan quest offline."
                : "Karyra workshops help beginners learn Web3 directly through local communities, wallet onboarding, basic safety, and offline quests."}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="rounded-2xl bg-emerald-400 px-6 py-4 text-center font-bold text-slate-950"
              >
                {t(language, "courses")}
              </Link>

              <Link
                href="/status"
                className="rounded-2xl border border-white/15 px-6 py-4 text-center font-bold text-white"
              >
                {t(language, "projectStatus")}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            <div className="rounded-3xl bg-white/5 p-6">
              <p className="text-sm text-slate-400">
                {language === "id" ? "Total Workshop" : "Total Workshops"}
              </p>
              <p className="mt-2 text-4xl font-bold text-emerald-300">
                {workshops.length}
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 p-6">
              <p className="text-sm text-slate-400">
                {language === "id" ? "Total Pendaftar" : "Total Registrations"}
              </p>
              <p className="mt-2 text-4xl font-bold">
                {workshops.reduce(
                  (total, workshop) => total + workshop.registrations.length,
                  0,
                )}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-10 grid gap-5">
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

              return (
                <article
                  key={workshop.id}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8"
                >
                  <div className="grid gap-6 lg:grid-cols-[1fr_0.45fr]">
                    <div>
                      <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                          {workshop.status}
                        </span>
                        {workshop.city ? (
                          <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                            {workshop.city}
                          </span>
                        ) : null}
                      </div>

                      <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                        {workshop.title}
                      </h2>

                      {workshop.description ? (
                        <p className="mt-3 max-w-3xl leading-8 text-slate-300">
                          {workshop.description}
                        </p>
                      ) : null}

                      <div className="mt-5 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
                        <div className="rounded-2xl bg-slate-900 p-4">
                          <p className="text-slate-500">
                            {language === "id" ? "Tanggal" : "Date"}
                          </p>
                          <p className="mt-1 font-semibold">
                            {new Date(workshop.startsAt).toLocaleString()}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-900 p-4">
                          <p className="text-slate-500">
                            {language === "id" ? "Lokasi" : "Location"}
                          </p>
                          <p className="mt-1 font-semibold">
                            {workshop.location ?? "-"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl bg-slate-900 p-5">
                      <p className="text-sm text-slate-400">
                        {language === "id" ? "Kapasitas" : "Capacity"}
                      </p>

                      <p className="mt-2 text-3xl font-bold">
                        {registeredCount}
                        {typeof workshop.capacity === "number"
                          ? ` / ${workshop.capacity}`
                          : ""}
                      </p>

                      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-emerald-400"
                          style={{
                            width:
                              typeof workshop.capacity === "number" &&
                              workshop.capacity > 0
                                ? `${Math.min(
                                    100,
                                    Math.round(
                                      (registeredCount / workshop.capacity) *
                                        100,
                                    ),
                                  )}%`
                                : "0%",
                          }}
                        />
                      </div>

                      <div className="mt-6 grid gap-3">
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
                              {t(language, "cancelRegistration")}
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
                                : t(language, "registerWorkshop")}
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
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <p className="text-slate-300">
                {language === "id"
                  ? "Belum ada workshop yang dibuka."
                  : "No workshops are open yet."}
              </p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}