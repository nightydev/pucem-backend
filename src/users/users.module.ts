import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CareersModule } from 'src/careers/careers.module';
import { AuthModule } from 'src/auth/auth.module';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    CareersModule,
    AuthModule,
    TeamsModule
  ],
  exports: [TypeOrmModule, UsersService]
})
export class UsersModule { }
