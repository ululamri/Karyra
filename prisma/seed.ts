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

  const stellarReadinessBadge = await prisma.badge.upsert({
    where: {
      slug: "stellar-readiness-pioneer",
    },
    update: {
      name: "Stellar Readiness Pioneer",
      description:
        "Badge untuk learner yang memulai jalur kesiapan pembayaran Web3 berbasis Stellar.",
      imageUrl: "/badges/stellar-readiness-pioneer.png",
    },
    create: {
      slug: "stellar-readiness-pioneer",
      name: "Stellar Readiness Pioneer",
      description:
        "Badge untuk learner yang memulai jalur kesiapan pembayaran Web3 berbasis Stellar.",
      imageUrl: "/badges/stellar-readiness-pioneer.png",
    },
  });

  let demoLearner = await prisma.user.findFirst({
  where: {
    OR: [
      {
        username: "demo-learner",
      },
      {
        email: "demo@karyra.local",
      },
    ],
  },
});

if (demoLearner) {
  demoLearner = await prisma.user.update({
    where: {
      id: demoLearner.id,
    },
    data: {
      username: demoLearner.username ?? "demo-learner",
      displayName: demoLearner.displayName ?? "Demo Learner",
      role: "LEARNER",
      status: "ACTIVE",
      locale: demoLearner.locale ?? "id-ID",
      city: demoLearner.city ?? "Indonesia",
      bio: demoLearner.bio ?? "Default learner account for Karyra readiness demo.",
    },
  });
} else {
  demoLearner = await prisma.user.create({
    data: {
      username: "demo-learner",
      displayName: "Demo Learner",
      email: "demo@karyra.local",
      role: "LEARNER",
      status: "ACTIVE",
      locale: "id-ID",
      city: "Indonesia",
      bio: "Default learner account for Karyra readiness demo.",
      xp: 0,
      level: 1,
    },
  });
}
  await prisma.userBadge.upsert({
    where: {
      userId_badgeId: {
        userId: demoLearner.id,
        badgeId: stellarReadinessBadge.id,
      },
    },
    update: {
      metadata: {
        source: "seed",
        track: "stellar-readiness",
        reason: "Demo learner badge for Stellar Readiness Track.",
      },
    },
    create: {
      userId: demoLearner.id,
      badgeId: stellarReadinessBadge.id,
      metadata: {
        source: "seed",
        track: "stellar-readiness",
        reason: "Demo learner badge for Stellar Readiness Track.",
      },
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

const stellarCourse = await prisma.course.upsert({
    where: {
      slug: "stellar-readiness-for-local-communities",
    },
    update: {
      status: "PUBLISHED",
      creatorId: admin.id,
    },
    create: {
      slug: "stellar-readiness-for-local-communities",
      title: "Stellar Readiness for Local Communities",
      subtitle:
        "Wallet safety, memo awareness, stablecoin literacy, dan kesiapan pembayaran Web3.",
      description:
        "Course kesiapan finansial Web3 berbasis Stellar untuk komunitas lokal non-teknikal sebelum mencoba transaksi sungguhan.",
      locale: "id-ID",
      difficulty: "BEGINNER",
      status: "PUBLISHED",
      creatorId: admin.id,
      publishedAt: new Date(),
    },
  });

  const stellarModules = [
    {
      order: 1,
      title: "Wallet Safety",
      description:
        "Memahami keamanan wallet, seed phrase, recovery risk, dan kebiasaan aman sebelum memakai aset digital.",
      lesson: {
        slug: "wallet-safety-basics",
        title: "Dasar Keamanan Wallet",
        estimatedMinutes: 7,
        xpReward: 25,
        content: {
          blocks: [
            {
              type: "heading",
              text: "Dasar Keamanan Wallet",
            },
            {
              type: "paragraph",
              text: "Wallet adalah pintu masuk ke Web3. Sebelum menyimpan aset digital, learner perlu memahami seed phrase, risiko phishing, dan cara menjaga perangkat tetap aman.",
            },
            {
              type: "paragraph",
              text: "Di Karyra, wallet safety diajarkan sebagai readiness step, bukan sebagai ajakan langsung untuk bertransaksi.",
            },
          ],
        },
        quiz: {
          prompt: "Apa prinsip paling penting dalam menjaga seed phrase?",
          options: [
            {
              id: "a",
              text: "Menyimpannya secara pribadi dan tidak membagikannya kepada siapa pun",
            },
            {
              id: "b",
              text: "Mengirimkannya ke grup komunitas agar tidak lupa",
            },
            {
              id: "c",
              text: "Menaruhnya di bio media sosial",
            },
          ],
          correctOptionId: "a",
          explanation:
            "Seed phrase harus dijaga secara pribadi karena siapa pun yang memilikinya dapat mengambil alih wallet.",
        },
      },
    },
    {
      order: 2,
      title: "Address & Memo Awareness",
      description:
        "Memahami address, memo, dan risiko salah kirim sebelum memakai jaringan pembayaran.",
      lesson: {
        slug: "address-and-memo-awareness",
        title: "Address dan Memo Awareness",
        estimatedMinutes: 8,
        xpReward: 25,
        content: {
          blocks: [
            {
              type: "heading",
              text: "Address dan Memo Awareness",
            },
            {
              type: "paragraph",
              text: "Dalam beberapa alur pembayaran, address saja tidak selalu cukup. Memo atau destination tag bisa dibutuhkan agar dana dikenali oleh penerima.",
            },
            {
              type: "paragraph",
              text: "Learner perlu berlatih mengecek address, memo, nominal, dan penerima sebelum melakukan transaksi nyata.",
            },
          ],
        },
        quiz: {
          prompt:
            "Kenapa memo atau destination tag bisa penting dalam pembayaran aset digital?",
          options: [
            {
              id: "a",
              text: "Untuk membantu penerima mengidentifikasi transaksi tertentu",
            },
            {
              id: "b",
              text: "Agar transaksi selalu gratis",
            },
            {
              id: "c",
              text: "Agar wallet tidak membutuhkan password",
            },
          ],
          correctOptionId: "a",
          explanation:
            "Memo dapat membantu platform atau penerima mengenali transaksi, terutama saat banyak pengguna memakai address penerima yang sama.",
        },
      },
    },
    {
      order: 3,
      title: "Stablecoin & Payment Literacy",
      description:
        "Mengenal stablecoin, pembayaran digital, biaya, konfirmasi, dan ekspektasi pengguna baru.",
      lesson: {
        slug: "stablecoin-and-payment-literacy",
        title: "Literasi Stablecoin dan Pembayaran",
        estimatedMinutes: 9,
        xpReward: 30,
        content: {
          blocks: [
            {
              type: "heading",
              text: "Literasi Stablecoin dan Pembayaran",
            },
            {
              type: "paragraph",
              text: "Stablecoin sering dipakai untuk pembayaran digital karena nilainya dirancang lebih stabil dibanding banyak aset kripto lain.",
            },
            {
              type: "paragraph",
              text: "Pemula tetap perlu memahami risiko, jaringan yang digunakan, biaya, waktu konfirmasi, dan cara memastikan penerima benar.",
            },
          ],
        },
        quiz: {
          prompt: "Apa yang harus dicek sebelum mengirim stablecoin?",
          options: [
            {
              id: "a",
              text: "Jaringan, address, memo jika dibutuhkan, nominal, dan penerima",
            },
            {
              id: "b",
              text: "Hanya warna tombol kirim",
            },
            {
              id: "c",
              text: "Jumlah follower akun pengirim",
            },
          ],
          correctOptionId: "a",
          explanation:
            "Checklist sebelum transaksi membantu mengurangi risiko salah kirim dan kesalahan pengguna.",
        },
      },
    },
    {
      order: 4,
      title: "Scam Prevention",
      description:
        "Mengenali phishing, fake airdrop, impersonator, dan janji keuntungan tidak realistis.",
      lesson: {
        slug: "scam-prevention-for-beginners",
        title: "Pencegahan Scam untuk Pemula",
        estimatedMinutes: 8,
        xpReward: 30,
        content: {
          blocks: [
            {
              type: "heading",
              text: "Pencegahan Scam untuk Pemula",
            },
            {
              type: "paragraph",
              text: "Banyak pengguna baru kehilangan aset bukan karena teknologi terlalu sulit, tetapi karena tertipu link palsu, impersonator, dan janji keuntungan instan.",
            },
            {
              type: "paragraph",
              text: "Karyra menempatkan scam prevention sebagai bagian dari Proof-of-Readiness sebelum learner masuk ke praktik transaksi.",
            },
          ],
        },
        quiz: {
          prompt: "Apa tanda bahaya umum dari scam Web3?",
          options: [
            {
              id: "a",
              text: "Janji profit besar, link mencurigakan, dan permintaan seed phrase",
            },
            {
              id: "b",
              text: "Materi edukasi yang meminta learner membaca perlahan",
            },
            {
              id: "c",
              text: "Checklist keamanan sebelum transaksi",
            },
          ],
          correctOptionId: "a",
          explanation:
            "Janji profit tidak realistis, link mencurigakan, dan permintaan seed phrase adalah sinyal bahaya besar.",
        },
      },
    },
    {
      order: 5,
      title: "Pre-Transaction Checklist",
      description:
        "Membangun kebiasaan cek ulang sebelum transaksi: penerima, memo, nominal, jaringan, dan risiko.",
      lesson: {
        slug: "pre-transaction-checklist",
        title: "Checklist Sebelum Transaksi",
        estimatedMinutes: 10,
        xpReward: 35,
        content: {
          blocks: [
            {
              type: "heading",
              text: "Checklist Sebelum Transaksi",
            },
            {
              type: "paragraph",
              text: "Sebelum transaksi nyata, learner harus terbiasa melakukan dry-run: mengecek address, memo, nominal, jaringan, biaya, dan penerima.",
            },
            {
              type: "paragraph",
              text: "Checklist ini menjadi dasar Proof-of-Readiness untuk memastikan learner tidak hanya tahu teori, tetapi siap mengambil keputusan lebih aman.",
            },
          ],
        },
        quiz: {
          prompt: "Apa tujuan utama checklist sebelum transaksi?",
          options: [
            {
              id: "a",
              text: "Mengurangi risiko kesalahan dan membangun kepercayaan diri",
            },
            {
              id: "b",
              text: "Membuat learner langsung mengambil risiko besar",
            },
            {
              id: "c",
              text: "Menghapus kebutuhan belajar keamanan wallet",
            },
          ],
          correctOptionId: "a",
          explanation:
            "Checklist membantu learner meminimalkan kesalahan dan meningkatkan kesiapan sebelum transaksi nyata.",
        },
      },
    },
  ];

  for (const moduleData of stellarModules) {
    const createdModule = await prisma.courseModule.upsert({
      where: {
        courseId_order: {
          courseId: stellarCourse.id,
          order: moduleData.order,
        },
      },
      update: {
        title: moduleData.title,
        description: moduleData.description,
      },
      create: {
        courseId: stellarCourse.id,
        order: moduleData.order,
        title: moduleData.title,
        description: moduleData.description,
      },
    });

    const createdLesson = await prisma.lesson.upsert({
      where: {
        moduleId_slug: {
          moduleId: createdModule.id,
          slug: moduleData.lesson.slug,
        },
      },
      update: {
        title: moduleData.lesson.title,
        status: "PUBLISHED",
        creatorId: admin.id,
        content: moduleData.lesson.content,
        estimatedMinutes: moduleData.lesson.estimatedMinutes,
        xpReward: moduleData.lesson.xpReward,
      },
      create: {
        moduleId: createdModule.id,
        creatorId: admin.id,
        slug: moduleData.lesson.slug,
        order: 1,
        title: moduleData.lesson.title,
        type: "ARTICLE",
        status: "PUBLISHED",
        estimatedMinutes: moduleData.lesson.estimatedMinutes,
        xpReward: moduleData.lesson.xpReward,
        isRequired: true,
        publishedAt: new Date(),
        content: moduleData.lesson.content,
        resources: {
          links: [
            {
              label: "Karyra Stellar Readiness Track",
              href: "/stacks/stellar-readiness",
            },
          ],
        },
      },
    });

    await prisma.quizQuestion.upsert({
      where: {
        lessonId_order: {
          lessonId: createdLesson.id,
          order: 1,
        },
      },
      update: {
        prompt: moduleData.lesson.quiz.prompt,
        options: moduleData.lesson.quiz.options,
        answer: {
          correctOptionId: moduleData.lesson.quiz.correctOptionId,
        },
        explanation: moduleData.lesson.quiz.explanation,
      },
      create: {
        lessonId: createdLesson.id,
        order: 1,
        prompt: moduleData.lesson.quiz.prompt,
        options: moduleData.lesson.quiz.options,
        answer: {
          correctOptionId: moduleData.lesson.quiz.correctOptionId,
        },
        explanation: moduleData.lesson.quiz.explanation,
        points: 1,
      },
    });
  }

  const walletSafetyQuest = await prisma.quest.upsert({
    where: {
      slug: "stellar-wallet-safety-checklist",
    },
    update: {
      status: "PUBLISHED",
      courseId: stellarCourse.id,
    },
    create: {
      courseId: stellarCourse.id,
      slug: "stellar-wallet-safety-checklist",
      title: "Wallet Safety Checklist",
      description:
        "Isi checklist kesiapan keamanan wallet sebelum mencoba praktik pembayaran Web3.",
      type: "LEARN",
      difficulty: "BEGINNER",
      status: "PUBLISHED",
      xpReward: 60,
      chainKey: "stellar-readiness",
      startsAt: new Date(),
    },
  });

  await prisma.questTask.upsert({
    where: {
      questId_order: {
        questId: walletSafetyQuest.id,
        order: 1,
      },
    },
    update: {
      title: "Tulis 3 aturan keamanan wallet",
    },
    create: {
      questId: walletSafetyQuest.id,
      order: 1,
      title: "Tulis 3 aturan keamanan wallet",
      instructions:
        "Tulis minimal 3 aturan yang akan kamu ikuti untuk menjaga wallet tetap aman.",
      verificationType: "TEXT_SUBMISSION",
      verificationConfig: {
        minLength: 80,
      },
    },
  });

  const memoQuest = await prisma.quest.upsert({
    where: {
      slug: "stellar-memo-awareness-simulation",
    },
    update: {
      status: "PUBLISHED",
      courseId: stellarCourse.id,
    },
    create: {
      courseId: stellarCourse.id,
      slug: "stellar-memo-awareness-simulation",
      title: "Memo Awareness Simulation",
      description:
        "Latihan menjelaskan kenapa memo penting dalam beberapa alur pembayaran.",
      type: "LEARN",
      difficulty: "BEGINNER",
      status: "PUBLISHED",
      xpReward: 70,
      chainKey: "stellar-readiness",
      startsAt: new Date(),
    },
  });

  await prisma.questTask.upsert({
    where: {
      questId_order: {
        questId: memoQuest.id,
        order: 1,
      },
    },
    update: {
      title: "Jelaskan fungsi memo",
    },
    create: {
      questId: memoQuest.id,
      order: 1,
      title: "Jelaskan fungsi memo",
      instructions:
        "Jelaskan dengan bahasa sederhana kenapa memo/destination tag bisa dibutuhkan saat mengirim aset digital.",
      verificationType: "TEXT_SUBMISSION",
      verificationConfig: {
        minLength: 80,
      },
    },
  });

  const scamQuest = await prisma.quest.upsert({
    where: {
      slug: "stellar-scam-detection-practice",
    },
    update: {
      status: "PUBLISHED",
      courseId: stellarCourse.id,
    },
    create: {
      courseId: stellarCourse.id,
      slug: "stellar-scam-detection-practice",
      title: "Scam Detection Practice",
      description:
        "Latihan mengenali red flag dari fake airdrop, phishing, dan impersonator.",
      type: "COMMUNITY",
      difficulty: "BEGINNER",
      status: "PUBLISHED",
      xpReward: 80,
      chainKey: "stellar-readiness",
      startsAt: new Date(),
    },
  });

  await prisma.questTask.upsert({
    where: {
      questId_order: {
        questId: scamQuest.id,
        order: 1,
      },
    },
    update: {
      title: "Identifikasi 3 red flag scam",
    },
    create: {
      questId: scamQuest.id,
      order: 1,
      title: "Identifikasi 3 red flag scam",
      instructions:
        "Tuliskan 3 tanda bahaya dari scam Web3 dan cara kamu menghindarinya.",
      verificationType: "TEXT_SUBMISSION",
      verificationConfig: {
        minLength: 100,
      },
    },
  });

  const readinessQuest = await prisma.quest.upsert({
    where: {
      slug: "stellar-pre-transaction-confidence-review",
    },
    update: {
      status: "PUBLISHED",
      courseId: stellarCourse.id,
    },
    create: {
      courseId: stellarCourse.id,
      slug: "stellar-pre-transaction-confidence-review",
      title: "Pre-Transaction Confidence Review",
      description:
        "Review kesiapan learner sebelum mencoba transaksi digital bernilai nyata.",
      type: "COMMUNITY",
      difficulty: "BEGINNER",
      status: "PUBLISHED",
      xpReward: 100,
      chainKey: "stellar-readiness",
      startsAt: new Date(),
    },
  });

  await prisma.questTask.upsert({
    where: {
      questId_order: {
        questId: readinessQuest.id,
        order: 1,
      },
    },
    update: {
      title: "Buat checklist sebelum transaksi",
    },
    create: {
      questId: readinessQuest.id,
      order: 1,
      title: "Buat checklist sebelum transaksi",
      instructions:
        "Buat checklist pribadi sebelum transaksi: address, memo, nominal, jaringan, biaya, penerima, dan risiko.",
      verificationType: "TEXT_SUBMISSION",
      verificationConfig: {
        minLength: 120,
      },
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