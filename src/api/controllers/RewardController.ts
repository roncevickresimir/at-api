import { injectable } from 'tsyringe';
import BaseController from './BaseController';
import express from 'express';
import UserService from '../../services/UserService';
import RewardService from '../../services/RewardService';
import { RewardCreate } from '../models/Reward';
import { RoleType } from '../models/User';
import RoleService from '../../services/RoleService';
import database from '../../repository';
import FileCheck from '../util/fileCheck';
import { LOCAL_DIR, UPLOAD_DIR_QR } from '../../config';
import QRCode from 'qrcode';
import ImageService from '../../services/ImageService';
import {
    IQRCode_Image,
    IQRCode_ImageCreate,
} from '../../repository/models/QRCode_Image';
import PageRpp from '../models/PageRpp';
import { Exception } from 'handlebars';
import { IStation } from '../../repository/models/Station';
import StationService from '../../services/StationService';
import RewardTypeService from '../../services/RewardTypeService';
import { IRewardType } from '../../repository/models/RewardType';

@injectable()
export default class RewardController extends BaseController {
    private _userService = new UserService();
    private _rewardService = new RewardService();
    private _rewardTypeService = new RewardTypeService();
    private _roleService = new RoleService();
    private _stationService = new StationService();
    private _imageService = new ImageService();

    PostAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<any> => {
        const body: RewardCreate = req.body;

        console.log(
            '####################################################################'
        );
        console.log(body);
        console.log(
            '####################################################################'
        );

        const rewardTypes: IRewardType[] | null =
            await this._rewardTypeService.FetchAllByStationIdAsync(
                body.stationId
            );

        let result: any = null;

        rewardTypes?.forEach(async (rewardType: IRewardType) => {
            const transaction = await database.transaction();
            try {
                Object.assign(body, { rewardTypeId: rewardType.id });

                result = await this._rewardService.PostRewardAsync(
                    body,
                    transaction
                );

                if (!result)
                    throw new Exception(
                        'INTERNAL_ERROR.STATION.CREATION_FAILED'
                    );

                transaction.commit();
            } catch (e: any) {
                transaction.rollback();

                console.log(e);

                return this.ErrorMessage(res, JSON.stringify(e));
            }
        });

        return this.Ok(res, result);
    };

    FetchRewardsByUserIdAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const params = req.params;

        if (params.userId) {
            const result = await this._rewardService.FetchAllByUserIdAsync(
                params.userId
            );

            return this.Ok(res, result);
        }

        return this.BadRequest(res);
    };

    CountRewardsByUserIdAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (user) {
            const role = await this._roleService.GetByIdAsync(user.roleId);

            if (role?.abrv !== RoleType.Admin) {
                const result = await this._rewardService.CountAllByUserIdAsync(
                    user.id + ''
                );

                return this.Ok(res, result);
            } else {
                const result =
                    await this._rewardService.CountAllByUserIdAsync();

                return this.Ok(res, result);
            }
        }

        return this.BadRequest(res);
    };

    FetchRewardByIdAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const params = req.params;

        if (params.rewardId) {
            const result = await this._rewardService.GetByIdAsync(
                params.rewardId
            );

            return this.Ok(res, result);
        }

        return this.BadRequest(res);
    };

    FetchRewardsAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const filter: PageRpp = {
            rpp: parseInt(req.query.rpp + ''),
            page: parseInt(req.query.page + ''),
        };

        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (user) {
            const result = await this._rewardService.FetchAllByUserIdAsync(
                user.id + ''
            );

            return this.Ok(res, result);
        }

        return this.BadRequest(res);
    };

    DeleteAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (!user || !req.params.rewardId) return this.Unauthorized(res);

        const role = await this._roleService.GetByIdAsync(user?.roleId);

        if (role?.abrv === RoleType.User) return this.Unauthorized(res);

        const result = await this._rewardService.DeleteRewardAsync(
            req.params.rewardId
        );

        if (result) return this.Ok(res, result);
        return this.BadRequest(res);
    };
}
