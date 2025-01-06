import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsDate,
  IsInt,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../entities/patient.entity';

export class CreatePatientDto {
  @ApiProperty({
    description: `Patient document`,
    example: '1234567890',
  })
  @IsString()
  document: string;

  @ApiProperty({
    description: `Patient name`,
    example: 'John',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: `Patient last name`,
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: `Patient gender`,
    example: Gender.MALE,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: `Patient birthday`,
    example: '1990-01-01',
  })
  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @ApiProperty({
    description: `Type of beneficiary`,
    example: 'Type A',
  })
  @IsString()
  typeBeneficiary: string;

  @ApiProperty({
    description: `Type of disability`,
    example: 'Physical',
  })
  @IsString()
  typeDisability: string;

  @ApiProperty({
    description: `Percentage of disability`,
    example: 50,
  })
  @IsInt()
  percentageDisability: number;

  @ApiProperty({
    description: `Zone`,
    example: 'Urban',
  })
  @IsString()
  zone: string;

  @ApiProperty({
    description: `Is active`,
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: `Caregiver ID`,
    example: 'uuid-of-caregiver',
  })
  @IsUUID()
  caregiverId: string;
}
