import { Injectable, NotFoundException, Logger } from '@nestjs/common';
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
  ) { }

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
      relations: ['patient', 'group']
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
    emptyDtoException(updateTeamDto);

    const team = await this.findOne(id);
    const updatedTeam = { ...team, ...updateTeamDto };

    await this.teamRepository.save(updatedTeam);
    return { message: 'Team updated successfully', updatedTeam };
  }

  async remove(id: string) {
    const team = await this.findOne(id);
    await this.teamRepository.remove(team);
    return { message: `Team with ID ${id} deleted successfully` };
  }
}
