import Router from 'express-promise-router';
import { container } from 'tsyringe';

import { QuestController, StationController } from '@api/controllers';
import { CreateStation, PageRpp } from '@api/dtos';
import { adminAuth, auth, validateBody, validateQuery } from '@api/middleware';

const stationRouter = Router();

const stationController = container.resolve(StationController);

stationRouter.post('/', validateBody(CreateStation), auth, stationController.createStation);
stationRouter.put('/:stationId', validateBody(CreateStation), stationController.editStation);
stationRouter.delete('/:stationId', auth, stationController.delete);

stationRouter.get('/', adminAuth, validateQuery(PageRpp), stationController.getStations);
stationRouter.get('/:stationId', auth, stationController.getStation);

stationRouter.get('/owned/:userId', auth, stationController.getStationsByOwnerId);
stationRouter.get('/count/owned/:userId', stationController.countStationsByOwnerId);

stationRouter.post('/complete/:stationId', auth, stationController.completeStation);
stationRouter.get('/user/:userId', auth, stationController.getUserStations);
stationRouter.get('/count/user/:userId', auth, stationController.countUserStations);
stationRouter.get('/:stationId/users', auth, stationController.countStationUsers);

stationRouter.post('/disable/:stationId', stationController.disableStation);
stationRouter.post('/enable/:stationId', stationController.enableStation);

export { stationRouter };
