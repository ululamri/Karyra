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

  const totalRegistrations = workshops.reduce((total, workshop) => total + workshop.registrations.length, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.1fr_0.75fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Proof-of-Participation</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-6xl">
              {language === "id" ? "Workshop lokal sebagai bukti partisipasi." : "Local workshops as participation proof."}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              {language === "id"
                ? "Karyra menghubungkan pembelajaran digital dengan aktivitas komunitas offline agar kesiapan Web3 tidak hanya terjadi di layar."
                : "Karyra connects digital learning with offline community activities so Web3 readiness does not only happen on screen."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Workshops</p>
              <p className="mt-1 text-2xl font-black">{workshops.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Registrations</p>
              <p className="mt-1 text-2xl font-black">{totalRegistrations}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-4">
          {workshops.length > 0 ? workshops.map((workshop) => {
            const registeredCount = workshop.registrations.length;
            const isRegistered = Boolean(learner && workshop.registrations.some((registration) => registration.userId === learner.id));
            const isFull = typeof workshop.capacity === "number" && registeredCount >= workshop.capacity;

            return (
              <article key={workshop.id} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
                <div className="grid gap-5 lg:grid-cols-[1fr_0.38fr]">
                  <div>
                    <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-wide">
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">{workshop.status}</span>
                      {workshop.city ? <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">{workshop.city}</span> : null}
                    </div>
                    <h2 className="mt-4 text-2xl font-black">{workshop.title}</h2>
                    {workshop.description ? <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{workshop.description}</p> : null}
                    <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
                      <div className="rounded-2xl bg-slate-950/60 p-4">
                        <p className="text-xs text-slate-500">{language === "id" ? "Tanggal" : "Date"}</p>
                        <p className="mt-1 font-bold">{new Date(workshop.startsAt).toLocaleString()}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-950/60 p-4">
                        <p className="text-xs text-slate-500">{language === "id" ? "Lokasi" : "Location"}</p>
                        <p className="mt-1 font-bold">{workshop.location ?? "Community venue"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-slate-950/60 p-5">
                    <p className="text-sm text-slate-400">Capacity</p>
                    <p className="mt-1 text-3xl font-black">{registeredCount}{typeof workshop.capacity === "number" ? ` / ${workshop.capacity}` : ""}</p>
                    <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full rounded-full bg-emerald-400" style={{ width: typeof workshop.capacity === "number" && workshop.capacity > 0 ? `${Math.min(100, Math.round((registeredCount / workshop.capacity) * 100))}%` : "0%" }} />
                    </div>
                    <div className="mt-5">
                      {isRegistered ? (
                        <form action={cancelWorkshopRegistrationAction}>
                          <input type="hidden" name="workshopSlug" value={workshop.slug} />
                          <SubmitButton variant="secondary" pendingText="Cancelling...">Cancel</SubmitButton>
                        </form>
                      ) : (
                        <form action={registerWorkshopAction}>
                          <input type="hidden" name="workshopSlug" value={workshop.slug} />
                          <SubmitButton pendingText="Registering..." className={isFull ? "opacity-60" : ""}>{isFull ? "Full" : "Register"}</SubmitButton>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          }) : (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-300">
              {language === "id" ? "Belum ada workshop yang dibuka." : "No workshops are open yet."}
              <Link href="/learner" className="ml-2 font-bold text-emerald-300">Back to learner →</Link>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
