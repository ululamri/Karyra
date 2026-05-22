import Link from "next/link";
import { MetricCard } from "@/components/ui/compact-card";
import { SubmitButton } from "../../../components/submit-button";
import { getServerLanguage } from "../../../lib/i18n-server";
import { prisma } from "../../../lib/prisma";
import {
  cancelWorkshopAction,
  closeWorkshopAction,
  completeWorkshopAction,
  openWorkshopAction,
} from "../../actions/admin";

function statusTone(status: string) {
  if (status === "OPEN") return "bg-emerald-400/10 text-emerald-300";
  if (status === "COMPLETED") return "bg-sky-400/10 text-sky-300";
  if (status === "CANCELLED") return "bg-rose-400/10 text-rose-300";
  return "bg-white/10 text-slate-300";
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminWorkshopsPage() {
  const language = await getServerLanguage();

  const [totalWorkshops, openWorkshops, completedWorkshops, cancelledWorkshops, registrations, workshops] =
    await Promise.all([
      prisma.workshop.count(),
      prisma.workshop.count({ where: { status: "OPEN" } }),
      prisma.workshop.count({ where: { status: "COMPLETED" } }),
      prisma.workshop.count({ where: { status: "CANCELLED" } }),
      prisma.workshopRegistration.count(),
      prisma.workshop.findMany({
        orderBy: { startsAt: "desc" },
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
            orderBy: { createdAt: "desc" },
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
    { label: language === "id" ? "Total Workshop" : "Total Workshops", value: totalWorkshops },
    { label: "Open", value: openWorkshops },
    { label: "Completed", value: completedWorkshops },
    { label: "Cancelled", value: cancelledWorkshops },
    { label: language === "id" ? "Registrasi" : "Registrations", value: registrations },
  ];

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
              Community Management
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              {language === "id" ? "Kelola Workshop" : "Manage Workshops"}
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              {language === "id"
                ? "Kelola workshop offline, kapasitas peserta, status acara, registrasi learner, dan bukti partisipasi komunitas."
                : "Manage offline workshops, participant capacity, event status, learner registrations, and community participation proof."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/workshops/new"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              + Workshop
            </Link>
            <Link
              href="/workshops"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-black text-white transition hover:border-emerald-400/40"
            >
              Public View
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <MetricCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Workshop Operations
            </p>
            <h2 className="mt-2 text-2xl font-black">
              {language === "id" ? "Daftar Workshop" : "Workshop List"}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              {language === "id"
                ? "Workshop OPEN akan tampil di halaman publik /workshops."
                : "OPEN workshops will appear on the public /workshops page."}
            </p>
          </div>
          <p className="text-sm text-slate-500">{workshops.length} workshop records</p>
        </div>

        <div className="mt-6 grid gap-5">
          {workshops.length > 0 ? workshops.map((workshop) => {
            const activeRegistrations = workshop.registrations.filter(
              (registration) =>
                registration.status === "REGISTERED" ||
                registration.status === "ATTENDED",
            );

            const capacityText =
              typeof workshop.capacity === "number"
                ? `${activeRegistrations.length} / ${workshop.capacity}`
                : `${activeRegistrations.length}`;

            const capacityPercent =
              typeof workshop.capacity === "number" && workshop.capacity > 0
                ? Math.min(100, Math.round((activeRegistrations.length / workshop.capacity) * 100))
                : 0;

            return (
              <article key={workshop.id} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
                  <div>
                    <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-wide">
                      <span className={`rounded-full px-3 py-1 ${statusTone(workshop.status)}`}>
                        {workshop.status}
                      </span>

                      {workshop.city ? (
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                          {workshop.city}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-4 text-xl font-black md:text-2xl">
                      {workshop.title}
                    </h3>

                    {workshop.description ? (
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                        {workshop.description}
                      </p>
                    ) : null}

                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                          {language === "id" ? "Tanggal" : "Date"}
                        </p>
                        <p className="mt-2 text-sm font-black text-slate-200">
                          {formatDate(workshop.startsAt)}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                          {language === "id" ? "Lokasi" : "Location"}
                        </p>
                        <p className="mt-2 text-sm font-black text-slate-200">
                          {workshop.location ?? "-"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950 p-4">
                      <p className="text-xs font-black uppercase tracking-wide text-slate-500">
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
                                {registration.user.displayName} (@{registration.user.username})
                              </span>
                              <span className="font-black text-emerald-300">
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

                  <div className="rounded-3xl border border-white/10 bg-slate-950 p-5">
                    <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                      {language === "id" ? "Kapasitas" : "Capacity"}
                    </p>

                    <p className="mt-2 text-3xl font-black text-emerald-300">
                      {capacityText}
                    </p>

                    {typeof workshop.capacity === "number" ? (
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-emerald-400"
                          style={{ width: `${capacityPercent}%` }}
                        />
                      </div>
                    ) : null}

                    <div className="mt-6 grid gap-3">
                      {workshop.status !== "OPEN" ? (
                        <form action={openWorkshopAction}>
                          <input type="hidden" name="workshopSlug" value={workshop.slug} />
                          <SubmitButton pendingText="Opening...">Open</SubmitButton>
                        </form>
                      ) : null}

                      {workshop.status === "OPEN" ? (
                        <form action={closeWorkshopAction}>
                          <input type="hidden" name="workshopSlug" value={workshop.slug} />
                          <SubmitButton variant="secondary" pendingText="Closing...">
                            Close
                          </SubmitButton>
                        </form>
                      ) : null}

                      {workshop.status !== "COMPLETED" ? (
                        <form action={completeWorkshopAction}>
                          <input type="hidden" name="workshopSlug" value={workshop.slug} />
                          <SubmitButton variant="secondary" pendingText="Completing...">
                            Complete
                          </SubmitButton>
                        </form>
                      ) : null}

                      {workshop.status !== "CANCELLED" ? (
                        <form action={cancelWorkshopAction}>
                          <input type="hidden" name="workshopSlug" value={workshop.slug} />
                          <SubmitButton variant="secondary" pendingText="Cancelling...">
                            Cancel
                          </SubmitButton>
                        </form>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          }) : (
            <div className="rounded-3xl border border-dashed border-white/10 p-6 text-sm text-slate-400">
              Belum ada workshop.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
