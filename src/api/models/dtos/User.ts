import {
  Equals,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
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
  @IsNotEmpty()
  password: string;

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
  @IsNotEmpty()
  password: string;
}