import { config } from 'api/config/config';
import { Request } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

export const upload = () => {
  // const destination = config.LOCAL_DIR + 'images/';
  // const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  //   if (file == null) {
  //     return false;
  //   }
  //   if (
  //     file.mimetype === 'image/png' ||
  //     file.mimetype === 'image/jpeg' ||
  //     file.mimetype === 'image/svg' ||
  //     file.mimetype === 'image/jpg' ||
  //     file.mimetype === 'image/jpe' ||
  //     file.mimetype === 'image/jfif' ||
  //     file.mimetype === 'image/jif'
  //   ) {
  //     cb(null, true);
  //   } else {
  //     cb('Unsupported file type.');
  //   }
  // };
  // const storage = multer.diskStorage({
  //   destination: destination,
  //   filename: function (req: any, file: any, cb: any) {
  //     if (!fs.existsSync(destination)) {
  //       // fs.mkdirSync(destination, { recursive: true });
  //     }
  //     const name = Date.now() + path.extname(file.originalname);
  //     // cb(null, name);
  //   },
  // });
  // return multer({
  //   storage: storage,
  //   fileFilter: fileFilter,
  //   limits: { fileSize: config.UPLOAD_SIZE_MAX },
  // });
};
