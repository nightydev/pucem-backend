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
      const group = await this.groupRepository.findOne({ where: { id: groupId } });
      if (!group) {
        throw new NotFoundException(`Group with ID ${groupId} not found`);
      }
  
      // Buscar todos los pacientes con los IDs proporcionados
      const patients = await this.patientRepository.findByIds(patientIds);
      if (patients.length !== patientIds.length) {
        throw new NotFoundException(`Some patients were not found`);
      }
  
      // Crear el equipo con múltiples pacientes
      const team = this.teamRepository.create({
        teamName,
        group,
        patient: patients, // Ahora asigna múltiples pacientes
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

  async findOne(id: string): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['patient'],
    });
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
        const group = await this.groupRepository.findOne({ where: { id: updateTeamDto.groupId } });
        if (!group) {
          throw new NotFoundException(`Group with ID ${updateTeamDto.groupId} not found`);
        }
        team.group = group;
      }
  
      if (updateTeamDto.patientIds) {
        const patients = await this.patientRepository.findByIds(updateTeamDto.patientIds);
        if (!patients.length) {
          throw new NotFoundException(`No patients found for provided IDs`);
        }
  
        // Filtrar pacientes que ya pertenecen a otro equipo
        const existingPatients = patients.filter(patient => patient.team && patient.team.id !== id);
        if (existingPatients.length) {
          const patientNames = existingPatients.map(p => p.name).join(', ');
          throw new BadRequestException(`Some patients already belong to other teams: ${patientNames}`);
        }
  
        team.patient = patients; // Asignar los nuevos pacientes
      }
  
      if (updateTeamDto.teamName) {
        team.teamName = updateTeamDto.teamName;
      }
  
      await this.teamRepository.save(team);
      return { message: 'Team updated successfully', team };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }
  

  async remove(id: string) {
    const team = await this.findOne(id);
    await this.teamRepository.remove(team);
    return { message: `Team with ID ${id} deleted successfully` };
  }
}
