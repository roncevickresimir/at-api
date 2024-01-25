import dotenv from 'dotenv';
import path from 'path';
import process from 'process';

dotenv.config({
  path: path.resolve(`.env`),
});

dotenv.config({
  path: path.resolve(`config/${process.env.NODE_ENV}.env`),
});

class Config {
  public readonly HOST: string;
  public readonly PORT: string;
  public readonly UI_HOST: string;
  public readonly UI_PORT: string;
  public readonly EXPIRE: string;
  public readonly DB_NAME: string;
  public readonly UPLOAD_DIR: string;
  public readonly UPLOAD_DIR_QR: string;
  public readonly DB_USER: string;
  public readonly DB_PASSWORD: string;
  public readonly DB_HOST: string;
  public readonly DB_PORT: number;
  public readonly JWT_KEY: string;
  public readonly LOCAL_DIR: string;
  public readonly IMAGES_HOST: string;
  public readonly UPLOAD_PROVIDER: string;
  public readonly UPLOAD_SIZE_MAX: number;
  public readonly SERVER_VERSION: string;

  private getEnv<T>(name: string, defaultValue?: T): T {
    const value = process.env[name];
    if (value !== undefined) {
      return value as T;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`${name} env name is not defined`);
  }

  constructor() {
    this.HOST = this.getEnv('HOST');
    this.PORT = this.getEnv('PORT');
    this.UI_HOST = this.getEnv('UI_HOST');
    this.UI_PORT = this.getEnv('UI_PORT');
    this.DB_NAME = this.getEnv('DB_NAME');
    this.DB_USER = this.getEnv('DB_USER');
    this.DB_PASSWORD = this.getEnv('DB_PASSWORD');
    this.DB_HOST = this.getEnv('DB_HOST');
    this.DB_PORT = this.getEnv('DB_PORT');
    this.JWT_KEY = this.getEnv('JWT_KEY', 'secret');
    this.EXPIRE = this.getEnv('EXPIRE', '86400');
    this.LOCAL_DIR = this.getEnv('EXPIRE', './public/');
    this.IMAGES_HOST = this.getEnv('IMAGES_HOST');
    this.UPLOAD_DIR = this.getEnv('UPLOAD_DIR_QR', `${this.IMAGES_HOST}:${this.PORT}/public/images/`);
    this.UPLOAD_DIR_QR = this.getEnv('UPLOAD_DIR_QR', `${this.IMAGES_HOST}:${this.PORT}/public/qr-codes/`);
    this.UPLOAD_PROVIDER = this.getEnv('UPLOAD_PROVIDER');
    this.UPLOAD_SIZE_MAX = this.getEnv('UPLOAD_SIZE_MAX', 2097152);
    this.SERVER_VERSION = this.getEnv('SERVER_VERSION', '1.0.0');
  }
}

export const config = new Config();
