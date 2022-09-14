import { Transaction } from 'sequelize/types';
import PageRpp from '../api/models/PageRpp';
import FileCheck from '../api/util/fileCheck';
import { LOCAL_DIR } from '../config';
import QRCode_Image from '../repository/models/QRCode_Image';
import Reward, { IReward } from '../repository/models/Reward';
import RewardType from '../repository/models/RewardType';

export default class RewardService {
    GetByIdAsync = async (id: string): Promise<IReward | null> => {
        return Reward.findOne({
            where: {
                id: id,
            },
            include: {
                model: QRCode_Image,
            },
        });
    };

    FetchAllByUserIdAsync = async (id: string): Promise<IReward[] | null> => {
        return Reward.findAll({
            where: {
                userId: id,
            },
            include: {
                model: RewardType,
            },
            attributes: [],
        });
    };

    CountAllByUserIdAsync = async (id?: string): Promise<number> => {
        if (typeof id !== 'undefined')
            return Reward.count({
                where: {
                    userId: id,
                },
            });
        else return Reward.count();
    };

    PostRewardAsync = async (
        reward: IReward,
        transaction: Transaction
    ): Promise<IReward | null> => {
        const result = await Reward.create(reward, { transaction });

        return result;
    };

    DeleteRewardAsync = async (id: string): Promise<boolean> => {
        const reward: any = await this.GetByIdAsync(id);

        if (!reward) return false;

        await QRCode_Image.destroy({
            where: {
                id: reward?.imageId,
            },
        });

        const destination = LOCAL_DIR + 'qr-codes/';

        if (FileCheck.checkExists(destination + reward.QRCode_Image.fileName))
            FileCheck.deleteFile(destination + reward.QRCode_Image.fileName);

        const result = await Reward.destroy({
            where: {
                id: id,
            },
        });

        return result > 0 ? true : false;
    };
}
