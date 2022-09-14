import {
    IsArray,
    IsDecimal,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class StationCreate {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsArray()
    @IsNotEmpty()
    categoryIds: Array<number>;

    @IsString()
    @IsNotEmpty()
    accountId: string;

    @IsDecimal()
    @IsNotEmpty()
    latitude: number;

    @IsDecimal()
    @IsNotEmpty()
    longitude: number;

    @IsString()
    @IsOptional()
    userId: string;
}
