import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { getServerLanguage } from "../../../lib/i18n-server";
import { SubmitButton } from "../../../components/submit-button";
import {
  cancelWorkshopAction,
  closeWorkshopAction,
  completeWorkshopAction,
  openWorkshopAction,
} from "../../actions/admin";

export default async function AdminWorkshopsPage() {
  const language = await getServerLanguage();

  const [totalWorkshops, openWorkshops, completedWorkshops, registrations, workshops] =
    await Promise.all([
      prisma.workshop.count(),
      prisma.workshop.count({
        where: {
          status: "OPEN",
        },
      }),
      prisma.workshop.count({
        where: {
          status: "COMPLETED",
        },
      }),
      prisma.workshopRegistration.count(),
      prisma.workshop.findMany({
        orderBy: {
          startsAt: "desc",
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
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              status: true,
              user: {
                select: {
                  username: true,
                  displayName: true,
                },
              },
            },
          },
        },
      }),
    ]);

  const stats = [
    {
      label: language === "id" ? "Total Workshop" : "Total Workshops",
      value: totalWorkshops,
    },
    {
      label: language === "id" ? "Open" : "Open",
      value: openWorkshops,
    },
    {
      label: language === "id" ? "Completed" : "Completed",
      value: completedWorkshops,
    },
    {
      label: language === "id" ? "Registrasi" : "Registrations",
      value: registrations,
    },
  ];

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Community Management
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              {language === "id" ? "Kelola Workshop" : "Manage Workshops"}
            </h2>

            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              {language === "id"
                ? "Kelola workshop offline, kapasitas peserta, status acara, dan registrasi learner."
                : "Manage offline workshops, participant capacity, event status, and learner registrations."}
            </p>
          </div>

          <Link
            href="/admin/workshops/new"
            className="rounded-2xl bg-emerald-400 px-6 py-4 text-center font-bold text-slate-950"
          >
            + Workshop
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl bg-white/5 p-6">
            <p className="text-4xl font-bold text-emerald-300">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {language === "id" ? "Daftar Workshop" : "Workshop List"}
            </h2>
            <p className="mt-2 text-slate-400">
              {language === "id"
                ? "Workshop OPEN akan tampil di halaman publik /workshops."
                : "OPEN workshops will appear on the public /workshops page."}
            </p>
          </div>

          <Link
            href="/workshops"
            className="rounded-2xl border border-white/15 px-5 py-3 text-center font-bold text-white"
          >
            Public View
          </Link>
        </div>

        <div className="mt-6 grid gap-5">
          {workshops.map((workshop) => {
            const activeRegistrations = workshop.registrations.filter(
              (registration) =>
                registration.status === "REGISTERED" ||
                registration.status === "ATTENDED",
            );

            const capacityText =
              typeof workshop.capacity === "number"
                ? `${activeRegistrations.length} / ${workshop.capacity}`
                : `${activeRegistrations.length}`;

            return (
              <article key={workshop.id} className="rounded-3xl bg-slate-900 p-5">
                <div className="grid gap-5 xl:grid-cols-[1fr_0.45fr]">
                  <div>
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                        {workshop.status}
                      </span>

                      {workshop.city ? (
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                          {workshop.city}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-4 text-xl font-bold md:text-2xl">
                      {workshop.title}
                    </h3>

                    {workshop.description ? (
                      <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                        {workshop.description}
                      </p>
                    ) : null}

                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                      <div className="rounded-2xl bg-slate-950 p-4">
                        <p className="text-sm text-slate-500">
                          {language === "id" ? "Tanggal" : "Date"}
                        </p>
                        <p className="mt-1 font-semibold">
                          {new Date(workshop.startsAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-950 p-4">
                        <p className="text-sm text-slate-500">
                          {language === "id" ? "Lokasi" : "Location"}
                        </p>
                        <p className="mt-1 font-semibold">
                          {workshop.location ?? "-"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-slate-950 p-4">
                      <p className="text-sm font-semibold text-slate-400">
                        {language === "id" ? "Registrasi Terbaru" : "Recent Registrations"}
                      </p>

                      <div className="mt-3 grid gap-2">
                        {workshop.registrations.length > 0 ? (
                          workshop.registrations.slice(0, 5).map((registration) => (
                            <div
                              key={registration.id}
                              className="flex flex-col justify-between gap-1 rounded-xl bg-white/5 px-3 py-2 text-sm md:flex-row"
                            >
                              <span>
                                {registration.user.displayName} (@
                                {registration.user.username})
                              </span>
                              <span className="font-semibold text-emerald-300">
                                {registration.status}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">
                            {language === "id"
                              ? "Belum ada registrasi."
                              : "No registrations yet."}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-slate-950 p-5">
                    <p className="text-sm text-slate-400">
                      {language === "id" ? "Kapasitas" : "Capacity"}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-emerald-300">
                      {capacityText}
                    </p>

                    <div className="mt-6 grid gap-3">
                      {workshop.status !== "OPEN" ? (
                        <form action={openWorkshopAction}>
                          <input
                            type="hidden"
                            name="workshopSlug"
                            value={workshop.slug}
                          />
                          <SubmitButton pendingText="Opening...">
                            Open
                          </SubmitButton>
                        </form>
                      ) : null}

                      {workshop.status === "OPEN" ? (
                        <form action={closeWorkshopAction}>
                          <input
                            type="hidden"
                            name="workshopSlug"
                            value={workshop.slug}
                          />
                          <SubmitButton
                            variant="secondary"
                            pendingText="Closing..."
                          >
                            Close
                          </SubmitButton>
                        </form>
                      ) : null}

                      {workshop.status !== "COMPLETED" ? (
                        <form action={completeWorkshopAction}>
                          <input
                            type="hidden"
                            name="workshopSlug"
                            value={workshop.slug}
                          />
                          <SubmitButton
                            variant="secondary"
                            pendingText="Completing..."
                          >
                            Complete
                          </SubmitButton>
                        </form>
                      ) : null}

                      {workshop.status !== "CANCELLED" ? (
                        <form action={cancelWorkshopAction}>
                          <input
                            type="hidden"
                            name="workshopSlug"
                            value={workshop.slug}
                          />
                          <SubmitButton
                            variant="secondary"
                            pendingText="Cancelling..."
                          >
                            Cancel
                          </SubmitButton>
                        </form>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}