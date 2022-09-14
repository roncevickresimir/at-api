import { CITEXT, Model, Optional, UUID, UUIDV4 } from 'sequelize';

import { getCommonModelOptions } from '..';

/** all attributes in the Role model */
export interface IEndUser {
    id?: string;
    username: string;
    email: string;
    password: string;
}

class EndUser extends Model<IEndUser> implements IEndUser {
    public id!: string;
    public username: string;
    public email: string;
    public password: string;
}

export interface IEndUserCreate extends Optional<IEndUser, 'id'> {}

const modelOptions = getCommonModelOptions('EndUser');

EndUser.init(
    {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: CITEXT,
            allowNull: false,
            unique: true,
        },
        email: {
            type: CITEXT,
            allowNull: false,
            unique: true,
        },
        password: {
            type: CITEXT,
            allowNull: false,
            unique: false,
        },
    },
    {
        ...modelOptions,
    }
);

export default EndUser;
