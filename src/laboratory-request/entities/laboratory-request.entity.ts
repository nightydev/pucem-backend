import { Patient } from 'src/patients/entities/patient.entity';
import { User } from 'src/users/entities/user.entity';
import { MicrobiologyRequest } from '../entities/microbiology-request.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'laboratory-requets' })
export class LaboratoryRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  numero_de_archivo: string;

  @Column('date', {
    nullable: false,
  })
  fecha: string;

  @Column('text', {
    nullable: false,
  })
  diagnostico_descripcion1: string;

  @Column('text', {
    nullable: false,
  })
  diagnostico_cie1: string;

  @Column('text', {
    nullable: false,
  })
  diagnostico_descripcion2: string;

  @Column('text', {
    nullable: false,
  })
  diagnostico_cie2: string;

  @Column('text', {
    nullable: false,
  })
  prioridad: string;

  @Column('text', {
    array: true,
    nullable: true,
  })
  hematologia_examenes: string[];

  @Column('text', {
    array: true,
    nullable: true,
  })
  coagulacion_examenes: string[];

  @Column('text', {
    array: true,
    nullable: true,
  })
  quimica_sanguinea_examenes: string[];

  @Column('text', {
    array: true,
    nullable: true,
  })
  orina_examenes: string[];

  @Column('text', {
    array: true,
    nullable: true,
  })
  heces_examenes: string[];

  @Column('text', {
    array: true,
    nullable: true,
  })
  hormonas_examenes: string[];

  @Column('text', {
    array: true,
    nullable: true,
  })
  serologia_examenes: string[];

  @ManyToOne(() => User, (user) => user.laboratoryRequests, { nullable: false })
  user: User;

  @ManyToOne(() => Patient, (patient) => patient.laboratoryRequests, {
    nullable: false,
  })
  patient: Patient;

  @OneToOne(
    () => MicrobiologyRequest,
    (microbiologyRequest) => microbiologyRequest.solicitud_laboratorio,
    {
      nullable: true,
    },
  )
  microbiologia: MicrobiologyRequest;
}
