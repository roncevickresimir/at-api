import { injectable } from 'tsyringe';
import BaseController from './BaseController';
import express from 'express';
import UserService from "../../services/UserService";
import ImageService from "../../services/ImageService";



@injectable()
export default class ImageController extends BaseController {
    private _imageService = new ImageService();
    private _userService = new UserService();

    DeleteAsync = async (req: express.Request, res: express.Response): Promise<express.Response> => {

        const params: any = req.params;

        const user = await this._userService.GetByIdAsync(res.locals.user?.id);

        if (user && params.imageId) {

            const result = await this._imageService.DeleteImageAsync(params.imageId);

            if (result)
                return this.Ok(res, result);

            return this.BadRequest(res, result);
        }

        return this.BadRequest(res);
    };
};