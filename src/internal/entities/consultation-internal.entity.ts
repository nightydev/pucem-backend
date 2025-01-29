import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from 'src/patients/entities/patient.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'consultation_internal' })
export class ConsultationInternal {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // A. Datos del establecimiento y usuario/paciente
  @Column('int', { unique: true })
  numeroDeArchivo: number;

  @Column('date')
  fecha: Date;

  @ManyToOne(() => Patient, (patient) => patient.consultationInternal)
  patient: Patient;

  @ManyToOne(() => User, (user) => user.consultationInternal)
  user: User;

  // B. Característica de la solicitud, motivo y prioridad de atención
  @Column('text')
  motivoConsulta: string;

  @Column('text')
  servicio: string; // Emergencia, Consulta Externa, Hospitalización

  @Column('text', { nullable: true })
  especialidadConsultada: string;

  @Column('boolean', { default: false })
  esUrgente: boolean;

  // C. Cuadro Clínico Actual
  @Column('text', { nullable: true })
  cuadroClinicoActual: string;

  // D. Resultados de Exámenes y Procedimientos Diagnósticos Relevantes
  @Column('text', { array: true, nullable: true })
  examenesResultados: string[];

  // E. Diagnóstico
  @Column('text', { array: true })
  diagnosticosDesc: string[];

  @Column('text', { array: true })
  diagnosticosCie: string[];

  @Column('boolean', { array: true, nullable: true })
  diagnosticosPresuntivo: boolean[];

  @Column('boolean', { array: true, nullable: true })
  diagnosticosDefinitivo: boolean[];

  // F. Plan Terapéutico Realizado
  @Column('text')
  planTratamiento: string;

  @Column('text')
  cuadroClinicoInterconsulta: string;

  @Column('text')
  planDiagnosticoPropuesto: string;

  @Column('text')
  planTerapeuticoPropuesto: string;

}
