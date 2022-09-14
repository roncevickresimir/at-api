import bcrypt from 'bcryptjs';

export default async function HashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashPassword: string = await bcrypt.hash(password, salt);
    return hashPassword;
}
