import { Caregiver } from 'src/caregivers/entities/caregiver.entity';
import { Team } from 'src/teams/entities/team.entity';
import { LaboratoryRequest } from 'src/laboratory-request/entities/laboratory-request.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToOne(() => Caregiver, (caregiver) => caregiver.patient, {
    nullable: false,
  })
  @JoinColumn()
  caregiver: Caregiver;

  @OneToOne(() => Team, (team) => team.patient, { cascade: true })
  team: Team;

  @OneToMany(
    () => LaboratoryRequest,
    (laboratoryRequest) => laboratoryRequest.patient,
    {
      nullable: true,
    },
  )
  laboratoryRequests: LaboratoryRequest[];
}
