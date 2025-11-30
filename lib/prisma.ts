import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (typeof PrismaClient === 'undefined') {
  throw new Error('PrismaClient is not defined. Please run: npx prisma generate');
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    // log: ['error'],
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      // log: ['query', 'error', 'warn'],
    });
  }
  prisma = global.prisma;
}

export { prisma };