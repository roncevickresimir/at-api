import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import router from './api/routes';
import handleError, { ErrorHandler } from './api/util/handleError';
import { PORT } from './config';

const baseUrl = '/questing';

const app = express();

const corsPort = `*`; //`https://${UI_HOST}`;

const corsOptions = {
    origin: corsPort,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
};

const server = createServer(app);

app.use(
    cors({
        allowedHeaders: ['authorization', 'Content-Type'],
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(baseUrl, express.static('./public'));

app.use(baseUrl, router);

app.get('*', (req: express.Request, res: express.Response) => {
    return handleError(res, new ErrorHandler(404, `${req.url} not found.`));
});

router.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
        _next: express.NextFunction
    ) => {
        /*AppLogger.Error(
        `An exception ${err.message} has been thrown by the system.`,
        err
    );*/

        return handleError(res, new ErrorHandler(500, err.message, err));
    }
);

app.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
        _next: express.NextFunction
    ) => {
        /*AppLogger.Error(err.message, err);*/
        return handleError(
            res,
            new ErrorHandler(500, 'BACKEND_ERRORS.BASE.INTERNAL_ERROR')
        );
    }
);
server.listen(Number(PORT), () => {
    /*scheduleService.ClearNotificationHistoryAsync();
    scheduleService.StartingSoonAsync();
    scheduleService.DeleteNotAcceptedAsync();*/
});
