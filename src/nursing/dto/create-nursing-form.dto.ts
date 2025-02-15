import { IsDate, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateNursingFormDto {
  @IsDate()
  fecha: Date;

  @IsString()
  motivoConsulta: string;

  @IsArray()
  @IsOptional()
  antecedentesPatologicosPersonales?: string[];

  @IsString()
  @IsOptional()
  antecedentesPatologicosPersonalesDesc?: string;

  @IsArray()
  @IsOptional()
  antecedentesPatologicosFamiliares?: string[];

  @IsString()
  @IsOptional()
  antecedentesPatologicosFamiliaresDesc?: string;

  @IsString()
  enfermedadProblemaActual: string;

  @IsDate()
  @IsOptional()
  cvaFecha?: Date;

  @IsString()
  @IsOptional()
  cvaHora?: string;

  @IsString()
  @IsOptional()
  cvaTemperatura?: string;

  @IsString()
  @IsOptional()
  cvaPresionArterial?: string;

  @IsString()
  @IsOptional()
  cvaPulso?: string;

  @IsString()
  @IsOptional()
  cvaFrecuenciaRespiratoria?: string;

  @IsString()
  @IsOptional()
  cvaPeso?: string;

  @IsString()
  @IsOptional()
  cvaTalla?: string;

  @IsString()
  @IsOptional()
  cvaImc?: string;

  @IsString()
  @IsOptional()
  cvaPerimetroAbdominal?: string;

  @IsString()
  @IsOptional()
  cvaHemoglobinaCapilar?: string;

  @IsString()
  @IsOptional()
  cvaGlucosaCapilar?: string;

  @IsString()
  @IsOptional()
  cvaPulsioximetria?: string;

  @IsArray()
  @IsOptional()
  organosSistemasPatologia?: string[];

  @IsArray()
  @IsOptional()
  organosSistemasPatologiaDesc?: string[];

  @IsArray()
  @IsOptional()
  examenFisicoPatologia?: string[];

  @IsArray()
  @IsOptional()
  examenFisicoPatologiaDesc?: string[];

  @IsArray()
  @IsOptional()
  diagnosticosDesc?: string[];

  @IsArray()
  @IsOptional()
  diagnosticosCie?: string[];

  @IsString()
  planTratamiento: string;

  @IsString()
  userId: string;

  @IsString()
  patientId: string;
}
