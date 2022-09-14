import { CITEXT, Model, TEXT, UUID, UUIDV4 } from 'sequelize';

import { getCommonModelOptions } from '..';
import User from "./User";

/** all attributes in the Role model */
export interface IRole {
    id: string;
    abrv: string;
    name: string;
}

class Role extends Model<IRole> implements IRole {
    public id!: string;

    public abrv: string;

    public name: string;
}

const modelOptions = getCommonModelOptions('Role');

Role.init(
    {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        abrv: {
            type: CITEXT,
            allowNull: false,
            unique: true,
        },
        name: {
            type: TEXT,
            allowNull: false,
            unique: true,
        },
    },
    {
        ...modelOptions,
    }
);


export default Role;