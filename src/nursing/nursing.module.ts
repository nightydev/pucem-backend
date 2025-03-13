import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NursingForm } from './entities/nursing-form.entity';
import { NursingService } from './nursing.service';
import { NursingController } from './nursing.controller';
import { UsersModule } from 'src/users/users.module';
import { PatientsModule } from 'src/patients/patients.module';
import { PdfService } from '../common/services/pdf.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([NursingForm]),
    UsersModule,
    PatientsModule,
  ],
  controllers: [NursingController],
  providers: [NursingService, PdfService],
})
export class NursingModule {}
