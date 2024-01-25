import Router from 'express-promise-router';

import { categoryRouter } from './CategoryRouter';
import { questRouter } from './QuestRouter';
import { rewardRouter } from './RewardRouter';
import { stationRouter } from './StationRouter';
import { userRouter } from './UserRouter';
import { utilRouter } from './UtilRouter';

export const router = Router();

router.use('/util', utilRouter);
router.use('/users', userRouter);
router.use('/quests', questRouter);
router.use('/stations', stationRouter);
router.use('/rewards', rewardRouter);
router.use('/categories', categoryRouter);