import { ValidationError } from 'class-validator';

export const mapErrors = (errors: ValidationError[]): string[] => {
  const errStr: string[] = [];
  errors.forEach((err) => {
    if (err.children && err.children.length > 0) {
      errStr.push(...mapErrors(err.children));
    } else {
      errStr.push(...Object.values(err.constraints!));
    }
  });
  return errStr;
};