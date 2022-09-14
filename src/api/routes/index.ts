import Router from 'express-promise-router';

import authenticate from '../middleware/authenticate';
import userRouter from './UserRouter';
import utilRouter from './UtilRouter';
import stationRouter from './StationRouter';
import imageRouter from './ImageRouter';
import rewardTypeRouter from './RewardTypeRouter';
import rewardRouter from './RewardRouter';
import questRouter from './QuestRouter';
import regionRouter from './RegionRouter';
import categoryRouter from './CategoryRouter';

const router = Router();

router.use('/util', utilRouter);
router.use('/users', userRouter).use(authenticate());
router.use('/quest', questRouter);
router.use('/station', stationRouter);
router.use('/image', imageRouter);
router.use('/reward-type', rewardTypeRouter);
router.use('/reward', rewardRouter);
router.use('/region', regionRouter);
router.use('/category', categoryRouter);

export default router;
