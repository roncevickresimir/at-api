import sequelize, { Transaction } from 'sequelize';

import { Location, PageRpp, QuestCreate } from '@api/dtos';
import { Quest, Reward, Station, UserQuest, UserStation } from '@api/models';
import { injectable } from 'tsyringe';

@injectable()
export class QuestService {
  getById = async (id?: string): Promise<Quest | null> => {
    return Quest.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Station,
        },
      ],
    });
  };

  editQuest = async (quest, id: string): Promise<boolean> => {
    const result = await Quest.update(quest, {
      where: {
        id: id,
      },
    });

    return result[0] > 0;
  };

  createUserQuest = async (questId: string, userId: string): Promise<any | null> => {
    return UserQuest.findOrCreate({
      where: {
        userId: userId,
        questId: questId,
      },
      defaults: {
        userId: userId,
        questId: questId,
      },
      include: [
        {
          model: Quest,
          include: [
            {
              model: Station,
              include: [{
                model: UserStation,
                where: {
                  userId: userId
                }
              }]
            },
          ],
        },
      ],
    });
  }

  editUserQuest = async (quest): Promise<boolean> => {
    const result = await UserQuest.update(quest, {
      where: {
        userId: quest.userId,
        questId: quest.questId,
      },
    });

    return result[0] > 0;
  };

  getUserQuest = async (questId: string, userId: string): Promise<any | null> => {
    return UserQuest.findOne({
      where: {
        questId: questId,
        userId: userId,
      },
      include: [
        {
          model: Quest,
          include: [
            {
              model: Station,
              include: [{
                model: UserStation,
                where: {
                  userId: userId
                }
              }]
            },
            {
              model: Reward,
            },
          ],
        },
      ],
    });
  };

  getCompletedUserQuests = async (userId?: string): Promise<any> => {
    const userQuests = await UserQuest.findAll({
      where: {
        userId: userId,
        complete: true,
      },
      include: [
        {
          model: Quest,
        },
      ],
      attributes: ['id'],
    });

    return userQuests;

    // return userQuests.map((userQuest) => userQuest.quests);
  };

  getQuests = async (filter = {page: 1, rpp: 20}): Promise<Quest[] | null> => {
      return await Quest.findAll({
        limit: filter.rpp,
        offset: (filter.page - 1) * filter.rpp,
        include: [
          {
            model: Station,
          },
        ],
      });
  };

  createQuest = async (quest): Promise<Quest | null> => {
    return await Quest.create(quest);
  };

  countQuestsByUserId = async (id?: string): Promise<number> => {
    if (typeof id !== 'undefined')
      return Quest.count({
        where: {
          userId: id,
        },
      });
    else return Quest.count();
  };

  FetchQuestsDataByUserIdAsync = async (id?: string): Promise<any | null> => {
    const questCount = await Quest.count({
      where: {
        userId: id,
      },
    });

    const result = {
      questCount: questCount,
    };

    return result;
  };

  FetchQuestDataByUserIdAsync = async (id?: string): Promise<any | null> => {
    const questCount = await Quest.count({
      where: {
        userId: id,
      },
    });

    const result = {
      questCount: questCount,
    };

    return result;
  };

  delete = async (id?: string): Promise<boolean> => {
    await Station.destroy({
      where: {
        questId: id,
      },
    });

    const result = await Quest.destroy({
      where: {
        id: id,
      },
    });

    return !!result;
  };

  SetQuestStations = async (stationIds: Array<string>, questId: string): Promise<boolean> => {
    // const questStationRelationList: Array<CreateStation> = [];
    // for (let i of stationIds) {
    //   questStationRelationList.push({
    //     stationId: stationIds[i],
    //     questId: questId,
    //   });
    // }

    // const result = await QuestStation.bulkCreate(questStationRelationList);

    // if (result.length) return true;
    return false;
  };

  disableQuest = async (id: string): Promise<boolean> => {
    const [result] = await Quest.update(
      {
        disabled: true,
      },
      {
        where: {
          id: id,
        },
      },
    );

    return !!result;
  };

  enableQuest = async (id: string): Promise<boolean> => {
    const [result] = await Quest.update(
      {
        disabled: false,
      },
      {
        where: {
          id: id,
        },
      },
    );

    return !!result;
  };

  getClosestQuests = async (
    location: Location,
    distance: number = 100,
    category?: string,
    filter?: PageRpp,
  ): Promise<Quest[] | null> => {
    if (typeof filter !== 'undefined')
      return Quest.findAll({
        where: sequelize.literal(`${category ? ` position('${category}' in "Quest"."categoryIds")>0` : ''}`),
        limit: filter.rpp,
        offset: (filter.page - 1) * filter.rpp,
        include: [
          {
            model: Station,
          },
        ],
      });
    else
      return Quest.findAll({
        where: sequelize.literal(
          `( SQRT( POW( ${location.latitude} - "Quest"."location",2) + POW( ${location.longitude} - "Quest"."longitude",2)) < ${distance} )`,
        ),
        include: [
          {
            model: Station,
          },
        ],
      });
  };
}