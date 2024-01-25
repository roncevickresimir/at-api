import { Type } from "class-transformer";
import {
  Equals,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export enum ROLES {
  ADMIN = "admin",
  CLIENT = "client",
  USER = "user",
}

export class UserLogin {
  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsString()
  @IsOptional()
  public username?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @IsNotEmpty()
  public password: string;
}
export class UserCreate {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_/+\-=[\]{};':"\\|,.<>?])[A-Za-z\d!@#$%^&*()_/+\-=[\]{};':"\\|,.<>?]{8,128}$/
  )
  @IsNotEmpty()
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @IsNotEmpty()
  @Equals(o => o.password)
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  role: ROLES;
}
export class EndUserCreate {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_/+\-=[\]{};':"\\|,.<>?])[A-Za-z\d!@#$%^&*()_/+\-=[\]{};':"\\|,.<>?]{8,128}$/
  )
  @IsNotEmpty()
  password: string;
}