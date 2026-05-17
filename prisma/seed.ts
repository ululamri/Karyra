import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Start seeding Karyra V2...");

  const admin = await prisma.user.upsert({
    where: {
      username: "admin",
    },
    update: {
      role: "ADMIN",
      status: "ACTIVE",
    },
    create: {
      username: "admin",
      displayName: "Karyra Admin",
      email: "admin@karyra.local",
      role: "ADMIN",
      status: "ACTIVE",
      locale: "id-ID",
      city: "Indonesia",
      bio: "Default admin account for Karyra V2 development.",
    },
  });

  const course = await prisma.course.upsert({
    where: {
      slug: "dasar-web3-untuk-pemula",
    },
    update: {
      status: "PUBLISHED",
      creatorId: admin.id,
    },
    create: {
      slug: "dasar-web3-untuk-pemula",
      title: "Dasar Web3 untuk Pemula",
      subtitle: "Belajar konsep dasar wallet, blockchain, dan keamanan Web3.",
      description:
        "Course pengantar untuk membantu pemula memahami Web3 dengan bahasa sederhana dan lokal.",
      locale: "id-ID",
      difficulty: "BEGINNER",
      status: "PUBLISHED",
      creatorId: admin.id,
      publishedAt: new Date(),
    },
  });

  const moduleOne = await prisma.courseModule.upsert({
    where: {
      courseId_order: {
        courseId: course.id,
        order: 1,
      },
    },
    update: {
      title: "Pengenalan Web3",
    },
    create: {
      courseId: course.id,
      order: 1,
      title: "Pengenalan Web3",
      description: "Memahami apa itu Web3 dan kenapa penting untuk pengguna baru.",
    },
  });

  const lessonOne = await prisma.lesson.upsert({
    where: {
      moduleId_slug: {
        moduleId: moduleOne.id,
        slug: "apa-itu-web3",
      },
    },
    update: {
      status: "PUBLISHED",
      creatorId: admin.id,
    },
    create: {
      moduleId: moduleOne.id,
      creatorId: admin.id,
      slug: "apa-itu-web3",
      order: 1,
      title: "Apa Itu Web3?",
      type: "ARTICLE",
      status: "PUBLISHED",
      estimatedMinutes: 5,
      xpReward: 20,
      isRequired: true,
      publishedAt: new Date(),
      content: {
        blocks: [
          {
            type: "heading",
            text: "Apa Itu Web3?",
          },
          {
            type: "paragraph",
            text: "Web3 adalah cara baru menggunakan internet dengan kepemilikan digital, wallet, dan aplikasi terdesentralisasi.",
          },
          {
            type: "paragraph",
            text: "Di Karyra, kamu akan belajar Web3 secara bertahap melalui lesson, quest, dan aktivitas komunitas.",
          },
        ],
      },
      resources: {
        links: [],
      },
    },
  });

  await prisma.quizQuestion.upsert({
    where: {
      lessonId_order: {
        lessonId: lessonOne.id,
        order: 1,
      },
    },
    update: {
      prompt: "Apa salah satu konsep penting dalam Web3?",
    },
    create: {
      lessonId: lessonOne.id,
      order: 1,
      prompt: "Apa salah satu konsep penting dalam Web3?",
      options: [
        {
          id: "a",
          text: "Kepemilikan digital",
        },
        {
          id: "b",
          text: "Password dibagikan ke semua orang",
        },
        {
          id: "c",
          text: "Semua data harus disimpan di satu perusahaan",
        },
      ],
      answer: {
        correctOptionId: "a",
      },
      explanation:
        "Salah satu ide utama Web3 adalah pengguna bisa memiliki dan mengontrol aset digital mereka sendiri.",
      points: 1,
    },
  });

  const quest = await prisma.quest.upsert({
    where: {
      slug: "quest-onboarding-web3-pertama",
    },
    update: {
      status: "PUBLISHED",
      courseId: course.id,
      lessonId: lessonOne.id,
    },
    create: {
      courseId: course.id,
      lessonId: lessonOne.id,
      slug: "quest-onboarding-web3-pertama",
      title: "Quest Onboarding Web3 Pertama",
      description:
        "Selesaikan lesson pertama dan tulis pemahaman singkat tentang Web3.",
      type: "LEARN",
      difficulty: "BEGINNER",
      status: "PUBLISHED",
      xpReward: 50,
      chainKey: "chain-agnostic",
      startsAt: new Date(),
    },
  });

  await prisma.questTask.upsert({
    where: {
      questId_order: {
        questId: quest.id,
        order: 1,
      },
    },
    update: {
      title: "Baca lesson Apa Itu Web3",
    },
    create: {
      questId: quest.id,
      order: 1,
      title: "Baca lesson Apa Itu Web3",
      instructions:
        "Baca lesson pertama sampai selesai sebelum mengirim submission.",
      verificationType: "MANUAL",
      verificationConfig: {
        required: true,
      },
    },
  });

  await prisma.questTask.upsert({
    where: {
      questId_order: {
        questId: quest.id,
        order: 2,
      },
    },
    update: {
      title: "Tulis pemahaman singkat",
    },
    create: {
      questId: quest.id,
      order: 2,
      title: "Tulis pemahaman singkat",
      instructions:
        "Tulis 2-3 kalimat tentang apa yang kamu pahami dari Web3.",
      verificationType: "TEXT_SUBMISSION",
      verificationConfig: {
        minLength: 40,
      },
    },
  });

  await prisma.badge.upsert({
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

  await prisma.workshop.upsert({
    where: {
      slug: "workshop-pengenalan-web3-lokal",
    },
    update: {
      status: "OPEN",
    },
    create: {
      slug: "workshop-pengenalan-web3-lokal",
      title: "Workshop Pengenalan Web3 Lokal",
      description:
        "Workshop offline pengenalan Web3, wallet, keamanan dasar, dan quest Karyra.",
      city: "Indonesia",
      location: "Local community space",
      capacity: 30,
      status: "OPEN",
      startsAt: new Date("2026-06-01T09:00:00.000Z"),
      endsAt: new Date("2026-06-01T11:00:00.000Z"),
    },
  });

  const summary = {
    users: await prisma.user.count(),
    courses: await prisma.course.count(),
    modules: await prisma.courseModule.count(),
    lessons: await prisma.lesson.count(),
    quizQuestions: await prisma.quizQuestion.count(),
    quests: await prisma.quest.count(),
    questTasks: await prisma.questTask.count(),
    badges: await prisma.badge.count(),
    workshops: await prisma.workshop.count(),
  };

  console.log("Seed completed:");
  console.table(summary);
}

main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });