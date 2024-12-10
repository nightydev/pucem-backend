import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { Gender } from "../entities/caregiver.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCaregiverDto {

  @ApiProperty({
    description: `Caregiver's identification document number`,
    example: '1251134936'
  })
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({
    description: `Caregiver's fullname`,
    example: 'JOSE MANUEL TERAN SANDOVAL'
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    description: `Gender`,
    example: 'male'
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: `Caregiver's contact conventional numbers`,
    example: '["2781052"]'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  conventionalNumbers?: string[];

  @ApiProperty({
    description: `Caregiver's contact cellphone numbers`,
    example: '["0989400941"]'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cellphoneNumbers?: string[];

  @ApiProperty({
    description: `Caregiver's canton`,
    example: 'Chinchipe'
  })
  @IsNotEmpty()
  @IsString()
  canton: string;

  @ApiProperty({
    description: `Caregiver's parish address`,
    example: 'Nose'
  })
  @IsNotEmpty()
  @IsString()
  parish: string;

  @ApiProperty({
    description: `Caregiver's address zoneType`,
    example: 'Urbano'
  })
  @IsNotEmpty()
  @IsString()
  zoneType: string;

  @ApiProperty({
    description: `Caregiver's address`,
    example: 'Cdl. Pepito Cansado'
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: `Caregiver's home reference`,
    example: 'Enfrente del Tuti'
  })
  @IsNotEmpty()
  @IsString()
  reference: string;

  @ApiProperty({
    description: `Caregiver's patient relationship`,
    example: 'Hermano'
  })
  @IsNotEmpty()
  @IsString()
  patientRelationship: string;

}
