import { CITEXT, Model, Optional, TEXT, UUID, UUIDV4 } from 'sequelize';

import { getCommonModelOptions } from '..';
import Station from './Station';
import User from './User';

/** all attributes in the Role model */
export interface IRewardType {
    id?: string;
    name: string;
    description?: string;
    userId: string;
    stationId: string;
    image: string;
}

class RewardType extends Model<IRewardType> implements IRewardType {
    public id?: string;
    public name: string;
    public description?: string;
    public userId: string;
    public stationId: string;
    public image: string;
}

export interface IRewardTypeCreate
    extends Optional<IRewardType, 'id' | 'description'> {}

const modelOptions = getCommonModelOptions('RewardType');

RewardType.init(
    {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: TEXT,
            allowNull: false,
            unique: false,
        },
        description: {
            type: TEXT,
            allowNull: true,
        },
        userId: {
            type: UUID,
            allowNull: false,
            unique: false,
        },
        stationId: {
            type: UUID,
            allowNull: false,
            unique: false,
        },
        image: {
            type: CITEXT,
            allowNull: true,
            unique: false,
        },
    },
    {
        ...modelOptions,
    }
);

RewardType.belongsTo(User, { foreignKey: 'userId' });

RewardType.belongsTo(Station, { foreignKey: 'stationId' });
Station.hasMany(RewardType, { foreignKey: 'stationId' });

export default RewardType;
