import { handleError, ErrorHandler } from "@api/util";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

const validateBody = (bodyClass: any) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (req.body.children) {
      JSON.parse(req.body.children);
    }
    const body = {
      ...req.body,
      children: req.body.children ? JSON.parse(req.body.children) : [],
    };
    const mapped: any = plainToClass(bodyClass, body);
    const errors = await validate(mapped);
    if (errors && errors.length > 0) {
      return handleError(
        res,
        new ErrorHandler(400, "BACKEND_ERRORS.INPUT_FAILED", errors)
      );
    } else {
      req.body = mapped;
      return next();
    }
  };
};

export { validateBody };
