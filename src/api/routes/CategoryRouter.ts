import Router from 'express-promise-router';
import { container } from 'tsyringe';

import { CategoryController } from '@api/controllers';
import { CreateCategory } from '@api/dtos';
import { validateBody } from '@api/middleware';

export const categoryRouter = Router();

const categoryController = container.resolve(CategoryController);

categoryRouter.post(
  '/',
  validateBody(CreateCategory),
  categoryController.PostAsync,
);

categoryRouter.get('/', categoryController.FetchCategoriesAsync);

categoryRouter.delete('/:categoryId', categoryController.delete);