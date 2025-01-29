import { ApiProperty } from '@nestjs/swagger';
import { 
  IsArray, IsBoolean, IsDateString, IsNotEmpty, IsOptional, 
  IsString, IsUUID, IsInt 
} from 'class-validator';

export class CreateConsultationInternalDto {

  @ApiProperty({ description: `Número de archivo`, example: 1001 })
  @IsInt()
  @IsNotEmpty()
  numeroDeArchivo: number;

  @ApiProperty({ description: `Fecha de la consulta`, example: '2025-02-15' })
  @IsDateString()
  @IsNotEmpty()
  fecha: Date;

  @ApiProperty({ description: `ID del paciente`, example: '9e97ba24-d029-11ed-afa1-0242ac120002' })
  @IsUUID()
  patient: string;

  @ApiProperty({ description: `ID del usuario que realiza la consulta`, example: '9e97b908-d029-11ed-afa1-0242ac120002' })
  @IsUUID()
  user: string;

  // B. Característica de la solicitud, motivo y prioridad de atención
  @ApiProperty({ description: `Motivo de la consulta`, example: 'Dolor de cabeza' })
  @IsString()
  @IsNotEmpty()
  motivoConsulta: string;

  @ApiProperty({ description: `Servicio`, example: 'Consulta Externa' })
  @IsString()
  @IsNotEmpty()
  servicio: string;

  @ApiProperty({ description: `Especialidad consultada`, example: 'Neurología', required: false })
  @IsOptional()
  @IsString()
  especialidadConsultada?: string;

  @ApiProperty({ description: `Es urgente`, example: false })
  @IsBoolean()
  @IsNotEmpty()
  esUrgente: boolean;

  // C. Cuadro Clínico Actual
  @ApiProperty({ description: `Cuadro clínico actual`, example: 'Paciente con cefalea intensa.' })
  @IsOptional()
  @IsString()
  cuadroClinicoActual?: string;

  // D. Resultados de Exámenes y Procedimientos Diagnósticos Relevantes
  @ApiProperty({ description: `Resultados de exámenes`, example: ['Hemograma normal', 'Radiografía sin hallazgos'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  examenesResultados?: string[];

  // E. Diagnóstico
  @ApiProperty({ description: `Descripciones de los diagnósticos`, example: ['Hipertensión esencial', 'Migraña'] })
  @IsArray()
  @IsString({ each: true })
  diagnosticosDesc: string[];

  @ApiProperty({ description: `Códigos CIE de los diagnósticos`, example: ['I10', 'G43.0'] })
  @IsArray()
  @IsString({ each: true })
  diagnosticosCie: string[];

  @ApiProperty({ description: `Diagnóstico presuntivo`, example: [true, false], required: false })
  @IsOptional()
  @IsArray()
  @IsBoolean({ each: true })
  diagnosticosPresuntivo?: boolean[];

  @ApiProperty({ description: `Diagnóstico definitivo`, example: [false, true], required: false })
  @IsOptional()
  @IsArray()
  @IsBoolean({ each: true })
  diagnosticosDefinitivo?: boolean[];

  // F. Plan Terapéutico Realizado
  @ApiProperty({ description: `Plan de tratamiento`, example: 'Paracetamol 500mg cada 8 horas por 5 días.' })
  @IsString()
  @IsNotEmpty()
  planTratamiento: string;

  @ApiProperty({ description: `Cuadro clínico interconsulta`, example: 'Paciente con cuadro de dolor de cabeza severo.' })
  @IsString()
  @IsNotEmpty()
  cuadroClinicoInterconsulta: string;

  @ApiProperty({ description: `Plan diagnóstico propuesto`, example: 'Realizar resonancia magnética.' })
  @IsString()
  @IsNotEmpty()
  planDiagnosticoPropuesto: string;

  @ApiProperty({ description: `Plan terapéutico propuesto`, example: 'Administrar tratamiento para migraña.' })
  @IsString()
  @IsNotEmpty()
  planTerapeuticoPropuesto: string;
}
