import {
    IsArray,
    IsDecimal,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class EndUserStationCreate {
    stationId: string;
    userId: string;
    complete: boolean;
}
