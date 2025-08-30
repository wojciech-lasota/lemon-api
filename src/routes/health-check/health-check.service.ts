import type { FastifyInstance, FastifyReply } from 'fastify';

// const prisma = new PrismaClient();

export const healthCheck = (reply: FastifyReply): void => {
    reply.status(200).send({ message: `OK` });
};

export const dbHealthCheck = async (
    reply: FastifyReply,
    fastify: FastifyInstance,
): Promise<void> => {
    const startTime = Date.now();
    try {
        await fastify.prisma.$queryRaw`SELECT 1`;
        const duration = Date.now() - startTime;
        reply.send({
            message: 'DB connection successful',
            responseTime: `${duration.toString()}ms`,
        });
    } catch (error) {
        console.error(error);
        reply.status(500).send({
            details: error,
            message: 'DB connection failed',
        });
    }
};
