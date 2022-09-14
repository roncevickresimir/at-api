import Router from 'express-promise-router';
import { container } from 'tsyringe';
import RegionController from "../controllers/RegionController";
import validateBody from "../middleware/validateBody";
import { RegionCreate } from "../models/Region";


const regionRouter = Router();


const regionController = container.resolve(RegionController);

regionRouter.post(
    '/',
    validateBody(RegionCreate),
    regionController.PostAsync
);

regionRouter.get(
    '/count',
    regionController.CountRegionsAsync
);
regionRouter.get(
    '/',
    regionController.FetchRegionsAsync
);

regionRouter.get(
    '/:regionId',
    regionController.FetchRegionByIdAsync
);

regionRouter.put(
    '/:regionId',
    validateBody(RegionCreate),
    regionController.PutAsync
);

regionRouter.delete(
    '/:regionId',
    regionController.DeleteAsync
);

export default regionRouter;
