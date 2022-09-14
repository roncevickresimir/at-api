import Router from 'express-promise-router';
import { container } from 'tsyringe';
import validateBody from '../middleware/validateBody';
import { Category } from '../models/Category';
import CategoryController from '../controllers/CategoryController';

const categoryRouter = Router();

const categoryController = container.resolve(CategoryController);

categoryRouter.post('/', validateBody(Category), categoryController.PostAsync);

categoryRouter.get('/', categoryController.FetchCategoriesAsync);

categoryRouter.delete('/:categoryId', categoryController.DeleteAsync);

export default categoryRouter;
