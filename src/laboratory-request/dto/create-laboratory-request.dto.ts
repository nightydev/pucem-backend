import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsArray,
  MinLength,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMicrobiologyRequestDto {
  @ApiProperty({
    description: `Sample type`,
    example: 'Blood',
  })
  @IsString()
  @MinLength(1)
  muestra: string;

  @ApiProperty({
    description: `Anatomical site`,
    example: 'Arm',
  })
  @IsString()
  @MinLength(1)
  sitio_anatomico: string;

  @ApiProperty({
    description: `Indicates if culture and sensitivity test is requested`,
    example: true,
  })
  @IsOptional()
  cultivo_y_antibiograma: boolean;

  @ApiProperty({
    description: `Indicates if crystallography test is requested`,
    example: false,
  })
  @IsOptional()
  cristalografia: boolean;

  @ApiProperty({
    description: `Indicates if Gram stain test is requested`,
    example: true,
  })
  @IsOptional()
  gram: boolean;

  @ApiProperty({
    description: `Indicates if fresh examination is requested`,
    example: true,
  })
  @IsOptional()
  fresco: boolean;

  @ApiProperty({
    description: `KOH mycological study`,
    example: 'Positive',
  })
  @IsString()
  @MinLength(1)
  estudio_micologico_koh: string;

  @ApiProperty({
    description: `Fungal culture`,
    example: 'Candida albicans',
  })
  @IsString()
  @MinLength(1)
  cultivo_micotico: string;

  @ApiProperty({
    description: `Paragonimus spp investigation result`,
    example: 'Negative',
  })
  @IsString()
  @MinLength(1)
  investigacion_paragonimus_spp: string;

  @ApiProperty({
    description: `Histoplasma spp investigation result`,
    example: 'Negative',
  })
  @IsString()
  @MinLength(1)
  investigacion_histoplasma_spp: string;

  @ApiProperty({
    description: `Ziehl-Neelsen stain result`,
    example: 'Negative',
  })
  @IsString()
  @MinLength(1)
  coloracion_zhiel_nielsen: string;
}

export class CreateLaboratoryRequestDto {
  @ApiProperty({
    description: `Document number for the request`,
    example: '228001',
  })
  @IsString()
  @MinLength(1)
  numero_de_archivo: string;

  @ApiProperty({
    description: `Description of the first diagnostic`,
    example: 'Anemia',
  })
  @IsString()
  @MinLength(1)
  diagnostico_descripcion1: string;

  @ApiProperty({
    description: `CIE code of the first diagnostic`,
    example: 'D50.9',
  })
  @IsString()
  @MinLength(1)
  diagnostico_cie1: string;

  @ApiProperty({
    description: `Description of the second diagnostic`,
    example: 'Hypertension',
  })
  @IsString()
  @MinLength(1)
  diagnostico_descripcion2: string;

  @ApiProperty({
    description: `CIE code of the second diagnostic`,
    example: 'I10',
  })
  @IsString()
  @MinLength(1)
  diagnostico_cie2: string;

  @ApiProperty({
    description: `Priority of the request`,
    example: 'High',
  })
  @IsString()
  @MinLength(1)
  prioridad: string;

  @ApiProperty({
    description: `Hematology tests requested`,
    example: ['Hemoglobin', 'Hematocrit'],
  })
  @IsArray()
  @IsString({ each: true })
  hematologia_examenes: string[];

  @ApiProperty({
    description: `Coagulation tests requested`,
    example: ['Prothrombin time', 'Other'],
  })
  @IsArray()
  @IsString({ each: true })
  coagulacion_examenes: string[];

  @ApiProperty({
    description: `Blood chemistry tests requested`,
    example: ['Glucose', 'Cholesterol'],
  })
  @IsArray()
  @IsString({ each: true })
  quimica_sanguinea_examenes: string[];

  @ApiProperty({
    description: `Urine tests requested`,
    example: ['Urinalysis', 'Other'],
  })
  @IsArray()
  @IsString({ each: true })
  orina_examenes: string[];

  @ApiProperty({
    description: `Stool tests requested`,
    example: ['Stool examination', 'Other'],
  })
  @IsArray()
  @IsString({ each: true })
  heces_examenes: string[];

  @ApiProperty({
    description: `Hormone tests requested`,
    example: ['Thyroid panel', 'Other'],
  })
  @IsArray()
  @IsString({ each: true })
  hormonas_examenes: string[];

  @ApiProperty({
    description: `Serology tests requested`,
    example: ['HIV test', 'Hepatitis B test'],
  })
  @IsArray()
  @IsString({ each: true })
  serologia_examenes: string[];

  @ApiProperty({
    description: `UUID of the user making the request`,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: `UUID of the patient for whom the request is made`,
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  patientId: string;

  @ApiProperty({
    description: `Microbiology request details`,
    type: CreateMicrobiologyRequestDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMicrobiologyRequestDto)
  microbiologia: CreateMicrobiologyRequestDto;
}
