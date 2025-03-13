import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationInitial } from './entities/consultation-initial.entity';
import { ConsultationSubsequent } from './entities/consultation-subsequent.entity';
import { PatientsModule } from 'src/patients/patients.module';
import { UsersModule } from 'src/users/users.module';
import { PdfService } from '../common/services/pdf.service';

@Module({
  controllers: [ConsultationController],
  providers: [ConsultationService, PdfService],
  imports: [
    TypeOrmModule.forFeature([ConsultationInitial, ConsultationSubsequent]),
    PatientsModule,
    UsersModule,
  ],
  exports: [TypeOrmModule],
})
export class ConsultationModule {}
