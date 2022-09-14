import { DATE, Optional } from 'sequelize';
import { CITEXT, Model, TEXT, UUID, UUIDV4 } from 'sequelize';

import { getCommonModelOptions } from '..';

/** all attributes in the Role model */
export interface IImage {
    id?: string;
    stationId: string;
    fileName: string;
    fileExt: string;
    createdAt: Date;
    filePath: string;
}

class Image extends Model<IImage> implements IImage {
    public id?: string;
    public stationId: string;
    public fileName: string;
    public fileExt: string;
    public createdAt: Date;
    public filePath: string;
}

export interface IImageCreate extends Optional<Image, 'id'> {}

const modelOptions = getCommonModelOptions('Image');

Image.init(
    {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        stationId: {
            type: UUID,
            allowNull: false,
            unique: false,
        },
        fileName: {
            type: CITEXT,
            allowNull: false,
            unique: false,
        },
        fileExt: {
            type: CITEXT,
            allowNull: false,
            unique: false,
        },
        filePath: {
            type: CITEXT,
            allowNull: false,
            unique: false,
        },
        createdAt: {
            type: DATE,
            allowNull: false,
            unique: false,
        },
    },
    {
        ...modelOptions,
    }
);

export default Image;
