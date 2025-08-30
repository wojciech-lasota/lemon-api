import { PrismaClient } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const prismaPlugin: FastifyPluginAsync = async (server) => {
    const prisma = new PrismaClient();

    await prisma.$connect();

    server.decorate('prisma', prisma);

    server.addHook('onClose', async (app) => {
        await app.prisma.$disconnect();
    });
};

export default fp(prismaPlugin, { name: 'prisma' });
