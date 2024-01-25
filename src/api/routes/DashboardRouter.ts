import { DashboardController } from "@api/controllers";
import Router from "express-promise-router";
import { container } from "tsyringe";

const dashboardRouter = Router();

const dashboardController = container.resolve(DashboardController);

dashboardRouter.get("/", dashboardController.FetchDashboardData);

export { dashboardRouter };
