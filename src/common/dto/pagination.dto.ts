import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

  @ApiProperty({
    default: 10,
    description: 'Number of results per page'
  })
  @IsInt()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    default: 1,
    description: 'What page do you need'
  })
  @IsInt()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number;

}