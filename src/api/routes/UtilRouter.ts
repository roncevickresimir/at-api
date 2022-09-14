import Router from 'express-promise-router';
import { container } from 'tsyringe';
import UtilController from "../controllers/UtilController";


const utilRouter = Router();

const utilController = container.resolve(UtilController);

utilRouter.get(
    '/get-server-version',
    utilController.GetServerVersion
);

export default utilRouter;
