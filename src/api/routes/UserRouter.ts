import Router from 'express-promise-router';
import { container } from 'tsyringe';



import { UserController } from '@api/controllers';
import { EndUserCreate, PageRpp, UserCreate, UserLogin } from '@api/dtos';
import { auth, validateBody, validateQuery } from '@api/middleware';

export const userRouter = Router();

const userController = container.resolve(UserController);

userRouter.post('/loginClient', validateBody(UserLogin), userController.PostLoginClientAsync);

userRouter.post('/registerClient', validateBody(UserCreate), userController.PostRegisterClientAsync);

userRouter.post('/register', validateBody(EndUserCreate), userController.PostRegisterUserAsync);

userRouter.post('/login', validateBody(UserLogin), userController.LoginUserAsync);

userRouter.get('/', validateQuery(PageRpp), auth, userController.getUsers);

userRouter.get('/count', userController.CountAllUsersAsync);