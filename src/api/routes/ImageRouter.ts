import Router from 'express-promise-router';
import { container } from 'tsyringe';
import ImageController from "../controllers/ImageController";


const imageRouter = Router();

const imageController = container.resolve(ImageController);

imageRouter.delete(
    '/:imageId',
    imageController.DeleteAsync
);

export default imageRouter;
