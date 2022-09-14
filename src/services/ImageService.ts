import { Transaction } from "sequelize";
import { ImageCreate } from "../api/models/Image";
import FileCheck from "../api/util/fileCheck";
import { LOCAL_DIR } from "../config";
import Image, { IImage } from "../repository/models/Image";
import QRCode_Image, { IQRCode_Image, IQRCode_ImageCreate } from "../repository/models/QRCode_Image";

export default class StationService {
    GetByIdAsync = async (id?: string): Promise<IImage | null> => {
        return Image.findByPk(id);
    };

    GetByStationIdAsync = async (id?: string): Promise<IImage[] | null> => {
        return Image.findAll({
            where: {
                stationId: id,
            },
        });
    };

    PostQRCodeAsync = async (image: IQRCode_ImageCreate, transaction: Transaction): Promise<IQRCode_Image | null> => {
        return await QRCode_Image.create(image, { transaction });
    };

    InsertImagesAsync = async (
        images: ImageCreate[],
        transaction: Transaction,
    ): Promise<IImage[] | null> => {
        return await Image.bulkCreate(images, { transaction });
    };

    DeleteImageAsync = async (id?: string): Promise<boolean> => {
        const img = await Image.findByPk(id);

        if (img) {

            const destination = LOCAL_DIR + 'images/';

            if (FileCheck.checkExists(destination + img.fileName))
                FileCheck.deleteFile(destination + img.fileName);
        }

        const result = await Image.destroy({
            where: {
                id: id,
            }
        });

        return result ? true : false;
    };
};