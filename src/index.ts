import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import 'reflect-metadata';

import { router } from '@api/routes';
import { ErrorHandler, handleError } from '@api/util';

import { config } from './api/config';

const baseUrl = '/v1';

const app = express();

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('cross-origin-resource-policy', 'cross-origin');

  next();
});

const server = createServer(app);

app.use(
  cors({
    origin: `*`,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(baseUrl, express.static('./public'));
app.use(baseUrl, router);

app.get('*', (req: express.Request, res: express.Response) => {
  return handleError(res, new ErrorHandler(404, `${req.url} not found.`));
});

router.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  return handleError(res, new ErrorHandler(500, err.message, err));
});

server.listen(Number(config.PORT), () => {
  console.log(`Listening on ${config.PORT}`);
});
