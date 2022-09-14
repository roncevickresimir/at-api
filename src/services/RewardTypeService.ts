import PageRpp from '../api/models/PageRpp';
import RewardType, { IRewardType } from '../repository/models/RewardType';

export default class RewardTypeService {
    GetByIdAsync = async (id: string): Promise<IRewardType | null> => {
        return RewardType.findByPk(id);
    };

    FetchAllByUserIdAsync = async (
        id: string,
        filter?: PageRpp
    ): Promise<IRewardType[] | null> => {
        if (typeof filter !== 'undefined') {
            return RewardType.findAll({
                where: {
                    userId: id,
                },
                limit: filter.rpp,
                offset: (filter.page - 1) * filter.rpp,
            });
        } else {
            return RewardType.findAll({
                where: {
                    userId: id,
                },
            });
        }
    };

    FetchAllByStationIdAsync = async (
        id: string
    ): Promise<IRewardType[] | null> => {
        return RewardType.findAll({
            where: {
                stationId: id,
            },
        });
    };

    CountAllByUserIdAsync = async (id?: string): Promise<number> => {
        if (typeof id !== 'undefined')
            return RewardType.count({
                where: {
                    userId: id,
                },
            });
        else return RewardType.count();
    };

    PostRewardTypeAsync = async (
        rewardType: IRewardType
    ): Promise<IRewardType | null> => {
        const result = await RewardType.create(rewardType);

        return result;
    };

    PutRewardTypeAsync = async (
        id: string,
        rewardType: IRewardType
    ): Promise<boolean> => {
        const result = await RewardType.update(rewardType, {
            where: {
                id: id,
            },
        });

        return result[0] > 0 ? true : false;
    };

    DeleteRewardTypeAsync = async (id: string): Promise<boolean> => {
        const result = await RewardType.destroy({
            where: {
                id: id,
            },
        });

        return result > 0 ? true : false;
    };
}
