import { config } from 'api/config';
import jwt from 'jsonwebtoken';

export async function generateObjectToken(object: any): Promise<string | null> {
  const options = {
    expiresIn: 300,
  };
  if (config.JWT_KEY == undefined) return null;
  return jwt.sign(object, config.JWT_KEY, options);
}

export async function generateCodeToken(id: string): Promise<string | null> {
  const options = {
    expiresIn: 300,
  };
  if (config.JWT_KEY == undefined) return null;
  return jwt.sign({ id: id }, config.JWT_KEY, options);
}

export async function generateAuthToken(id: string): Promise<string | null> {
  const options = {
    expiresIn: config.EXPIRE,
  };

  if (config.JWT_KEY == undefined) {
    return null;
  }

  return jwt.sign({ id: id }, config.JWT_KEY);
}
