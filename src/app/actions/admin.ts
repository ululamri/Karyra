"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function getAdminUser() {
  const admin = await prisma.user.findUnique({
    where: {
      username: "admin",
    },
    select: {
      id: true,
    },
  });

  if (!admin) {
    throw new Error("Admin user not found. Run npm run db:seed first.");
  }

  return admin;
}

export async function createCourseWithLessonAction(formData: FormData) {
  const title = getFormString(formData, "title");
  const subtitle = getFormString(formData, "subtitle");
  const description = getFormString(formData, "description");
  const difficulty = getFormString(formData, "difficulty");
  const status = getFormString(formData, "status");
  const lessonTitle = getFormString(formData, "lessonTitle");
  const lessonContent = getFormString(formData, "lessonContent");

  if (!title) {
    throw new Error("Course title is required.");
  }

  if (!lessonTitle) {
    throw new Error("Lesson title is required.");
  }

  if (!lessonContent) {
    throw new Error("Lesson content is required.");
  }

  const admin = await getAdminUser();

  const baseSlug = createSlug(title);
  const existingCourse = await prisma.course.findUnique({
    where: {
      slug: baseSlug,
    },
    select: {
      id: true,
    },
  });

  const courseSlug = existingCourse
    ? `${baseSlug}-${Math.floor(Date.now() / 1000)}`
    : baseSlug;

  const lessonSlug = createSlug(lessonTitle);

  await prisma.$transaction(async (tx) => {
    const course = await tx.course.create({
      data: {
        slug: courseSlug,
        title,
        subtitle: subtitle || null,
        description: description || null,
        locale: "id-ID",
        difficulty:
          difficulty === "INTERMEDIATE" || difficulty === "ADVANCED"
            ? difficulty
            : "BEGINNER",
        status: status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
        creatorId: admin.id,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
    });

    const courseModule = await tx.courseModule.create({
      data: {
       courseId: course.id,
       order: 1,
       title: "Module 1",
       description: "Module awal untuk course ini.",
         },
      });

      await tx.lesson.create({
      data: {
      moduleId: courseModule.id,
      creatorId: admin.id,
      slug: lessonSlug,
      order: 1,
      title: lessonTitle,
      type: "ARTICLE",
      status: status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
      estimatedMinutes: 5,
      xpReward: 20,
      isRequired: true,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
      content: {
      blocks: [
        {
          type: "heading",
          text: lessonTitle,
        },
        {
          type: "paragraph",
          text: lessonContent,
        },
      ],
    },
    resources: {
      links: [],
     },
     },
   });
 });

  revalidatePath("/admin");
  revalidatePath("/courses");
  revalidatePath(`/courses/${courseSlug}`);

  redirect("/admin");
}

export async function publishCourseAction(formData: FormData) {
  const courseSlug = getFormString(formData, "courseSlug");

  if (!courseSlug) {
    throw new Error("courseSlug is required.");
  }

  await prisma.course.update({
    where: {
      slug: courseSlug,
    },
    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
      modules: {
        updateMany: {
          where: {},
          data: {},
        },
      },
    },
  });

  await prisma.lesson.updateMany({
    where: {
      module: {
        course: {
          slug: courseSlug,
        },
      },
    },
    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  revalidatePath("/admin");
  revalidatePath("/courses");
  revalidatePath(`/courses/${courseSlug}`);
}

export async function archiveCourseAction(formData: FormData) {
  const courseSlug = getFormString(formData, "courseSlug");

  if (!courseSlug) {
    throw new Error("courseSlug is required.");
  }

  await prisma.course.update({
    where: {
      slug: courseSlug,
    },
    data: {
      status: "ARCHIVED",
    },
  });

  await prisma.lesson.updateMany({
    where: {
      module: {
        course: {
          slug: courseSlug,
        },
      },
    },
    data: {
      status: "ARCHIVED",
    },
  });

  revalidatePath("/admin");
  revalidatePath("/courses");
}
export async function approveQuestSubmissionAction(formData: FormData) {
  const submissionId = getFormString(formData, "submissionId");
  const reviewNote = getFormString(formData, "reviewNote");

  if (!submissionId) {
    throw new Error("submissionId is required.");
  }

  const admin = await getAdminUser();

  const submission = await prisma.questSubmission.findUnique({
    where: {
      id: submissionId,
    },
    select: {
      id: true,
      userId: true,
      questId: true,
      quest: {
        select: {
          id: true,
          title: true,
          xpReward: true,
        },
      },
      user: {
        select: {
          id: true,
          xp: true,
        },
      },
    },
  });

  if (!submission) {
    throw new Error("Submission not found.");
  }

  await prisma.$transaction(async (tx) => {
    await tx.questSubmission.update({
      where: {
        id: submission.id,
      },
      data: {
        status: "APPROVED",
        reviewerId: admin.id,
        reviewedAt: new Date(),
        reviewNote: reviewNote || "Approved by admin.",
      },
    });

    const rewardReason = `quest:${submission.questId}:approved`;

    const existingReward = await tx.rewardLedger.findFirst({
      where: {
        userId: submission.userId,
        questId: submission.questId,
        kind: "XP",
        reason: rewardReason,
      },
      select: {
        id: true,
      },
    });

    if (!existingReward && submission.quest.xpReward > 0) {
      const nextXp = submission.user.xp + submission.quest.xpReward;
      const nextLevel = Math.floor(nextXp / 100) + 1;

      await tx.user.update({
        where: {
          id: submission.userId,
        },
        data: {
          xp: nextXp,
          level: nextLevel,
          lastActiveAt: new Date(),
        },
      });

      await tx.rewardLedger.create({
        data: {
          userId: submission.userId,
          questId: submission.questId,
          kind: "XP",
          direction: "CREDIT",
          xpAmount: submission.quest.xpReward,
          reason: rewardReason,
          metadata: {
            questTitle: submission.quest.title,
            submissionId: submission.id,
          },
        },
      });
    }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/submissions");
  revalidatePath("/dashboard");
  revalidatePath("/status");
}

export async function rejectQuestSubmissionAction(formData: FormData) {
  const submissionId = getFormString(formData, "submissionId");
  const reviewNote = getFormString(formData, "reviewNote");

  if (!submissionId) {
    throw new Error("submissionId is required.");
  }

  const admin = await getAdminUser();

  await prisma.questSubmission.update({
    where: {
      id: submissionId,
    },
    data: {
      status: "REJECTED",
      reviewerId: admin.id,
      reviewedAt: new Date(),
      reviewNote: reviewNote || "Rejected by admin.",
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/submissions");
  revalidatePath("/dashboard");
  revalidatePath("/status");
}

export async function createWorkshopAction(formData: FormData) {
  const title = getFormString(formData, "title");
  const description = getFormString(formData, "description");
  const city = getFormString(formData, "city");
  const location = getFormString(formData, "location");
  const capacityText = getFormString(formData, "capacity");
  const status = getFormString(formData, "status");
  const startsAtText = getFormString(formData, "startsAt");
  const endsAtText = getFormString(formData, "endsAt");

  if (!title) {
    throw new Error("Workshop title is required.");
  }

  if (!startsAtText) {
    throw new Error("Workshop start date is required.");
  }

  const startsAt = new Date(startsAtText);
  const endsAt = endsAtText ? new Date(endsAtText) : null;

  if (Number.isNaN(startsAt.getTime())) {
    throw new Error("Invalid start date.");
  }

  if (endsAt && Number.isNaN(endsAt.getTime())) {
    throw new Error("Invalid end date.");
  }

  const capacity = capacityText ? Number(capacityText) : null;

  if (capacity !== null && (!Number.isInteger(capacity) || capacity < 1)) {
    throw new Error("Capacity must be a positive number.");
  }

  const baseSlug = createSlug(title);

  const existingWorkshop = await prisma.workshop.findUnique({
    where: {
      slug: baseSlug,
    },
    select: {
      id: true,
    },
  });

  const workshopSlug = existingWorkshop
    ? `${baseSlug}-${Math.floor(Date.now() / 1000)}`
    : baseSlug;

  await prisma.workshop.create({
    data: {
      slug: workshopSlug,
      title,
      description: description || null,
      city: city || null,
      location: location || null,
      capacity,
      status: status === "OPEN" ? "OPEN" : "DRAFT",
      startsAt,
      endsAt,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/workshops");
  revalidatePath("/workshops");
  revalidatePath("/status");

  redirect("/admin/workshops");
}

export async function openWorkshopAction(formData: FormData) {
  const workshopSlug = getFormString(formData, "workshopSlug");

  if (!workshopSlug) {
    throw new Error("workshopSlug is required.");
  }

  await prisma.workshop.update({
    where: {
      slug: workshopSlug,
    },
    data: {
      status: "OPEN",
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/workshops");
  revalidatePath("/workshops");
  revalidatePath("/status");
}

export async function closeWorkshopAction(formData: FormData) {
  const workshopSlug = getFormString(formData, "workshopSlug");

  if (!workshopSlug) {
    throw new Error("workshopSlug is required.");
  }

  await prisma.workshop.update({
    where: {
      slug: workshopSlug,
    },
    data: {
      status: "CLOSED",
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/workshops");
  revalidatePath("/workshops");
  revalidatePath("/status");
}

export async function completeWorkshopAction(formData: FormData) {
  const workshopSlug = getFormString(formData, "workshopSlug");

  if (!workshopSlug) {
    throw new Error("workshopSlug is required.");
  }

  await prisma.workshop.update({
    where: {
      slug: workshopSlug,
    },
    data: {
      status: "COMPLETED",
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/workshops");
  revalidatePath("/workshops");
  revalidatePath("/status");
}

export async function cancelWorkshopAction(formData: FormData) {
  const workshopSlug = getFormString(formData, "workshopSlug");

  if (!workshopSlug) {
    throw new Error("workshopSlug is required.");
  }

  await prisma.workshop.update({
    where: {
      slug: workshopSlug,
    },
    data: {
      status: "CANCELLED",
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/workshops");
  revalidatePath("/workshops");
  revalidatePath("/status");
}