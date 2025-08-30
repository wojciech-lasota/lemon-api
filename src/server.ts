// 👋 Welcome to Fastify with TypeScript!
import Fastify from 'fastify';

import { config } from './config';
// import { setupLogging } from './logging';

// 🎯 Create our server instance
const server = Fastify({
    logger: true,
});

// Setup Winston logging system
// const logger = setupLogging(server);

server.get('/', async (_request, _reply) => {
    // logger.info('Root endpoint accessed');
    // reply.send({ message: 'Hello, TypeScript Fastify! 🎉' });
    return { message: 'Hello, TypeScript Fastify! 🎉' };
});

// Start the server
const start = async (): Promise<void> => {
    try {
        await server.listen({ port: config.port });
        console.log(
            `🚀 Server running on http://localhost:${config.port.toString()} in ${config.env} environment`,
        );
        // logger.info(
        //     `🚀 Server running on http://localhost:${config.port} in ${config.env} environment`,
        // );
    } catch (err) {
        // logger.error('Failed to start server:', err);
        server.log.error(err);

        process.exit(1);
    }
};

await start();
