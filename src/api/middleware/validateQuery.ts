import { mapErrors, handleError, ErrorHandler } from "@api/util";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const validateQuery = (queryClass: any) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const mapped: any = plainToClass(queryClass, req.query);
    const errors = await validate(mapped);

    if (errors && errors.length > 0) {
      const mappedErros = mapErrors(errors);
      return handleError(
        res,
        new ErrorHandler(400, "BACKEND_ERRORS.INPUT_FAILED", mappedErros)
      );
    } else {
      res.locals.query = mapped;
      return next();
    }
  };
};
