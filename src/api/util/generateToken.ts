import jwt from 'jsonwebtoken';

import { EXPIRE, JWT_KEY } from '../../config';

export async function generateObjectToken(object: any): Promise<string | null> {
    const options = {
        expiresIn: 300,
    };
    if (JWT_KEY == undefined) return null;
    return jwt.sign(object, JWT_KEY, options);
}

export default async function generateCodeToken(
    id: string
): Promise<string | null> {
    const options = {
        expiresIn: 300,
    };
    if (JWT_KEY == undefined) return null;
    return jwt.sign({ id: id }, JWT_KEY, options);
}

export async function generateLoginCodeToken(
    id: string
): Promise<string | null> {
    const options = {
        expiresIn: EXPIRE,
    };
    if (JWT_KEY == undefined) return null;
    return jwt.sign({ id: id }, JWT_KEY);
}
