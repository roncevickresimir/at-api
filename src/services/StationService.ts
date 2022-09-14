import { Op, Transaction } from 'sequelize';
import PageRpp from '../api/models/PageRpp';
import Station, {
    IStation,
    IStationCreate,
} from '../repository/models/Station';
import Image from '../repository/models/Image';
import User from '../repository/models/User';
import UserService from './UserService';
import RewardType from '../repository/models/RewardType';

export default class StationService {
    private _userService = new UserService();

    GetByIdAsync = async (id?: string): Promise<IStation | null> => {
        return await Station.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: Image,
                },
                {
                    model: User,
                },
                {
                    model: RewardType,
                },
            ],
        });
    };

    CreateStationAsync = async (
        station: IStationCreate,
        transaction: Transaction
    ): Promise<IStation | null> => {
        return await Station.create(station, { transaction });
    };

    CountAllByUserIdAsync = async (id?: string): Promise<number> => {
        if (typeof id !== 'undefined')
            return Station.count({
                where: {
                    userId: id,
                },
            });
        else return Station.count();
    };

    FetchStationIdsFromIdArrayAsync = async (
        ids: Array<string>
    ): Promise<IStation[] | null> => {
        return await Station.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            attributes: ['id'],
        });
    };
    FetchStationsFromIdArrayAsync = async (
        ids: Array<string>
    ): Promise<IStation[] | null> => {
        return await Station.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
        });
    };
    FetchStationsAsync = async (
        filter?: PageRpp
    ): Promise<IStation[] | null> => {
        if (typeof filter !== 'undefined') {
            const result = await Station.findAll({
                limit: filter.rpp,
                offset: (filter.page - 1) * filter.rpp,
                include: [
                    {
                        model: Image,
                    },
                    {
                        model: User,
                    },
                ],
            });

            return result;
        } else
            return await Station.findAll({
                include: [
                    {
                        model: Image,
                    },
                    {
                        model: User,
                    },
                ],
            });
    };

    FetchStationsCountAsync = async (): Promise<number> => {
        return await Station.count();
    };

    DeleteStationAsync = async (id: string): Promise<boolean> => {
        await Image.destroy({
            where: {
                stationId: id,
            },
        });

        const result = await Station.destroy({
            where: {
                id: id,
            },
        });

        return result ? true : false;
    };

    PutStationAsync = async (
        station: IStationCreate,
        id: string,
        transaction: Transaction
    ): Promise<boolean> => {
        const result = await Station.update(station, {
            where: {
                id: id,
            },
            transaction: transaction,
        });

        return result[0] > 0 ? true : false;
    };

    PutStationDisabledAsync = async (
        id: string,
        userId?: string
    ): Promise<boolean> => {
        const station: IStationCreate | null = await Station.findOne({
            where: {
                id: id,
            },
        });

        if (!station) return false;

        if (userId != undefined) {
            if (station.userId !== userId) return false;

            const [result] = await Station.update(
                {
                    userId: station.userId,
                    title: station.title,
                    description: station.description,
                    categoryIds: station.categoryIds.map((elem: number) =>
                        parseInt(elem.toString())
                    ),
                    accountId: station.accountId,
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
            const [result] = await Station.update(
                {
                    userId: station.userId,
                    title: station.title,
                    description: station.description,
                    categoryIds: station.categoryIds.map((elem: number) =>
                        parseInt(elem.toString())
                    ),
                    accountId: station.accountId,
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

    PutStationEnabledAsync = async (
        id: string,
        userId?: string
    ): Promise<boolean> => {
        const station: IStationCreate | null = await Station.findOne({
            where: {
                id: id,
            },
        });

        if (!station) return false;

        if (userId != undefined) {
            if (station.userId !== userId) return false;

            const [result] = await Station.update(
                {
                    userId: station.userId,
                    title: station.title,
                    description: station.description,
                    categoryIds: station.categoryIds.map((elem: number) =>
                        parseInt(elem.toString())
                    ),
                    accountId: station.accountId,
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
            const [result] = await Station.update(
                {
                    userId: station.userId,
                    title: station.title,
                    description: station.description,
                    categoryIds: station.categoryIds.map((elem: number) =>
                        parseInt(elem.toString())
                    ),
                    accountId: station.accountId,
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
}
