export interface NursingForm {
  userId: string;
  nombrePaciente: string;
  edadPaciente: number;
  fechaValoracion: string;
  dominio: string;
  clase: string;
  etiquetasDiagnosticas: string[];
  nocs: string[];
  indicadoresNoc: { indicador: string; puntuacion: number }[];
  nics: string[];
  actividadesNic: string[];
}
