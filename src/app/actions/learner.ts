"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { getDemoLearnerOrThrow } from "../../lib/learning";

const pathSchema = z
  .string()
  .trim()
  .startsWith("/")
  .refine((value) => !value.startsWith("//"), "Unsafe redirect path.");

const courseActionSchema = z.object({
  courseSlug: z.string().trim().min(1, "courseSlug is required."),
  redirectTo: pathSchema.optional(),
});

const lessonActionSchema = z.object({
  lessonSlug: z.string().trim().min(1, "lessonSlug is required."),
  redirectTo: pathSchema.optional(),
});

const questSubmissionSchema = z.object({
  questId: z.string().trim().optional(),
  questSlug: z.string().trim().optional(),
  evidenceText: z.string().trim().min(20, "Quest submission must be at least 20 characters."),
});

const workshopActionSchema = z.object({
  workshopSlug: z.string().trim().min(1, "workshopSlug is required."),
});

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function optionalPath(value: string) {
  return value.length > 0 ? value : undefined;
}

export async function enrollCourseAction(formData: FormData) {
  const input = courseActionSchema.parse({
    courseSlug: getFormString(formData, "courseSlug"),
    redirectTo: optionalPath(getFormString(formData, "redirectTo")),
  });

  const learner = await getDemoLearnerOrThrow();
  const course = await prisma.course.findUnique({
    where: { slug: input.courseSlug },
    select: { id: true, slug: true, status: true },
  });

  if (!course || course.status !== "PUBLISHED") throw new Error("Course not found.");

  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: learner.id, courseId: course.id } },
    update: { status: "IN_PROGRESS" },
    create: { userId: learner.id, courseId: course.id, status: "IN_PROGRESS", progressPct: 0 },
  });

  revalidatePath("/dashboard");
  revalidatePath("/learner");
  revalidatePath("/courses");
  revalidatePath(`/courses/${course.slug}`);

  redirect(input.redirectTo ?? `/courses/${course.slug}`);
}

export async function startLessonAction(formData: FormData) {
  const input = lessonActionSchema.parse({
    lessonSlug: getFormString(formData, "lessonSlug"),
    redirectTo: optionalPath(getFormString(formData, "redirectTo")),
  });

  const learner = await getDemoLearnerOrThrow();
  const lesson = await prisma.lesson.findFirst({
    where: { slug: input.lessonSlug, status: "PUBLISHED" },
    select: { id: true, slug: true, module: { select: { courseId: true, course: { select: { slug: true } } } } },
  });

  if (!lesson) throw new Error("Lesson not found.");

  await prisma.$transaction(async (tx) => {
    await tx.enrollment.upsert({
      where: { userId_courseId: { userId: learner.id, courseId: lesson.module.courseId } },
      update: { status: "IN_PROGRESS" },
      create: { userId: learner.id, courseId: lesson.module.courseId, status: "IN_PROGRESS", progressPct: 0 },
    });

    await tx.lessonProgress.upsert({
      where: { userId_lessonId: { userId: learner.id, lessonId: lesson.id } },
      update: { status: "IN_PROGRESS", startedAt: new Date() },
      create: { userId: learner.id, lessonId: lesson.id, status: "IN_PROGRESS", startedAt: new Date() },
    });
  });

  revalidatePath("/dashboard");
  revalidatePath("/learner");
  revalidatePath("/lessons");
  revalidatePath(`/courses/${lesson.module.course.slug}`);
  revalidatePath(`/lessons/${lesson.slug}`);

  redirect(input.redirectTo ?? `/lessons/${lesson.slug}`);
}

export async function completeLessonAction(formData: FormData) {
  const input = lessonActionSchema.parse({
    lessonSlug: getFormString(formData, "lessonSlug"),
    redirectTo: optionalPath(getFormString(formData, "redirectTo")),
  });

  const learner = await getDemoLearnerOrThrow();
  const lesson = await prisma.lesson.findFirst({
    where: { slug: input.lessonSlug, status: "PUBLISHED" },
    select: {
      id: true,
      slug: true,
      title: true,
      xpReward: true,
      module: { select: { courseId: true, course: { select: { slug: true } } } },
    },
  });

  if (!lesson) throw new Error("Lesson not found.");

  await prisma.$transaction(async (tx) => {
    await tx.lessonProgress.upsert({
      where: { userId_lessonId: { userId: learner.id, lessonId: lesson.id } },
      update: { status: "COMPLETED", completedAt: new Date() },
      create: { userId: learner.id, lessonId: lesson.id, status: "COMPLETED", startedAt: new Date(), completedAt: new Date() },
    });

    const rewardReason = `lesson:${lesson.id}:complete`;
    const existingReward = await tx.rewardLedger.findFirst({
      where: { userId: learner.id, kind: "XP", reason: rewardReason },
      select: { id: true },
    });

    if (!existingReward && lesson.xpReward > 0) {
      const currentUser = await tx.user.findUnique({ where: { id: learner.id }, select: { xp: true } });
      const nextXp = (currentUser?.xp ?? 0) + lesson.xpReward;
      const nextLevel = Math.floor(nextXp / 100) + 1;

      await tx.user.update({
        where: { id: learner.id },
        data: { xp: nextXp, level: nextLevel, lastActiveAt: new Date() },
      });

      await tx.rewardLedger.create({
        data: {
          userId: learner.id,
          kind: "XP",
          direction: "CREDIT",
          xpAmount: lesson.xpReward,
          reason: rewardReason,
          metadata: { lessonId: lesson.id, lessonTitle: lesson.title },
        },
      });
    }

    const totalLessons = await tx.lesson.count({ where: { status: "PUBLISHED", module: { courseId: lesson.module.courseId } } });
    const completedLessons = await tx.lessonProgress.count({
      where: {
        userId: learner.id,
        status: "COMPLETED",
        lesson: { status: "PUBLISHED", module: { courseId: lesson.module.courseId } },
      },
    });
    const progressPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    await tx.enrollment.upsert({
      where: { userId_courseId: { userId: learner.id, courseId: lesson.module.courseId } },
      update: { progressPct, status: progressPct >= 100 ? "COMPLETED" : "IN_PROGRESS", completedAt: progressPct >= 100 ? new Date() : null },
      create: { userId: learner.id, courseId: lesson.module.courseId, progressPct, status: progressPct >= 100 ? "COMPLETED" : "IN_PROGRESS", completedAt: progressPct >= 100 ? new Date() : null },
    });
  });

  revalidatePath("/dashboard");
  revalidatePath("/learner");
  revalidatePath("/lessons");
  revalidatePath("/passport");
  revalidatePath(`/courses/${lesson.module.course.slug}`);
  revalidatePath(`/lessons/${lesson.slug}`);

  redirect(input.redirectTo ?? `/courses/${lesson.module.course.slug}`);
}

export async function submitQuestAction(formData: FormData) {
  const input = questSubmissionSchema.parse({
    questId: getFormString(formData, "questId") || undefined,
    questSlug: getFormString(formData, "questSlug") || undefined,
    evidenceText: getFormString(formData, "evidenceText") || getFormString(formData, "submissionText"),
  });

  if (!input.questId && !input.questSlug) throw new Error("questId or questSlug is required.");

  const learner = await getDemoLearnerOrThrow();
  const quest = await prisma.quest.findFirst({
    where: { status: "PUBLISHED", ...(input.questId ? { id: input.questId } : { slug: input.questSlug }) },
    select: { id: true, slug: true, status: true, title: true, chainKey: true },
  });

  if (!quest) throw new Error("Quest not found.");

  await prisma.questSubmission.upsert({
    where: { userId_questId: { userId: learner.id, questId: quest.id } },
    update: {
      status: "SUBMITTED",
      evidence: { text: input.evidenceText, questTitle: quest.title, questSlug: quest.slug, chainKey: quest.chainKey },
      submittedAt: new Date(),
      reviewedAt: null,
      reviewNote: null,
    },
    create: {
      userId: learner.id,
      questId: quest.id,
      status: "SUBMITTED",
      evidence: { text: input.evidenceText, questTitle: quest.title, questSlug: quest.slug, chainKey: quest.chainKey },
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/learner");
  revalidatePath("/quests");
  revalidatePath("/admin/submissions");
  revalidatePath("/passport");
  revalidatePath("/stacks/stellar-readiness");

  redirect("/dashboard");
}

export async function registerWorkshopAction(formData: FormData) {
  const input = workshopActionSchema.parse({ workshopSlug: getFormString(formData, "workshopSlug") });
  const learner = await getDemoLearnerOrThrow();

  const workshop = await prisma.workshop.findUnique({
    where: { slug: input.workshopSlug },
    select: { id: true, slug: true, status: true, capacity: true, registrations: { where: { status: { in: ["REGISTERED", "ATTENDED"] } }, select: { id: true } } },
  });

  if (!workshop || workshop.status !== "OPEN") throw new Error("Workshop is not open.");
  if (typeof workshop.capacity === "number" && workshop.registrations.length >= workshop.capacity) throw new Error("Workshop is full.");

  await prisma.workshopRegistration.upsert({
    where: { userId_workshopId: { userId: learner.id, workshopId: workshop.id } },
    update: { status: "REGISTERED", attendedAt: null },
    create: { userId: learner.id, workshopId: workshop.id, status: "REGISTERED" },
  });

  revalidatePath("/workshops");
  revalidatePath("/dashboard");
  revalidatePath("/status");

  redirect("/workshops");
}

export async function cancelWorkshopRegistrationAction(formData: FormData) {
  const input = workshopActionSchema.parse({ workshopSlug: getFormString(formData, "workshopSlug") });
  const learner = await getDemoLearnerOrThrow();

  const workshop = await prisma.workshop.findUnique({ where: { slug: input.workshopSlug }, select: { id: true, slug: true } });
  if (!workshop) throw new Error("Workshop not found.");

  await prisma.workshopRegistration.updateMany({
    where: { userId: learner.id, workshopId: workshop.id },
    data: { status: "CANCELLED" },
  });

  revalidatePath("/workshops");
  revalidatePath("/dashboard");
  revalidatePath("/status");

  redirect("/workshops");
}
