import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const result = await prisma.$queryRaw<{ now: Date }[]>`
    SELECT NOW() as now
  `;

  return NextResponse.json({
    status: "ok",
    database: "connected",
    time: result[0]?.now,
  });
}