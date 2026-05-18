import { NextResponse } from "next/server";
import {
  getOrCreateDemoLearner,
  getReadinessPassport,
  syncReadinessProfile,
} from "@/lib/readiness";

export async function GET() {
  try {
    const learner = await getOrCreateDemoLearner();
    const passport = await getReadinessPassport(learner.id);

    return NextResponse.json({
      ok: true,
      passport,
    });
  } catch (error) {
    console.error("[GET /api/readiness]", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to load readiness passport.",
      },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    const learner = await getOrCreateDemoLearner();
    const snapshot = await syncReadinessProfile(learner.id);

    return NextResponse.json({
      ok: true,
      snapshot,
    });
  } catch (error) {
    console.error("[POST /api/readiness]", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to sync readiness profile.",
      },
      { status: 500 },
    );
  }
}