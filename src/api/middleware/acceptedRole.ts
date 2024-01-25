import { NextFunction, Request, Response } from 'express';

export const acceptedRole = (...permitedroles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRole = res.locals.user.RoleAbrv;

    return permitedroles.includes(userRole)
      ? next()
      : res
          .status(403)
          .json({ message: "User is not permitted for this action." });
  };
};