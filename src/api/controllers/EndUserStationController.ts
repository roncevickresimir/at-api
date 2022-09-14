import { injectable } from 'tsyringe';
import BaseController from './BaseController';
import express, { NextFunction } from 'express';
import UserService from '../../services/UserService';
import database from '../../repository';
import { Exception } from 'handlebars';
import EndUserStationService from '../../services/EndUserStationService';
import { EndUserStationCreate } from '../models/EndUserStation';

@injectable()
export default class EndUserStationController extends BaseController {
    private _userService = new UserService();
    private _endUserStationService = new EndUserStationService();

    PostEndUserStationAsync = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ): Promise<express.Response | void> => {
        const body: EndUserStationCreate = req.body;

        const transaction = await database.transaction();

        try {
            Object.assign(body);

            const result =
                await this._endUserStationService.CreateEndUserStationAsync(
                    body,
                    transaction
                );

            if (!result)
                throw new Exception('INTERNAL_ERROR.STATION.CREATION_FAILED');

            transaction.commit();

            return next();
            // return this.Ok(res, result);
        } catch (e: any) {
            transaction.rollback();

            console.log(e);

            return this.ErrorMessage(res, JSON.stringify(e));
        }
    };

    CountEndUserStationsByUserIdAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (user) {
            const result =
                await this._endUserStationService.CountAllByUserIdAsync(
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
        const params: any = req.params;

        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (params.stationId) {
            const result =
                await this._endUserStationService.DeleteEndUserStationAsync(
                    params.stationId
                );

            if (result) return this.Ok(res, result);

            return this.BadRequest(res, result);
        }
        return this.BadRequest(res);
    };
}
