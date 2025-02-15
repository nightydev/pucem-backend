import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Generated,
} from 'typeorm';
import { Patient } from 'src/patients/entities/patient.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'nursing_forms' })
export class NursingForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { unique: true })
  @Generated('increment')
  numeroDeArchivo: number;

  @Column('date')
  fecha: Date;

  @Column('text')
  motivoConsulta: string;

  @Column('text', { array: true, nullable: true })
  antecedentesPatologicosPersonales: string[];

  @Column('text', { nullable: true })
  antecedentesPatologicosPersonalesDesc: string;

  @Column('text', { array: true, nullable: true })
  antecedentesPatologicosFamiliares: string[];

  @Column('text', { nullable: true })
  antecedentesPatologicosFamiliaresDesc: string;

  @Column('text')
  enfermedadProblemaActual: string;

  @Column('date', { nullable: true })
  cvaFecha: Date;

  @Column('time', { nullable: true })
  cvaHora: string;

  @Column('text', { nullable: true })
  cvaTemperatura: string;

  @Column('text', { nullable: true })
  cvaPresionArterial: string;

  @Column('text', { nullable: true })
  cvaPulso: string;

  @Column('text', { nullable: true })
  cvaFrecuenciaRespiratoria: string;

  @Column('text', { nullable: true })
  cvaPeso: string;

  @Column('text', { nullable: true })
  cvaTalla: string;

  @Column('text', { nullable: true })
  cvaImc: string;

  @Column('text', { nullable: true })
  cvaPerimetroAbdominal: string;

  @Column('text', { nullable: true })
  cvaHemoglobinaCapilar: string;

  @Column('text', { nullable: true })
  cvaGlucosaCapilar: string;

  @Column('text', { nullable: true })
  cvaPulsioximetria: string;

  @Column('text', { array: true, nullable: true })
  organosSistemasPatologia: string[];

  @Column('text', { array: true, nullable: true })
  organosSistemasPatologiaDesc: string[];

  @Column('text', { array: true, nullable: true })
  examenFisicoPatologia: string[];

  @Column('text', { array: true, nullable: true })
  examenFisicoPatologiaDesc: string[];

  @Column('text', { array: true, nullable: true })
  diagnosticosDesc: string[];

  @Column('text', { array: true, nullable: true })
  diagnosticosCie: string[];

  @Column('text')
  planTratamiento: string;

  // Relación ManyToOne con User
  @ManyToOne(() => User, (user) => user.nursingForms, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Relación ManyToOne con Patient
  @ManyToOne(() => Patient, (patient) => patient.nursingForms, {
    nullable: false,
  })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;
}
