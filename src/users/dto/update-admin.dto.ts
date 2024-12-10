import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsUUID, Length, MaxLength, MinLength } from "class-validator";

export class UpdateAdminDto { 

  @ApiProperty({
    description: `Admin's identification document number`,
    example: '1251134936'
  })
  @IsOptional()
  @IsString()
  @Length(10)
  document?: string;

  @ApiProperty({
    description: `Admin's login password, by default it is the same as the document`,
    example: '1251134936'
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password?: string;

  @ApiProperty({
    description: `Admin's login email`,
    example: 'pepe@example.com'
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: `Admin's name`,
    example: 'Jose'
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @ApiProperty({
    description: `Admin's last name`,
    example: 'Teran'
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  lastName?: string;

  @ApiProperty({
    description: `Admin's career ID`,
    example: '135808f5-74b3-44c0-b774-0e627771d4fd'
  })
  @IsOptional()
  @IsUUID()
  career?: string;

}