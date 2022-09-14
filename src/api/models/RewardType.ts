import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RewardTypeCreate {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    stationId: string;

    image: string;
}
