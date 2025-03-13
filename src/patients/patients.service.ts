import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { handleDBExceptions, emptyDtoException } from 'src/common/utils';
import { Caregiver } from 'src/caregivers/entities/caregiver.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PatientsService {
  private readonly logger = new Logger(PatientsService.name);

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Caregiver)
    private readonly caregiverRepository: Repository<Caregiver>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

      // Consulta corregida con los nombres correctos de las columnas
      const patients = await this.patientRepository
        .createQueryBuilder('patient')
        .leftJoinAndSelect('patient.caregiver', 'caregiver')
        .leftJoin('consultation_initial', 'ci', 'ci."patientId" = patient.id')
        .leftJoin(
          'consultation_subsequent',
          'cs',
          'cs."patientId" = patient.id',
        )
        .leftJoin(
          'consultation_internal',
          'cint',
          'cint."patientId" = patient.id',
        )
        .leftJoin('nursing_form', 'nf', 'nf."patientId" = patient.id')
        .leftJoin('laboratory_request', 'lr', 'lr."patientId" = patient.id')
        .where('ci."userId" = :userId', { userId })
        .orWhere('cs."userId" = :userId', { userId })
        .orWhere('cint."userId" = :userId', { userId })
        .orWhere('nf."userId" = :userId', { userId })
        .orWhere('lr."userId" = :userId', { userId })
        .distinct(true)
        .getMany();

      this.logger.log(`Encontrados ${patients.length} pacientes`);

      // Verificar si el usuario tiene pacientes asignados en su equipo
      if (patients.length === 0) {
        // Intentar obtener pacientes del equipo del usuario
        const userWithTeam = await this.userRepository.findOne({
          where: { id: userId },
          relations: ['team', 'team.patient'],
        });

        if (userWithTeam?.team?.patient?.length > 0) {
          this.logger.log(
            `Encontrados ${userWithTeam.team.patient.length} pacientes del equipo`,
          );
          return { patients: userWithTeam.team.patient };
        }

        this.logger.warn(
          `No se encontraron pacientes para el usuario ${userId}`,
        );
        return { patients: [] };
      }

      return { patients };
    } catch (error) {
      this.logger.error(
        `Error buscando pacientes por usuario: ${error.message}`,
      );
      this.logger.error(error.stack);
      throw new Error(`Error al buscar pacientes: ${error.message}`);
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
