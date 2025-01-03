import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashPassword: string = await bcrypt.hash(password, salt);
  return hashPassword;
}
