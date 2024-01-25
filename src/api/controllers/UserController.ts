import {
  UserLogin,
  ROLES,
  UserCreate,
} from "@api/dtos";
import { UserService } from "@api/services";
import { generateLoginCodeToken } from "@api/util";
import bcrypt from "bcryptjs";
import express from "express";
import { database } from "repository";
import { injectable } from "tsyringe";
import { BaseController } from "./BaseController";

@injectable()
export class UserController extends BaseController {
  private userService = new UserService();

  PostLoginAsync = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<express.Response> => {
    const body: UserLogin = req.body;

    const user = await this.userService.PostLoginAsync(
      body.username,
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
          "BACKEND_ERRORS.INTERNAL_ERROR.EMAIL_OR_USERNAME_OR_PASSWORD_WRONG"
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
      "BACKEND_ERRORS.INTERNAL_ERROR.EMAIL_OR_USERNAME_OR_PASSWORD_WRONG"
    );
  };

  getUsers = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const filter: any = req.query;

    const result = await this.userService.getUsers(filter);

    return this.Ok(res, result);
  };

  CountAllUsersAsync = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const userId = res.locals.user.id;

    if (userId) {
      const user = await this.userService.getById(userId);

      if (user?.role === ROLES.ADMIN) {
        const result = await this.userService.CountAllUsers();

        if (result) return this.Ok(res, result);
      }
    }

    return this.Unauthorized(res);
  };

  PostRegisterAsync = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const body: UserCreate = req.body;

    const user = await this.userService.getById(res.locals.user?.id);

    if (!user) {
      return this.BadRequest(res);
    }
    const transaction = await database.transaction();

    try {
      const [checkEmail, checkUsername] = await Promise.all([
        await this.userService.GetByEmailAsync(body.email),
        await this.userService.GetByUserNameAsync(body.username),
      ]);

      if (checkEmail || checkUsername) {
        transaction.rollback();
        return this.BadRequest(
          res,
          "BACKEND_ERRORS.INTERNAL_ERROR.EMAIL_OR_USERNAME_EXISTS"
        );
      }

      const result = await this.userService.CreateUserAsync(
        body,
        transaction,
        body.role as ROLES
      );

      transaction.commit();

      return this.Ok(res, result);
    } catch (e: any) {
      transaction.rollback();

      return this.ErrorMessage(res, JSON.stringify(e));
    }
  };

  PostRegisterUserAsync = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const body: UserCreate = req.body;

    const transaction = await database.transaction();

    try {
      const [checkEmail, checkUsername] = await Promise.all([
        await this.userService.GetByEmailAsync(body.email),
        await this.userService.GetByUserNameAsync(body.username),
      ]);

      if (checkEmail || checkUsername) {
        transaction.rollback();
        return this.BadRequest(
          res,
          "BACKEND_ERRORS.INTERNAL_ERROR.EMAIL_OR_USERNAME_EXISTS"
        );
      }
      const result = await this.userService.CreateEndUserAsync(
        body,
        transaction
      );

      transaction.commit();

      return this.Ok(res, result);
    } catch (e: any) {
      transaction.rollback();

      return this.ErrorMessage(res, JSON.stringify(e));
    }
  };

  LoginEndUserAsync = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const body: UserLogin = req.body;

    const user = await this.userService.LoginEndUserAsync(
      body.username,
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
          "BACKEND_ERRORS.INTERNAL_ERROR.EMAIL_OR_USERNAME_OR_PASSWORD_WRONG"
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
      "BACKEND_ERRORS.INTERNAL_ERROR.EMAIL_OR_USERNAME_OR_PASSWORD_WRONG"
    );
  };
}
