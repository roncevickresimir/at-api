import { injectable } from 'tsyringe';
import BaseController from './BaseController';
import express from 'express';
import UtilService from "../../services/UtilService";


@injectable()
export default class ImageController extends BaseController {

    private _utilServer = new UtilService();

    GetServerVersion = async (req: express.Request, res: express.Response): Promise<express.Response> => {

        const result = await this._utilServer.GetServerVersion();

        return this.Ok(res, result);
    };
};