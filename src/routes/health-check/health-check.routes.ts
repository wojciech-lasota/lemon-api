// import { FastifyInstance } from 'fastify';
import type { FastifyInstance } from 'fastify';

import { dbHealthCheck, healthCheck } from './health-check.service';

export const healthCheckRoutes = (fastify: FastifyInstance): void => {
    fastify.get('/', async (_request, reply) => {
        healthCheck(reply);
    });
    fastify.get('/db', async (_request, reply) => {
        await dbHealthCheck(reply, fastify);
    });
};
