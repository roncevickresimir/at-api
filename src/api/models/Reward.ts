import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RewardCreate {
    @IsString()
    @IsNotEmpty()
    rewardTypeId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    stationId: string;
}
