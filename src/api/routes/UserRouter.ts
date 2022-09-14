import Router from 'express-promise-router';
import { container } from 'tsyringe';
import UserController from '../controllers/UserController';
import acceptedRole from '../middleware/acceptedRole';
import validateBody from '../middleware/validateBody';
import validateQuery from '../middleware/validateQuery';
import PageRpp from '../models/PageRpp';
import {
    RoleType,
    UserCreate,
    UserLogin,
    EndUserCreate,
    EndUserLogin,
} from '../models/User';

const userRouter = Router();

const userController = container.resolve(UserController);

userRouter.post(
    '/login',
    validateBody(UserLogin),
    userController.PostLoginAsync
);

userRouter.post(
    '/register',
    validateBody(UserCreate),
    userController.PostRegisterAsync
);

userRouter.post(
    '/registerEndUser',
    validateBody(EndUserCreate),
    userController.PostRegisterUserAsync
);

userRouter.post(
    '/loginEndUser',
    validateBody(EndUserLogin),
    userController.LoginEndUserAsync
);

userRouter.get('/count', userController.CountAllUsersAsync);

userRouter.get('/', validateQuery(PageRpp), userController.FetchAllAsync);

export default userRouter;
