import { IsString, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNursingFormDto {
  @ApiProperty({ description: 'Dominio NANDA relacionado' })
  @IsString()
  @IsNotEmpty()
  nanda_dominio: string;

  @ApiProperty({ description: 'Clase NANDA relacionada' })
  @IsString()
  @IsNotEmpty()
  nanda_clase: string;

  @ApiProperty({ description: 'Etiqueta diagnóstica NANDA relacionada' })
  @IsString()
  @IsNotEmpty()
  nanda_etiqueta_diagnostica: string;

  @ApiProperty({ description: 'Factor relacionado con NANDA' })
  @IsString()
  @IsNotEmpty()
  nanda_factor_relacionado: string;

  @ApiProperty({ description: 'Planteamiento del diagnóstico NANDA' })
  @IsString()
  @IsNotEmpty()
  nanda_planteamiento_del_diagnostico: string;

  @ApiProperty({ description: 'Resultado NOC' })
  @IsString()
  @IsNotEmpty()
  noc_resultado_noc: string;

  @ApiProperty({ description: 'Dominio NOC relacionado' })
  @IsString()
  @IsNotEmpty()
  noc_dominio: string;

  @ApiProperty({ description: 'Clase NOC relacionada' })
  @IsString()
  @IsNotEmpty()
  noc_clase: string;

  @ApiProperty({ type: [String], description: 'Indicadores NOC' })
  @IsArray()
  @IsNotEmpty()
  noc_indicador: string[];

  @ApiProperty({ type: [String], description: 'Rangos NOC' })
  @IsArray()
  @IsNotEmpty()
  noc_rango: string[];

  @ApiProperty({ type: [String], description: 'Diana inicial NOC' })
  @IsArray()
  @IsNotEmpty()
  noc_diana_inicial: string[];

  @ApiProperty({ type: [String], description: 'Diana esperada NOC' })
  @IsArray()
  @IsNotEmpty()
  noc_diana_esperada: string[];

  @ApiProperty({ type: [String], description: 'Evaluación NOC' })
  @IsArray()
  @IsNotEmpty()
  noc_evaluacion: string[];

  @ApiProperty({ type: [String], description: 'Intervenciones NIC' })
  @IsArray()
  @IsNotEmpty()
  nic_intervencion: string[];

  @ApiProperty({ type: [String], description: 'Clase NIC' })
  @IsArray()
  @IsNotEmpty()
  nic_clase: string[];

  @ApiProperty({ type: [String], description: 'Actividades NIC' })
  @IsArray()
  @IsNotEmpty()
  nic_actividades: string[];

  @ApiProperty({ description: 'ID del usuario que crea el formulario' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'ID del paciente relacionado con el formulario' })
  @IsUUID()
  @IsNotEmpty()
  patientId: string;
}
