import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const courses = await prisma.course.findMany({
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
      subtitle: true,
      description: true,
      locale: true,
      difficulty: true,
      status: true,
      coverImageUrl: true,
      publishedAt: true,
      createdAt: true,
      modules: {
        orderBy: {
          order: "asc",
        },
        select: {
          id: true,
          order: true,
          title: true,
          description: true,
          lessons: {
            where: {
              status: "PUBLISHED",
            },
            orderBy: {
              order: "asc",
            },
            select: {
              id: true,
              slug: true,
              order: true,
              title: true,
              type: true,
              estimatedMinutes: true,
              xpReward: true,
            },
          },
        },
      },
      quests: {
        where: {
          status: "PUBLISHED",
        },
        select: {
          id: true,
          slug: true,
          title: true,
          type: true,
          difficulty: true,
          xpReward: true,
        },
      },
    },
  });

  return NextResponse.json({
    data: courses,
  });
}