import { Response } from 'express';

import handleError, { ErrorHandler } from '../util/handleError';

export default class BaseController {
    // 200
    protected Ok = (res: Response, data?: any): Response => {
        return res.status(200).json(data);
    };

    // 204
    protected NoContent = (res: Response): Response => {
        return res.status(204);
    };

    // 400
    protected BadRequest = (res: Response, message?: any): Response => {
        return handleError(
            res,
            new ErrorHandler(
                400,
                message || 'BACKEND_ERRORS.BASE.INVALID_INPUT'
            )
        );
    };

    // 401
    protected Unauthorized = (res: Response, message?: string): Response => {
        return handleError(
            res,
            new ErrorHandler(401, message || 'BACKEND_ERRORS.BASE.UNAUTHORIZED')
        );
    };

    // 403
    protected Forbidden = (res: Response, message?: string): Response => {
        return handleError(
            res,
            new ErrorHandler(403, message || 'BACKEND_ERRORS.BASE.FORBIDDEN')
        );
    };

    // 404
    protected NotFound = (res: Response, message?: string): Response => {
        return handleError(
            res,
            new ErrorHandler(404, message || 'BACKEND_ERRORS.BASE.NOT_FOUND')
        );
    };

    // 409
    protected Conflict = (res: Response, message?: string): Response => {
        return handleError(
            res,
            new ErrorHandler(409, message || 'BACKEND_ERRORS.BASE.CONFLICT')
        );
    };

    // 500
    protected Error = (res: Response): Response => {
        return handleError(
            res,
            new ErrorHandler(500, 'BACKEND_ERRORS.BASE.INTERNAL_ERROR')
        );
    };

    protected ErrorMessage = (res: Response, message?: string): Response => {
        return handleError(
            res,
            new ErrorHandler(500, message || 'BACKEND_ERRORS.BASE.INTERNAL_ERROR')
        );
    };
}
