import Link from "next/link";
import { getOrCreateDemoLearner, getReadinessPassport } from "@/lib/readiness";
import { PageShell } from "@/components/ui/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { MetricCard } from "@/components/ui/compact-card";
import { ModePill } from "@/components/ui/mode-pill";

function formatLevel(level?: string) {
  if (!level) return "Beginner";
  return level.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

function getLevelDescription(level?: string) {
  switch (level) {
    case "COMMUNITY_READY": return "Siap menjadi peserta aktif komunitas, mengikuti workshop lanjutan, dan membantu onboarding pengguna baru.";
    case "READY": return "Sudah punya fondasi kuat untuk masuk ke praktik Web3 yang lebih serius dan aman.";
    case "LEARNING": return "Sedang membangun pemahaman dasar Web3 melalui pembelajaran, quest, dan partisipasi.";
    default: return "Baru memulai perjalanan kesiapan Web3 dengan pendekatan non-teknikal terlebih dahulu.";
  }
}

function proofTypeLabel(type: string) {
  switch (type) {
    case "LEARNING": return "Proof-of-Learning";
    case "PARTICIPATION": return "Proof-of-Participation";
    case "READINESS": return "Proof-of-Readiness";
    default: return type;
  }
}

export default async function PassportPage() {
  const learner = await getOrCreateDemoLearner();
  const passport = await getReadinessPassport(learner.id);
  const profile = passport.readinessProfile;
  const readinessScore = profile?.readinessScore ?? 0;
  const readinessLevel = profile?.level ?? "BEGINNER";

  return (
    <PageShell>
      <PageHero
        eyebrow="Karyra Readiness Passport"
        title="Bukti kesiapan Web3 untuk komunitas lokal."
        description="Passport ini merangkum Proof-of-Learning, Proof-of-Participation, dan Proof-of-Readiness. Untuk MVP, semua bukti masih tersimpan offchain di PostgreSQL dan dapat diarsipkan sebagai demo Filecoin proof archive."
        actions={[{ href: "/passport/timeline", label: "Timeline", variant: "primary" }, { href: "/passport/share", label: "Share Summary" }, { href: "/dashboard", label: "Dashboard", variant: "ghost" }]}
      >
        <ModePill mode="Learner" label="Learner Identity" />
      </PageHero>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-400">Learner</p>
              <h2 className="mt-1 text-2xl font-bold">{passport.displayName}</h2>
              <p className="mt-1 text-sm text-slate-500">@{passport.username}{passport.city ? ` · ${passport.city}` : ""}</p>
            </div>
            <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4 md:text-right">
              <p className="text-sm text-emerald-300">Readiness Level</p>
              <p className="mt-1 text-xl font-bold text-emerald-200">{formatLevel(readinessLevel)}</p>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between text-sm"><span className="text-slate-400">Readiness Score</span><span className="font-bold">{readinessScore}/100</span></div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${readinessScore}%` }} /></div>
            <p className="mt-3 text-sm leading-6 text-slate-400">{getLevelDescription(readinessLevel)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <MetricCard label="Total XP" value={profile?.totalXp ?? 0} />
          <MetricCard label="Courses" value={profile?.completedCourses ?? 0} />
          <MetricCard label="Quests" value={profile?.approvedQuests ?? 0} />
          <MetricCard label="Workshops" value={profile?.workshopsJoined ?? 0} />
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:p-5">
        <div className="flex items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Readiness Badges</p><h2 className="mt-1 text-xl font-bold md:text-2xl">Identitas kesiapan learner</h2></div><p className="text-sm text-slate-500">{passport.badges.length} badge</p></div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">{passport.badges.length === 0 ? <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400 md:col-span-2">Belum ada badge.</div> : passport.badges.map((userBadge) => <article key={userBadge.id} className="flex gap-3 rounded-2xl bg-slate-950/50 p-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10">🏅</div><div><h3 className="text-sm font-bold">{userBadge.badge.name}</h3>{userBadge.badge.description ? <p className="mt-1 text-xs leading-5 text-slate-400">{userBadge.badge.description}</p> : null}<p className="mt-1 text-[11px] text-slate-500">Awarded {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(userBadge.awardedAt)}</p></div></article>)}</div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:p-5">
        <div className="flex items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Proof Records</p><h2 className="mt-1 text-xl font-bold md:text-2xl">Catatan bukti pembelajaran</h2></div><p className="text-sm text-slate-500">{passport.proofRecords.length} record</p></div>
        <div className="mt-4 grid gap-3">{passport.proofRecords.length === 0 ? <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">Belum ada proof record.</div> : passport.proofRecords.map((proof) => <article key={proof.id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-3"><div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><p className="text-xs font-bold text-emerald-300">{proofTypeLabel(proof.type)}</p><h3 className="mt-1 text-sm font-bold md:text-base">{proof.title}</h3>{proof.description ? <p className="mt-1 text-xs leading-5 text-slate-400 md:text-sm md:leading-6">{proof.description}</p> : null}</div><div className="shrink-0 text-xs text-slate-500 md:text-right"><p><strong className="text-slate-300">{proof.xpValue}</strong> XP</p><p className="mt-1">{new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(proof.issuedAt)}</p></div></div><div className="mt-3 flex flex-wrap gap-2"><span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">Source: {proof.source ?? "manual"}</span><span className="max-w-full truncate rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">Filecoin: {proof.archivedToFilecoin ? proof.filecoinCid ?? "archived" : "not archived yet"}</span><Link href={`/proofs/${proof.id}`} className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">View Proof</Link></div></article>)}</div>
      </section>
    </PageShell>
  );
}
