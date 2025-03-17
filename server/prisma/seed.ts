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

  await prisma.task.createMany({
    data: [
      {
        title: "Completar proyecto",
        description: "Terminar el proyecto de aplicación web con Express, React y Prisma",
        status: TaskStatus.TO_DO,
        userId: user.id,
      },
      {
        title: "Crear frontend",
        description: "Desarrollar la interfaz de usuario con React",
        status: TaskStatus.DONE,
        userId: user.id,
      },
      {
        title: "Crear backend",
        description: "Desarrollar el servidor con Express y Prisma",
        status: TaskStatus.IN_PROGRESS,
        userId: user.id,
      },
    ],
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
