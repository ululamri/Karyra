import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const quests = await prisma.quest.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      type: true,
      difficulty: true,
      status: true,
      xpReward: true,
      tokenRewardAmount: true,
      tokenSymbol: true,
      chainKey: true,
      startsAt: true,
      endsAt: true,
      course: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
      lesson: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
      tasks: {
        orderBy: {
          order: "asc",
        },
        select: {
          id: true,
          order: true,
          title: true,
          instructions: true,
          verificationType: true,
        },
      },
    },
  });

  return NextResponse.json({
    data: quests,
  });
}