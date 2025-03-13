import { Module, forwardRef } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Caregiver } from 'src/caregivers/entities/caregiver.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { CaregiversModule } from 'src/caregivers/caregivers.module';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [
    TypeOrmModule.forFeature([Patient, Caregiver, User]),
    AuthModule,
    CaregiversModule,
    forwardRef(() => UsersModule), // Use forwardRef to break circular dependency
  ],
  exports: [PatientsService, TypeOrmModule],
})
export class PatientsModule {}
