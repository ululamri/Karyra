import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  const course = await prisma.course.findUnique({
    where: {
      slug,
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
              isRequired: true,
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
          description: true,
          type: true,
          difficulty: true,
          xpReward: true,
          chainKey: true,
        },
      },
    },
  });

  if (!course || course.status !== "PUBLISHED") {
    return NextResponse.json(
      {
        error: "Course not found",
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json({
    data: course,
  });
}