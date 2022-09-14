import { Model, Optional, UUID, UUIDV4, BOOLEAN } from 'sequelize';

import { getCommonModelOptions } from '..';
import User from './User';
import Station from './Station';

export interface IEndUserStation {
    id?: string;
    userId: string;
    stationId: string;
    complete: boolean;
}

class EndUserStation extends Model<IEndUserStation> implements IEndUserStation {
    public id?: string;
    public userId: string;
    public stationId: string;
    public complete: boolean;
}

export interface IEndUserStationCreate
    extends Optional<IEndUserStation, 'id'> {}

const modelOptions = getCommonModelOptions('EndUserStation');

EndUserStation.init(
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
            unique: false,
        },
        stationId: {
            type: UUID,
            allowNull: false,
            unique: false,
        },
        complete: {
            type: BOOLEAN,
            allowNull: false,
            unique: false,
            defaultValue: false,
        },
    },
    {
        ...modelOptions,
    }
);

EndUserStation.belongsTo(Station, { foreignKey: 'stationId' });
Station.hasMany(EndUserStation, { foreignKey: 'stationId' });
EndUserStation.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(EndUserStation, { foreignKey: 'userId' });

export default EndUserStation;
