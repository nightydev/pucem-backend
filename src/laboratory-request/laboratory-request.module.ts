import { Module } from '@nestjs/common';
import { LaboratoryRequestService } from './laboratory-request.service';
import { LaboratoryRequestController } from './laboratory-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratoryRequest } from './entities/laboratory-request.entity';
import { MicrobiologyRequest } from './entities/microbiology-request.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { PatientsModule } from 'src/patients/patients.module';
import { PdfService } from '../common/services/pdf.service';

@Module({
  controllers: [LaboratoryRequestController],
  providers: [LaboratoryRequestService, PdfService],
  imports: [
    TypeOrmModule.forFeature([LaboratoryRequest, MicrobiologyRequest]),
    AuthModule,
    UsersModule,
    PatientsModule,
  ],
  exports: [TypeOrmModule, LaboratoryRequestService],
})
export class LaboratoryRequestModule {}
