import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NursingForm } from './entities/nursing-form.entity';
import { NursingService } from './nursing.service';
import { NursingController } from './nursing.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NursingForm])],
  controllers: [NursingController],
  providers: [NursingService],
})
export class NursingModule {}
