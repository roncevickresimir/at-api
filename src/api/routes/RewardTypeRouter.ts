import Router from 'express-promise-router';
import { container } from 'tsyringe';
import PageRpp from '../models/PageRpp';
import RewardTypeController from '../controllers/RewardTypeController';
import validateBody from '../middleware/validateBody';
import { RewardTypeCreate } from '../models/RewardType';
import validateQuery from '../middleware/validateQuery';
import upload from '../middleware/multer';

const rewardTypeRouter = Router();

const rewardTypeController = container.resolve(RewardTypeController);

rewardTypeRouter.post(
    '/',
    upload().array('image'),
    validateBody(RewardTypeCreate),
    rewardTypeController.PostAsync
);

rewardTypeRouter.get(
    '/count',
    rewardTypeController.CountRewardTypesByUserIdAsync
);

rewardTypeRouter.get(
    '/',
    validateQuery(PageRpp),
    rewardTypeController.FetchRewardTypesAsync
);
rewardTypeRouter.get(
    '/:rewardTypeId',
    rewardTypeController.FetchRewardTypeByIdAsync
);

rewardTypeRouter.put(
    '/:rewardTypeId',
    validateBody(RewardTypeCreate),
    rewardTypeController.PutAsync
);
rewardTypeRouter.delete('/:rewardTypeId', rewardTypeController.DeleteAsync);

export default rewardTypeRouter;
