import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateNursingFormDto {
  @ApiProperty({
    description: 'ID del usuario',
    example: '9e97b908-d029-11ed-afa1-0242ac120002',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Nombre del paciente', example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  nombrePaciente: string;

  @ApiProperty({ description: 'Edad del paciente', example: 30 })
  @IsNotEmpty()
  edadPaciente: number;

  @ApiProperty({ description: 'Fecha de valoración', example: '2023-10-15' })
  @IsString()
  @IsNotEmpty()
  fechaValoracion: string;

  @ApiProperty({ description: 'Dominio seleccionado', example: 'Dominio1' })
  @IsString()
  @IsNotEmpty()
  dominio: string;

  @ApiProperty({ description: 'Clase seleccionada', example: 'Clase1' })
  @IsString()
  @IsNotEmpty()
  clase: string;

  @ApiProperty({
    description: 'Etiquetas diagnósticas seleccionadas',
    example: ['Etiqueta1', 'Etiqueta2'],
  })
  @IsArray()
  @IsString({ each: true })
  etiquetasDiagnosticas: string[];

  @ApiProperty({ description: 'NOC seleccionados', example: ['NOC1', 'NOC2'] })
  @IsArray()
  @IsString({ each: true })
  nocs: string[];

  @ApiProperty({
    description: 'Indicadores NOC con sus puntuaciones',
    example: [{ indicador: 'Llanto', puntuacion: 3 }],
  })
  @IsArray()
  indicadoresNoc: { indicador: string; puntuacion: number }[];

  @ApiProperty({ description: 'NIC seleccionados', example: ['NIC1', 'NIC2'] })
  @IsArray()
  @IsString({ each: true })
  nics: string[];

  @ApiProperty({
    description: 'Actividades NIC',
    example: ['Actividad1', 'Actividad2'],
  })
  @IsArray()
  @IsString({ each: true })
  actividadesNic: string[];
}
