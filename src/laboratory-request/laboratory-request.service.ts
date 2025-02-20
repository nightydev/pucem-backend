import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LaboratoryRequest } from './entities/laboratory-request.entity';
import { CreateLaboratoryRequestDto } from './dto/create-laboratory-request.dto';
import { UpdateLaboratoryRequestDto } from './dto/update-laboratory-request.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { handleDBExceptions, emptyDtoException } from 'src/common/utils';
import { User } from 'src/users/entities/user.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { MicrobiologyRequest } from './entities/microbiology-request.entity';

@Injectable()
export class LaboratoryRequestService {
  private readonly logger = new Logger(LaboratoryRequestService.name);

  constructor(
    @InjectRepository(LaboratoryRequest)
    private readonly laboratoryRequestRepository: Repository<LaboratoryRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createLaboratoryRequestDto: CreateLaboratoryRequestDto) {
    const { userId, patientId, microbiologia, ...requestData } =
      createLaboratoryRequestDto;

    // Buscar usuario
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    // Buscar paciente
    const patient = await this.patientRepository.findOne({
      where: { id: patientId },
    });
    if (!patient) {
      throw new NotFoundException(`Patient with id ${patientId} not found`);
    }

    try {
      // Crear solicitud principal
      const laboratoryRequest = this.laboratoryRequestRepository.create({
        ...requestData,
        user,
        patient,
      });

      // Guardar solicitud principal
      await this.laboratoryRequestRepository.save(laboratoryRequest);

      // Verificar si hay información de microbiología
      if (microbiologia) {
        const microbiologyRequest = new MicrobiologyRequest();
        Object.assign(microbiologyRequest, microbiologia, {
          solicitud_laboratorio: laboratoryRequest,
        });

        // Guardar la solicitud de microbiología
        const microbiologyRepository =
          this.laboratoryRequestRepository.manager.getRepository(
            MicrobiologyRequest,
          );
        await microbiologyRepository.save(microbiologyRequest);
      }

      return {
        message: 'Laboratory request created successfully',
        laboratoryRequest,
      };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    const offset = (page - 1) * limit;

    const [requests, total] =
      await this.laboratoryRequestRepository.findAndCount({
        take: limit,
        skip: offset,
        relations: ['user', 'patient'], // Load related entities if needed
      });

    return { requests, total };
  }

  async findOne(id: string) {
    const request = await this.laboratoryRequestRepository.findOne({
      where: { id },
      relations: ['user', 'patient', 'microbiologia'], // Incluye la relación con microbiología
    });

    if (!request) {
      throw new NotFoundException(`Laboratory request with id ${id} not found`);
    }

    return request;
  }

  async update(
    id: string,
    updateLaboratoryRequestDto: UpdateLaboratoryRequestDto,
  ) {
    emptyDtoException(updateLaboratoryRequestDto);

    const request = await this.findOne(id);

    const updatedRequest = {
      ...request,
      ...updateLaboratoryRequestDto,
    };

    await this.laboratoryRequestRepository.save(updatedRequest);
    return {
      message: 'Laboratory request updated successfully',
      updatedRequest,
    };
  }

  async remove(id: string) {
    const request = await this.findOne(id);
    await this.laboratoryRequestRepository.remove(request);
    return { message: `Laboratory request with ID ${id} deleted successfully` };
  }

  async findAllByUser(userId: string) {
    try {
      const requests = await this.laboratoryRequestRepository.find({
        where: { user: { id: userId } },
        relations: ['user', 'patient', 'microbiologia']
      });

      return requests;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }
}
