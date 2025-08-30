import { FastifyInstance } from 'fastify';

import { healthCheckRoutes } from 'routes/health-check/health-check.routes';

const registerRoutes = (fastify: FastifyInstance): void => {
    fastify.register(healthCheckRoutes, { prefix: '/health-check' });

    // Note: Controller-based routes are now automatically registered
    // via the controllers plugin using decorators
    // See: /users and /posts endpoints
};

export { registerRoutes as routes };
