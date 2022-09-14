import { injectable } from 'tsyringe';
import BaseController from './BaseController';
import express from 'express';
import UserService from '../../services/UserService';
import RoleService from '../../services/RoleService';
import { RoleType } from '../models/User';
import RewardTypeService from '../../services/RewardTypeService';
import { RewardTypeCreate } from '../models/RewardType';
import PageRpp from '../models/PageRpp';

@injectable()
export default class RewardTypeController extends BaseController {
    private _userService = new UserService();
    private _roleService = new RoleService();
    private _rewardTypeService = new RewardTypeService();

    PostAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const body: RewardTypeCreate = req.body;
        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (!user) return this.Unauthorized(res);

        const role = await this._roleService.GetByIdAsync(user?.roleId);

        if (role?.abrv === RoleType.User) return this.Unauthorized(res);

        const images: any[] = [];
        (<Array<Express.Multer.File>>req.files).forEach(
            (file: Express.Multer.File) => {
                images.push(file.filename);
            }
        );

        const rewardType: any = {
            name: body.name,
            description: body.description,
            userId: user?.id,
            stationId: body.stationId,
        };
        Object.assign(rewardType, {
            image: images[0],
        });

        const result = await this._rewardTypeService.PostRewardTypeAsync(
            rewardType
        );

        if (result) return this.Ok(res, result);

        return this.BadRequest(res);
    };

    FetchRewardTypeByIdAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const params = req.params;

        if (params.rewardTypeId) {
            const result = await this._rewardTypeService.GetByIdAsync(
                params.rewardTypeId
            );

            return this.Ok(res, result);
        }

        return this.BadRequest(res);
    };

    CountRewardTypesByUserIdAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (user) {
            const role = await this._roleService.GetByIdAsync(user.roleId);

            if (role?.abrv !== RoleType.Admin) {
                const result =
                    await this._rewardTypeService.CountAllByUserIdAsync(
                        user.id + ''
                    );

                return this.Ok(res, result);
            } else {
                const result =
                    await this._rewardTypeService.CountAllByUserIdAsync();

                return this.Ok(res, result);
            }
        }

        return this.BadRequest(res);
    };

    FetchRewardTypesAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const filter: PageRpp = {
            rpp: parseInt(req.query.rpp + ''),
            page: parseInt(req.query.page + ''),
        };

        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (user) {
            const result = await this._rewardTypeService.FetchAllByUserIdAsync(
                user.id + '',
                filter
            );

            return this.Ok(res, result);
        }

        return this.BadRequest(res);
    };

    PutAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const body: RewardTypeCreate = req.body;
        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (!user) return this.Unauthorized(res);

        const role = await this._roleService.GetByIdAsync(user?.roleId);

        if (role?.abrv === RoleType.User) return this.Unauthorized(res);

        const rewardType: any = {
            userId: user?.id,
            ...body,
        };

        const result = await this._rewardTypeService.PutRewardTypeAsync(
            req.params.rewardTypeId,
            rewardType
        );

        if (result) return this.Ok(res, result);

        return this.BadRequest(res);
    };

    DeleteAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (!user || !req.params.rewardTypeId) return this.Unauthorized(res);

        const role = await this._roleService.GetByIdAsync(user?.roleId);

        if (role?.abrv === RoleType.User) return this.Unauthorized(res);

        const result = await this._rewardTypeService.DeleteRewardTypeAsync(
            req.params.rewardTypeId
        );

        if (result) return this.Ok(res);

        return this.BadRequest(res);
    };
}
