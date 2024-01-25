import { UtilService } from '@api/services';
import express from 'express';
import { injectable } from 'tsyringe';
import { BaseController } from './BaseController';

@injectable()
export class UtilController extends BaseController {
  private _utilServer = new UtilService();

  GetServerVersion = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const result = await this._utilServer.GetServerVersion();

    return this.Ok(res, result);
  };
}
