import { CreateCategory, ROLES } from "@api/dtos";
import { UserService, CategoryService } from "@api/services";
import express from "express";
import { injectable } from "tsyringe";
import { BaseController } from "./BaseController";

@injectable()
export class CategoryController extends BaseController {
  private userService = new UserService();
  private categoryService = new CategoryService();

  PostAsync = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const body: CreateCategory = req.body;

    try {
      const result = this.categoryService.create(body);

      return this.Ok(res, result);
    } catch (e: any) {
      console.log(e);

      return this.ErrorMessage(res, JSON.stringify(e));
    }
  };

  FetchCategoriesAsync = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const result = await this.categoryService.getAll();

    return this.Ok(res, result);
  };

  delete = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const user = await this.userService.getById(res.locals.user?.id);

    if (!user || !req.params.rewardId) return this.Unauthorized(res);

    if (user.role === ROLES.USER) return this.Unauthorized(res);

    const result = await this.categoryService.delete(
      req.params.rewardId
    );

    if (result) return this.Ok(res, result);
    return this.BadRequest(res);
  };
}
