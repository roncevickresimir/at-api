import { QuestService, RewardService, StationService, UserService } from '@api/services';
import express from 'express';
import { injectable } from 'tsyringe';
import { BaseController } from './BaseController';

@injectable()
export class DashboardController extends BaseController {
  private _userService = new UserService();
  private _rewardService = new RewardService();
  private _rewardTypeService = new RewardService();
  private _stationService = new StationService();
  private questService = new QuestService();

  FetchDashboardData = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const params = req.params;

    if (params.userId) {
      const questsData = await this.questService.FetchQuestsDataByUserIdAsync(params.userId);

      const questData = await this.questService.FetchQuestDataByUserIdAsync(params.userId);
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
