import express from 'express';
import { Exception } from 'handlebars';



import { CreateStation, ROLES } from '@api/dtos';
import { Station } from '@api/models';
import { QuestService, StationService, UserService } from '@api/services';

import { BaseController } from './BaseController';

export class StationController extends BaseController {
  private userService = new UserService();
  private stationService = new StationService();
  private questService = new QuestService();

  createStation = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const body: CreateStation = req.body;

    const result = await this.stationService.createStation({
      ...body,
      userId: res.locals.user?.id,
    });

    if (!result) {
      throw new Exception('INTERNAL_ERROR.STATION.CREATION_FAILED');
    }

    return this.Ok(res, result);
  };

  editStation = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { stationId } = req.params;
    const body: CreateStation = req.body;

    const user = res.locals.user;

    const station = await this.stationService.getById(stationId);

    if (user.id !== station?.userId && user.role !== ROLES.ADMIN) {
      return this.Unauthorized(res);
    }

    const result = await this.stationService.editStation(body, stationId);

    if (!result) {
      throw new Exception('INTERNAL_ERROR.STATION.CREATION_FAILED');
    }

    return this.Ok(res, result);
  };

  getStation = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const params: any = req.params;

    if (params.stationId) {
      const station: Station | null = await this.stationService.getById(params.stationId);

      console.log(station?.get({ plain: true }));
      return this.Ok(res, station?.get({ plain: true }));
    }

    return this.BadRequest(res);
  };

  getStations = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { filter }: any = req.query;

    const result = await this.stationService.getStations(filter);
    if (result) {
      return this.Ok(res, result);
    }

    return this.BadRequest(res);
  };

  getStationsByOwnerId = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { userId } = req.params;

    const result = await this.stationService.getStationsByOwnerId(userId);

    return this.Ok(res, result);
  };

  countStationsByOwnerId = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { userId } = req.params;

    const result = await this.stationService.countStationsByOwnerId(userId);

    return this.Ok(res, result);
  };

  getUserStations = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { userId } = req.params;

    const result = await this.stationService.getUserStations(userId);

    return this.Ok(res, result);
  };

  countUserStations = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { userId } = req.params;
    const result = await this.stationService.countUserStations(userId);

    return this.Ok(res, result);
  };

  countStationUsers = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { stationId } = req.params;

    const result = await this.stationService.countStationUsers(stationId);

    return this.Ok(res, result);
  };

  delete = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { stationId } = req.params;
    const user = await this.userService.getById(res.locals.user?.id);
    const station = await this.stationService.getById(stationId);

    if (user?.id !== station?.userId && user?.role !== ROLES.ADMIN) {
      return this.Unauthorized(res);
    }

    const result = await this.stationService.deleteStation(stationId);

    if (result) return this.Ok(res, result);

    return this.BadRequest(res);
  };

  disableStation = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { stationId } = req.params;
    const user = res.locals.user;
    const station = await this.stationService.getById(stationId);

    if (user.id !== station?.userId && user.role !== ROLES.ADMIN) {
      this.Unauthorized(res);
    }

    const result = await this.stationService.disableStation(stationId);

    return this.Ok(res, result);
  };

  enableStation = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { stationId } = req.params;
    const user = res.locals.user;
    const station = await this.stationService.getById(stationId);

    if (user.id !== station?.userId && user.role !== ROLES.ADMIN) {
      this.Unauthorized(res);
    }

    const result = await this.stationService.enableStation(stationId);

    return this.Ok(res, result);
  };

  public completeStation = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const stationId = req.params.stationId;
    const userId = res.locals.user?.id;

    const station = await this.stationService.getById(stationId);

    if (!station) {
      return this.BadRequest(res);
    }

    const [userQuest] = await this.questService.createUserQuest(station.questId, userId);

    const result = await this.stationService.completeStation(stationId, userId);

    const complete = userQuest.Quest.Stations.filter((s) => s.UserStations[0].complete).length;
    const total = userQuest.Quest.Stations.length;
    const progress = Math.round((complete * 100) / total);

    await this.questService.editUserQuest({
      questId: userQuest.questId,
      userId: userQuest.userId,
      progress: progress,
      complete: complete === total,
    });

    return this.Ok(res, result);
  };
}