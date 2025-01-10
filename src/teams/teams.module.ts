import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Group } from 'src/groups/entities/group.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PatientsModule } from 'src/patients/patients.module';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService],
  imports: [
    TypeOrmModule.forFeature([Team, Patient, Group]),
    AuthModule,
    PatientsModule,
    GroupsModule,
  ],
  exports: [TypeOrmModule, TeamsService],
})
export class TeamsModule {}
