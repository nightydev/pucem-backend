import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateConsultationInitialDto {
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
  @IsNotEmpty()
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
  @IsNotEmpty()
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
  @IsDateString()
  cvaFecha: string;

  @ApiProperty({
    description: `Hora del cuadro de valoración actual`,
    example: '14:30',
  })
  @IsString()
  cvaHora: string;

  @ApiProperty({
    description: `Temperatura del paciente en el cuadro de valoración actual`,
    example: '37.5 °C',
  })
  @IsString()
  cvaTemperatura: string;

  @ApiProperty({
    description: `Presión arterial del paciente`,
    example: '120/80 mmHg',
  })
  @IsString()
  cvaPresionArterial: string;

  @ApiProperty({
    description: `Pulso del paciente`,
    example: '75 bpm',
  })
  @IsString()
  cvaPulso: string;

  @ApiProperty({
    description: `Frecuencia respiratoria del paciente`,
    example: '18 rpm',
  })
  @IsString()
  cvaFrecuenciaRespiratoria: string;

  @ApiProperty({
    description: `Peso del paciente`,
    example: '70 kg',
  })
  @IsString()
  cvaPeso: string;

  @ApiProperty({
    description: `Talla del paciente`,
    example: '1.75 m',
  })
  @IsString()
  cvaTalla: string;

  @ApiProperty({
    description: `Índice de masa corporal del paciente`,
    example: '22.8',
  })
  @IsString()
  cvaImc: string;

  @ApiProperty({
    description: `Perímetro abdominal del paciente`,
    example: '85 cm',
  })
  @IsString()
  cvaPerimetroAbdominal: string;

  @ApiProperty({
    description: `Hemoglobina capilar del paciente`,
    example: '12.5 g/dL',
  })
  @IsString()
  cvaHemoglobinaCapilar: string;

  @ApiProperty({
    description: `Glucosa capilar del paciente`,
    example: '95 mg/dL',
  })
  @IsString()
  cvaGlucosaCapilar: string;

  @ApiProperty({
    description: `Pulsioximetría del paciente`,
    example: '98%',
  })
  @IsString()
  cvaPulsioximetria: string;

  @ApiProperty({
    description: `Patologías relacionadas con órganos o sistemas`,
    example: ['Sistema digestivo', 'Sistema respiratorio'],
  })
  @IsArray()
  @IsString({ each: true })
  organosSistemasPatologia: string[];

  @ApiProperty({
    description: `Descripciones relacionadas con órganos o sistemas`,
    example: ['Gastritis crónica', 'Asma leve'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  organosSistemasPatologiaDesc: string[];

  @ApiProperty({
    description: `Patologías identificadas en el examen físico`,
    example: ['Hipertensión', 'Obesidad'],
  })
  @IsArray()
  @IsString({ each: true })
  examenFisicoPatologia: string[];

  @ApiProperty({
    description: `Descripciones de patologías identificadas en el examen físico`,
    example: ['Presión arterial alta durante consulta', 'IMC mayor a 30'],
  })
  @IsArray()
  @IsString({ each: true })
  examenFisicoPatologiaDesc: string[];

  @ApiProperty({
    description: `Descripciones de los diagnósticos`,
    example: ['Hipertensión esencial', 'Diabetes tipo 2 controlada'],
  })
  @IsArray()
  @IsString({ each: true })
  diagnosticosDesc: string[];

  @ApiProperty({
    description: `Códigos CIE de los diagnósticos`,
    example: ['I10', 'E11.9'],
  })
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
    description: `Institución del sistema`,
    example: 'Hospital General de la ciudad',
  })
  @IsString()
  @IsNotEmpty()
  institucionSistema: string;

  @ApiProperty({
    description: `Código único`,
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  unicodigo: string;

  @ApiProperty({
    description: `Establecimiento de salud`,
    example: 'Hospital General de la ciudad',
  })
  @IsString()
  @IsNotEmpty()
  establecimientoSalud: string;

  @ApiProperty({
    description: `Número de historia clínica`,
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  numeroHistoriaClinica: string;

  @ApiProperty({
    description: `Número de archivo`,
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  numeroArchivo: string;

  @ApiProperty({
    description: `Número de hoja`,
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  numeroHoja: string;

  @ApiProperty({
    description: `Primer apellido`,
    example: 'González',
  })
  @IsString()
  @IsNotEmpty()
  primerApellido: string;

  @ApiProperty({
    description: `Segundo apellido`,
    example: 'Pérez',
  })
  @IsOptional()
  @IsString()
  segundoApellido?: string;

  @ApiProperty({
    description: `Primer nombre`,
    example: 'Juan',
  })
  @IsString()
  @IsNotEmpty()
  primerNombre: string;

  @ApiProperty({
    description: `Segundo nombre`,
    example: 'Carlos',
  })
  @IsOptional()
  @IsString()
  segundoNombre?: string;

  @ApiProperty({
    description: `Sexo`,
    example: 'Masculino',
  })
  @IsString()
  @IsNotEmpty()
  sexo: string;

  @ApiProperty({
    description: `Edad`,
    example: 30,
  })
  @IsNumber()
  @IsNotEmpty()
  edad: number;

  @ApiProperty({
    description: `Motivo de la consulta primera`,
    example: 'Dolor de cabeza',
  })
  @IsString()
  @IsNotEmpty()
  motivoConsultaPrimera: string;

  @ApiProperty({
    description: `Motivo de la consulta subsecuente`,
    example: 'Dolor de cabeza',
  })
  @IsOptional()
  @IsString()
  motivoConsultaSubsecuente?: string;

  @ApiProperty({
    description: `Antecedentes personales`,
    example: {
      cardiopatia: true,
      hipertension: true,
      ebyec: true,
      problemaMetabolico: true,
      cancer: true,
      tuberculosis: true,
      enfMental: true,
      enfInfecciosa: true,
      malformacion: true,
      otro: 'Historia de enfermedad',
    },
  })
  @IsObject()
  antecedentesPersonales: {
    cardiopatia: boolean;
    hipertension: boolean;
    ebyec: boolean;
    problemaMetabolico: boolean;
    cancer: boolean;
    tuberculosis: boolean;
    enfMental: boolean;
    enfInfecciosa: boolean;
    malformacion: boolean;
    otro?: string;
  };

  @ApiProperty({
    description: `Antecedentes familiares`,
    example: {
      cardiopatia: true,
      hipertension: true,
      ebyec: true,
      problemaMetabolico: true,
      cancer: true,
      tuberculosis: true,
      enfMental: true,
      enfInfecciosa: true,
      malformacion: true,
      otro: 'Historia de enfermedad',
    },
  })
  @IsObject()
  antecedentesFamiliares: {
    cardiopatia: boolean;
    hipertension: boolean;
    ebyec: boolean;
    problemaMetabolico: boolean;
    cancer: boolean;
    tuberculosis: boolean;
    enfMental: boolean;
    enfInfecciosa: boolean;
    malformacion: boolean;
    otro?: string;
  };

  @ApiProperty({
    description: `Enfermedad actual`,
    example: 'Hipertensión',
  })
  @IsString()
  @IsNotEmpty()
  enfermedadActual: string;

  @ApiProperty({
    description: `Constantes vitales`,
    example: {
      fecha: '2025-01-20T14:30:00.000Z',
      hora: '14:30',
      temperatura: 37.5,
      presionArterial: '120/80 mmHg',
      frecuenciaCardiaca: 75,
      frecuenciaRespiratoria: 18,
      peso: 70,
      talla: 1.75,
      imc: 22.8,
      perimetroAbdominal: 85,
      hemoglobinaCapilar: 12.5,
      glucosaCapilar: 95,
      pulsioximetria: 98,
    },
  })
  @IsObject()
  constantesVitales: {
    fecha: string;
    hora: string;
    temperatura: number;
    presionArterial: string;
    frecuenciaCardiaca: number;
    frecuenciaRespiratoria: number;
    peso: number;
    talla: number;
    imc: number;
    perimetroAbdominal: number;
    hemoglobinaCapilar: number;
    glucosaCapilar: number;
    pulsioximetria: number;
  };
}
