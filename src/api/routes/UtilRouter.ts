import { UtilController } from "@api/controllers";
import Router from "express-promise-router";
import { container } from "tsyringe";

export const utilRouter = Router();

const utilController = container.resolve(UtilController);

utilRouter.get("/get-server-version", utilController.GetServerVersion);
