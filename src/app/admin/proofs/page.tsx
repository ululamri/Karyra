import Link from "next/link";
import { revalidatePath } from "next/cache";
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
      return "border-sky-500/30 bg-sky-500/10 text-sky-300";
    case "PARTICIPATION":
      return "border-violet-500/30 bg-violet-500/10 text-violet-300";
    case "READINESS":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    default:
      return "border-zinc-700 bg-zinc-800 text-zinc-300";
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
    const filecoinCid = proof.filecoinCid ?? generateDemoFilecoinCid(proof.id, manifest.checksum.digest);

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
  const manifestProofs = proofRecords.filter((proof) => getArchiveManifestFromMetadata(proof.metadata)).length;
  const learningProofs = proofRecords.filter((proof) => proof.type === "LEARNING").length;
  const participationProofs = proofRecords.filter((proof) => proof.type === "PARTICIPATION").length;
  const readinessProofs = proofRecords.filter((proof) => proof.type === "READINESS").length;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-400">Karyra Admin Console</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              Filecoin Proof Archive
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
              Kelola proof record dari learner dan simulasikan pengarsipan ke Filecoin. Sekarang setiap archive menyimpan manifest JSON terstruktur di metadata sebagai dasar integrasi Filecoin/IPFS asli nanti.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="rounded-2xl border border-zinc-800 px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-emerald-500 hover:text-emerald-300"
            >
              Admin Home
            </Link>

            <Link
              href="/admin/learners"
              className="rounded-2xl border border-zinc-800 px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-emerald-500 hover:text-emerald-300"
            >
              Learner Readiness
            </Link>

            <Link
              href="/passport"
              className="rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
            >
              View Passport
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-5">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Total Proofs</p>
            <p className="mt-2 text-3xl font-bold">{totalProofs}</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Archived</p>
            <p className="mt-2 text-3xl font-bold text-emerald-300">{archivedProofs}</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Manifests</p>
            <p className="mt-2 text-3xl font-bold text-sky-300">{manifestProofs}</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Pending</p>
            <p className="mt-2 text-3xl font-bold text-amber-300">{pendingProofs}</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Archive Layer</p>
            <p className="mt-2 text-3xl font-bold">Demo</p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Proof-of-Learning</p>
            <p className="mt-2 text-3xl font-bold">{learningProofs}</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Proof-of-Participation</p>
            <p className="mt-2 text-3xl font-bold">{participationProofs}</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Proof-of-Readiness</p>
            <p className="mt-2 text-3xl font-bold">{readinessProofs}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-sky-500/20 bg-sky-500/10 p-5 md:p-6">
          <p className="text-sm font-medium text-sky-300">Archive Manifest v0.1</p>
          <h2 className="mt-2 text-2xl font-bold">Proof archive kini punya struktur data yang bisa diverifikasi.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
            Saat admin menekan Archive, Karyra membuat manifest berisi proof, learner, readiness snapshot, checksum SHA-256, dan expected Filecoin/IPFS flow. CID masih demo, tetapi struktur ini siap menjadi dasar upload manifest asli ke Filecoin/IPFS nanti.
          </p>
        </section>

        <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70">
          <div className="border-b border-zinc-800 p-5">
            <h2 className="text-xl font-semibold">Proof Records</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Setiap proof dapat diarsipkan ke demo Filecoin layer. Setelah diarsipkan, CID dan manifest digest akan tampil di halaman proof verification.
            </p>
          </div>

          {proofRecords.length === 0 ? (
            <div className="p-6 text-sm text-zinc-400">
              Belum ada proof record. Selesaikan course, approve quest, atau tandai kehadiran workshop terlebih dahulu agar proof muncul di sini.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1180px] text-left text-sm">
                <thead className="border-b border-zinc-800 bg-zinc-950/60 text-xs uppercase tracking-wide text-zinc-500">
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

                <tbody className="divide-y divide-zinc-800">
                  {proofRecords.map((proof) => {
                    const manifest = getArchiveManifestFromMetadata(proof.metadata);

                    return (
                      <tr key={proof.id} className="hover:bg-zinc-950/40">
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-medium text-zinc-100">{proof.title}</p>
                            {proof.description ? (
                              <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500">
                                {proof.description}
                              </p>
                            ) : null}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div>
                            <p className="font-medium text-zinc-100">{proof.user.displayName}</p>
                            <p className="mt-1 text-xs text-zinc-500">
                              @{proof.user.username}
                              {proof.user.city ? ` · ${proof.user.city}` : ""}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className={`rounded-full border px-3 py-1 text-xs font-medium ${getProofBadge(proof.type)}`}>
                            {proofTypeLabel(proof.type)}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-zinc-300">{proof.source ?? "manual"}</td>
                        <td className="px-5 py-4 font-semibold">{proof.xpValue}</td>
                        <td className="px-5 py-4 text-zinc-400">
                          {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(proof.issuedAt)}
                        </td>

                        <td className="px-5 py-4">
                          {proof.archivedToFilecoin ? (
                            <div>
                              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                Archived
                              </span>
                              {proof.filecoinCid ? (
                                <p className="mt-2 max-w-[240px] truncate text-xs text-zinc-500">{proof.filecoinCid}</p>
                              ) : null}
                            </div>
                          ) : (
                            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                              Pending
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          {manifest ? (
                            <div>
                              <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
                                Manifest v0.1
                              </span>
                              <p className="mt-2 max-w-[220px] truncate font-mono text-xs text-zinc-500">
                                {manifest.checksum.digest}
                              </p>
                            </div>
                          ) : (
                            <span className="text-xs text-zinc-500">Not generated</span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-2">
                            <Link
                              href={`/proofs/${proof.id}`}
                              className="text-sm font-medium text-emerald-300 hover:text-emerald-200"
                            >
                              Open Proof
                            </Link>

                            {proof.archivedToFilecoin && manifest ? (
                              <span className="text-sm text-zinc-500">Already archived</span>
                            ) : (
                              <form action={archiveProof}>
                                <input type="hidden" name="proofId" value={proof.id} />
                                <button
                                  type="submit"
                                  className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-emerald-300"
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
      </section>
    </main>
  );
}
