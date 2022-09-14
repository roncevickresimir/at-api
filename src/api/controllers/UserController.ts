import bcrypt from 'bcryptjs';

import { injectable } from 'tsyringe';
import BaseController from './BaseController';
import express from 'express';
import UserService from '../../services/UserService';
import {
    EndUserCreate,
    EndUserLogin,
    RoleType,
    UserCreate,
    UserLogin,
} from '../models/User';
import RoleService from '../../services/RoleService';
import database from '../../repository';
import { generateLoginCodeToken } from '../util/generateToken';
import { threadId } from 'worker_threads';
import authenticate, { authenticateAsync } from '../middleware/authenticate';

@injectable()
export default class UserController extends BaseController {
    private _userService = new UserService();
    private _roleService = new RoleService();

    PostLoginAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const body: UserLogin = req.body;

        const user = await this._userService.PostLoginAsync(
            body.userName,
            body.email
        );

        if (user) {
            const isPasswordValid = await bcrypt.compare(
                body.password,
                user.password
            );
            if (!isPasswordValid)
                return this.Unauthorized(
                    res,
                    'BACKEND_ERRORS.INTERNAL_ERROR.EMAIL_OR_USERNAME_OR_PASSWORD_WRONG'
                );

            if (user.id) {
                const token = await generateLoginCodeToken(user.id);

                Object.assign(user, { token: token });

                const result = {
                    User: user,
                    token: token,
                };
                return this.Ok(res, result);
            }
        }

        return this.BadRequest(
            res,
            'BACKEND_ERRORS.INTERNAL_ERROR.EMAIL_OR_USERNAME_OR_PASSWORD_WRONG'
        );
    };

    FetchAllAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const userId = await authenticateAsync(req);

        const filter: any = req.query;

        if (userId) {
            const user = await this._userService.GetByIdAsync(userId);

            if (user) {
                const role = await this._roleService.GetByIdAsync(user.roleId);

                if (role && role.abrv === RoleType.Admin) {
                    const result = await this._userService.FetchAllUsers(
                        filter
                    );

                    if (result) return this.Ok(res, result);
                }
            }
        }

        return this.Unauthorized(res);
    };

    CountAllUsersAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const userId = await authenticateAsync(req);

        const filter: any = req.query;

        if (userId) {
            const user = await this._userService.GetByIdAsync(userId);

            if (user) {
                const role = await this._roleService.GetByIdAsync(user.roleId);

                if (role && role.abrv === RoleType.Admin) {
                    const result = await this._userService.CountAllUsers();

                    if (result) return this.Ok(res, result);
                }
            }
        }

        return this.Unauthorized(res);
    };

    PostRegisterAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const body: UserCreate = req.body;

        const role = await this._roleService.GetByAbrvAsync(body.roleAbrv);

        if (role?.abrv === RoleType.Admin) {
            const user = await this._userService.GetByIdAsync(
                res.locals.user?.id
            );

            if (user) {
                const transaction = await database.transaction();

                try {
                    const [checkEmail, checkUsername] = await Promise.all([
                        await this._userService.GetByEmailAsync(body.email),
                        await this._userService.GetByUserNameAsync(
                            body.userName
                        ),
                    ]);

                    if (checkEmail || checkUsername) {
                        transaction.rollback();
                        return this.BadRequest(
                            res,
                            'BACKEND_ERRORS.INTERNAL_ERROR.EMAIL_OR_USERNAME_EXISTS'
                        );
                    }

                    const result = await this._userService.CreateUserAsync(
                        body,
                        transaction,
                        role
                    );

                    transaction.commit();

                    return this.Ok(res, result);
                } catch (e: any) {
                    transaction.rollback();

                    return this.ErrorMessage(res, JSON.stringify(e));
                }
            }
        } else if (role) {
            const transaction = await database.transaction();

            try {
                const [checkEmail, checkUsername] = await Promise.all([
                    await this._userService.GetByEmailAsync(body.email),
                    await this._userService.GetByUserNameAsync(body.userName),
                ]);

                if (checkEmail || checkUsername) {
                    transaction.rollback();
                    return this.BadRequest(
                        res,
                        'BACKEND_ERRORS.INTERNAL_ERROR.EMAIL_OR_USERNAME_EXISTS'
                    );
                }
                const result = await this._userService.CreateUserAsync(
                    body,
                    transaction,
                    role
                );

                transaction.commit();

                return this.Ok(res, result);
            } catch (e: any) {
                transaction.rollback();

                return this.ErrorMessage(res, JSON.stringify(e));
            }
        }

        return this.BadRequest(res);
    };

    PostRegisterUserAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const body: EndUserCreate = req.body;

        const transaction = await database.transaction();

        try {
            const [checkEmail, checkUsername] = await Promise.all([
                await this._userService.GetByEmailAsync(body.email),
                await this._userService.GetByUserNameAsync(body.username),
            ]);

            if (checkEmail || checkUsername) {
                transaction.rollback();
                return this.BadRequest(
                    res,
                    'BACKEND_ERRORS.INTERNAL_ERROR.EMAIL_OR_USERNAME_EXISTS'
                );
            }
            const result = await this._userService.CreateEndUserAsync(
                body,
                transaction
            );

            transaction.commit();

            return this.Ok(res, result);
        } catch (e: any) {
            transaction.rollback();

            return this.ErrorMessage(res, JSON.stringify(e));
        }

        return this.BadRequest(res);
    };

    LoginEndUserAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const body: EndUserLogin = req.body;

        const user = await this._userService.LoginEndUserAsync(
            body.username,
            body.email
        );

        console.log('------------------------------------------');
        console.log(user);
        console.log('------------------------------------------');

        if (user) {
            const isPasswordValid = await bcrypt.compare(
                body.password,
                user.password
            );

            console.log('############################');
            console.log(body.password == user.password);
            console.log(isPasswordValid);
            console.log('############################');

            if (!isPasswordValid)
                return this.Unauthorized(
                    res,
                    'BACKEND_ERRORS.INTERNAL_ERROR.EMAIL_OR_USERNAME_OR_PASSWORD_WRONG'
                );

            if (user.id) {
                const token = await generateLoginCodeToken(user.id);

                Object.assign(user, { token: token });

                const result = {
                    User: user,
                    token: token,
                };
                return this.Ok(res, result);
            }
        }

        return this.BadRequest(
            res,
            'BACKEND_ERRORS.INTERNAL_ERROR.EMAIL_OR_USERNAME_OR_PASSWORD_WRONG'
        );
    };
}
