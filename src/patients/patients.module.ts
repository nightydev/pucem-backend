import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Caregiver } from 'src/caregivers/entities/caregiver.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CaregiversModule } from 'src/caregivers/caregivers.module';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [
    TypeOrmModule.forFeature([Patient, Caregiver]),
    AuthModule,
    CaregiversModule,
  ],
  exports: [TypeOrmModule, PatientsService],
})
export class PatientsModule { }
