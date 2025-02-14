import { Patient } from 'src/patients/entities/patient.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity({ name: 'caregivers' })
export class Caregiver {
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

  @Column('text', {
    array: true,
    nullable: true,
  })
  conventionalNumbers: string[];

  @Column('text', {
    array: true,
    nullable: true,
  })
  cellphoneNumbers: string[];

  @Column('text', {
    nullable: false,
  })
  canton: string;

  @Column('text', {
    nullable: false,
  })
  parish: string;

  @Column('text', {
    nullable: false,
  })
  zoneType: string;

  @Column('text', {
    nullable: false,
  })
  address: string;

  @Column('text', {
    nullable: false,
  })
  reference: string;

  @Column('text', {
    nullable: false,
  })
  patientRelationship: string;

  @OneToMany(() => Patient, (patient) => patient.caregiver, { cascade: true })
  patients: Patient[];
}
