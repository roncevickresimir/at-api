import { Transform } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class PageRpp {
  @Transform(({ value }) => (value ? Number(value) : value))
  @IsInt()
  @Min(1)
  page: number;

  @Transform(({ value }) => (value ? Number(value) : value))
  @IsInt()
  @Min(1)
  rpp: number;
}
