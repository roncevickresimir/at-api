import dotenv from 'dotenv';
import path from 'path';

const NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config({
    path: path.resolve(`config/${NODE_ENV}.env`),
});

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const UI_HOST = process.env.UI_HOST;
const UI_PORT = process.env.UI_PORT;

const IMAGES_HOST = process.env.IMAGES_HOST;

const LOCAL_DIR = `./public/`;
const UPLOAD_DIR = `${IMAGES_HOST}:${PORT}/questing/images/`; //change 192.168.11.83 to ${HOST}
const UPLOAD_DIR_QR = `${IMAGES_HOST}:${PORT}/questing/qr-codes/`; //change 192.168.11.83 to ${HOST}
const UPLOAD_PROVIDER = process.env.UPLOAD_PROVIDER || 'LocalStorage';

const UPLOAD_SIZE_MAX: number = process.env.UPLOAD_SIZE_MAX
    ? parseInt(process.env.UPLOAD_SIZE_MAX)
    : 2097152;

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const JWT_KEY = process.env.JWT_KEY || 'secret';

const EXPIRE = process.env.EXPIRE || 86400;

const SERVER_VERSION = process.env.SERVER_VERSION || '0.0.0';

export {
    HOST,
    PORT,
    UI_HOST,
    UI_PORT,
    EXPIRE,
    DB_NAME,
    UPLOAD_DIR,
    UPLOAD_DIR_QR,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    JWT_KEY,
    LOCAL_DIR,
    UPLOAD_PROVIDER,
    UPLOAD_SIZE_MAX,
    SERVER_VERSION,
};
