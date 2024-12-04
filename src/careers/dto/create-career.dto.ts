import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateCareerDto {

  @ApiProperty({
    description: `Career a user can belong to`,
    example: 'medicine'
  })
  @IsString()
  @MinLength(1)
  careerName: string;

}
