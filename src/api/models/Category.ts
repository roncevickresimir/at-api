import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Category {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    stationId: string;
}
