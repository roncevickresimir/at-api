import { NextFunction, Request, Response } from 'express';

const acceptedRole = (...permitedRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userRole = res.locals.user.roleAbrv;

        return permitedRoles.includes(userRole)
            ? next()
            : res
                .status(403)
                .json({ message: 'User is not permitted for this action.' });
    };
};

export default acceptedRole;