import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import {
  ProofType,
  ReadinessLevel,
  RegistrationStatus,
  SubmissionStatus,
  ProgressStatus,
  UserRole,
} from "@/generated/prisma/enums";

type ReadinessSnapshot = {
  userId: string;
  totalXp: number;
  completedCourses: number;
  approvedQuests: number;
  workshopsJoined: number;
  readinessScore: number;
  level: ReadinessLevel;
};

function calculateReadinessLevel(score: number): ReadinessLevel {
  if (score >= 80) return ReadinessLevel.COMMUNITY_READY;
  if (score >= 55) return ReadinessLevel.READY;
  if (score >= 25) return ReadinessLevel.LEARNING;
  return ReadinessLevel.BEGINNER;
}

function calculateReadinessScore(input: {
  totalXp: number;
  completedCourses: number;
  approvedQuests: number;
  workshopsJoined: number;
}) {
  const xpScore = Math.min(30, Math.floor(input.totalXp / 20));
  const courseScore = Math.min(25, input.completedCourses * 10);
  const questScore = Math.min(25, input.approvedQuests * 8);
  const workshopScore = Math.min(20, input.workshopsJoined * 15);

  return Math.min(100, xpScore + courseScore + questScore + workshopScore);
}

function toJsonDate(value: Date | string | null | undefined) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  return value;
}

function asJsonValue(value: Prisma.InputJsonValue): Prisma.InputJsonValue {
  return value;
}

export async function getOrCreateDemoLearner() {
  const existingLearner = await prisma.user.findFirst({
    where: {
      role: UserRole.LEARNER,
      status: "ACTIVE",
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (existingLearner) return existingLearner;

  return prisma.user.create({
    data: {
      username: "demo-learner",
      displayName: "Demo Learner",
      role: UserRole.LEARNER,
      status: "ACTIVE",
      locale: "id-ID",
      xp: 0,
      level: 1,
    },
  });
}

async function createProofIfMissing(input: {
  userId: string;
  readinessProfileId: string;
  type: ProofType;
  title: string;
  description?: string;
  source: string;
  sourceId: string;
  xpValue?: number;
  metadata?: Prisma.InputJsonValue;
}) {
  const existing = await prisma.proofRecord.findFirst({
    where: {
      userId: input.userId,
      source: input.source,
      sourceId: input.sourceId,
      type: input.type,
    },
  });

  if (existing) return existing;

  return prisma.proofRecord.create({
    data: {
      userId: input.userId,
      readinessProfileId: input.readinessProfileId,
      type: input.type,
      title: input.title,
      description: input.description,
      source: input.source,
      sourceId: input.sourceId,
      xpValue: input.xpValue ?? 0,
      metadata: input.metadata,
    },
  });
}

export async function syncReadinessProfile(
  userId: string,
): Promise<ReadinessSnapshot> {
  const [user, completedCourses, approvedQuests, workshopsJoined] =
    await Promise.all([
      prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: {
          id: true,
          xp: true,
        },
      }),

      prisma.enrollment.count({
        where: {
          userId,
          status: ProgressStatus.COMPLETED,
        },
      }),

      prisma.questSubmission.count({
        where: {
          userId,
          status: SubmissionStatus.APPROVED,
        },
      }),

      prisma.workshopRegistration.count({
        where: {
          userId,
          status: RegistrationStatus.ATTENDED,
        },
      }),
    ]);

  const readinessScore = calculateReadinessScore({
    totalXp: user.xp,
    completedCourses,
    approvedQuests,
    workshopsJoined,
  });

  const level = calculateReadinessLevel(readinessScore);

  const profile = await prisma.readinessProfile.upsert({
    where: { userId },
    create: {
      userId,
      totalXp: user.xp,
      completedCourses,
      approvedQuests,
      workshopsJoined,
      readinessScore,
      level,
    },
    update: {
      totalXp: user.xp,
      completedCourses,
      approvedQuests,
      workshopsJoined,
      readinessScore,
      level,
    },
  });

  const completedEnrollments = await prisma.enrollment.findMany({
    where: {
      userId,
      status: ProgressStatus.COMPLETED,
    },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  for (const enrollment of completedEnrollments) {
    await createProofIfMissing({
      userId,
      readinessProfileId: profile.id,
      type: ProofType.LEARNING,
      title: `Completed course: ${enrollment.course.title}`,
      description:
        "Proof-of-Learning record generated from completed course progress.",
      source: "course",
      sourceId: enrollment.course.id,
      xpValue: 10,
      metadata: asJsonValue({
        courseSlug: enrollment.course.slug,
        completedAt: toJsonDate(enrollment.completedAt),
      }),
    });
  }

  const approvedSubmissions = await prisma.questSubmission.findMany({
    where: {
      userId,
      status: SubmissionStatus.APPROVED,
    },
    include: {
      quest: {
        select: {
          id: true,
          title: true,
          slug: true,
          type: true,
          xpReward: true,
        },
      },
    },
  });

  for (const submission of approvedSubmissions) {
    await createProofIfMissing({
      userId,
      readinessProfileId: profile.id,
      type: ProofType.READINESS,
      title: `Approved quest: ${submission.quest.title}`,
      description:
        "Proof-of-Readiness record generated from approved quest submission.",
      source: "quest",
      sourceId: submission.quest.id,
      xpValue: submission.quest.xpReward,
      metadata: asJsonValue({
        questSlug: submission.quest.slug,
        questType: submission.quest.type,
        reviewedAt: toJsonDate(submission.reviewedAt),
      }),
    });
  }

  const attendedWorkshops = await prisma.workshopRegistration.findMany({
    where: {
      userId,
      status: RegistrationStatus.ATTENDED,
    },
    include: {
      workshop: {
        select: {
          id: true,
          title: true,
          slug: true,
          city: true,
          startsAt: true,
        },
      },
    },
  });

  for (const registration of attendedWorkshops) {
    await createProofIfMissing({
      userId,
      readinessProfileId: profile.id,
      type: ProofType.PARTICIPATION,
      title: `Joined workshop: ${registration.workshop.title}`,
      description:
        "Proof-of-Participation record generated from workshop attendance.",
      source: "workshop",
      sourceId: registration.workshop.id,
      xpValue: 15,
      metadata: asJsonValue({
        workshopSlug: registration.workshop.slug,
        city: registration.workshop.city,
        startsAt: toJsonDate(registration.workshop.startsAt),
        attendedAt: toJsonDate(registration.attendedAt),
      }),
    });
  }

  return {
    userId,
    totalXp: user.xp,
    completedCourses,
    approvedQuests,
    workshopsJoined,
    readinessScore,
    level,
  };
}

export async function getReadinessPassport(userId: string) {
  await syncReadinessProfile(userId);

  return prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      displayName: true,
      city: true,
      xp: true,
      level: true,
      readinessProfile: true,
      proofRecords: {
        orderBy: {
          issuedAt: "desc",
        },
        take: 20,
      },
      badges: {
        include: {
          badge: true,
        },
        orderBy: {
          awardedAt: "desc",
        },
      },
    },
  });
}
