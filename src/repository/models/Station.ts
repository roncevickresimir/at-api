import { ARRAY } from 'sequelize';
import { DOUBLE } from 'sequelize';
import { NUMBER } from 'sequelize';
import { Model, Optional, TEXT, UUID, UUIDV4 } from 'sequelize';
import Image from './Image';

import { getCommonModelOptions } from '..';
import User from './User';
import Account from './Account';
import { BOOLEAN } from 'sequelize';
import RewardType from './RewardType';
import Quest from './Quest';

/** all attributes in the Role model */
export interface IStation {
    id?: string;
    title: string;
    description: string;
    categoryIds: Array<number>;
    accountId: string;
    userId: string;
    latitude: number;
    longitude: number;
    disabled?: boolean;
}

class Station extends Model<IStation> implements IStation {
    public id?: string;
    public title: string;
    public description!: string;
    public categoryIds: Array<number>;
    public accountId: string;
    public userId: string;
    public latitude: number;
    public longitude: number;
    public disabled?: boolean;
}

export interface IStationCreate extends Optional<IStation, 'id' | 'disabled'> {}

const modelOptions = getCommonModelOptions('Station');

Station.init(
    {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: TEXT,
            allowNull: false,
            unique: false,
        },
        description: {
            type: TEXT,
            allowNull: true,
            unique: false,
        },
        categoryIds: {
            type: ARRAY(NUMBER),
            allowNull: false,
            unique: false,
            get: function () {
                var values: any = this.getDataValue('categoryIds');

                if (typeof values === 'string') {
                    values = JSON.parse(
                        values.replace('{', '[').replace('}', ']')
                    );
                }

                return values.map((value: any) => {
                    return parseInt(value);
                });
            },
            set: function (val: Array<any>): void {
                return this.setDataValue(
                    'categoryIds',
                    val.map((value: string) => {
                        return parseInt(value);
                    })
                );
            },
        },
        accountId: {
            type: UUID,
            allowNull: false,
            unique: false,
        },
        userId: {
            type: UUID,
            allowNull: false,
            unique: false,
        },
        latitude: {
            type: DOUBLE,
            allowNull: false,
            unique: false,
        },
        longitude: {
            type: DOUBLE,
            allowNull: false,
            unique: false,
        },
        disabled: {
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

Image.belongsTo(Station, { foreignKey: 'stationId' });
Station.hasMany(Image, { foreignKey: 'stationId' });

Station.belongsTo(User, { foreignKey: 'userId' });
Station.belongsTo(Account, { foreignKey: 'accountId' });

export default Station;
