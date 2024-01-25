import {
    IsDecimal,
    IsNotEmpty,
} from 'class-validator';

export class Location {
    @IsDecimal()
    @IsNotEmpty()
    latitude: number;
  
    @IsDecimal()
    @IsNotEmpty()
    longitude: number;
}
