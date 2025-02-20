import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from 'src/patients/entities/patient.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'nursing_forms' })
export class NursingForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.nursingForms, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Patient, (patient) => patient.nursingForms, {
    nullable: false,
  })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column('text')
  nanda_dominio: string;

  @Column('text')
  nanda_clase: string;

  @Column('text')
  nanda_etiqueta_diagnostica: string;

  @Column('text')
  nanda_factor_relacionado: string;

  @Column('text')
  nanda_planteamiento_del_diagnostico: string;

  @Column('text')
  noc_resultado_noc: string;

  @Column('text')
  noc_dominio: string;

  @Column('text')
  noc_clase: string;

  @Column('text', { array: true })
  noc_indicador: string[];

  @Column('text', { array: true })
  noc_rango: string[];

  @Column('text', { array: true })
  noc_diana_inicial: string[];

  @Column('text', { array: true })
  noc_diana_esperada: string[];

  @Column('text', { array: true })
  noc_evaluacion: string[];

  @Column('text', { array: true })
  nic_intervencion: string[];

  @Column('text', { array: true })
  nic_clase: string[];

  @Column('text', { array: true })
  nic_actividades: string[];
}
