import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Location } from './Location';

export class QuestCreate {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @Type(() => Location)
    @ValidateNested()
    location: Location;

    @IsString()
    @IsOptional()
    image: string;
}
