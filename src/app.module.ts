import * as fs from 'fs';
import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CareersModule } from './careers/careers.module';
import { TeamsModule } from './teams/teams.module';
import { GroupsModule } from './groups/groups.module';
import { PatientsModule } from './patients/patients.module';
import { CaregiversModule } from './caregivers/caregivers.module';
import { SnakeNamingStrategy } from './common/config/snake-naming.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: true,
        ca: fs
          .readFileSync(
            path.join(
              __dirname,
              '../',
              process.env.DB_SSL_FILE,
            ),
          )
          .toString()
      },
      namingStrategy: new SnakeNamingStrategy
    }),
    UsersModule,
    AuthModule,
    CareersModule,
    TeamsModule,
    GroupsModule,
    PatientsModule,
    CaregiversModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }