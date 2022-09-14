import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Matches,
    MaxLength,
    MinLength,
    Validate,
} from 'class-validator';
import { Match } from '../util/match';

export enum RoleType {
    Admin = 'admin',
    Office = 'office',
    Object = 'object',
    User = 'user',
}

export class UserLogin {
    @IsEmail()
    @IsOptional()
    public email?: string;

    @IsString()
    @IsOptional()
    public userName?: string;

    @IsString()
    @MinLength(8)
    @MaxLength(128)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_/+\-=[\]{};':"\\|,.<>?])[A-Za-z\d!@#$%^&*()_/+\-=[\]{};':"\\|,.<>?]{8,128}$/
    )
    @IsNotEmpty()
    public password: string;
}
export class UserCreate {
    @IsString()
    @IsNotEmpty()
    userName: string;

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
    @Match('password')
    confirmPassword: string;

    @IsString()
    @IsNotEmpty()
    roleAbrv: string;
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

export class EndUserLogin {
    @IsEmail()
    @IsOptional()
    public email?: string;

    @IsString()
    @IsOptional()
    public username?: string;

    @IsString()
    @MinLength(8)
    @MaxLength(128)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_/+\-=[\]{};':"\\|,.<>?])[A-Za-z\d!@#$%^&*()_/+\-=[\]{};':"\\|,.<>?]{8,128}$/
    )
    @IsNotEmpty()
    public password: string;
}
