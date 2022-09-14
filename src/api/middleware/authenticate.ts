import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import express from 'express';

import { JWT_KEY } from '../../config';
import User from "../../repository/models/User";
import { ErrorHandler } from '../util/handleError';

export class LoggedUser {
    id: string;
}

const authenticate = () => {
    return async (req: Request, res: Response, next: any) => {
        let token = req.header('Authorization');
        if (!token)
            return next(
                new ErrorHandler(401, 'Access denied, Authorization missing.')
            );

        const bearerPrefix = 'Bearer ';
        if (!token.startsWith(bearerPrefix))
            return next(new ErrorHandler(400, 'Wrong token format.'));

        token = token.slice(bearerPrefix.length, token.length).trimLeft();

        jwt.verify(token, JWT_KEY!, (err, decoded) => {
            if (err) return next(new ErrorHandler(401, 'Expired token.'));

            const loggedInUser = decoded as LoggedUser;
            if (!loggedInUser)
                return next(new ErrorHandler(401, 'Access denied.'));

            res.locals.user = loggedInUser;

            next();
        });
    };
};

export const authenticateAsync = async (req: express.Request): Promise<string | null> => {
    let token = req.header('Authorization');
    if (!token)
        throw (
            new ErrorHandler(401, 'Access denied, Authorization missing.')
        );

    const bearerPrefix = 'Bearer ';
    if (!token.startsWith(bearerPrefix))
        throw (new ErrorHandler(400, 'Wrong token format.'));

    token = token.slice(bearerPrefix.length, token.length).trimLeft();

    const result: any = await jwt.verify(token, JWT_KEY!, (err, decoded: any) => {
        if (err) throw (new ErrorHandler(401, 'Expired token.'));

        const loggedInUser = decoded as LoggedUser;
        if (!loggedInUser)
            throw (new ErrorHandler(401, 'Access denied.'));

        return decoded.id;
    });

    if (result)
        return result;

    return null;
};

export default authenticate;
