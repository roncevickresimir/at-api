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

    if (query) {
      const result = await this.questService.getClosestQuests(
        {
          latitude: query.lat,
          longitude: query.lng,
        },
        query.category,
        {
          page: query.page,
          rpp: query.rpp,
        },
      );
      return this.Ok(res, result);
    }

    return this.BadRequest(res);
  };

  getUserQuest = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { questId, userId } = req.params;

    const data = await this.questService.getUserQuest(questId, userId);

    return this.Ok(res, data.get({ plain: true }));
  };

  getCompletedUserQuests = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { userId } = req.params;

    const result = await this.questService.getCompletedUserQuests(userId);

    return this.Ok(res, result);
  };
}