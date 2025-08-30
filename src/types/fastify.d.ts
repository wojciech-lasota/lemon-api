import { PrismaClient } from '@prisma/client';

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
        utility: () => void;
    }
}
