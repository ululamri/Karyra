import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  buildArchivedProofMetadata,
  buildProofArchiveManifest,
  generateDemoFilecoinCid,
  getArchiveManifestFromMetadata,
} from "@/lib/filecoin-manifest";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      proofId?: string;
    };

    if (!body.proofId) {
      return NextResponse.json(
        {
          ok: false,
          message: "proofId is required.",
        },
        { status: 400 },
      );
    }

    const proof = await prisma.proofRecord.findUnique({
      where: {
        id: body.proofId,
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
      return NextResponse.json(
        {
          ok: false,
          message: "Proof record not found.",
        },
        { status: 404 },
      );
    }

    const existingManifest = getArchiveManifestFromMetadata(proof.metadata);

    if (proof.archivedToFilecoin && proof.filecoinCid && existingManifest) {
      return NextResponse.json({
        ok: true,
        message: "Proof record already archived.",
        proof,
        manifest: existingManifest,
      });
    }

    const manifest = buildProofArchiveManifest(proof);
    const filecoinCid = proof.filecoinCid ?? generateDemoFilecoinCid(proof.id, manifest.checksum.digest);

    const updatedProof = await prisma.proofRecord.update({
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

    return NextResponse.json({
      ok: true,
      message: "Proof record archived to Filecoin demo layer with manifest.",
      proof: updatedProof,
      manifest,
    });
  } catch (error) {
    console.error("[POST /api/proofs/archive]", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to archive proof record.",
      },
      { status: 500 },
    );
  }
}
