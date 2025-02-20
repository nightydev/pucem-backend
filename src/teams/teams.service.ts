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
      const { patientId, groupId, teamName } = createTeamDto;

      const patient = await this.patientRepository.findOne({
        where: { id: patientId },
      });
      const group = await this.groupRepository.findOne({
        where: { id: groupId },
      });

      const team = this.teamRepository.create({
        teamName,
        patient,
        group,
      });

      await this.teamRepository.save(team);
      return { message: 'Team created successfully', team };
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
      relations: ['patient', 'group'],
    });

    return { teams, total };
  }

  async findOne(id: string) {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }
    return team;
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
            `Group with id ${updateTeamDto.groupId} not found`,
          );
        }
        team.group = group;
      }

      if (updateTeamDto.patientId) {
        const patient = await this.patientRepository.findOne({
          where: { id: updateTeamDto.patientId },
        });
        if (!patient) {
          throw new NotFoundException(
            `Patient with id ${updateTeamDto.patientId} not found`,
          );
        }

        // Check if patient already belongs to another team
        const existingTeam = await this.teamRepository.findOne({
          where: { patient: { id: updateTeamDto.patientId } },
          relations: ['patient'],
        });

        if (existingTeam && existingTeam.id !== id) {
          const errorMessage = `El paciente ya pertenece a otro equipo (${existingTeam.teamName}). Un paciente solo puede pertenecer a un equipo a la vez.`;
          this.logger.error(errorMessage);
          throw new BadRequestException(errorMessage);
        }

        team.patient = patient;
      }

      team.teamName = updateTeamDto.teamName;

      await this.teamRepository.save(team);
      return { message: 'Team updated successfully', team };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; // Propagamos el error directamente si es un BadRequestException
      }
      handleDBExceptions(error, this.logger);
    }
  }

  async remove(id: string) {
    const team = await this.findOne(id);
    await this.teamRepository.remove(team);
    return { message: `Team with ID ${id} deleted successfully` };
  }
}
