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
  ) {}

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
      relations: ['caregiver'],
    });

    return { patients, total };
  }

  async findOne(id: string) {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: ['caregiver'],
    });
    if (!patient) {
      throw new NotFoundException(`Patient with id ${id} not found`);
    }
    return patient;
  }

  async findByDocument(document: string) {
    try {
      const patient = await this.patientRepository.findOne({
        where: { document },
        relations: ['caregiver'], // Incluimos la relación con el cuidador para tener datos completos
      });

      if (!patient) {
        throw new NotFoundException(
          `Patient with document ${document} not found`,
        );
      }

      // Formateamos la respuesta para incluir solo los datos necesarios
      const formattedPatient = {
        id: patient.id,
        document: patient.document,
        name: patient.name,
        lastName: patient.lastName,
        gender: patient.gender,
        birthday: patient.birthday,
        typeBeneficiary: patient.typeBeneficiary,
        typeDisability: patient.typeDisability,
        percentageDisability: patient.percentageDisability,
        caregiver: {
          id: patient.caregiver.id,
          name: patient.caregiver.name,
          lastName: patient.caregiver.lastName,
          document: patient.caregiver.document,
          cellphoneNumbers: patient.caregiver.cellphoneNumbers,
        },
      };

      return formattedPatient;
    } catch (error) {
      this.logger.error(`Error finding patient by document: ${error.message}`);
      throw error;
    }
  }

  async findAllByUser(userId: string) {
    try {
      this.logger.log(`Buscando pacientes para el usuario: ${userId}`);
      
      // Aquí debes ajustar la consulta según tu modelo de datos
      // Por ejemplo, si tienes una relación entre pacientes y usuarios a través de consultas:
      const patients = await this.patientRepository
        .createQueryBuilder('patient')
        .leftJoinAndSelect('patient.caregiver', 'caregiver')
        .innerJoin('consultation', 'cons', 'cons.patientId = patient.id')
        .where('cons.userId = :userId', { userId })
        .distinct(true)
        .getMany();

      this.logger.log(`Encontrados ${patients.length} pacientes`);
      return patients;
    } catch (error) {
      this.logger.error(`Error buscando pacientes por usuario: ${error.message}`);
      throw error;
    }
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
