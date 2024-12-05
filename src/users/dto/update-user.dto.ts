import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsUUID, Length, MinLength } from "class-validator";

export class UpdateUserDto { 

  @ApiProperty({
    description: `User's identification document number`,
    example: '1251134936'
  })
  @IsOptional()
  @IsString()
  @Length(10)
  document?: string;

  @ApiProperty({
    description: `User's login email`,
    example: 'pepe@example.com'
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: `User's fullname`,
    example: 'JOSE MANUEL TERAN SANDOVAL'
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  fullName?: string;

  @ApiProperty({
    description: `User's home address`,
    example: 'C. Eduardo Loor'
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  address?: string;

  @ApiProperty({
    description: `User's career ID`,
    example: '135808f5-74b3-44c0-b774-0e627771d4fd'
  })
  @IsOptional()
  @IsUUID()
  career?: string;

}