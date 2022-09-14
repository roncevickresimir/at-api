import { injectable } from 'tsyringe';
import BaseController from './BaseController';
import express from 'express';
import UserService from '../../services/UserService';
import { QuestCreate } from '../models/Quest';
import RoleService from '../../services/RoleService';
import { RoleType } from '../models/User';
import database from '../../repository';
import QuestService from '../../services/QuestService';
import { Exception } from 'handlebars';
import { IQuest } from '../../repository/models/Quest';
import StationService from '../../services/StationService';
import { IStation } from '../../repository/models/Station';
import QuestStationRelation from '../../repository/models/Station_Quest_relation';
import path from 'path';

@injectable()
export default class QuestController extends BaseController {
    private _stationService = new StationService();
    private _userService = new UserService();
    private _roleService = new RoleService();
    private _questService = new QuestService();

    PostQuestAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const body: QuestCreate = req.body;

        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        const role = await this._roleService.GetByIdAsync(user?.roleId);

        if (role?.abrv === RoleType.Admin) {
            const transaction = await database.transaction();

            try {
                const stations =
                    await this._stationService.FetchStationIdsFromIdArrayAsync(
                        body.stationIds
                    );

                if (stations && stations.length) {
                    const stationIds: Array<string> = stations.map(
                        (station: IStation) => station.id + ''
                    );

                    Object.assign(body, {
                        userId: user?.id,
                    });

                    const images: any[] = [];
                    (<Array<Express.Multer.File>>req.files).forEach(
                        (file: Express.Multer.File) => {
                            images.push(file.filename);
                        }
                    );

                    Object.assign(body, {
                        image: images[0],
                    });

                    const result = await this._questService.CreateQuestAsync(
                        body,
                        transaction
                    );

                    if (!result)
                        throw new Exception(
                            'INTERNAL_ERROR.QUEST.CREATION_FAILED'
                        );

                    const relations =
                        await this._questService.SetQuestStationRelations(
                            stationIds,
                            result.id + ''
                        );

                    if (!relations) {
                        throw new Exception(
                            'INTERNAL_ERROR.QUEST_STATION_RELATION.CREATION_FAILED'
                        );
                    }

                    transaction.commit();

                    return this.Ok(res, result);
                }

                transaction.rollback();
            } catch (e: any) {
                transaction.rollback();

                console.log(e);

                return this.ErrorMessage(res, JSON.stringify(e));
            }
        }

        return this.Unauthorized(res);
    };

    CountQuestsByUserIdAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (user) {
            const role = await this._roleService.GetByIdAsync(user.roleId);

            if (role?.abrv !== RoleType.Admin) {
                const result = await this._questService.CountAllByUserIdAsync(
                    user.id + ''
                );

                return this.Ok(res, result);
            } else {
                const result = await this._questService.CountAllByUserIdAsync();

                return this.Ok(res, result);
            }
        }

        return this.BadRequest(res);
    };

    FetchQuestAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const params: any = req.params;

        if (params.questId) {
            const quest: IQuest | null = await this._questService.GetByIdAsync(
                params.questId
            );

            if (quest) {
                return this.Ok(res, quest);
            }
        }

        return this.BadRequest(res);
    };

    FetchQuestByUserAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const params: any = req.params;

        if (params.questId) {
            const quest: IQuest | null =
                await this._questService.GetByIdForUserAsync(
                    params.questId,
                    params.userId
                );

            if (quest) {
                return this.Ok(res, quest);
            }
        }

        return this.BadRequest(res);
    };

    FetchCompletedQuestsAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const params: any = req.params;

        if (params.userId) {
            const quest: IQuest | null =
                await this._questService.GetCompletedQuestsAsync(params.userId);

            if (quest) {
                return this.Ok(res, quest);
            }
        }

        return this.BadRequest(res);
    };

    FetchQuestsAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const query: any = req.query;

        if (query) {
            const result = await this._questService.FetchQuestsAsync(query);
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

        if (user && params.questId) {
            const result = await this._questService.DeleteAsync(params.questId);

            if (result) return this.Ok(res, result);

            return this.BadRequest(res, result);
        }

        return this.BadRequest(res);
    };

    PutQuestAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const params = req.params;

        const body: QuestCreate = req.body;

        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        const role = await this._roleService.GetByIdAsync(user?.roleId);

        if (role?.abrv === RoleType.Admin && params.questId) {
            const transaction = await database.transaction();

            try {
                const stations =
                    await this._stationService.FetchStationIdsFromIdArrayAsync(
                        body.stationIds
                    );

                if (stations && stations.length) {
                    const stationIds: Array<string> = stations.map(
                        (station: IStation) => station.id + ''
                    );

                    Object.assign(body, {
                        userId: user?.id,
                    });

                    const images: any[] = [];
                    (<Array<Express.Multer.File>>req.files).forEach(
                        (file: Express.Multer.File) => {
                            images.push(file.filename);
                        }
                    );

                    Object.assign(body, {
                        image: images[0],
                    });

                    const result = await this._questService.PutQuestAsync(
                        body,
                        params.questId,
                        transaction
                    );

                    if (!result)
                        throw new Exception(
                            'INTERNAL_ERROR.QUEST.UPDATE_FAILED'
                        );

                    await QuestStationRelation.destroy({
                        where: {
                            questId: params.questId,
                        },
                    });

                    const relations =
                        await this._questService.SetQuestStationRelations(
                            stationIds,
                            params.questId
                        );

                    if (!relations) {
                        throw new Exception(
                            'INTERNAL_ERROR.QUEST_STATION_RELATION.UPDATE_FAILED'
                        );
                    }

                    transaction.commit();

                    return this.Ok(res, result);
                }

                transaction.rollback();
            } catch (e: any) {
                transaction.rollback();

                console.log(e);

                return this.ErrorMessage(res, JSON.stringify(e));
            }
        }

        return this.Unauthorized(res);
    };

    PutQuestDisabledAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        try {
            const params: any = req.params;

            const user = await this._userService.GetByIdAsync(
                res.locals.user?.id
            );

            if (!user) this.Unauthorized(res);

            const role = await this._roleService.GetByIdAsync(
                user?.roleId + ''
            );

            if (role?.abrv === RoleType.Admin && params.stationId) {
                const result = await this._questService.PutQuestDisabledAsync(
                    params.stationId
                );

                return this.Ok(res, result);
            } else if (
                (role?.abrv === RoleType.Object ||
                    role?.abrv === RoleType.Office) &&
                params.stationId
            ) {
                const result = await this._questService.PutQuestDisabledAsync(
                    params.stationId,
                    user?.id + ''
                );

                return this.Ok(res, result);
            }
        } catch (e: any) {
            console.log(e);
        }

        return this.BadRequest(res);
    };

    PutQuestEnabledAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const params: any = req.params;

        const user = await this._userService.GetByIdAsync(res.locals.user?.id);
        if (!user) this.Unauthorized(res);

        const role = await this._roleService.GetByIdAsync(user?.roleId);

        if (role?.abrv === RoleType.Admin && params.stationId) {
            const result = await this._questService.PutQuestEnabledAsync(
                params.stationId
            );

            return this.Ok(res, result);
        } else if (
            (role?.abrv === RoleType.Object ||
                role?.abrv === RoleType.Office) &&
            params.stationId
        ) {
            const result = await this._questService.PutQuestEnabledAsync(
                params.stationId,
                user?.id + ''
            );

            return this.Ok(res, result);
        }

        return this.BadRequest(res);
    };

    FetchQuestsNearbyAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const query: any = req.query;

        const body: any = req.body;

        if (query) {
            const result = await this._questService.FetchQuestsNearbyAsync(
                body.latitude,
                body.longitude,
                body.distance ? body.distance : 10,
                body.category,
                query
            );

            return this.Ok(res, result);
        }

        return this.BadRequest(res);
    };
}
