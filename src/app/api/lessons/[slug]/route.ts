import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  const lesson = await prisma.lesson.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      slug: true,
      order: true,
      title: true,
      type: true,
      status: true,
      content: true,
      resources: true,
      estimatedMinutes: true,
      xpReward: true,
      isRequired: true,
      publishedAt: true,
      module: {
        select: {
          id: true,
          order: true,
          title: true,
          course: {
            select: {
              id: true,
              slug: true,
              title: true,
            },
          },
        },
      },
      questions: {
        orderBy: {
          order: "asc",
        },
        select: {
          id: true,
          order: true,
          prompt: true,
          options: true,
          points: true,
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

  if (!lesson) {
    return NextResponse.json(
      {
        error: "Lesson not found",
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json({
    data: lesson,
  });
}