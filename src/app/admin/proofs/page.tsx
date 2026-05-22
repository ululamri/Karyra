import Link from "next/link";
import { revalidatePath } from "next/cache";
import { MetricCard } from "@/components/ui/compact-card";
import { prisma } from "@/lib/prisma";
import {
  buildArchivedProofMetadata,
  buildProofArchiveManifest,
  generateDemoFilecoinCid,
  getArchiveManifestFromMetadata,
} from "@/lib/filecoin-manifest";

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

function getProofBadge(type: string) {
  switch (type) {
    case "LEARNING":
      return "border-sky-400/30 bg-sky-400/10 text-sky-300";
    case "PARTICIPATION":
      return "border-violet-400/30 bg-violet-400/10 text-violet-300";
    case "READINESS":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    default:
      return "border-white/10 bg-white/5 text-slate-300";
  }
}

async function archiveProof(formData: FormData) {
  "use server";

  const proofId = formData.get("proofId");

  if (!proofId || typeof proofId !== "string") {
    throw new Error("proofId is required.");
  }

  const proof = await prisma.proofRecord.findUnique({
    where: {
      id: proofId,
    },
    include: {
      user: {
        select: {
          id: true,
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
    throw new Error("Proof record not found.");
  }

  const existingManifest = getArchiveManifestFromMetadata(proof.metadata);

  if (!proof.archivedToFilecoin || !proof.filecoinCid || !existingManifest) {
    const manifest = buildProofArchiveManifest(proof);
    const filecoinCid =
      proof.filecoinCid ?? generateDemoFilecoinCid(proof.id, manifest.checksum.digest);

    await prisma.proofRecord.update({
      where: {
        id: proof.id,
      },
      data: {
        archivedToFilecoin: true,
        filecoinCid,
        metadata: buildArchivedProofMetadata({
          existingMetadata: proof.metadata,
          manifest,
          cid: filecoinCid,
        }),
      },
    });
  }

  revalidatePath("/admin/proofs");
  revalidatePath("/passport");
  revalidatePath("/passport/timeline");
  revalidatePath("/admin/learners");
  revalidatePath(`/proofs/${proof.id}`);
}

export default async function AdminProofsPage() {
  const proofRecords = await prisma.proofRecord.findMany({
    orderBy: {
      issuedAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          displayName: true,
          city: true,
          readinessProfile: true,
        },
      },
      readinessProfile: true,
    },
  });

  const totalProofs = proofRecords.length;
  const archivedProofs = proofRecords.filter((proof) => proof.archivedToFilecoin).length;
  const pendingProofs = totalProofs - archivedProofs;
  const manifestProofs = proofRecords.filter((proof) =>
    getArchiveManifestFromMetadata(proof.metadata),
  ).length;
  const learningProofs = proofRecords.filter((proof) => proof.type === "LEARNING").length;
  const participationProofs = proofRecords.filter(
    (proof) => proof.type === "PARTICIPATION",
  ).length;
  const readinessProofs = proofRecords.filter((proof) => proof.type === "READINESS").length;

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">
              Proof Archive Operations
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Filecoin Proof Archive
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              Kelola proof record dari learner dan simulasikan pengarsipan ke Filecoin. Setiap archive menyimpan manifest JSON terstruktur di metadata sebagai dasar integrasi Filecoin/IPFS asli nanti.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/learners"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Learner Readiness
            </Link>
            <Link
              href="/passport"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              View Passport
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Proofs" value={totalProofs} />
        <MetricCard label="Archived" value={archivedProofs} />
        <MetricCard label="Manifests" value={manifestProofs} />
        <MetricCard label="Pending" value={pendingProofs} />
        <MetricCard label="Learning" value={learningProofs} />
        <MetricCard label="Participation" value={participationProofs} />
        <MetricCard label="Readiness" value={readinessProofs} />
        <MetricCard label="Archive Rate" value={`${totalProofs ? Math.round((archivedProofs / totalProofs) * 100) : 0}%`} />
      </section>

      <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 md:p-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
          Archive Manifest v0.1
        </p>
        <h2 className="mt-2 text-2xl font-black">
          Proof archive punya struktur data yang bisa diverifikasi.
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
          Saat admin menekan Archive, Karyra membuat manifest berisi proof, learner, readiness snapshot, checksum SHA-256, dan expected Filecoin/IPFS flow. CID masih demo, tetapi struktur ini siap menjadi dasar upload manifest asli ke Filecoin/IPFS nanti.
        </p>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Proof Table
            </p>
            <h2 className="mt-2 text-2xl font-black">Proof Records</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              Setiap proof dapat diarsipkan ke demo Filecoin layer. Setelah diarsipkan, CID dan manifest digest akan tampil di halaman proof verification.
            </p>
          </div>
          <p className="text-sm text-slate-500">{totalProofs} proof records</p>
        </div>

        {proofRecords.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-white/10 p-6 text-sm text-slate-400">
            Belum ada proof record. Selesaikan course, approve quest, atau tandai kehadiran workshop terlebih dahulu agar proof muncul di sini.
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-3xl border border-white/10">
            <table className="w-full min-w-[1180px] text-left text-sm">
              <thead className="border-b border-white/10 bg-slate-950/80 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Proof</th>
                  <th className="px-5 py-4">Learner</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Source</th>
                  <th className="px-5 py-4">XP</th>
                  <th className="px-5 py-4">Issued</th>
                  <th className="px-5 py-4">Filecoin Status</th>
                  <th className="px-5 py-4">Manifest</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10 bg-slate-950/40">
                {proofRecords.map((proof) => {
                  const manifest = getArchiveManifestFromMetadata(proof.metadata);

                  return (
                    <tr key={proof.id} className="transition hover:bg-white/[0.03]">
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-black text-white">{proof.title}</p>
                          {proof.description ? (
                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                              {proof.description}
                            </p>
                          ) : null}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div>
                          <p className="font-black text-white">{proof.user.displayName}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            @{proof.user.username}
                            {proof.user.city ? ` · ${proof.user.city}` : ""}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className={`rounded-full border px-3 py-1 text-xs font-black ${getProofBadge(proof.type)}`}>
                          {proofTypeLabel(proof.type)}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-300">{proof.source ?? "manual"}</td>
                      <td className="px-5 py-4 font-black text-emerald-300">{proof.xpValue}</td>
                      <td className="px-5 py-4 text-slate-400">
                        {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(proof.issuedAt)}
                      </td>

                      <td className="px-5 py-4">
                        {proof.archivedToFilecoin ? (
                          <div>
                            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                              Archived
                            </span>
                            {proof.filecoinCid ? (
                              <p className="mt-2 max-w-[240px] truncate font-mono text-xs text-slate-500">
                                {proof.filecoinCid}
                              </p>
                            ) : null}
                          </div>
                        ) : (
                          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-black text-amber-300">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        {manifest ? (
                          <div>
                            <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-black text-sky-300">
                              Manifest v0.1
                            </span>
                            <p className="mt-2 max-w-[220px] truncate font-mono text-xs text-slate-500">
                              {manifest.checksum.digest}
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500">Not generated</span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/proofs/${proof.id}`}
                            className="text-sm font-black text-emerald-300 hover:text-emerald-200"
                          >
                            Open Proof
                          </Link>

                          {proof.archivedToFilecoin && manifest ? (
                            <span className="text-sm text-slate-500">Already archived</span>
                          ) : (
                            <form action={archiveProof}>
                              <input type="hidden" name="proofId" value={proof.id} />
                              <button
                                type="submit"
                                className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                              >
                                Archive
                              </button>
                            </form>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
