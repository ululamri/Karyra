import "dotenv/config";
import { prisma } from "../src/lib/prisma";

const courseData = {
  slug: "blockchain-untuk-orang-awam",
  title: "Blockchain untuk Orang Awam",
  subtitle:
    "Memahami blockchain dari analogi sehari-hari sebelum menyentuh wallet, token, atau transaksi nyata.",
  description:
    "Course panjang untuk pemula non-teknikal. Fokusnya bukan trading, bukan spekulasi, tetapi pemahaman dasar: apa itu blockchain, kenapa data bisa dipercaya, apa itu wallet, apa risiko pengguna baru, dan bagaimana membangun kesiapan sebelum praktik Web3.",
  modules: [
    {
      title: "Memahami Masalah Kepercayaan Digital",
      description:
        "Sebelum belajar blockchain, learner perlu memahami kenapa internet biasa sering membutuhkan pihak tengah dan kenapa kepercayaan digital menjadi masalah.",
      lessons: [
        {
          slug: "kenapa-kita-butuh-kepercayaan-digital",
          title: "Kenapa Kita Butuh Kepercayaan Digital?",
          minutes: 7,
          xp: 20,
          blocks: [
            "Di kehidupan sehari-hari, kita sering mempercayai pihak ketiga: bank, marketplace, aplikasi pembayaran, sekolah, atau kantor desa. Mereka mencatat siapa punya apa, siapa membayar siapa, dan apa yang dianggap valid.",
            "Masalah muncul ketika catatan itu sulit dicek, mudah berubah tanpa transparansi, atau hanya bisa dipercaya karena satu pihak memegang kendali penuh.",
            "Blockchain mencoba menjawab pertanyaan sederhana: bagaimana jika catatan penting bisa diverifikasi bersama, tanpa harus selalu bergantung pada satu penjaga data?",
          ],
          quiz: {
            prompt: "Apa masalah utama yang ingin dijawab blockchain?",
            options: [
              "Membantu banyak pihak memverifikasi catatan yang sama",
              "Membuat semua orang pasti kaya dengan cepat",
              "Menghapus kebutuhan belajar keamanan digital",
            ],
            correct: "a",
          },
        },
        {
          slug: "catatan-bersama-dalam-kehidupan-sehari-hari",
          title: "Catatan Bersama dalam Kehidupan Sehari-hari",
          minutes: 8,
          xp: 20,
          blocks: [
            "Bayangkan satu buku kas kelompok arisan yang dilihat semua anggota. Setiap iuran dicatat, setiap perubahan terlihat, dan anggota bisa mengecek apakah catatan masuk akal.",
            "Blockchain mirip ide catatan bersama, tetapi berjalan di jaringan komputer. Banyak peserta menyimpan salinan catatan yang sama, sehingga perubahan sepihak menjadi lebih sulit dilakukan tanpa terlihat.",
            "Analogi ini tidak sempurna, tetapi membantu pemula memahami bahwa blockchain bukan sekadar koin, melainkan cara menyimpan dan memverifikasi catatan digital.",
          ],
          quiz: {
            prompt: "Analogi sederhana blockchain dalam lesson ini adalah...",
            options: [
              "Buku kas bersama yang bisa dicek banyak anggota",
              "Kotak rahasia yang tidak boleh dilihat siapa pun",
              "Aplikasi chat biasa tanpa catatan transaksi",
            ],
            correct: "a",
          },
        },
        {
          slug: "blockchain-bukan-hanya-kripto",
          title: "Blockchain Bukan Hanya Kripto",
          minutes: 8,
          xp: 20,
          blocks: [
            "Banyak orang pertama kali mengenal blockchain dari harga kripto. Akibatnya, blockchain sering dianggap hanya soal trading atau keuntungan cepat.",
            "Padahal blockchain juga dapat dipahami sebagai teknologi pencatatan, verifikasi, identitas digital, proof record, pembayaran, arsip, dan koordinasi komunitas.",
            "Di Karyra, blockchain diposisikan sebagai literasi kesiapan: pemula belajar memahami prinsipnya sebelum melakukan tindakan berisiko seperti mengirim aset atau menghubungkan wallet.",
          ],
          quiz: {
            prompt: "Di Karyra, blockchain sebaiknya dipahami pertama kali sebagai...",
            options: [
              "Teknologi catatan dan verifikasi digital",
              "Jalan cepat untuk spekulasi",
              "Pengganti semua aplikasi internet",
            ],
            correct: "a",
          },
        },
      ],
    },
    {
      title: "Cara Kerja Blockchain secara Sederhana",
      description:
        "Modul ini menjelaskan blok, rantai, validasi, jaringan, dan kenapa data lama sulit diubah.",
      lessons: [
        {
          slug: "apa-itu-blok-dan-rantai",
          title: "Apa Itu Blok dan Rantai?",
          minutes: 9,
          xp: 25,
          blocks: [
            "Kata blockchain terdiri dari dua kata: block dan chain. Block berisi sekumpulan data, sedangkan chain berarti blok-blok tersebut disusun berurutan seperti rantai.",
            "Setiap blok terhubung dengan blok sebelumnya. Jika data lama diubah, hubungan antarblok dapat ikut berubah dan jaringan bisa melihat ada sesuatu yang tidak cocok.",
            "Bagi pemula, cukup pahami bahwa blockchain mencoba membuat catatan berurutan yang sulit dimanipulasi diam-diam.",
          ],
          quiz: {
            prompt: "Apa arti sederhana dari blockchain?",
            options: [
              "Blok data yang tersusun berurutan seperti rantai",
              "Folder biasa di komputer pribadi",
              "Aplikasi untuk menyimpan foto saja",
            ],
            correct: "a",
          },
        },
        {
          slug: "kenapa-data-blockchain-sulit-diubah",
          title: "Kenapa Data Blockchain Sulit Diubah?",
          minutes: 10,
          xp: 25,
          blocks: [
            "Dalam blockchain, banyak komputer dapat menyimpan dan memeriksa catatan yang sama. Jika satu pihak mencoba mengubah data lama, perubahan itu harus cocok dengan aturan jaringan.",
            "Karena catatan saling terhubung, perubahan kecil pada data lama dapat membuat catatan berikutnya menjadi tidak cocok.",
            "Inilah alasan blockchain sering disebut tahan manipulasi. Bukan berarti mustahil ada risiko, tetapi perubahan sepihak menjadi jauh lebih sulit dibanding catatan biasa yang hanya disimpan satu pihak.",
          ],
          quiz: {
            prompt: "Kenapa data lama di blockchain lebih sulit diubah diam-diam?",
            options: [
              "Karena banyak pihak bisa memeriksa catatan yang sama",
              "Karena tidak ada aturan sama sekali",
              "Karena semua password dibagikan ke publik",
            ],
            correct: "a",
          },
        },
        {
          slug: "apa-itu-validasi-transaksi",
          title: "Apa Itu Validasi Transaksi?",
          minutes: 9,
          xp: 25,
          blocks: [
            "Validasi adalah proses memeriksa apakah sebuah transaksi atau perubahan data memenuhi aturan jaringan.",
            "Contohnya, jaringan perlu memastikan bahwa pengirim memang memiliki hak untuk mengirim, format transaksi benar, dan transaksi tidak bertentangan dengan catatan sebelumnya.",
            "Untuk pemula, validasi bisa dipahami sebagai proses cek ulang oleh sistem sebelum catatan baru diterima ke blockchain.",
          ],
          quiz: {
            prompt: "Apa fungsi validasi dalam blockchain?",
            options: [
              "Memeriksa apakah transaksi memenuhi aturan jaringan",
              "Membuat semua transaksi otomatis benar tanpa cek",
              "Menghapus semua catatan lama",
            ],
            correct: "a",
          },
        },
      ],
    },
    {
      title: "Wallet, Kunci, dan Kepemilikan Digital",
      description:
        "Modul ini memperkenalkan wallet dan kepemilikan digital dengan bahasa aman untuk pemula.",
      lessons: [
        {
          slug: "wallet-bukan-dompet-biasa",
          title: "Wallet Bukan Dompet Biasa",
          minutes: 9,
          xp: 25,
          blocks: [
            "Banyak pemula mengira wallet kripto sama seperti dompet uang biasa. Padahal wallet lebih tepat dipahami sebagai alat untuk mengakses dan mengelola hak atas aset atau identitas digital.",
            "Aset biasanya tercatat di jaringan, sedangkan wallet membantu pengguna membuktikan bahwa mereka punya hak untuk mengakses atau memindahkan aset tersebut.",
            "Karena itu, keamanan wallet sangat penting. Jika akses wallet hilang atau dicuri, pengguna bisa kehilangan kontrol atas aset digitalnya.",
          ],
          quiz: {
            prompt: "Wallet Web3 paling tepat dipahami sebagai...",
            options: [
              "Alat untuk mengakses dan mengelola hak digital",
              "Tempat fisik menyimpan uang kertas",
              "Aplikasi yang tidak punya risiko keamanan",
            ],
            correct: "a",
          },
        },
        {
          slug: "seed-phrase-dan-risiko-kehilangan-akses",
          title: "Seed Phrase dan Risiko Kehilangan Akses",
          minutes: 10,
          xp: 30,
          blocks: [
            "Seed phrase adalah rangkaian kata yang bisa digunakan untuk memulihkan wallet. Siapa pun yang memilikinya dapat berpotensi mengakses wallet tersebut.",
            "Pemula sering menjadi target penipuan yang meminta seed phrase dengan alasan bantuan teknis, airdrop, atau verifikasi akun.",
            "Aturan sederhana: jangan pernah membagikan seed phrase ke siapa pun. Karyra menempatkan pemahaman ini sebagai bagian penting dari readiness sebelum praktik Web3.",
          ],
          quiz: {
            prompt: "Apa aturan paling penting tentang seed phrase?",
            options: [
              "Jangan pernah membagikannya kepada siapa pun",
              "Kirim ke grup agar tidak hilang",
              "Tulis di kolom komentar publik",
            ],
            correct: "a",
          },
        },
        {
          slug: "kepemilikan-digital-dan-tanggung-jawab",
          title: "Kepemilikan Digital dan Tanggung Jawab",
          minutes: 9,
          xp: 25,
          blocks: [
            "Web3 sering membicarakan kepemilikan digital. Artinya, pengguna dapat memiliki akses langsung terhadap aset, identitas, atau bukti tertentu tanpa selalu bergantung pada akun platform biasa.",
            "Namun kepemilikan juga membawa tanggung jawab. Jika salah kirim, terkena phishing, atau membagikan akses, tidak selalu ada customer service yang bisa mengembalikan semuanya.",
            "Karena itu, Karyra mengajarkan Web3 dengan pendekatan non-teknikal first: paham risiko dulu, baru praktik teknikal kemudian.",
          ],
          quiz: {
            prompt: "Kenapa kepemilikan digital membutuhkan tanggung jawab?",
            options: [
              "Karena pengguna perlu menjaga akses dan memahami risiko",
              "Karena semua kesalahan pasti otomatis dibatalkan",
              "Karena tidak perlu belajar keamanan",
            ],
            correct: "a",
          },
        },
      ],
    },
    {
      title: "Transaksi, Biaya, dan Kesalahan Umum",
      description:
        "Modul ini membantu pemula memahami transaksi sebelum mencoba praktik nyata.",
      lessons: [
        {
          slug: "apa-yang-terjadi-saat-transaksi-dikirim",
          title: "Apa yang Terjadi Saat Transaksi Dikirim?",
          minutes: 10,
          xp: 30,
          blocks: [
            "Saat transaksi dikirim, wallet membuat instruksi yang kemudian diperiksa oleh jaringan. Jika memenuhi aturan, transaksi dapat dimasukkan ke catatan blockchain.",
            "Transaksi biasanya memiliki detail penting: pengirim, penerima, nominal, jaringan, biaya, dan kadang memo atau data tambahan.",
            "Pemula perlu memahami bahwa transaksi blockchain sering sulit dibatalkan. Karena itu, cek ulang sebelum mengirim menjadi kebiasaan penting.",
          ],
          quiz: {
            prompt: "Apa kebiasaan penting sebelum mengirim transaksi?",
            options: [
              "Cek ulang penerima, nominal, jaringan, dan detail penting lain",
              "Langsung kirim tanpa membaca",
              "Membagikan seed phrase untuk memastikan transaksi",
            ],
            correct: "a",
          },
        },
        {
          slug: "biaya-jaringan-dan-waktu-konfirmasi",
          title: "Biaya Jaringan dan Waktu Konfirmasi",
          minutes: 8,
          xp: 25,
          blocks: [
            "Beberapa blockchain mengenakan biaya jaringan. Biaya ini bisa berbeda tergantung jaringan, kondisi lalu lintas, dan desain teknologi yang digunakan.",
            "Selain biaya, pengguna juga perlu memahami waktu konfirmasi. Ada transaksi yang terasa cepat, ada juga yang membutuhkan waktu lebih lama.",
            "Karyra tidak mendorong pemula langsung transaksi. Yang penting adalah memahami bahwa biaya dan konfirmasi adalah bagian dari pengalaman Web3.",
          ],
          quiz: {
            prompt: "Apa yang perlu dipahami tentang transaksi blockchain?",
            options: [
              "Biaya dan waktu konfirmasi bisa berbeda antar jaringan",
              "Semua transaksi selalu gratis dan instan",
              "Biaya jaringan berarti transaksi pasti scam",
            ],
            correct: "a",
          },
        },
        {
          slug: "salah-kirim-dan-checklist-pencegahan",
          title: "Salah Kirim dan Checklist Pencegahan",
          minutes: 10,
          xp: 30,
          blocks: [
            "Salah kirim adalah risiko besar bagi pengguna baru. Kesalahan bisa terjadi karena address salah, jaringan berbeda, memo tidak diisi, atau nominal keliru.",
            "Checklist sederhana dapat mengurangi risiko: cek penerima, address, jaringan, nominal, memo jika diperlukan, biaya, dan tujuan transaksi.",
            "Di Karyra, checklist seperti ini menjadi bagian dari Proof-of-Readiness karena menunjukkan learner tidak hanya tahu teori, tetapi punya kebiasaan aman.",
          ],
          quiz: {
            prompt: "Apa tujuan checklist sebelum transaksi?",
            options: [
              "Mengurangi risiko kesalahan dan membangun kebiasaan aman",
              "Membuat transaksi lebih berisiko",
              "Menghapus kebutuhan memahami wallet",
            ],
            correct: "a",
          },
        },
      ],
    },
    {
      title: "Scam, Phishing, dan Perlindungan Pemula",
      description:
        "Modul keamanan dasar agar pemula tidak mudah tertipu sebelum memahami Web3 lebih jauh.",
      lessons: [
        {
          slug: "modus-scam-yang-sering-menarget-pemula",
          title: "Modus Scam yang Sering Menarget Pemula",
          minutes: 9,
          xp: 30,
          blocks: [
            "Pemula sering ditarget karena belum mengenal pola penipuan. Modus umum termasuk fake airdrop, link palsu, admin palsu, investasi instan, dan permintaan seed phrase.",
            "Scammer biasanya membuat suasana mendesak: cepat klaim, cepat transfer, akun akan ditutup, atau kesempatan hanya sekali.",
            "Karyra mengajarkan pemula untuk memperlambat keputusan. Jika sesuatu terdengar terlalu bagus atau terlalu mendesak, berhenti dan cek ulang.",
          ],
          quiz: {
            prompt: "Apa tanda bahaya umum scam Web3?",
            options: [
              "Janji profit besar, link mencurigakan, dan permintaan seed phrase",
              "Materi edukasi yang meminta membaca perlahan",
              "Checklist keamanan sebelum transaksi",
            ],
            correct: "a",
          },
        },
        {
          slug: "cara-memeriksa-link-dan-identitas",
          title: "Cara Memeriksa Link dan Identitas",
          minutes: 9,
          xp: 25,
          blocks: [
            "Sebelum membuka link atau mengikuti instruksi, periksa sumbernya. Apakah link berasal dari situs resmi? Apakah nama domain benar? Apakah akun yang mengirim benar-benar akun resmi?",
            "Banyak penipuan menggunakan nama mirip, logo mirip, atau pesan personal yang terlihat meyakinkan. Pemula tidak boleh hanya mengandalkan tampilan visual.",
            "Kebiasaan aman: jangan klik tergesa-gesa, bandingkan dengan sumber resmi, tanyakan ke mentor terpercaya, dan jangan pernah memasukkan seed phrase.",
          ],
          quiz: {
            prompt: "Apa kebiasaan aman saat menerima link Web3?",
            options: [
              "Cek sumber, domain, dan jangan tergesa-gesa",
              "Langsung klik karena terlihat menarik",
              "Masukkan seed phrase jika diminta admin",
            ],
            correct: "a",
          },
        },
        {
          slug: "membangun-kebiasaan-aman-sebelum-praktik",
          title: "Membangun Kebiasaan Aman Sebelum Praktik",
          minutes: 8,
          xp: 25,
          blocks: [
            "Keamanan Web3 bukan hanya pengetahuan teknis. Yang lebih penting adalah kebiasaan: membaca pelan, mengecek ulang, tidak mudah panik, dan tidak mudah tergiur hadiah.",
            "Karyra membantu learner membangun kebiasaan aman sebelum masuk ke praktik teknikal. Ini sejalan dengan Proof-of-Readiness.",
            "Seseorang dianggap lebih siap bukan karena sudah mencoba banyak transaksi, tetapi karena paham risiko dan memiliki checklist aman sebelum bertindak.",
          ],
          quiz: {
            prompt: "Apa tanda learner lebih siap masuk praktik Web3?",
            options: [
              "Memiliki kebiasaan aman dan memahami risiko",
              "Berani klik semua link hadiah",
              "Tidak perlu mengecek detail transaksi",
            ],
            correct: "a",
          },
        },
      ],
    },
    {
      title: "Dari Pemahaman ke Readiness Passport",
      description:
        "Modul penutup yang menghubungkan course, lesson, progress, workshop, dan passport.",
      lessons: [
        {
          slug: "apa-itu-proof-of-learning",
          title: "Apa Itu Proof-of-Learning?",
          minutes: 8,
          xp: 25,
          blocks: [
            "Proof-of-Learning adalah bukti bahwa learner telah mengikuti proses belajar tertentu. Dalam Karyra, ini dapat berasal dari course, lesson completion, quiz, dan progress belajar.",
            "Bukti ini penting karena edukasi Web3 tidak cukup hanya berupa klaim. Learner perlu menunjukkan bahwa mereka telah melalui materi dasar sebelum masuk ke praktik berisiko.",
            "Proof-of-Learning menjadi salah satu fondasi Readiness Passport Karyra.",
          ],
          quiz: {
            prompt: "Proof-of-Learning menunjukkan bahwa learner...",
            options: [
              "Telah mengikuti proses belajar tertentu",
              "Pasti sudah ahli semua teknologi",
              "Tidak perlu belajar keamanan lagi",
            ],
            correct: "a",
          },
        },
        {
          slug: "apa-itu-proof-of-readiness",
          title: "Apa Itu Proof-of-Readiness?",
          minutes: 9,
          xp: 30,
          blocks: [
            "Proof-of-Readiness adalah sinyal bahwa learner lebih siap untuk masuk ke praktik Web3. Ini bukan jaminan sempurna, tetapi indikator bahwa learner telah memahami dasar, risiko, dan checklist aman.",
            "Readiness berbeda dari sekadar menyelesaikan materi. Readiness menekankan kesiapan mengambil keputusan: kapan berhenti, kapan cek ulang, dan kapan meminta bantuan.",
            "Di Karyra, readiness dibangun bertahap dari lesson, progress, aktivitas, dan proof record.",
          ],
          quiz: {
            prompt: "Readiness dalam Karyra paling dekat dengan...",
            options: [
              "Kesiapan memahami risiko dan mengambil keputusan lebih aman",
              "Keberanian transaksi tanpa berpikir",
              "Jumlah token yang dimiliki",
            ],
            correct: "a",
          },
        },
        {
          slug: "membaca-readiness-passport",
          title: "Membaca Readiness Passport",
          minutes: 8,
          xp: 25,
          blocks: [
            "Readiness Passport merangkum perjalanan learner: progress course, lesson completion, badge, proof record, workshop, dan readiness score.",
            "Passport bukan sekadar halaman profil. Passport adalah ringkasan bukti belajar dan kesiapan yang bisa ditunjukkan kepada mentor, komunitas, atau reviewer.",
            "Untuk pemula lokal, passport membantu menjawab pertanyaan: saya sudah belajar apa, sudah ikut apa, dan sudah siap sejauh mana?",
          ],
          quiz: {
            prompt: "Readiness Passport membantu learner melihat...",
            options: [
              "Progress, proof, badge, dan kesiapan belajar",
              "Harga token secara real-time",
              "Password semua akun",
            ],
            correct: "a",
          },
        },
      ],
    },
  ],
};

function makeContent(title: string, paragraphs: string[]) {
  return {
    blocks: [
      {
        type: "heading",
        text: title,
      },
      ...paragraphs.map((text) => ({
        type: "paragraph",
        text,
      })),
    ],
  };
}

function makeOptions(options: string[]) {
  return options.map((text, index) => ({
    id: String.fromCharCode(97 + index),
    text,
  }));
}

async function main() {
  console.log("Seeding long blockchain course for Karyra...");

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
      bio: "Default admin account for Karyra development.",
    },
  });

  const course = await prisma.course.upsert({
    where: {
      slug: courseData.slug,
    },
    update: {
      title: courseData.title,
      subtitle: courseData.subtitle,
      description: courseData.description,
      status: "PUBLISHED",
      creatorId: admin.id,
      publishedAt: new Date(),
    },
    create: {
      slug: courseData.slug,
      title: courseData.title,
      subtitle: courseData.subtitle,
      description: courseData.description,
      locale: "id-ID",
      difficulty: "BEGINNER",
      status: "PUBLISHED",
      creatorId: admin.id,
      publishedAt: new Date(),
    },
  });

  for (const [moduleIndex, moduleData] of courseData.modules.entries()) {
    const moduleOrder = moduleIndex + 1;

    const module = await prisma.courseModule.upsert({
      where: {
        courseId_order: {
          courseId: course.id,
          order: moduleOrder,
        },
      },
      update: {
        title: moduleData.title,
        description: moduleData.description,
      },
      create: {
        courseId: course.id,
        order: moduleOrder,
        title: moduleData.title,
        description: moduleData.description,
      },
    });

    for (const [lessonIndex, lessonData] of moduleData.lessons.entries()) {
      const lessonOrder = lessonIndex + 1;

      const lesson = await prisma.lesson.upsert({
        where: {
          moduleId_slug: {
            moduleId: module.id,
            slug: lessonData.slug,
          },
        },
        update: {
          title: lessonData.title,
          order: lessonOrder,
          status: "PUBLISHED",
          creatorId: admin.id,
          estimatedMinutes: lessonData.minutes,
          xpReward: lessonData.xp,
          content: makeContent(lessonData.title, lessonData.blocks),
          publishedAt: new Date(),
        },
        create: {
          moduleId: module.id,
          creatorId: admin.id,
          slug: lessonData.slug,
          order: lessonOrder,
          title: lessonData.title,
          type: "ARTICLE",
          status: "PUBLISHED",
          estimatedMinutes: lessonData.minutes,
          xpReward: lessonData.xp,
          isRequired: true,
          publishedAt: new Date(),
          content: makeContent(lessonData.title, lessonData.blocks),
          resources: {
            links: [],
          },
        },
      });

      await prisma.quizQuestion.upsert({
        where: {
          lessonId_order: {
            lessonId: lesson.id,
            order: 1,
          },
        },
        update: {
          prompt: lessonData.quiz.prompt,
          options: makeOptions(lessonData.quiz.options),
          answer: {
            correctOptionId: lessonData.quiz.correct,
          },
          explanation:
            "Jawaban ini sesuai dengan pendekatan Karyra: pahami dasar dan risiko sebelum praktik Web3.",
          points: 1,
        },
        create: {
          lessonId: lesson.id,
          order: 1,
          prompt: lessonData.quiz.prompt,
          options: makeOptions(lessonData.quiz.options),
          answer: {
            correctOptionId: lessonData.quiz.correct,
          },
          explanation:
            "Jawaban ini sesuai dengan pendekatan Karyra: pahami dasar dan risiko sebelum praktik Web3.",
          points: 1,
        },
      });
    }
  }

  console.log(
    `Seeded ${courseData.modules.length} modules and ${courseData.modules.reduce(
      (total, moduleData) => total + moduleData.lessons.length,
      0,
    )} lessons for ${courseData.title}.`,
  );
}

main()
  .catch((error) => {
    console.error("Failed to seed blockchain course:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
