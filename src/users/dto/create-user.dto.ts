import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsUUID, Length, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

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

  @ApiProperty({
    description: `User's login email`,
    example: 'pepe@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: `User's name`,
    example: 'Jose'
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: `User's last name`,
    example: 'Teran'
  })
  @IsString()
  @MinLength(1)
  lastName: string;

  @ApiProperty({
    description: `User's home address`,
    example: 'C. Eduardo Loor'
  })
  @IsString()
  @MinLength(1)
  address: string;

  @ApiProperty({
    description: `User's career ID`,
    example: '135808f5-74b3-44c0-b774-0e627771d4fd'
  })
  @IsUUID()
  career: string;

}
