import { QuerystringParser } from 'formidable/parsers';
import { userInfo } from 'os';
import {
    ARRAY,
    BOOLEAN,
    CITEXT,
    DOUBLE,
    Model,
    NUMBER,
    Optional,
    TEXT,
    UUID,
    UUIDV4,
} from 'sequelize';

import { getCommonModelOptions } from '..';
import User from './User';

/** all attributes in the Role model */
export interface IQuest {
    id?: string;
    title: string;
    description: string;
    categoryIds: any;
    userId: string;
    latitude: number;
    longitude: number;
    disabled?: boolean;
    image?: string;
}

class Quest extends Model<IQuest> implements IQuest {
    public id?: string;
    public title: string;
    public description!: string;
    public categoryIds: any;
    public userId: string;
    public latitude: number;
    public longitude: number;
    public disabled?: boolean;
    public image?: string;
}

export interface IQuestCreate extends Optional<IQuest, 'id' | 'disabled'> {}

const modelOptions = getCommonModelOptions('Quest');

Quest.init(
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
            unique: true,
        },
        description: {
            type: TEXT,
            allowNull: true,
            unique: false,
        },
        categoryIds: {
            type: ARRAY(UUID),
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
                    return value;
                });
            },
            set: function (val: Array<any>): void {
                return this.setDataValue(
                    'categoryIds',
                    val.map((value: string) => {
                        return value;
                    })
                );
            },
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
        image: {
            type: TEXT,
            allowNull: true,
            unique: false,
        },
    },
    {
        ...modelOptions,
    }
);

Quest.belongsTo(User, { foreignKey: 'userId' });
//Quest.belongsTo(User);
//User.hasMany(Quest, { foreignKey: "userId" });
export default Quest;
