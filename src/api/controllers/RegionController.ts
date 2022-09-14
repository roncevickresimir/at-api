import { injectable } from 'tsyringe';
import BaseController from './BaseController';
import express from 'express';
import UserService from '../../services/UserService';
import RegionService from '../../services/RegionService';
import { RewardCreate } from '../models/Reward';
import { RoleType } from '../models/User';
import RoleService from '../../services/RoleService';
import database from '../../repository';
import PageRpp from '../models/PageRpp';
import { RegionCreate } from '../models/Region';

@injectable()
export default class RegionController extends BaseController {
    private _userService = new UserService();
    private _regionService = new RegionService();
    private _roleService = new RoleService();

    PostAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const body: any = req.body;

        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (!user) return this.Unauthorized(res);

        const role = await this._roleService.GetByIdAsync(user?.roleId);

        if (role?.abrv === RoleType.User) return this.Unauthorized(res);

        const transaction = await database.transaction();

        try {
            const result = await this._regionService.PostRegionAsync(
                body,
                transaction
            );

            transaction.commit();

            return this.Ok(res, result);
        } catch (e: any) {
            transaction.rollback();

            console.log(e);

            return this.ErrorMessage(res, JSON.stringify(e));
        }
    };

    CountRegionsAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (!user) return this.Unauthorized(res);

        const result = await this._regionService.CountAllAsync();

        return this.Ok(res, result);
    };

    FetchRegionByIdAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const params = req.params;

        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (params.regionId && user) {
            const result = await this._regionService.GetByIdAsync(
                params.regionId
            );

            return this.Ok(res, result);
        }

        return this.BadRequest(res);
    };

    FetchRegionsAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const filter: PageRpp = {
            rpp: parseInt(req.query.rpp + ''),
            page: parseInt(req.query.page + ''),
        };

        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (user) {
            const result = await this._regionService.FetchAllAsync(filter);

            return this.Ok(res, result);
        }

        return this.BadRequest(res);
    };

    PutAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const params: any = req.params;

        const body: any = req.body;

        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (!user) return this.Unauthorized(res);

        const role = await this._roleService.GetByIdAsync(user?.roleId);

        if (role?.abrv === RoleType.User) return this.Unauthorized(res);

        const transaction = await database.transaction();

        try {
            if (params.regionId) {
                const result = await this._regionService.PutRegionAsync(
                    params.regionId,
                    body,
                    transaction
                );

                transaction.commit();

                return this.Ok(res, result);
            } else {
                transaction.rollback();
                return this.BadRequest(res);
            }
        } catch (e: any) {
            transaction.rollback();

            console.log(e);

            return this.ErrorMessage(res, JSON.stringify(e));
        }
    };

    DeleteAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (!user || !req.params.regionId) return this.Unauthorized(res);

        const role = await this._roleService.GetByIdAsync(user?.roleId);

        if (role?.abrv !== RoleType.Admin) return this.Unauthorized(res);

        const result = await this._regionService.DeleteRegionAsync(
            req.params.regionId
        );

        if (result) return this.Ok(res, result);
        return this.BadRequest(res);
    };
}
