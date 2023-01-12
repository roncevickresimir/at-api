import Router from 'express-promise-router';
import { container } from 'tsyringe';
import DashboardController from '../controllers/DashboardController';

const dashboardRouter = Router();

const dashboardController = container.resolve(DashboardController);

dashboardRouter.get('/', dashboardController.FetchDashboardData);

export default dashboardRouter;
