import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { handleDBExceptions, emptyDtoException } from 'src/common/utils';
import { Caregiver } from 'src/caregivers/entities/caregiver.entity';

@Injectable()
export class PatientsService {
  private readonly logger = new Logger(PatientsService.name);

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Caregiver)
    private readonly caregiverRepository: Repository<Caregiver>,
  ) { }

  async create(createPatientDto: CreatePatientDto) {
    try {
      const { caregiverId, ...patientData } = createPatientDto;

      const caregiver = await this.caregiverRepository.findOne({
        where: { id: caregiverId },
      });

      const patient = this.patientRepository.create({
        ...patientData,
        caregiver,
      });

      await this.patientRepository.save(patient);
      return { message: 'Patient created successfully', patient };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    const offset = (page - 1) * limit;

    const [patients, total] = await this.patientRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['caregiver']
    });

    return { patients, total };
  }

  async findOne(id: string) {
    const patient = await this.patientRepository.findOne({ where: { id }, relations: ['caregiver'] });
    if (!patient) {
      throw new NotFoundException(`Patient with id ${id} not found`);
    }
    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    emptyDtoException(updatePatientDto);

    const patient = await this.findOne(id);
    const updatedPatient = { ...patient, ...updatePatientDto };

    await this.patientRepository.save(updatedPatient);
    return { message: 'Patient updated successfully', updatedPatient };
  }

  async remove(id: string) {
    const patient = await this.findOne(id);
    await this.patientRepository.remove(patient);
    return { message: `Patient with ID ${id} deleted successfully` };
  }
}
