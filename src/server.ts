import { config } from './config';

import { createServer } from 'core/createServer';
import { routes } from 'core/registerRoutes';

// server.get('/', async (_request, _reply) => {
//     // logger.info('Root endpoint accessed');
//     // reply.send({ message: 'Hello, TypeScript Fastify! 🎉' });
//     return { message: 'Hello, TypeScript Fastify! 🎉' };
// });

const start = async (): Promise<void> => {
    const server = await createServer();

    server.register(routes);
    try {
        await server.listen({ port: config.port });
        server.log.info(
            `🚀 Server running on http://localhost:${config.port.toString()} in ${config.env} environment`,
        );
    } catch (err) {
        server.log.error(err);

        process.exit(1);
    }
};

await start();
