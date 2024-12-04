import { Module } from '@nestjs/common';
import { CareersService } from './careers.service';
import { CareersController } from './careers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Career } from './entities/career.entity';

@Module({
  controllers: [CareersController],
  providers: [CareersService],
  imports: [
    TypeOrmModule.forFeature([Career])
  ],
  exports: [TypeOrmModule, CareersService]
})
export class CareersModule {}
