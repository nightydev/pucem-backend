import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CareersModule } from 'src/careers/careers.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    CareersModule,
    PassportModule
  ],
  exports: [TypeOrmModule]
})
export class UsersModule {}
