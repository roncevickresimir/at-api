import { CITEXT, Model, Optional, UUID, UUIDV4 } from 'sequelize';

import { getCommonModelOptions } from '..';
import UserService from '../../services/UserService';
import EndUserStation from './EndUserStation';
import Role from './Role';

/** all attributes in the Role model */
export interface IUser {
    id?: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
    password: string;
}
export interface IEndUser {
    id?: string;
    username: string;
    email: string;
    password: string;
}

class User extends Model<IUser> implements IUser {
    public id!: string;
    public userName: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public roleId: string;
    public password: string;
}

export interface IUserCreate extends Optional<IUser, 'id'> {}

export interface IEndUserCreate extends Optional<IEndUser, 'id'> {}

const modelOptions = getCommonModelOptions('User');

User.init(
    {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        userName: {
            type: CITEXT,
            allowNull: false,
            unique: true,
        },
        firstName: {
            type: CITEXT,
            allowNull: false,
            unique: false,
        },
        lastName: {
            type: CITEXT,
            allowNull: false,
            unique: false,
        },
        email: {
            type: CITEXT,
            allowNull: false,
            unique: true,
        },
        roleId: {
            type: UUID,
            allowNull: false,
            unique: false,
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

User.belongsTo(Role, { foreignKey: 'roleId' });

export default User;
