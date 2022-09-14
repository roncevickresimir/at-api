import Router from 'express-promise-router';
import { container } from 'tsyringe';
import PageRpp from '../models/PageRpp';
import StationController from '../controllers/StationController';
import upload from '../middleware/multer';
import validateBody from '../middleware/validateBody';
import validateQuery from '../middleware/validateQuery';
import { StationCreate } from '../models/Station';
import { EndUserStationCreate } from '../models/EndUserStation';
import EndUserStationController from '../controllers/EndUserStationController';
import RewardController from '../controllers/RewardController';

const stationRouter = Router();

const stationController = container.resolve(StationController);
const endUserStationController = container.resolve(EndUserStationController);
const rewardController = container.resolve(RewardController);

stationRouter.post(
    '/',
    upload().array('images'),
    validateBody(StationCreate),
    stationController.PostStationAsync
);

stationRouter.get('/count', stationController.CountStationsByUserIdAsync);

stationRouter.get(
    '/',
    validateQuery(PageRpp),
    stationController.FetchStationsAsync
);

stationRouter.get('/:stationId', stationController.FetchStationAsync);

stationRouter.delete('/:stationId', stationController.DeleteAsync);

stationRouter.put(
    '/:stationId',
    upload().array('images'),
    validateBody(StationCreate),
    stationController.PutStationAsync
);

stationRouter.get(
    '/disable/:stationId',
    stationController.PutStationDisabledAsync
);

stationRouter.get(
    '/enable/:stationId',
    stationController.PutStationEnabledAsync
);

stationRouter.post(
    '/complete/',
    endUserStationController.PostEndUserStationAsync,
    rewardController.PostAsync
);

export default stationRouter;
