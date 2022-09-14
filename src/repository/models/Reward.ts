import { Model, Optional, UUID, UUIDV4 } from 'sequelize';

import { getCommonModelOptions } from '..';
import Image from './Image';
import QRCode_Image from './QRCode_Image';
import RewardType from './RewardType';
import Station from './Station';
import User from './User';

/** all attributes in the Role model */
export interface IReward {
    id?: string;
    userId: string;
    rewardTypeId: string;
}

class Reward extends Model<IReward> implements IReward {
    public id?: string;
    public userId: string;
    public rewardTypeId: string;
}

export interface IRewardCreate extends Optional<IReward, 'id'> {}

const modelOptions = getCommonModelOptions('Reward');

Reward.init(
    {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: UUID,
            allowNull: false,
        },
        rewardTypeId: {
            type: UUID,
            allowNull: false,
        },
    },
    {
        ...modelOptions,
    }
);

Reward.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Reward, { foreignKey: 'userId' });
Reward.belongsTo(RewardType, { foreignKey: 'rewardTypeId' });
RewardType.hasMany(Reward, { foreignKey: 'rewardTypeId' });

export default Reward;
