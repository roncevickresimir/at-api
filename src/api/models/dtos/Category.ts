import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategory {
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
