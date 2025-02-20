import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNursingFormDto {
  @ApiProperty({ description: 'Dominio NANDA relacionado', required: false })
  @IsString()
  @IsOptional()
  nanda_dominio?: string;

  @ApiProperty({ description: 'Clase NANDA relacionada', required: false })
  @IsString()
  @IsOptional()
  nanda_clase?: string;

  @ApiProperty({ description: 'Etiqueta diagnóstica NANDA relacionada', required: false })
  @IsString()
  @IsOptional()
  nanda_etiqueta_diagnostica?: string;

  @ApiProperty({ description: 'Factor relacionado con NANDA', required: false })
  @IsString()
  @IsOptional()
  nanda_factor_relacionado?: string;

  @ApiProperty({ description: 'Planteamiento del diagnóstico NANDA', required: false })
  @IsString()
  @IsOptional()
  nanda_planteamiento_del_diagnostico?: string;

  @ApiProperty({ description: 'Resultado NOC', required: false })
  @IsString()
  @IsOptional()
  noc_resultado_noc?: string;

  @ApiProperty({ description: 'Dominio NOC relacionado', required: false })
  @IsString()
  @IsOptional()
  noc_dominio?: string;

  @ApiProperty({ description: 'Clase NOC relacionada', required: false })
  @IsString()
  @IsOptional()
  noc_clase?: string;

  @ApiProperty({ type: [String], description: 'Indicadores NOC', required: false })
  @IsArray()
  @IsOptional()
  noc_indicador?: string[];

  @ApiProperty({ type: [String], description: 'Rangos NOC', required: false })
  @IsArray()
  @IsOptional()
  noc_rango?: string[];

  @ApiProperty({ type: [String], description: 'Diana inicial NOC', required: false })
  @IsArray()
  @IsOptional()
  noc_diana_inicial?: string[];

  @ApiProperty({ type: [String], description: 'Diana esperada NOC', required: false })
  @IsArray()
  @IsOptional()
  noc_diana_esperada?: string[];

  @ApiProperty({ type: [String], description: 'Evaluación NOC', required: false })
  @IsArray()
  @IsOptional()
  noc_evaluacion?: string[];

  @ApiProperty({ type: [String], description: 'Intervenciones NIC', required: false })
  @IsArray()
  @IsOptional()
  nic_intervencion?: string[];

  @ApiProperty({ type: [String], description: 'Clase NIC', required: false })
  @IsArray()
  @IsOptional()
  nic_clase?: string[];

  @ApiProperty({ type: [String], description: 'Actividades NIC', required: false })
  @IsArray()
  @IsOptional()
  nic_actividades?: string[];

  @ApiProperty({ description: 'ID del usuario que crea el formulario' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'ID del paciente relacionado con el formulario' })
  @IsString()
  patientId: string;
}
