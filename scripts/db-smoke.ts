import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  const result = await prisma.$queryRaw<{ now: Date }[]>`
    SELECT NOW() as now
  `;

  console.log("Database connected:", result[0]?.now);
}

main()
  .catch((error) => {
    console.error("Database smoke test failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });