import { PageRpp, ROLES, RewardCreate } from '@api/dtos';
import { RewardService, UserService } from '@api/services';
import express from 'express';
import { injectable } from 'tsyringe';
import { BaseController } from './BaseController';

@injectable()
export class RewardController extends BaseController {
  private _userService = new UserService();
  private _rewardService = new RewardService();

  PostAsync = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const body: RewardCreate = req.body;
    const user = await this._userService.getById(res.locals.user?.id);

    if (!user) return this.Unauthorized(res);

    if (user.role === ROLES.USER) return this.Unauthorized(res);

    const images: any[] = [];
    (<Array<Express.Multer.File>>req.files).forEach((file: Express.Multer.File) => {
      images.push(file.filename);
    });

    const reward: any = {
      // name: body.name,
      // description: body.description,
      userId: user?.id,
      stationId: body.stationId,
    };
    Object.assign(reward, {
      image: images[0],
    });

    const result = await this._rewardService.PostRewardAsync(reward);

    if (result) return this.Ok(res, result);

    return this.BadRequest(res);
  };

  FetchRewardByIdAsync = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const params = req.params;

    if (params.rewardId) {
      const result = await this._rewardService.getById(params.rewardId);

      return this.Ok(res, result);
    }

    return this.BadRequest(res);
  };

  CountRewardsByUserIdAsync = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const user = await this._userService.getById(res.locals.user?.id);

    if (user) {
      if (user.role !== ROLES.ADMIN) {
        const result = await this._rewardService.countQuestsByUserId(user.id + '');

        return this.Ok(res, result);
      } else {
        const result = await this._rewardService.countQuestsByUserId();

        return this.Ok(res, result);
      }
    }

    return this.BadRequest(res);
  };

  FetchRewardsAsync = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const filter: PageRpp = {
      rpp: parseInt(req.query.rpp + ''),
      page: parseInt(req.query.page + ''),
    };

    const user = await this._userService.getById(res.locals.user?.id);

    if (user) {
      const result = await this._rewardService.FetchAllByUserIdAsync(user.id + '', filter);

      return this.Ok(res, result);
    }

    return this.BadRequest(res);
  };

  PutAsync = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const body: RewardCreate = req.body;
    const user = await this._userService.getById(res.locals.user?.id);

    if (!user) return this.Unauthorized(res);

    if (user.role === ROLES.USER) return this.Unauthorized(res);

    // const reward: any = {
    //   userId: user?.id,
    //   ...body,
    // };

    // const result = await this._rewardService.PutRewardAsync(req.params.rewardId, reward);

    // if (result) return this.Ok(res, result);

    return this.BadRequest(res);
  };

  delete = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const user = await this._userService.getById(res.locals.user?.id);

    if (!user || !req.params.rewardId) return this.Unauthorized(res);

    if (user.role === ROLES.USER) return this.Unauthorized(res);

    const result = await this._rewardService.DeleteRewardAsync(req.params.rewardId);

    if (result) return this.Ok(res);

    return this.BadRequest(res);
  };

  public FetchRewardsByUserIdAsync(arg0: string, FetchRewardsByUserIdAsync: any) {
    throw new Error('Method not implemented.');
  }
}
