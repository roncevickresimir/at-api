import { injectable } from 'tsyringe';
import BaseController from './BaseController';
import express from 'express';
import UserService from '../../services/UserService';
import database from '../../repository';
import StationService from '../../services/StationService';
import { StationCreate } from '../models/Station';
import RoleService from '../../services/RoleService';
import { RoleType } from '../models/User';
import FileCheck from '../util/fileCheck';
import { ImageCreate } from '../models/Image';
import path from 'path';
import { LOCAL_DIR, UPLOAD_DIR, UPLOAD_DIR_QR } from '../../config';
import ImageService from '../../services/ImageService';
import { Exception } from 'handlebars';
import QRCode from 'qrcode';
import PageRpp from '../models/PageRpp';
import { resourceLimits } from 'worker_threads';
import Station, { IStation } from '../../repository/models/Station';

@injectable()
export default class StationController extends BaseController {
    private _userService = new UserService();
    private _stationService = new StationService();
    private _roleService = new RoleService();
    private _imageService = new ImageService();

    PostStationAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const body: StationCreate = req.body;

        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        const role = await this._roleService.GetByIdAsync(user?.roleId);

        if (role?.abrv === RoleType.Admin) {
            const transaction = await database.transaction();

            try {
                Object.assign(body, { userId: user?.id });

                const result = await this._stationService.CreateStationAsync(
                    body,
                    transaction
                );

                if (!result)
                    throw new Exception(
                        'INTERNAL_ERROR.STATION.CREATION_FAILED'
                    );

                if (req.files && result) {
                    const images: ImageCreate[] = [];
                    (<Array<Express.Multer.File>>req.files).map(
                        (file: Express.Multer.File) => {
                            /*if (FileCheck.checkExists(file.path))
                            FileCheck.deleteFile(file.path);*/

                            images.push({
                                stationId: result.id + '',
                                fileName: file.originalname,
                                fileExt: path.extname(file.originalname),
                                filePath: UPLOAD_DIR + file.filename,
                                createdAt: new Date(),
                            });
                        }
                    );

                    const resultImages =
                        await this._imageService.InsertImagesAsync(
                            images,
                            transaction
                        );

                    if (!resultImages)
                        throw new Exception(
                            'INTERNAL_ERROR.STATION.IMAGES_UPLOAD_FAILED'
                        );
                }

                // Generate QR code from stationId

                const fileName = Date.now() + '.svg';
                const destination = LOCAL_DIR + 'qr-codes/';

                const qrcodeImage: any = {
                    fileName: fileName,
                    fileExt: 'SVG',
                    filePath: UPLOAD_DIR_QR + fileName,
                    createdAt: new Date(),
                    stationId: result.id,
                };
                const image = await this._imageService.PostQRCodeAsync(
                    qrcodeImage,
                    transaction
                );

                if (FileCheck.checkExists(destination + fileName))
                    FileCheck.deleteFile(destination + fileName);

                QRCode.toFile(
                    destination + fileName,
                    result.id ? result.id : '',
                    {
                        type: 'svg',
                    }
                );

                transaction.commit();

                return this.Ok(res, result);
            } catch (e: any) {
                transaction.rollback();

                console.log(e);

                return this.ErrorMessage(res, JSON.stringify(e));
            }
        }

        return this.Unauthorized(res);
    };

    CountStationsByUserIdAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (user) {
            const role = await this._roleService.GetByIdAsync(user.roleId);

            if (role?.abrv !== RoleType.Admin) {
                const result = await this._stationService.CountAllByUserIdAsync(
                    user.id + ''
                );

                return this.Ok(res, result);
            } else {
                const result =
                    await this._stationService.CountAllByUserIdAsync();

                return this.Ok(res, result);
            }
        }

        return this.BadRequest(res);
    };

    FetchStationAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const params: any = req.params;

        if (params.stationId) {
            const station: IStation | null =
                await this._stationService.GetByIdAsync(params.stationId);

            return this.Ok(res, station);
        }

        return this.BadRequest(res);
    };

    FetchStationsAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const query: any = req.query;

        if (query) {
            const result = await this._stationService.FetchStationsAsync(query);

            return this.Ok(res, result);
        }

        return this.BadRequest(res);
    };

    DeleteAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const params: any = req.params;

        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        const role = await this._roleService.GetByIdAsync(user?.roleId);

        if (role?.abrv === RoleType.Admin) {
            if (params.stationId) {
                const result = await this._stationService.DeleteStationAsync(
                    params.stationId
                );

                if (result) return this.Ok(res, result);

                return this.BadRequest(res, result);
            }
        }

        return this.BadRequest(res);
    };

    PutStationAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const params: any = req.params;

        const body: StationCreate = req.body;

        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        const role = await this._roleService.GetByIdAsync(user?.roleId);

        if (role?.abrv === RoleType.Admin && params.stationId) {
            const transaction = await database.transaction();

            try {
                const result = await this._stationService.PutStationAsync(
                    body,
                    params.stationId,
                    transaction
                );

                if (!result)
                    throw new Exception(
                        'INTERNAL_ERROR.STATION.CREATION_FAILED'
                    );

                if (req.files && result) {
                    const images: ImageCreate[] = [];
                    (<Array<Express.Multer.File>>req.files).map(
                        (file: Express.Multer.File) => {
                            /*if (FileCheck.checkExists(file.path))
                            FileCheck.deleteFile(file.path);*/

                            images.push({
                                stationId: params.stationId + '',
                                fileName: file.originalname,
                                fileExt: path.extname(file.originalname),
                                filePath: UPLOAD_DIR + file.filename,
                                createdAt: new Date(),
                            });
                        }
                    );

                    const resultImages =
                        await this._imageService.InsertImagesAsync(
                            images,
                            transaction
                        );

                    if (!resultImages)
                        throw new Exception(
                            'INTERNAL_ERROR.STATION.IMAGES_UPLOAD_FAILED'
                        );
                }

                transaction.commit();

                return this.Ok(res, result);
            } catch (e: any) {
                transaction.rollback();

                console.log(e);

                return this.ErrorMessage(res, JSON.stringify(e));
            }
        }

        return this.Unauthorized(res);
    };

    PutStationDisabledAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        try {
            const params: any = req.params;

            const user = await this._userService.GetByIdAsync(
                res.locals.user?.id
            );

            if (!user) this.Unauthorized(res);

            const role = await this._roleService.GetByIdAsync(
                user?.roleId + ''
            );

            if (role?.abrv === RoleType.Admin && params.stationId) {
                const result =
                    await this._stationService.PutStationDisabledAsync(
                        params.stationId
                    );

                return this.Ok(res, result);
            } else if (
                (role?.abrv === RoleType.Object ||
                    role?.abrv === RoleType.Office) &&
                params.stationId
            ) {
                const result =
                    await this._stationService.PutStationDisabledAsync(
                        params.stationId,
                        user?.id + ''
                    );

                return this.Ok(res, result);
            }
        } catch (e: any) {
            console.log(e);
        }

        return this.BadRequest(res);
    };

    PutStationEnabledAsync = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response> => {
        const params: any = req.params;

        const user = await this._userService.GetByIdAsync(res.locals.user?.id);
        if (!user) this.Unauthorized(res);

        const role = await this._roleService.GetByIdAsync(user?.roleId);

        if (role?.abrv === RoleType.Admin && params.stationId) {
            const result = await this._stationService.PutStationEnabledAsync(
                params.stationId
            );

            return this.Ok(res, result);
        } else if (
            (role?.abrv === RoleType.Object ||
                role?.abrv === RoleType.Office) &&
            params.stationId
        ) {
            const result = await this._stationService.PutStationEnabledAsync(
                params.stationId,
                user?.id + ''
            );

            return this.Ok(res, result);
        }

        return this.BadRequest(res);
    };
}
