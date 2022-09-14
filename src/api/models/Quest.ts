import {
    IsArray,
    IsDecimal,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class QuestCreate {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsArray()
    @IsNotEmpty()
    categoryIds: Array<string>;

    @IsDecimal()
    @IsNotEmpty()
    latitude: number;

    @IsDecimal()
    @IsNotEmpty()
    longitude: number;

    @IsString()
    @IsOptional()
    userId: string;

    @IsArray()
    @IsNotEmpty()
    stationIds: Array<string>;

    image: string;
}
