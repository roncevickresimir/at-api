import { injectable } from 'tsyringe';
import BaseController from './BaseController';
import express from 'express';
import UserService from '../../services/UserService';
import RewardService from '../../services/RewardService';
import { RewardCreate } from '../models/Reward';
import { RoleType } from '../models/User';
import RoleService from '../../services/RoleService';
import database from '../../repository';
import ImageService from '../../services/ImageService';
import PageRpp from '../models/PageRpp';
import { Exception } from 'handlebars';
import { IStation } from '../../repository/models/Station';
import StationService from '../../services/StationService';
import RewardTypeService from '../../services/RewardTypeService';
import { IRewardType } from '../../repository/models/RewardType';
import QuestService from '../../services/QuestService';

@injectable()
export default class DashboardController extends BaseController {
    private _userService = new UserService();
    private _rewardService = new RewardService();
    private _rewardTypeService = new RewardTypeService();
    private _roleService = new RoleService();
    private _stationService = new StationService();
    private _questService = new QuestService();

    FetchDashboardData = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const params = req.params;

        if (params.userId) {
            const questsData =
                await this._questService.FetchQuestsDataByUserIdAsync(
                    params.userId
                );

            const questData =
                await this._questService.FetchQuestDataByUserIdAsync(
                    params.userId
                );
            const stationData = undefined;
            const rewardData = undefined;
            const userData = undefined;

            const resultSketch = {
                quests: {
                    questCount: 99,
                    questCompletionAverage: 80,
                },
                bestQuest: {
                    name: 'Lorem Ipsum',
                    userCount: 99,
                    questCompletionAverage: 80,
                    rewardsClaimed: 99,
                    rewardsIssued: 999,
                    totalTimeSpent: 3,
                },
                bestStation: {
                    name: 'Dolor Sit',
                    userCount: 99,
                    timeSpentAvg: 3,
                    rewardsClaimed: 99,
                    rewardsIssued: 999,
                },
                bestReward: {
                    name: 'Dolor Sit',
                    userCount: 99,
                    rewardsClaimed: 99,
                    rewardsIssued: 999,
                },
                userData: userData,
            };

            const result = {
                quests: questsData,
                bestQuest: userData,
                bestStation: userData,
                bestReward: userData,
                userData: userData,
            };

            return this.Ok(res, result);
        }

        return this.BadRequest(res);
    };
}
