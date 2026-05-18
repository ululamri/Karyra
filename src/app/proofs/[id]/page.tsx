import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function proofTypeLabel(type: string) {
  switch (type) {
    case "LEARNING":
      return "Proof-of-Learning";
    case "PARTICIPATION":
      return "Proof-of-Participation";
    case "READINESS":
      return "Proof-of-Readiness";
    default:
      return type;
  }
}

function getProofDescription(type: string) {
  switch (type) {
    case "LEARNING":
      return "Bukti bahwa learner telah menyelesaikan aktivitas pembelajaran di Karyra.";
    case "PARTICIPATION":
      return "Bukti partisipasi learner dalam aktivitas komunitas atau workshop lokal.";
    case "READINESS":
      return "Bukti kesiapan learner setelah menyelesaikan quest atau aktivitas verifikasi.";
    default:
      return "Bukti aktivitas learner di dalam ekosistem Karyra.";
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

export default async function ProofDetailPage({ params }: PageProps) {
  const { id } = await params;

  const proof = await prisma.proofRecord.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          displayName: true,
          city: true,
          readinessProfile: true,
        },
      },
      readinessProfile: true,
    },
  });

  if (!proof) {
    notFound();
  }

  const archiveStatus = proof.archivedToFilecoin
    ? "Archived to Filecoin demo layer"
    : "Not archived yet";

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-400">
              Karyra Proof Verification
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              {proof.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
              {getProofDescription(proof.type)}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/passport"
              className="rounded-2xl border border-zinc-800 px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-emerald-500 hover:text-emerald-300"
            >
              Back to Passport
            </Link>

            <Link
              href="/admin/proofs"
              className="rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
            >
              Admin Proofs
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 md:p-6">
            <p className="text-sm text-zinc-400">Proof Type</p>
            <p className="mt-2 text-2xl font-bold text-emerald-300">
              {proofTypeLabel(proof.type)}
            </p>

            {proof.description ? (
              <p className="mt-4 leading-7 text-zinc-300">
                {proof.description}
              </p>
            ) : null}

            <div className="mt-6 grid gap-3 rounded-2xl bg-zinc-950/60 p-4">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-zinc-500">Proof ID</span>
                <span className="max-w-[220px] truncate text-zinc-300 md:max-w-none">
                  {proof.id}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-zinc-500">Source</span>
                <span className="text-zinc-300">{proof.source ?? "manual"}</span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-zinc-500">Source ID</span>
                <span className="max-w-[220px] truncate text-zinc-300 md:max-w-none">
                  {proof.sourceId ?? "-"}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-zinc-500">XP Value</span>
                <span className="font-semibold text-zinc-100">
                  {proof.xpValue} XP
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-zinc-500">Issued At</span>
                <span className="text-zinc-300">{formatDate(proof.issuedAt)}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 md:p-6">
              <p className="text-sm text-zinc-400">Learner</p>
              <h2 className="mt-2 text-2xl font-bold">
                {proof.user.displayName}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                @{proof.user.username}
                {proof.user.city ? ` · ${proof.user.city}` : ""}
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 md:p-6">
              <p className="text-sm text-zinc-400">Readiness Snapshot</p>
              <p className="mt-2 text-2xl font-bold text-emerald-300">
                {proof.readinessProfile?.readinessScore ??
                  proof.user.readinessProfile?.readinessScore ??
                  0}
                /100
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Level:{" "}
                {proof.readinessProfile?.level ??
                  proof.user.readinessProfile?.level ??
                  "BEGINNER"}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-400">
                Filecoin Archive Status
              </p>
              <h2 className="mt-2 text-2xl font-bold">{archiveStatus}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                Untuk MVP, CID ini masih demo placeholder. Pada integrasi
                berikutnya, data proof dapat dipaketkan menjadi archive manifest
                dan disimpan melalui Filecoin/IPFS flow asli.
              </p>
            </div>

            <span
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                proof.archivedToFilecoin
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-300"
              }`}
            >
              {proof.archivedToFilecoin ? "Archived" : "Pending"}
            </span>
          </div>

          <div className="mt-6 rounded-2xl bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Filecoin CID
            </p>
            <p className="mt-2 break-all font-mono text-sm text-zinc-300">
              {proof.filecoinCid ?? "Not archived yet"}
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}