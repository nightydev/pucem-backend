import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateConsultationSubsequentDto {

  @ApiProperty({
    description: `Motivo de la consulta`,
    example: 'Dolor de cabeza',
  })
  @IsString()
  @IsNotEmpty()
  motivoConsulta: string;

  @ApiProperty({
    description: `Antecedentes patológicos personales`,
    example: ['Diabetes', 'Hipertensión'],
  })
  @IsArray()
  @IsString({ each: true })
  antecedentesPatologicosPersonales: string[];

  @ApiProperty({
    description: `Descripción de los antecedentes patológicos personales`,
    example: 'Historia de diabetes tipo 2 desde hace 5 años.',
  })
  @IsString()
  antecedentesPatologicosPersonalesDesc: string;

  @ApiProperty({
    description: `Antecedentes patológicos familiares`,
    example: ['Cáncer', 'Insuficiencia renal'],
  })
  @IsArray()
  @IsString({ each: true })
  antecedentesPatologicosFamiliares: string[];

  @ApiProperty({
    description: `Descripción de los antecedentes patológicos familiares`,
    example: 'Madre con cáncer de mama y padre con insuficiencia renal.',
  })
  @IsString()
  antecedentesPatologicosFamiliaresDesc: string;

  @ApiProperty({
    description: `Descripción de la enfermedad o problema actual`,
    example: 'Paciente refiere dolor de cabeza intenso desde hace 3 días.',
  })
  @IsString()
  @IsNotEmpty()
  enfermedadProblemaActual: string;

  @ApiProperty({
    description: `Fecha del cuadro de valoración actual`,
    example: '2025-01-20T14:30:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  cvaFecha?: string;

  @ApiProperty({
    description: `Hora del cuadro de valoración actual`,
    example: '14:30',
  })
  @IsOptional()
  @IsString()
  cvaHora?: string;

  @ApiProperty({
    description: `Temperatura del paciente en el cuadro de valoración actual`,
    example: '37.5 °C',
  })
  @IsOptional()
  @IsString()
  cvaTemperatura?: string;

  @ApiProperty({
    description: `Presión arterial del paciente`,
    example: '120/80 mmHg',
  })
  @IsOptional()
  @IsString()
  cvaPresionArterial?: string;

  @ApiProperty({
    description: `Pulso del paciente`,
    example: '75 bpm',
  })
  @IsOptional()
  @IsString()
  cvaPulso?: string;

  @ApiProperty({
    description: `Frecuencia respiratoria del paciente`,
    example: '18 rpm',
  })
  @IsOptional()
  @IsString()
  cvaFrecuenciaRespiratoria?: string;

  @ApiProperty({
    description: `Peso del paciente`,
    example: '70 kg',
  })
  @IsOptional()
  @IsString()
  cvaPeso?: string;

  @ApiProperty({
    description: `Talla del paciente`,
    example: '1.75 m',
  })
  @IsOptional()
  @IsString()
  cvaTalla?: string;

  @ApiProperty({
    description: `Índice de masa corporal del paciente`,
    example: '22.8',
  })
  @IsOptional()
  @IsString()
  cvaImc?: string;

  @ApiProperty({
    description: `Perímetro abdominal del paciente`,
    example: '85 cm',
  })
  @IsOptional()
  @IsString()
  cvaPerimetroAbdominal?: string;

  @ApiProperty({
    description: `Hemoglobina capilar del paciente`,
    example: '12.5 g/dL',
  })
  @IsOptional()
  @IsString()
  cvaHemoglobinaCapilar?: string;

  @ApiProperty({
    description: `Glucosa capilar del paciente`,
    example: '95 mg/dL',
  })
  @IsOptional()
  @IsString()
  cvaGlucosaCapilar?: string;

  @ApiProperty({
    description: `Pulsioximetría del paciente`,
    example: '98%',
  })
  @IsOptional()
  @IsString()
  cvaPulsioximetria?: string;

  @ApiProperty({
    description: `Patologías relacionadas con órganos o sistemas`,
    example: ['Sistema digestivo', 'Sistema respiratorio'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  organosSistemasPatologia?: string[];

  @ApiProperty({
    description: `Descripciones relacionadas con órganos o sistemas`,
    example: ['Gastritis crónica', 'Asma leve'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  organosSistemasPatologiaDesc?: string[];

  @ApiProperty({
    description: `Patologías identificadas en el examen físico`,
    example: ['Hipertensión', 'Obesidad'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  examenFisicoPatologia?: string[];

  @ApiProperty({
    description: `Descripciones de patologías identificadas en el examen físico`,
    example: ['Presión arterial alta durante consulta', 'IMC mayor a 30'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  examenFisicoPatologiaDesc?: string[];

  @ApiProperty({
    description: `Descripciones de los diagnósticos`,
    example: ['Hipertensión esencial', 'Diabetes tipo 2 controlada'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  diagnosticosDesc: string[];

  @ApiProperty({
    description: `Códigos CIE de los diagnósticos`,
    example: ['I10', 'E11.9'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  diagnosticosCie: string[];

  @ApiProperty({
    description: `Plan de tratamiento del paciente`,
    example: 'Administrar ibuprofeno cada 8 horas por 3 días.',
  })
  @IsString()
  @IsNotEmpty()
  planTratamiento: string;

  @ApiProperty({
    description: `ID del usuario que realiza la consulta`,
    example: '9e97b908-d029-11ed-afa1-0242ac120002',
  })
  @IsUUID()
  user: string;

  @ApiProperty({
    description: `ID del paciente asociado`,
    example: '9e97ba24-d029-11ed-afa1-0242ac120002',
  })
  @IsUUID()
  patient: string;

  @ApiProperty({
    description: `ID de la consulta inicial`,
    example: '9e97ba24-d029-11ed-afa1-0242ac120002',
  })
  @IsUUID()
  @IsNotEmpty()
  consultationInitial: string;

}
