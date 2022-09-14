import { injectable } from 'tsyringe';
import BaseController from './BaseController';
import express from 'express';
import { RoleType } from '../models/User';
import UserService from '../../services/UserService';
import RoleService from '../../services/RoleService';
import CategoryService from '../../services/CategoryService';
import { ICategory } from '../../repository/models/Category';

@injectable()
export default class RewardController extends BaseController {
    private _userService = new UserService();
    private _roleService = new RoleService();
    private _categoryService = new CategoryService();

    PostAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const body: ICategory = req.body;

        try {
            const result = this._categoryService.PostCategoryAsync(body);

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
        const result = await this._categoryService.FetchAllAsync();

        return this.Ok(res, result);
    };

    DeleteAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (!user || !req.params.rewardId) return this.Unauthorized(res);

        const role = await this._roleService.GetByIdAsync(user?.roleId);

        if (role?.abrv === RoleType.User) return this.Unauthorized(res);

        const result = await this._categoryService.DeleteCategoryAsync(
            req.params.rewardId
        );

        if (result) return this.Ok(res, result);
        return this.BadRequest(res);
    };
}
