import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { handleDBExceptions, emptyDtoException } from 'src/common/utils';
import { Patient } from 'src/patients/entities/patient.entity';
import { Group } from 'src/groups/entities/group.entity';

@Injectable()
export class TeamsService {
  private readonly logger = new Logger(TeamsService.name);

  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    try {
      const { patientIds, groupId, teamName } = createTeamDto;

      // Verificar que el grupo exista
      const group = await this.groupRepository.findOne({
        where: { id: groupId },
      });
      if (!group) {
        throw new NotFoundException(`Group with ID ${groupId} not found`);
      }

      // Buscar todos los pacientes con los IDs proporcionados
      const patient = await this.patientRepository.findByIds(patientIds);
      if (patient.length !== patientIds.length) {
        throw new NotFoundException(`Some patient were not found`);
      }

      // Verificar si algún paciente ya pertenece a otro equipo
      const patientWithTeam = patient.filter((patient) => patient.team);
      if (patientWithTeam.length > 0) {
        const patientNames = patientWithTeam.map((p) => p.name).join(', ');
        throw new BadRequestException(
          `These patient already belong to a team: ${patientNames}`,
        );
      }

      // Crear el equipo primero sin pacientes
      const team = this.teamRepository.create({
        teamName,
        group,
      });

      // Guardar el equipo para obtener su ID
      const savedTeam = await this.teamRepository.save(team);

      // Actualizar cada paciente para asignarle el equipo
      for (const p of patient) {
        p.team = savedTeam;
        await this.patientRepository.save(p);
      }

      // Obtener el equipo actualizado con sus pacientes
      const updatedTeam = await this.teamRepository.findOne({
        where: { id: savedTeam.id },
        relations: ['patient', 'group'],
      });

      return { message: 'Team created successfully', team: updatedTeam };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    const offset = (page - 1) * limit;

    const [teams, total] = await this.teamRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['patient', 'group', 'user'], // ✅ Agregamos 'user' para contar gestores
    });

    // Agregar `patientCount` y `userCount`
    const teamsWithCounts = teams.map((team) => ({
      ...team,
      patientCount: Array.isArray(team.patient) ? team.patient.length : 0, // ✅ validamos que sea array
      userCount: Array.isArray(team.user) ? team.user.length : 0, // ✅ validamos que sea array
    }));

    return { teams: teamsWithCounts, total };
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['patient', 'group', 'user'], // ✅ Incluimos `user`
    });

    if (!team) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }

    const formattedTeam = {
      ...team,
      patient: Array.isArray(team.patient) ? team.patient : [],
      userCount: Array.isArray(team.user) ? team.user.length : 0,
    };

    return formattedTeam;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    try {
      emptyDtoException(updateTeamDto);

      const team = await this.findOne(id);

      if (updateTeamDto.groupId) {
        const group = await this.groupRepository.findOne({
          where: { id: updateTeamDto.groupId },
        });
        if (!group) {
          throw new NotFoundException(
            `Group with ID ${updateTeamDto.groupId} not found`,
          );
        }
        team.group = group;
      }

      if (updateTeamDto.patientIds && updateTeamDto.patientIds.length > 0) {
        // Get current team's patients and remove team association
        const currentPatients = await this.patientRepository.find({
          where: { team: { id } },
        });

        // Remove team association from current patients
        await Promise.all(
          currentPatients.map(async (patient) => {
            patient.team = null;
            await this.patientRepository.save(patient);
          })
        );

        // Get new patients
        const newPatients = await this.patientRepository.findByIds(
          updateTeamDto.patientIds,
        );

        if (!newPatients.length) {
          throw new NotFoundException(`No patients found for provided IDs`);
        }

        // Verify if any patient already belongs to another team
        const patientsWithTeam = newPatients.filter(
          (patient) => patient.team && patient.team.id !== id,
        );
        if (patientsWithTeam.length > 0) {
          const patientNames = patientsWithTeam.map((p) => p.name).join(', ');
          throw new BadRequestException(
            `These patients already belong to other teams: ${patientNames}`,
          );
        }

        // Assign new patients to the team
        await Promise.all(
          newPatients.map(async (patient) => {
            patient.team = team;
            await this.patientRepository.save(patient);
          })
        );

        // Update team's patient array
        team.patient = newPatients;
      }

      if (updateTeamDto.teamName) {
        team.teamName = updateTeamDto.teamName;
      }

      // Save the team with updated relationships
      await this.teamRepository.save(team);

      // Get the updated team with all relations
      const updatedTeam = await this.teamRepository.findOne({
        where: { id },
        relations: ['patient', 'group', 'user'],
      });

      return { message: 'Team updated successfully', team: updatedTeam };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async remove(id: string) {
    const team = await this.findOne(id);

    // Desasociar a todos los pacientes del equipo
    const patient = await this.patientRepository.find({
      where: { team: { id } },
    });

    for (const p of patient) {
      p.team = null;
      await this.patientRepository.save(p);
    }

    await this.teamRepository.remove(team);
    return { message: `Team with ID ${id} deleted successfully` };
  }
}
