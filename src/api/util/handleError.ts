import { Response } from 'express';


export class ErrorHandler {
  status: number;
  message: string;
  data: any;

  constructor(status: number, message: string, data?: any) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export const handleError = (res: Response, err: ErrorHandler): Response => {
  const { status, message, data } = err;

  console.log(message, data, status);

  return res.status(status).json({
    message,
    data,
  });
};