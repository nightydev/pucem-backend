import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

  @ApiProperty({
    description: `User's identification document number`,
    example: '1251134936'
  })
  @IsString()
  @Length(10)
  document: string;

  @ApiProperty({
    description: `User's login password, by default it is the same as the document`,
    example: '1251134936'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;

}