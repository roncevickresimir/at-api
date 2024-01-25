import Router from 'express-promise-router';
import { container } from 'tsyringe';

import { UserController } from '@api/controllers';
import { EndUserCreate, PageRpp, UserCreate, UserLogin } from '@api/dtos';
import { auth, validateBody, validateQuery } from '@api/middleware';

export const userRouter = Router();

const userController = container.resolve(UserController);

userRouter.post(
  '/login',
  validateBody(UserLogin),
  userController.PostLoginAsync,
);

userRouter.post(
  '/register',
  validateBody(UserCreate),
  userController.PostRegisterAsync,
);

userRouter.post(
  '/registerEndUser',
  validateBody(EndUserCreate),
  userController.PostRegisterUserAsync,
);

userRouter.post(
  '/loginEndUser',
  validateBody(UserLogin),
  userController.LoginEndUserAsync,
);

userRouter.get('/', validateQuery(PageRpp), auth, userController.getUsers);

userRouter.get('/count', userController.CountAllUsersAsync);