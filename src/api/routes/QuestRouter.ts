import Router from 'express-promise-router';
import { container } from 'tsyringe';
import PageRpp from '../models/PageRpp';
import validateBody from '../middleware/validateBody';
import validateQuery from '../middleware/validateQuery';
import { QuestCreate } from '../models/Quest';
import QuestController from '../controllers/QuestController';
import upload from '../middleware/multer';

const questRouter = Router();

const questController = container.resolve(QuestController);

questRouter.post(
    '/',
    upload().array('image'),
    validateBody(QuestCreate),
    questController.PostQuestAsync
);

questRouter.get('/', validateQuery(PageRpp), questController.FetchQuestsAsync);

questRouter.get('/count', questController.CountQuestsByUserIdAsync);

questRouter.get('/:questId', questController.FetchQuestAsync);

questRouter.get(
    '/completed/:userId',
    questController.FetchCompletedQuestsAsync
);

questRouter.get('/:questId/:userId', questController.FetchQuestByUserAsync);

questRouter.delete('/:questId', questController.DeleteAsync);

questRouter.put(
    '/:questId',
    validateBody(QuestCreate),
    questController.PutQuestAsync
);

questRouter.get('/disable/:stationId', questController.PutQuestDisabledAsync);

questRouter.get('/enable/:stationId', questController.PutQuestEnabledAsync);

questRouter.post(
    '/closest',
    validateQuery(PageRpp),
    questController.FetchQuestsNearbyAsync
);

export default questRouter;
