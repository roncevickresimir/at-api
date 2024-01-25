import express from 'express';
import { Exception } from 'handlebars';

import { QuestCreate, ROLES } from '@api/dtos';
import { QuestService, UserService } from '@api/services';

import { BaseController } from './BaseController';

export class QuestController extends BaseController {
  private userService = new UserService();
  private questService = new QuestService();

  createQuest = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const body: QuestCreate = req.body;

    const result = await this.questService.createQuest({
      ...body,
      userId: res.locals.user?.id,
    });

    if (!result) {
      throw new Exception('INTERNAL_ERROR.QUEST.CREATION_FAILED');
    }

    return this.Ok(res, result);
  };

  editQuest = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { questId } = req.params;
    const body: QuestCreate = req.body;
    const user = res.locals.user;

    const quest = await this.questService.getById(questId);

    if (user.id !== quest?.userId && user.role !== ROLES.ADMIN) {
      return this.Unauthorized(res);
    }

    const result = await this.questService.editQuest(
      {
        ...body,
        userId: user.id,
      },
      questId,
    );

    if (!result) {
      throw new Exception('INTERNAL_ERROR.QUEST.CREATION_FAILED');
    }

    return this.Ok(res, result);
  };

  getQuest = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { questId } = req.params;

    const quest = await this.questService.getById(questId);

    if (!quest) {
      return this.BadRequest(res);
    }

    return this.Ok(res, quest);
  };

  getQuests = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const query: any = req.query;

    if (query) {
      const result = await this.questService.getQuests(query);
      return this.Ok(res, result);
    }

    return this.BadRequest(res);
  };

  countQuestsByUserId = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const userId = res.locals.user.id;

    const result = await this.questService.countQuestsByUserId(userId);

    return this.Ok(res, result);
  };

  deleteQuest = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const params: any = req.params;

    const result = await this.questService.delete(params.questId);

    if (result) return this.Ok(res, result);

    return this.BadRequest(res, result);
  };

  disableQuest = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { questId } = req.params;
    const user = res.locals.user;

    const quest = await this.questService.getById(questId);

    if (user.id !== quest?.userId && user.role !== ROLES.ADMIN) {
      return this.Unauthorized(res);
    }

    const result = await this.questService.disableQuest(questId);

    return this.Ok(res, result);
  };

  enableQuest = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { questId } = req.params;
    const user = res.locals.user;

    const quest = await this.questService.getById(questId);

    if (user.id !== quest?.userId && user.role !== ROLES.ADMIN) {
      return this.Unauthorized(res);
    }

    const result = await this.questService.enableQuest(questId);

    return this.Ok(res, result);
  };

  getClosestQuests = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const query: any = req.query;

    const body: any = req.body;

    if (query) {
      // const result = await this.questService.getClosestQuests(
      //   body.latitude,
      //   body.longitude,
      //   body.distance ? body.distance : 10,
      //   body.category,
      //   query
      // );
      // return this.Ok(res, result);
    }

    return this.BadRequest(res);
  };

  getUserQuest = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { questId, userId } = req.params;

    const data = await this.questService.getUserQuest(questId, userId);

    const result = {
      id: data.Quest.id,
      title: data.Quest.title,
      description: data.Quest.description,
      location: data.Quest.location,
      image: data.Quest.image,
      progress: data.progress,
      complete: data.complete,
      stations: data.Quest.Stations.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        location: s.location,
        disabled: s.disabled,
        complete: s.UserStations[0].complete,
      })),
      rewards: data.Quest.Rewards,
    };

    return this.Ok(res, result);
  };

  getCompletedUserQuests = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { userId } = req.params;

    const result = await this.questService.getCompletedUserQuests(userId);

    return this.Ok(res, result);
  };
}
