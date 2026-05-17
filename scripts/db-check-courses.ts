import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.time("courses-query");

  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      status: true,
    },
  });

  console.table(courses);
  console.timeEnd("courses-query");
}

main()
  .catch((error) => {
    console.error("Course query check failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });