import { DATE, Optional } from 'sequelize';
import { CITEXT, Model, UUID, UUIDV4 } from 'sequelize';

import { getCommonModelOptions } from '..';
import Reward from './Reward';

/** all attributes in the Role model */
export interface IQRCode_Image {
    id?: string;
    fileName: string;
    fileExt: string;
    filePath: string;
    createdAt: Date;
    stationId: string;
}

class QRCode_Image extends Model<IQRCode_Image> implements IQRCode_Image {
    public id?: string;
    public fileName: string;
    public fileExt: string;
    public filePath: string;
    public createdAt: Date;
    public stationId: string;
}

export interface IQRCode_ImageCreate extends Optional<QRCode_Image, 'id'> {}

const modelOptions = getCommonModelOptions('QRCode_Image');

QRCode_Image.init(
    {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
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
        stationId: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
    },
    {
        ...modelOptions,
    }
);

export default QRCode_Image;
