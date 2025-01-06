import { Module } from '@nestjs/common';
import { CaregiversService } from './caregivers.service';
import { CaregiversController } from './caregivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caregiver } from './entities/caregiver.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CaregiversController],
  providers: [CaregiversService],
  imports: [TypeOrmModule.forFeature([Caregiver]), AuthModule],
  exports: [TypeOrmModule],
})
export class CaregiversModule {}
