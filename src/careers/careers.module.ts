import { Module } from '@nestjs/common';
import { CareersService } from './careers.service';
import { CareersController } from './careers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Career } from './entities/career.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CareersController],
  providers: [CareersService],
  imports: [
    TypeOrmModule.forFeature([Career]),
    AuthModule
  ],
  exports: [TypeOrmModule, CareersService]
})
export class CareersModule {}
