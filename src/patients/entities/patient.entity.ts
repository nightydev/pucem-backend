import { Caregiver } from 'src/caregivers/entities/caregiver.entity';
import { Team } from 'src/teams/entities/team.entity';
import { LaboratoryRequest } from 'src/laboratory-request/entities/laboratory-request.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConsultationInitial } from 'src/consultation/entities/consultation-initial.entity';
import { ConsultationSubsequent } from 'src/consultation/entities/consultation-subsequent.entity';
import { ConsultationInternal } from 'src/internal/entities/consultation-internal.entity';
import { NursingForm } from 'src/nursing/entities/nursing-form.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity({ name: 'patients' })
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  document: string;

  @Column('text', {
    nullable: false,
  })
  name: string;

  @Column('text', {
    nullable: false,
  })
  lastName: string;

  @Column('enum', {
    enum: Gender,
    nullable: false,
  })
  gender: Gender;

  @Column('date', {
    nullable: false,
  })
  birthday: Date;

  @Column('text', {
    nullable: false,
  })
  typeBeneficiary: string;

  @Column('text', {
    nullable: false,
  })
  typeDisability: string;

  @Column('int', {
    nullable: false,
  })
  percentageDisability: number;

  @Column('text', {
    nullable: false,
  })
  zone: string;

  @Column('bool', {
    default: true,
    nullable: false,
  })
  isActive: boolean;

  @ManyToOne(() => Caregiver, (caregiver) => caregiver.patients, {
    nullable: false,
  })
  @JoinColumn()
  caregiver: Caregiver;

  // Relación actualizada: cada paciente pertenece a un equipo
  @ManyToOne(() => Team, (team) => team.patient, { nullable: true })
  @JoinColumn()
  team: Team;
  

  @OneToMany(
    () => LaboratoryRequest,
    (laboratoryRequest) => laboratoryRequest.patient,
    {
      nullable: true,
    },
  )
  laboratoryRequests: LaboratoryRequest[];

  @OneToMany(
    () => ConsultationInitial,
    (consultationInitial) => consultationInitial.patient,
  )
  consultationInitial: ConsultationInitial;

  @OneToMany(
    () => ConsultationSubsequent,
    (consultationSubsequent) => consultationSubsequent.patient,
  )
  consultationSubsequent: ConsultationSubsequent;

  // Nueva relación con ConsultationInternal
  @OneToMany(
    () => ConsultationInternal,
    (consultationInternal) => consultationInternal.patient,
  )
  consultationInternal: ConsultationInternal[];

  @OneToMany(() => NursingForm, (nursingForm) => nursingForm.patient)
  nursingForms: NursingForm[];
}
