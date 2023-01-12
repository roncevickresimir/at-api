import { Sequelize, Transaction } from 'sequelize';
import PageRpp from '../api/models/PageRpp';
import Quest, {
    IQuest,
    IQuestCreate,
    IQuestsData,
} from '../repository/models/Quest';
import Station, { IStation } from '../repository/models/Station';
import QuestStationRelation, {
    IQuestStationRelationCreate,
} from '../repository/models/Station_Quest_relation';
import StationService from './StationService';
import database from '../repository';
import sequelize from 'sequelize';
import EndUserStation from '../repository/models/EndUserStation';
import RewardType from '../repository/models/RewardType';

export default class QuestService {
    private _stationService = new StationService();
    GetByIdAsync = async (id?: string): Promise<IQuest | null> => {
        return Quest.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: QuestStationRelation,
                    include: [
                        {
                            model: Station,
                        },
                    ],
                    attributes: ['stationId'],
                },
            ],
        });
    };

    GetByIdForUserAsync = async (
        id?: string,
        userId?: string
    ): Promise<IQuest | null> => {
        return Quest.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: QuestStationRelation,
                    include: [
                        {
                            model: Station,
                            include: [
                                {
                                    model: EndUserStation,
                                    attributes: ['complete'],
                                },
                                {
                                    model: RewardType,
                                },
                            ],
                        },
                    ],
                    attributes: ['stationId'],
                },
            ],
        });
    };

    GetCompletedQuestsAsync = async (userId?: string): Promise<any> => {
        return EndUserStation.findAll({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: Station,
                    include: [
                        {
                            model: QuestStationRelation,
                            include: [
                                {
                                    model: Quest,
                                },
                            ],
                            attributes: ['id'],
                        },
                    ],
                    attributes: ['id'],
                },
            ],
            attributes: ['id'],
        });

        return Quest.findOne({
            where: {
                id: userId,
            },
            include: [
                {
                    model: QuestStationRelation,
                    include: [
                        {
                            model: Station,
                            include: [
                                {
                                    model: EndUserStation,
                                    attributes: ['complete'],
                                },
                                {
                                    model: RewardType,
                                },
                            ],
                        },
                    ],
                    attributes: ['stationId'],
                },
            ],
        });
    };

    FetchQuestsAsync = async (filter?: PageRpp): Promise<IQuest[] | null> => {
        if (typeof filter !== 'undefined')
            return await Quest.findAll({
                limit: filter.rpp,
                offset: (filter.page - 1) * filter.rpp,
                include: [
                    {
                        model: QuestStationRelation,
                        include: [
                            {
                                model: Station,
                            },
                        ],
                        attributes: ['stationId'],
                    },
                ],
            });
        else return await Quest.findAll();
    };

    CreateQuestAsync = async (
        quest: IQuestCreate,
        transaction: Transaction
    ): Promise<IQuest | null> => {
        return await Quest.create(quest, { transaction });
    };

    CountAllByUserIdAsync = async (id?: string): Promise<number> => {
        if (typeof id !== 'undefined')
            return Quest.count({
                where: {
                    userId: id,
                },
            });
        else return Quest.count();
    };

    FetchQuestsDataByUserIdAsync = async (
        id?: string
    ): Promise<IQuestsData | null> => {
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

    FetchQuestDataByUserIdAsync = async (
        id?: string
    ): Promise<IQuestsData | null> => {
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

    DeleteAsync = async (id?: string): Promise<boolean> => {
        await QuestStationRelation.destroy({
            where: {
                questId: id,
            },
        });

        const result = await Quest.destroy({
            where: {
                id: id,
            },
        });

        return result ? true : false;
    };

    PutQuestAsync = async (
        quest: IQuestCreate,
        id: string,
        transaction: Transaction
    ): Promise<boolean> => {
        const result = await Quest.update(quest, {
            where: {
                id: id,
            },
            transaction: transaction,
        });

        return result[0] > 0 ? true : false;
    };

    SetQuestStationRelations = async (
        stationIds: Array<string>,
        questId: string
    ): Promise<boolean> => {
        const questStationRelationList: Array<IQuestStationRelationCreate> = [];
        for (let i = 0; i < stationIds.length; i++) {
            questStationRelationList.push({
                stationId: stationIds[i],
                questId: questId,
            });
        }

        const result = await QuestStationRelation.bulkCreate(
            questStationRelationList
        );

        if (result.length) return true;
        return false;
    };

    PutQuestDisabledAsync = async (
        id: string,
        userId?: string
    ): Promise<boolean> => {
        const station: IQuestCreate | null = await Quest.findOne({
            where: {
                id: id,
            },
        });

        if (!station) return false;

        if (userId != undefined) {
            if (station.userId !== userId) return false;

            const [result] = await Quest.update(
                {
                    userId: station.userId,
                    title: station.title,
                    description: station.description,
                    categoryIds: station.categoryIds.map(
                        (elem: string) => elem
                    ),
                    latitude: station.latitude,
                    longitude: station.longitude,
                    disabled: true,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );

            return result > 0 ? true : false;
        } else {
            const [result] = await Quest.update(
                {
                    userId: station.userId,
                    title: station.title,
                    description: station.description,
                    categoryIds: station.categoryIds.map(
                        (elem: string) => elem
                    ),
                    latitude: station.latitude,
                    longitude: station.longitude,
                    disabled: false,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            return result > 0 ? true : false;
        }
    };

    PutQuestEnabledAsync = async (
        id: string,
        userId?: string
    ): Promise<boolean> => {
        const station: IQuestCreate | null = await Quest.findOne({
            where: {
                id: id,
            },
        });

        if (!station) return false;

        if (userId != undefined) {
            if (station.userId !== userId) return false;

            const [result] = await Quest.update(
                {
                    userId: station.userId,
                    title: station.title,
                    description: station.description,
                    categoryIds: station.categoryIds.map(
                        (elem: string) => elem
                    ),
                    latitude: station.latitude,
                    longitude: station.longitude,
                    disabled: false,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );

            return result > 0 ? true : false;
        } else {
            const [result] = await Quest.update(
                {
                    userId: station.userId,
                    title: station.title,
                    description: station.description,
                    categoryIds: station.categoryIds.map(
                        (elem: string) => elem
                    ),
                    latitude: station.latitude,
                    longitude: station.longitude,
                    disabled: true,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            return result > 0 ? true : false;
        }
    };

    FetchQuestsNearbyAsync = async (
        latitude: number,
        longitude: number,
        distance: number = 100,
        category?: string,
        filter?: PageRpp
    ): Promise<IQuest[] | null> => {
        if (typeof filter !== 'undefined')
            return Quest.findAll({
                where: sequelize.literal(
                    `${
                        category
                            ? ` position('${category}' in "Quest"."categoryIds")>0`
                            : ''
                    }`
                ),
                limit: filter.rpp,
                offset: (filter.page - 1) * filter.rpp,
                include: [
                    {
                        model: QuestStationRelation,
                        include: [
                            {
                                model: Station,
                            },
                        ],
                        attributes: ['stationId'],
                    },
                ],
            });
        else
            return Quest.findAll({
                where: sequelize.literal(
                    `( SQRT( POW( ${latitude} - "Quest"."latitude",2) + POW( ${longitude} - "Quest"."longitude",2)) < ${distance} )`
                ),
                include: [
                    {
                        model: QuestStationRelation,
                        include: [
                            {
                                model: Station,
                            },
                        ],
                        attributes: ['stationId'],
                    },
                ],
            });
    };
}
