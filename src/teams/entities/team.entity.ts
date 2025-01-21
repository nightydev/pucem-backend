import { Group } from 'src/groups/entities/group.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'teams' })
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: false,
    name: 'team_name',
  })
  teamName: string;

  @ManyToOne(() => Group, (group) => group.team, { nullable: false })
  group: Group;

  @OneToOne(() => Patient, (patient) => patient.team, { nullable: false })
  @JoinColumn()
  patient: Patient;

  @OneToMany(() => User, (user) => user.team, { cascade: true })
  user: User;
}
