// import { FastifyInstance } from 'fastify';
// import winston, { Logger } from 'winston';
// import DailyRotateFile from 'winston-daily-rotate-file';

// // Konfiguracja formatu Winston - definiuje jak będą wyglądać logi
// // TODO: don't disable this rule
// /* eslint-disable @typescript-eslint/restrict-template-expressions */
// const winstonFormat = winston.format.combine(
//     winston.format.timestamp(), // Dodaje timestamp do każdego loga
//     winston.format.errors({ stack: true }), // Zachowuje stack trace błędów
//     winston.format.splat(), // Pozwala na string interpolation (printf-style)
//     winston.format.printf(({ timestamp, level, message, stack }) => {
//         // Formatuje wiadomość loga - jeśli jest stack trace, dodaje go w nowej linii
//         return stack
//             ? `${timestamp} [${level}] ${message}\n${stack}`
//             : `${timestamp} [${level}] ${message}`;
//     }),
// );
// /* eslint-enable @typescript-eslint/restrict-template-expressions */

// export const setupLogging = (app: FastifyInstance): Logger => {
//     // Konfiguracja Winston - główna konfiguracja loggera
//     const winstonConfig = {
//         format: winstonFormat, // Używa wcześniej zdefiniowanego formatu
//         transports: [
//             // Transport do konsoli - wyświetla logi na poziomie 'http' i wyżej
//             new winston.transports.Console({
//                 level: 'http',
//             }),
//             // Transport do pliku z wszystkimi logami (combined)
//             // Pliki są rotowane codziennie, archiwizowane i usuwane po 14 dniach
//             new DailyRotateFile({
//                 filename: 'logs/combined-%DATE%.log',
//                 datePattern: 'YYYY-MM-DD', // Format daty w nazwie pliku
//                 zippedArchive: true, // Kompresuj stare pliki
//                 maxSize: '20m', // Maksymalny rozmiar pojedynczego pliku
//                 maxFiles: '14d', // Przechowuj pliki przez 14 dni
//                 level: 'http', // Loguj od poziomu 'http' w górę
//             }),
//             // Transport tylko dla błędów - osobny plik dla łatwiejszego debugowania
//             new DailyRotateFile({
//                 filename: 'logs/error-%DATE%.log',
//                 datePattern: 'YYYY-MM-DD',
//                 zippedArchive: true,
//                 maxSize: '20m',
//                 maxFiles: '30d', // Błędy przechowuj dłużej - 30 dni
//                 level: 'error', // Tylko błędy (error i fatal)
//             }),
//         ],
//     };

//     // Tworzenie głównego loggera Winston z naszą konfiguracją
//     const logger = winston.createLogger(winstonConfig);

//     // Dodanie custom logger stream do Fastify
//     const fastifyLogger = {
//         stream: {
//             write: (message: string) => {
//                 // Usuwamy końcowe znaki nowej linii i logujemy jako info
//                 logger.info(message.trim());
//             },
//         },
//     };

//     // Rejestracja hook'ów dla logowania requestów i błędów w Fastify
//     app.addHook('onRequest', async (request, reply) => {
//         logger.http(`${request.method} ${request.url} - ${request.ip}`);
//     });

//     app.addHook('onResponse', async (request, reply) => {
//         logger.http(
//             `${request.method} ${request.url} - ${reply.statusCode} - ${reply.getResponseTime()}ms`,
//         );
//     });

//     app.addHook('onError', async (request, reply, error) => {
//         logger.error(`Error in ${request.method} ${request.url}:`, error);
//     });

//     // Zwracamy główny logger do użycia w całej aplikacji
//     return logger;
// };

// // Export typu dla lepszego TypeScript support
// export type AppLogger = Logger;
