import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Career } from 'src/careers/entities/career.entity';
import { Team } from 'src/teams/entities/team.entity';
import { LaboratoryRequest } from 'src/laboratory-request/entities/laboratory-request.entity';
import { ConsultationInitial } from 'src/consultation/entities/consultation-initial.entity';
import { ConsultationSubsequent } from 'src/consultation/entities/consultation-subsequent.entity';
import { ConsultationInternal } from 'src/internal/entities/consultation-internal.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  document: string;

  @Column('text', {
    nullable: false,
  })
  password: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  email: string;

  @Column('text', {
    nullable: false,
  })
  name: string;

  @Column('text', {
    nullable: false,
  })
  lastName: string;

  @Column('text', {
    nullable: true,
  })
  address: string;

  @Column('text', {
    nullable: true,
  })
  resetPasswordToken: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('enum', {
    enum: Role,
    nullable: false,
  })
  role: Role;

  @ManyToOne(() => Career, (career) => career.user, { nullable: true })
  career: Career;

  @ManyToOne(() => Team, (team) => team.user, { nullable: true })
  team: Team;

  @OneToMany(
    () => LaboratoryRequest,
    (laboratoryRequest) => laboratoryRequest.user,
    {
      nullable: true,
    },
  )
  laboratoryRequests: LaboratoryRequest[];

  @OneToMany(() => ConsultationInitial, (consultationInitial) => consultationInitial.user)
  consultationInitial: ConsultationInitial;

  @OneToMany(() => ConsultationSubsequent, (consultationSubsequent) => consultationSubsequent.user)
  consultationSubsequent: ConsultationSubsequent;

  @OneToMany(() => ConsultationInternal, (consultationInternal) => consultationInternal.user)
  consultationInternal: ConsultationInternal;
}
