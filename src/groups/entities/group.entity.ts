import { Team } from 'src/teams/entities/team.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'groups' })
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  groupName: string;

  @OneToMany(() => Team, (team) => team.group, { cascade: true })
  team: Team;
}
