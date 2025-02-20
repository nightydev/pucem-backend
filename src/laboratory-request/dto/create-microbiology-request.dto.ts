import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional } from 'class-validator';

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
