import { PrismaClient, TaskStatus } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.create({
    data: {
      name: "Usuario de Prueba",
      email: "test@example.com",
      password: hashedPassword,
    },
  });

  await prisma.task.create({
    data: {
      title: "Completar proyecto",
      description: "Terminar el proyecto de aplicación web con Express, React y Prisma",
      status: TaskStatus.TO_DO,
      userId: user.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
