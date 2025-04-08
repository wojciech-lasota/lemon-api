// import {ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express'; // ErrorRequestHandler

import { config } from './config';
import { setupLogging } from './logging';

import { router } from 'routes/router';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(cookieParser());

const {
    errorLogger,
    logger,
    // sentryErrorHandler
} = setupLogging(app);

app.use('/api', router);

// The error handler must be BEFORE any other error middleware and AFTER all controllers
// app.use(sentryErrorHandler);

// Optional fallthrough error handler
// const onErrorSentry: ErrorRequestHandler = (_err, _req, res) => {
//     // The error id is attached to `res.sentry` to be returned
//     // and optionally displayed to the user for support.
//     res.statusCode = 500;
//     // @ts-ignore
//     res.end((res.sentry as string) + '\n');
// };

// app.use(onErrorSentry);

// express-winston errorLogger AFTER the router and AFTER sentry.
app.use(errorLogger);

console.log = (message: string) =>
    logger.log({
        level: 'info',
        message,
    });
console.warn = (message: string) =>
    logger.warn({
        level: 'warn',
        message,
    });
console.error = (message: string) =>
    logger.error({
        level: 'error',
        message,
    });

export const server = app.listen(config.port, () => {
    console.log(
        `Server running on port ${config.port.toString()} in ${config.env} environment`,
    );
});
