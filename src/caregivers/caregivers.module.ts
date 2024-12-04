import { Module } from '@nestjs/common';
import { CaregiversService } from './caregivers.service';
import { CaregiversController } from './caregivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caregiver } from './entities/caregiver.entity';

@Module({
  controllers: [CaregiversController],
  providers: [CaregiversService],
  imports: [
    TypeOrmModule.forFeature([Caregiver])
  ],
})
export class CaregiversModule { }
