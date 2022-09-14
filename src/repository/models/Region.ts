import { DATE, Optional, TEXT } from "sequelize";
import { DECIMAL } from "sequelize";
import { CITEXT, Model, UUID, UUIDV4 } from 'sequelize';

import { getCommonModelOptions } from '..';
import Reward from "./Reward";

/** all attributes in the Role model */
export interface IRegion {
    id?: string;
    name: string;
    abrv: string;
    latitude: number;
    longitude: number;
    radius: number;
}

class Region extends Model<IRegion> implements IRegion {
    public id?: string;
    public name: string;
    public abrv: string;
    public latitude: number;
    public longitude: number;
    public radius: number;
}

export interface IRegionCreate extends Optional<Region, | 'id'> { }

const modelOptions = getCommonModelOptions('Region');

Region.init(
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
        abrv: {
            type: CITEXT,
            allowNull: false,
            unique: true,
        },
        latitude: {
            type: DECIMAL,
            allowNull: false,
            unique: false,
        },
        longitude: {
            type: DECIMAL,
            allowNull: false,
            unique: false,
        },
        radius: {
            type: DECIMAL,
            allowNull: false,
            unique: false,
        }
    },
    {
        ...modelOptions,
    }
);

export default Region;