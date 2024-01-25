import Router from 'express-promise-router';
import { container } from 'tsyringe';

import { RewardController } from '@api/controllers';
import { RewardCreate } from '@api/dtos';
import { validateBody } from '@api/middleware';

const rewardRouter = Router();

const rewardController = container.resolve(RewardController);

rewardRouter.post('/', validateBody(RewardCreate), rewardController.PostAsync);

rewardRouter.get('/user/:userId', rewardController.FetchRewardsByUserIdAsync);

rewardRouter.get('/count', rewardController.CountRewardsByUserIdAsync);

rewardRouter.get('/', rewardController.FetchRewardsAsync);

rewardRouter.get('/:rewardId', rewardController.FetchRewardByIdAsync);

rewardRouter.delete('/:rewardId', rewardController.delete);

export { rewardRouter };
