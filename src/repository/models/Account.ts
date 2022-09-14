import { CITEXT, Model, TEXT, UUID, UUIDV4 } from 'sequelize';

import { getCommonModelOptions } from '..';

/** all attributes in the Role model */
export interface IAccount {
    id: string;
    abrv: string;
    name: string;
}

class Account extends Model<IAccount> implements IAccount {
    public id!: string;

    public abrv: string;

    public name: string;
}

const modelOptions = getCommonModelOptions('Account');

Account.init(
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

export default Account;