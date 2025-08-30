import { config } from './config';
import { createServer } from 'core/createServer';

const start = async (): Promise<void> => {
const server = await createServer();

    // POZIOM 1: API Context
    await server.register(async (apiServer) => {
        // Shared API utilities
        apiServer.decorate('validateApiKey', (key) => key === 'valid-key');
        apiServer.decorate('apiLogger', (msg) => console.log(`[API] ${msg}`));

        // POZIOM 2: Auth Context (wszystko co wymaga auth)
        await apiServer.register(async (authServer) => {
            authServer.decorateRequest('user', null);
            authServer.addHook('preHandler', async (request, reply) => {
                // Simulate auth
                request.user = { id: '123', role: 'user' };
                authServer.apiLogger('User authenticated');
            });

            // POZIOM 3: User Management Context
            await authServer.register(async (userServer) => {
                userServer.decorate('userValidator', (data) => !!data.email);

                userServer.get('/profile', async (request) => {
                    return { user: request.user };
                });

                userServer.post('/update', async (request, reply) => {
                    if (!userServer.userValidator(request.body)) {
                        return reply.status(400).send({ error: 'Invalid data' });
                    }
                    return { updated: true };
                });

                // POZIOM 4: Admin Only Context
                await userServer.register(async (adminServer) => {
                    adminServer.addHook('preHandler', async (request, reply) => {
                        if (request.user?.role !== 'admin') {
                            return reply.status(403).send({ error: 'Admin only' });
                        }
                    });

                    adminServer.get('/all-users', async () => {
                        return { users: ['user1', 'user2'] };
                    });

                    adminServer.delete('/user/:id', async (request) => {
                        return { deleted: request.params.id };
                    });
                }, { prefix: '/admin' }); // /api/auth/users/admin/*

            }, { prefix: '/users' }); // /api/auth/users/*

            // POZIOM 3: Speech Therapy Context
            await authServer.register(async (speechServer) => {
                speechServer.decorate('speechProcessor', (audio) => ({ processed: audio }));
                speechServer.decorate('exerciseValidator', (exercise) => !!exercise.type);

                // POZIOM 4: Exercises Context
                await speechServer.register(async (exerciseServer) => {
                    exerciseServer.get('/', async () => {
                        return { exercises: ['breathing', 'pronunciation'] };
                    });

                    exerciseServer.post('/', async (request, reply) => {
                        if (!speechServer.exerciseValidator(request.body)) {
                            return reply.status(400).send({ error: 'Invalid exercise' });
                        }
                        return { created: true };
                    });

                    // POZIOM 5: Exercise Types Context
                    await exerciseServer.register(async (breathingServer) => {
                        breathingServer.get('/difficulty-levels', async () => {
                            return { levels: ['easy', 'medium', 'hard'] };
                        });
                    }, { prefix: '/breathing' }); // /api/auth/speech/exercises/breathing/*

                }, { prefix: '/exercises' }); // /api/auth/speech/exercises/*

                // POZIOM 4: Analysis Context
                await speechServer.register(async (analysisServer) => {
                    analysisServer.post('/audio', async (request) => {
                        const result = speechServer.speechProcessor(request.body.audio);
                        return { analysis: result };
                    });

                    analysisServer.get('/history', async (request) => {
                        return { history: `Analysis history for ${request.user.id}` };
                    });
                }, { prefix: '/analysis' }); // /api/auth/speech/analysis/*

            }, { prefix: '/speech' }); // /api/auth/speech/*

        }, { prefix: '/auth' }); // /api/auth/*

        // POZIOM 2: Public Context (bez auth)
        await apiServer.register(async (publicServer) => {
            publicServer.get('/health', async () => {
                publicServer.apiLogger('Health check called');
                return { status: 'ok' };
            });

            publicServer.post('/contact', async (request) => {
                return { message: 'Contact form submitted' };
            });
        }, { prefix: '/public' }); // /api/public/*

    }, { prefix: '/api' }); // /api/*

    await server.listen({ port: config.port });
    server.log.info(`🚀 Server running on http://localhost:${config.port.toString()}`);

};

await start();
