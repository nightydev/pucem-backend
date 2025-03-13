import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationInternalService } from './consultationInternal.service';
import { ConsultationInternalController } from './consultationInternal.controller';
import { ConsultationInternal } from './entities/consultation-internal.entity';
import { PatientsModule } from 'src/patients/patients.module';
import { UsersModule } from 'src/users/users.module';
import { PdfService } from '../common/services/pdf.service';

@Module({
  controllers: [ConsultationInternalController],
  providers: [ConsultationInternalService, PdfService],
  imports: [
    TypeOrmModule.forFeature([ConsultationInternal]),
    PatientsModule,
    UsersModule,
  ],
  exports: [TypeOrmModule],
})
export class ConsultationInternalModule {}
