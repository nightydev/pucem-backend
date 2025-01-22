import { Patient } from 'src/patients/entities/patient.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ConsultationInitial } from './consultation-initial.entity';

@Entity({ name: 'consultation_subsequent' })
export class ConsultationSubsequent {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { unique: true })
  @Generated('increment')
  numeroDeArchivo: number;

  @Column('date')
  fecha: Date;

  @Column('text')
  motivoConsulta: string;

  @Column('text', { array: true })
  antecedentesPatologicosPersonales: string[];

  @Column('text')
  antecedentesPatologicosPersonalesDesc: string;

  @Column('text', { array: true })
  antecedentesPatologicosFamiliares: string[];

  @Column('text')
  antecedentesPatologicosFamiliaresDesc: string;

  @Column('text')
  enfermedadProblemaActual: string;

  @Column('date', { nullable: true })
  cvaFecha: string;

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

  @ManyToOne(() => User, (user) => user.consultationSubsequent)
  user: User;

  @ManyToOne(() => Patient, (patient) => patient.consultationSubsequent)
  patient: Patient;

  @ManyToOne(() => ConsultationInitial, (consultationInitial) => consultationInitial.consultationSubsequent, { nullable: false })
  consultationInitial: ConsultationInitial;

}
