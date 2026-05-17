import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Start seeding learner dashboard demo...");

  const learner = await prisma.user.upsert({
    where: {
      username: "demo",
    },
    update: {
      displayName: "Demo Learner",
      role: "LEARNER",
      status: "ACTIVE",
      xp: 120,
      level: 2,
      streakCount: 3,
      lastActiveAt: new Date(),
    },
    create: {
      username: "demo",
      displayName: "Demo Learner",
      email: "demo@karyra.local",
      role: "LEARNER",
      status: "ACTIVE",
      locale: "id-ID",
      city: "Indonesia",
      xp: 120,
      level: 2,
      streakCount: 3,
      lastActiveAt: new Date(),
      bio: "Demo learner account for Karyra dashboard preview.",
    },
  });

  const course = await prisma.course.findUnique({
    where: {
      slug: "dasar-web3-untuk-pemula",
    },
    include: {
      modules: {
        orderBy: {
          order: "asc",
        },
        include: {
          lessons: {
            where: {
              status: "PUBLISHED",
            },
            orderBy: {
              order: "asc",
            },
          },
        },
      },
      quests: {
        where: {
          status: "PUBLISHED",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!course) {
    throw new Error("Course dasar-web3-untuk-pemula not found. Run db:seed first.");
  }

  const lessons = course.modules.flatMap((module) => module.lessons);
  const firstLesson = lessons[0];

  if (!firstLesson) {
    throw new Error("No published lesson found for demo course.");
  }

  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: learner.id,
        courseId: course.id,
      },
    },
    update: {
      status: "IN_PROGRESS",
      progressPct: 35,
    },
    create: {
      userId: learner.id,
      courseId: course.id,
      status: "IN_PROGRESS",
      progressPct: 35,
    },
  });

  await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId: learner.id,
        lessonId: firstLesson.id,
      },
    },
    update: {
      status: "IN_PROGRESS",
      startedAt: new Date(),
    },
    create: {
      userId: learner.id,
      lessonId: firstLesson.id,
      status: "IN_PROGRESS",
      startedAt: new Date(),
    },
  });

  const badge = await prisma.badge.upsert({
    where: {
      slug: "early-learner",
    },
    update: {
      name: "Early Learner",
    },
    create: {
      slug: "early-learner",
      name: "Early Learner",
      description: "Badge untuk peserta awal yang mulai belajar di Karyra.",
      imageUrl: "/badges/early-learner.png",
    },
  });

  await prisma.userBadge.upsert({
    where: {
      userId_badgeId: {
        userId: learner.id,
        badgeId: badge.id,
      },
    },
    update: {},
    create: {
      userId: learner.id,
      badgeId: badge.id,
      metadata: {
        source: "dashboard-demo",
      },
    },
  });

  const firstQuest = course.quests[0];

  if (firstQuest) {
    const existingReward = await prisma.rewardLedger.findFirst({
      where: {
        userId: learner.id,
        questId: firstQuest.id,
        kind: "XP",
        reason: "Demo dashboard XP reward",
      },
    });

    if (!existingReward) {
      await prisma.rewardLedger.create({
        data: {
          userId: learner.id,
          questId: firstQuest.id,
          kind: "XP",
          direction: "CREDIT",
          xpAmount: 50,
          reason: "Demo dashboard XP reward",
          metadata: {
            source: "dashboard-demo",
          },
        },
      });
    }
  }

  const summary = {
    learner: learner.username,
    enrollments: await prisma.enrollment.count({
      where: {
        userId: learner.id,
      },
    }),
    lessonProgress: await prisma.lessonProgress.count({
      where: {
        userId: learner.id,
      },
    }),
    badges: await prisma.userBadge.count({
      where: {
        userId: learner.id,
      },
    }),
    rewards: await prisma.rewardLedger.count({
      where: {
        userId: learner.id,
      },
    }),
  };

  console.log("Dashboard demo seed completed:");
  console.table(summary);
}

main()
  .catch((error) => {
    console.error("Dashboard demo seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });