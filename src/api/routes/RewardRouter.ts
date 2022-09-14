import Router from 'express-promise-router';
import { container } from 'tsyringe';
import RewardController from '../controllers/RewardController';
import validateBody from '../middleware/validateBody';
import { RewardCreate } from '../models/Reward';

const rewardRouter = Router();

const rewardController = container.resolve(RewardController);

rewardRouter.post('/', validateBody(RewardCreate), rewardController.PostAsync);

rewardRouter.get('/user/:userId', rewardController.FetchRewardsByUserIdAsync);

rewardRouter.get('/count', rewardController.CountRewardsByUserIdAsync);

rewardRouter.get('/', rewardController.FetchRewardsAsync);

rewardRouter.get('/:rewardId', rewardController.FetchRewardByIdAsync);

rewardRouter.delete('/:rewardId', rewardController.DeleteAsync);

export default rewardRouter;
