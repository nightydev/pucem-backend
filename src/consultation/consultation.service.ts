import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateConsultationInitialDto } from './dto/create-consultation-initial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsultationInitial } from './entities/consultation-initial.entity';
import { Repository } from 'typeorm';
import { ConsultationSubsequent } from './entities/consultation-subsequent.entity';
import { CreateConsultationSubsequentDto } from './dto/create-consultation-subsequent.dto';
import { handleDBExceptions } from 'src/common/utils';
import { UsersService } from 'src/users/users.service';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class ConsultationService {

  private readonly logger = new Logger(ConsultationService.name);

  constructor(
    @InjectRepository(ConsultationInitial)
    private readonly consultationInitialRepository: Repository<ConsultationInitial>,
    @InjectRepository(ConsultationSubsequent)
    private readonly consultationSubsequentRepository: Repository<ConsultationSubsequent>,
    private readonly usersService: UsersService,
    private readonly patientsService: PatientsService
  ) { }

  async createInitial(createConsultationInitialDto: CreateConsultationInitialDto, userId: string) {
    try {
      const { patient: patientId, ...consultationData } = createConsultationInitialDto;

      // Buscar el paciente
      const patient = await this.patientsService.findOne(patientId);
      
      // Buscar el usuario usando el ID del token
      const user = await this.usersService.findOne(userId);

      // Crear la consulta
      const consultation = this.consultationInitialRepository.create({
        ...consultationData,
        user,
        patient,
        fecha: new Date()
      });

      await this.consultationInitialRepository.save(consultation);

      return { 
        message: 'Consulta creada exitosamente',
        consultation 
      };
    } catch (error) {
      console.error('Error al crear consulta:', error);
      throw error;
    }
  }

  async createSubsequent(createConsultationSubsequentDto: CreateConsultationSubsequentDto) {
    try {
      const { user, patient, consultationInitial, ...rest } = createConsultationSubsequentDto;

      const userExists = await this.usersService.findOne(user);
      const patientExists = await this.patientsService.findOne(patient);
      const consultationInitialExists = await this.findOneInitial(consultationInitial);

      const consultation = this.consultationSubsequentRepository.create({
        ...rest,
        user: userExists,
        patient: patientExists,
        consultationInitial: consultationInitialExists,
        fecha: new Date()
      });
      await this.consultationSubsequentRepository.save(consultation);

      return { message: `Consultation created successfully`, consultation };

    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  findAll() {
    return `This action returns all consultation`;
  }

  async findOneInitial(id: string) {
    const consultation = await this.consultationInitialRepository.findOne({ where: { id } });
    if (!consultation) {
      throw new NotFoundException(`Consultation with id ${id} not found`);
    }
    return consultation;
  }

  async findLastSubsequent(id: string) {
    const consultation = await this.consultationSubsequentRepository.findOne({ where: { consultationInitial: { id } }, order: { fecha: 'DESC' } });
    if (!consultation) {
      throw new NotFoundException(`Consultation subsequent not found`);
    }
    return consultation;
  }

  remove(id: string) {
    return `This action removes a #${id} consultation`;
  }

  async findAllByUser(userId: string) {
    try {
      const consultationsInitial = await this.consultationInitialRepository.find({
        where: { user: { id: userId } },
        relations: ['user', 'patient']
      });

      const consultationsSubsequent = await this.consultationSubsequentRepository.find({
        where: { user: { id: userId } },
        relations: ['user', 'patient', 'consultationInitial']
      });

      return {
        initial: consultationsInitial,
        subsequent: consultationsSubsequent
      };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }
}
