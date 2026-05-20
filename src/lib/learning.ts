import { prisma } from "@/lib/prisma";

export type LessonFlowStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export function formatLearningStatus(status?: string | null) {
  if (!status) return "Not Started";

  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getLearningStatusTone(status?: string | null) {
  if (status === "COMPLETED") {
    return "border-emerald-400/25 bg-emerald-400/10 text-emerald-300";
  }

  if (status === "IN_PROGRESS") {
    return "border-sky-400/25 bg-sky-400/10 text-sky-300";
  }

  return "border-white/10 bg-white/5 text-slate-400";
}

export function formatDifficulty(value?: string | null) {
  if (!value) return "Beginner";

  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function getDemoLearnerOrThrow() {
  const preferredLearner = await prisma.user.findFirst({
    where: {
      role: "LEARNER",
      status: "ACTIVE",
      OR: [
        {
          username: "demo",
        },
        {
          username: "demo-learner",
        },
      ],
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      city: true,
      xp: true,
      level: true,
      streakCount: true,
    },
  });

  if (preferredLearner) {
    return preferredLearner;
  }

  const fallbackLearner = await prisma.user.findFirst({
    where: {
      role: "LEARNER",
      status: "ACTIVE",
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      city: true,
      xp: true,
      level: true,
      streakCount: true,
    },
  });

  if (!fallbackLearner) {
    throw new Error("Demo learner not found. Run npm run db:seed first.");
  }

  return fallbackLearner;
}

function getLessonStatus(lesson: { progress: { status: string }[] }) {
  return lesson.progress[0]?.status ?? "NOT_STARTED";
}

function calculateProgressFromStatuses(lessons: Array<{ status: string }>) {
  if (lessons.length === 0) {
    return {
      totalLessons: 0,
      completedLessons: 0,
      inProgressLessons: 0,
      progressPct: 0,
    };
  }

  const completedLessons = lessons.filter(
    (lesson) => lesson.status === "COMPLETED",
  ).length;
  const inProgressLessons = lessons.filter(
    (lesson) => lesson.status === "IN_PROGRESS",
  ).length;

  return {
    totalLessons: lessons.length,
    completedLessons,
    inProgressLessons,
    progressPct: Math.round((completedLessons / lessons.length) * 100),
  };
}

export function calculateProgressFromLessons(
  lessons: Array<{ status: string }>,
) {
  return calculateProgressFromStatuses(lessons);
}

export async function getCoursesCatalogState() {
  const learner = await getDemoLearnerOrThrow();

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
      difficulty: true,
      enrollments: {
        where: {
          userId: learner.id,
        },
        select: {
          status: true,
          progressPct: true,
        },
      },
      modules: {
        orderBy: {
          order: "asc",
        },
        select: {
          id: true,
          order: true,
          title: true,
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
              title: true,
              order: true,
              estimatedMinutes: true,
              xpReward: true,
              progress: {
                where: {
                  userId: learner.id,
                },
                select: {
                  status: true,
                },
              },
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
        },
      },
    },
  });

  const courseCards = courses.map((course) => {
    const lessons = course.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({
        ...lesson,
        courseSlug: course.slug,
        courseTitle: course.title,
        moduleOrder: module.order,
        moduleTitle: module.title,
        status: getLessonStatus(lesson),
      })),
    );

    const progress = calculateProgressFromStatuses(lessons);
    const totalMinutes = lessons.reduce(
      (total, lesson) => total + lesson.estimatedMinutes,
      0,
    );
    const totalXp = lessons.reduce((total, lesson) => total + lesson.xpReward, 0);
    const inProgressLesson = lessons.find(
      (lesson) => lesson.status === "IN_PROGRESS",
    );
    const nextLesson =
      inProgressLesson ??
      lessons.find((lesson) => lesson.status !== "COMPLETED") ??
      lessons[0] ??
      null;

    return {
      ...course,
      lessons,
      progress,
      totalMinutes,
      totalXp,
      nextLesson,
      enrollment: course.enrollments[0] ?? null,
      questCount: course.quests.length,
    };
  });

  return {
    learner,
    courses: courseCards,
  };
}

export async function getLearnerProgressOverview() {
  const { learner, courses } = await getCoursesCatalogState();

  const lessons = courses.flatMap((course) =>
    course.lessons.map((lesson) => ({
      ...lesson,
      courseSlug: course.slug,
      courseTitle: course.title,
    })),
  );

  const overallProgress = calculateProgressFromStatuses(lessons);
  const activeCourse =
    courses.find((course) => course.enrollment?.status === "IN_PROGRESS") ??
    courses.find((course) => course.progress.progressPct < 100) ??
    courses[0] ??
    null;

  const continueLesson =
    activeCourse?.nextLesson ??
    lessons.find((lesson) => lesson.status === "IN_PROGRESS") ??
    lessons.find((lesson) => lesson.status !== "COMPLETED") ??
    lessons[0] ??
    null;

  const completedCourses = courses.filter(
    (course) => course.progress.progressPct >= 100,
  ).length;

  const totalMinutes = courses.reduce(
    (total, course) => total + course.totalMinutes,
    0,
  );

  return {
    learner,
    courses,
    lessons,
    activeCourse,
    continueLesson,
    completedCourses,
    totalMinutes,
    overallProgress,
  };
}

export async function getLessonsLibraryState() {
  const learner = await getDemoLearnerOrThrow();

  const courses = await prisma.course.findMany({
    where: {
      status: "PUBLISHED",
      modules: {
        some: {
          lessons: {
            some: {
              status: "PUBLISHED",
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      difficulty: true,
      modules: {
        orderBy: {
          order: "asc",
        },
        select: {
          id: true,
          order: true,
          title: true,
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
              progress: {
                where: {
                  userId: learner.id,
                },
                select: {
                  status: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const lessons = courses.flatMap((course) =>
    course.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({
        ...lesson,
        course: {
          slug: course.slug,
          title: course.title,
          subtitle: course.subtitle,
          difficulty: course.difficulty,
        },
        module: {
          order: module.order,
          title: module.title,
        },
        status: getLessonStatus(lesson),
      })),
    ),
  );

  return {
    learner,
    courses,
    lessons,
    totalMinutes: lessons.reduce(
      (total, lesson) => total + lesson.estimatedMinutes,
      0,
    ),
    totalXp: lessons.reduce((total, lesson) => total + lesson.xpReward, 0),
    progress: calculateProgressFromStatuses(lessons),
  };
}

export async function getCourseLearningState(courseSlug: string) {
  const learner = await getDemoLearnerOrThrow();

  const course = await prisma.course.findUnique({
    where: {
      slug: courseSlug,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      description: true,
      difficulty: true,
      status: true,
      enrollments: {
        where: {
          userId: learner.id,
        },
        select: {
          status: true,
          progressPct: true,
          completedAt: true,
        },
      },
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
              progress: {
                where: {
                  userId: learner.id,
                },
                select: {
                  status: true,
                  startedAt: true,
                  completedAt: true,
                },
              },
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
    return null;
  }

  const lessons = course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      ...lesson,
      moduleOrder: module.order,
      moduleTitle: module.title,
      status: getLessonStatus(lesson),
    })),
  );

  const progress = calculateProgressFromStatuses(lessons);
  const inProgressLesson = lessons.find(
    (lesson) => lesson.status === "IN_PROGRESS",
  );
  const nextLesson =
    inProgressLesson ??
    lessons.find((lesson) => lesson.status !== "COMPLETED") ??
    lessons[0] ??
    null;

  return {
    learner,
    course,
    lessons,
    progress,
    nextLesson,
    enrollment: course.enrollments[0] ?? null,
    totalMinutes: lessons.reduce(
      (total, lesson) => total + lesson.estimatedMinutes,
      0,
    ),
    totalXp: lessons.reduce((total, lesson) => total + lesson.xpReward, 0),
  };
}

export async function getLessonLearningState(lessonSlug: string) {
  const learner = await getDemoLearnerOrThrow();

  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      type: true,
      content: true,
      estimatedMinutes: true,
      xpReward: true,
      progress: {
        where: {
          userId: learner.id,
        },
        select: {
          status: true,
          startedAt: true,
          completedAt: true,
        },
      },
      module: {
        select: {
          id: true,
          order: true,
          title: true,
          courseId: true,
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
    },
  });

  if (!lesson) {
    return null;
  }

  const [courseModules, courseQuests] = await Promise.all([
    prisma.courseModule.findMany({
      where: {
        courseId: lesson.module.courseId,
      },
      orderBy: {
        order: "asc",
      },
      select: {
        id: true,
        order: true,
        title: true,
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
            estimatedMinutes: true,
            xpReward: true,
            progress: {
              where: {
                userId: learner.id,
              },
              select: {
                status: true,
              },
            },
          },
        },
      },
    }),
    prisma.quest.findMany({
      where: {
        courseId: lesson.module.courseId,
        status: "PUBLISHED",
      },
      select: {
        id: true,
        title: true,
        chainKey: true,
        xpReward: true,
      },
    }),
  ]);

  const courseLessons = courseModules.flatMap((module) =>
    module.lessons.map((courseLesson) => ({
      ...courseLesson,
      moduleTitle: module.title,
      moduleOrder: module.order,
      status: getLessonStatus(courseLesson),
    })),
  );

  const currentIndex = courseLessons.findIndex(
    (courseLesson) => courseLesson.id === lesson.id,
  );

  const previousLesson =
    currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < courseLessons.length - 1
      ? courseLessons[currentIndex + 1]
      : null;

  return {
    learner,
    lesson,
    courseLessons,
    previousLesson,
    nextLesson,
    currentIndex,
    progress: lesson.progress[0] ?? null,
    courseProgress: calculateProgressFromStatuses(courseLessons),
    courseQuests,
  };
}
