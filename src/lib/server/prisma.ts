// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { logError } from "@/lib/server/utils";


const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

try {
  prisma = globalForPrisma.prisma ?? new PrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }
} catch (err) {
  logError(err);
  throw err;
}

export default prisma;