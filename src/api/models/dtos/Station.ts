import { Type } from 'class-transformer';
import {
    IsArray,
    IsDecimal,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Location } from './Location';

export class CreateStation {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  questId: string;

  @IsNotEmpty()
  @Type(() => Location)
  @ValidateNested()
  location: Location;

  @IsString()
  @IsOptional()
  userId: string;
}
