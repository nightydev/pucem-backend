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
import { LaboratoryRequestModule } from './laboratory-request/laboratory-request.module';
import { ConsultationModule } from './consultation/consultation.module';

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
      // TODO: Después de que Azure complete la actualización de certificados SSL intermedios (iniciada el 31 de enero de 2024),
      // descargar los nuevos certificados y volver a establecer rejectUnauthorized a true
      ssl: {
        rejectUnauthorized: false,
        ca: fs
          .readFileSync(path.join(__dirname, '../', process.env.DB_SSL_FILE))
          .toString(),
      },
      namingStrategy: new SnakeNamingStrategy(),
    }),
    UsersModule,
    AuthModule,
    CareersModule,
    TeamsModule,
    GroupsModule,
    PatientsModule,
    CaregiversModule,
    LaboratoryRequestModule,
    ConsultationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
