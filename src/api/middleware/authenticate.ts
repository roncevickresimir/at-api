import { config } from 'api/config/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ROLES } from '@api/dtos';
import { UserService } from '@api/services';
import { ErrorHandler } from '@api/util';

interface AuthToken {
  id: string;
  valid: string;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const userService = new UserService();
  let token = req.header('Authorization');

  if (!token) {
    throw new Error('Access denied, Authorization missing.');
  }

  token = token.split(' ')[1];

  jwt.verify(token, config.JWT_KEY, async (err, decoded) => {
    if (err) {
      return next(new ErrorHandler(401, err.message));
    }

    const user = await userService.getById(decoded?.id);

    if (!user) {
      return next(new ErrorHandler(401, 'Access denied.'));
    }

    res.locals.user = {
      id: user.id,
      role: user.role,
    };

    return next();
  });
};

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  let token = req.header('Authorization');
  const userService = new UserService();

  if (!token) {
    throw new Error('Access denied, Authorization missing.');
  }

  token = token.split(' ')[1];

  jwt.verify(token, config.JWT_KEY, async (err, decoded) => {
    if (err) {
      return next(new ErrorHandler(401, err.message));
    }

    const user = await userService.getById(decoded?.id);

    if (!user || user.role !== ROLES.ADMIN) {
      return next(new ErrorHandler(401, 'Access denied.'));
    }

    res.locals.user = {
      id: user.id,
      role: user.role,
    };

    return next();
  });
};
