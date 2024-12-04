import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity({ name: 'careers' })
export class Career {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: false
  })
  careerName: string;

  @OneToMany(
    () => User,
    (user) => user.career,
    { cascade: true }
  )
  user: User;

}
