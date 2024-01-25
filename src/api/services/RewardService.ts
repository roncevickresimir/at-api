import { PageRpp } from '@api/dtos';
import { Reward } from '@api/models';

export class RewardService {
  getById = async (id: string): Promise<Reward | null> => {
    return Reward.findByPk(id);
  };

  FetchAllByUserIdAsync = async (id: string, filter?: PageRpp): Promise<Reward[] | null> => {
    if (typeof filter !== 'undefined') {
      return Reward.findAll({
        where: {
          userId: id,
        },
        limit: filter.rpp,
        offset: (filter.page - 1) * filter.rpp,
      });
    } else {
      return Reward.findAll({
        where: {
          userId: id,
        },
      });
    }
  };

  // FetchAllByStationIdAsync = async (id: string): Promise<Reward[] | null> => {
  //   return Reward.findAll({
  //     where: {
  //       questId: id,
  //     },
  //   });
  // };

  countQuestsByUserId = async (id?: string): Promise<number> => {
    if (typeof id !== 'undefined')
      return Reward.count({
        where: {
          userId: id,
        },
      });
    else return Reward.count();
  };

  PostRewardAsync = async (reward: Reward): Promise<Reward | null> => {
    const result = await Reward.create(reward);

    return result;
  };

  PutRewardAsync = async (id: string, reward: Reward): Promise<boolean> => {
    const result = await Reward.update(reward, {
      where: {
        id: id,
      },
    });

    return result[0] > 0 ? true : false;
  };

  DeleteRewardAsync = async (id: string): Promise<boolean> => {
    const result = await Reward.destroy({
      where: {
        id: id,
      },
    });

    return result > 0 ? true : false;
  };
}
