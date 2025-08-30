import type { IncomingMessage, Server, ServerResponse } from 'http';

import fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
// import { FastifyInstance } from 'fastify/types/instance';

import prismaPlugin from '../plugins/prisma';

// import { setupLogging } from './logging';

// Setup Winston logging system
// const logger = setupLogging(server);

export const createServer = async (): Promise<
    FastifyInstance<Server, IncomingMessage, ServerResponse>
> => {
    const server = fastify({
        logger: true,
    });

    // Register plugins in order (dependencies matter)
    await server.register(prismaPlugin);

    return server;
};
