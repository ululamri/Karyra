import Link from "next/link";
import { SubmitButton } from "../../../../components/submit-button";
import { getServerLanguage } from "../../../../lib/i18n-server";
import { createWorkshopAction } from "../../../actions/admin";

export default async function NewWorkshopPage() {
  const language = await getServerLanguage();

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
        <Link href="/admin/workshops" className="text-sm text-emerald-300">
          ← {language === "id" ? "Kelola Workshop" : "Manage Workshops"}
        </Link>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
          Community Builder
        </p>

        <h2 className="mt-4 text-3xl font-bold md:text-5xl">
          {language === "id" ? "Buat Workshop Baru" : "Create New Workshop"}
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          {language === "id"
            ? "Buat event workshop offline untuk onboarding komunitas lokal, kelas wallet, keamanan dasar, dan aktivitas quest komunitas."
            : "Create offline workshop events for local community onboarding, wallet classes, basic safety, and community quest activities."}
        </p>
      </section>

      <form
        action={createWorkshopAction}
        className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8"
      >
        <div className="grid gap-2">
          <label htmlFor="title" className="font-semibold">
            Workshop Title
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="Contoh: Workshop Pengenalan Wallet Web3"
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Jelaskan tujuan workshop ini..."
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="city" className="font-semibold">
              City
            </label>
            <input
              id="city"
              name="city"
              placeholder="Contoh: Jakarta / Bandung / Indonesia"
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="location" className="font-semibold">
              Location
            </label>
            <input
              id="location"
              name="location"
              placeholder="Contoh: Community Space / Balai Desa"
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="startsAt" className="font-semibold">
              Starts At
            </label>
            <input
              id="startsAt"
              name="startsAt"
              type="datetime-local"
              required
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="endsAt" className="font-semibold">
              Ends At
            </label>
            <input
              id="endsAt"
              name="endsAt"
              type="datetime-local"
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="capacity" className="font-semibold">
              Capacity
            </label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              min="1"
              placeholder="30"
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="status" className="font-semibold">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue="DRAFT"
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none"
            >
              <option value="DRAFT">DRAFT</option>
              <option value="OPEN">OPEN</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <SubmitButton pendingText="Creating workshop...">
            Create Workshop
          </SubmitButton>

          <Link
            href="/admin/workshops"
            className="rounded-2xl border border-white/15 px-6 py-4 text-center font-bold text-white"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}