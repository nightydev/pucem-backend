import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsultationInternal } from './entities/consultation-internal.entity';
import { CreateConsultationInternalDto } from './dto/create-consultation-internal.dto';
import { UpdateConsultationInternalDto } from './dto/update-consultation-internal.dto';
import { UsersService } from 'src/users/users.service';
import { PatientsService } from 'src/patients/patients.service';
import { handleDBExceptions } from 'src/common/utils';

@Injectable()
export class ConsultationInternalService {

  private readonly logger = new Logger(ConsultationInternalService.name);

  constructor(
    @InjectRepository(ConsultationInternal)
    private readonly consultationInternalRepository: Repository<ConsultationInternal>,
    private readonly usersService: UsersService,
    private readonly patientsService: PatientsService
  ) {}

  async create(createConsultationInternalDto: CreateConsultationInternalDto) {
    try {
      const { user, patient, ...rest } = createConsultationInternalDto;

      const userExists = await this.usersService.findOne(user);
      const patientExists = await this.patientsService.findOne(patient);

      const consultation = this.consultationInternalRepository.create({
        ...rest,
        user: userExists,
        patient: patientExists,
        fecha: new Date(),
      });

      await this.consultationInternalRepository.save(consultation);
      return { message: `Consulta interna creada exitosamente`, consultation };

    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findAll() {
    return await this.consultationInternalRepository.find({
      relations: ['user', 'patient'],
    });
  }

  async findOne(id: string) {
    const consultation = await this.consultationInternalRepository.findOne({
      where: { id },
      relations: ['user', 'patient'],
    });

    if (!consultation) {
      throw new NotFoundException(`Consulta interna con ID ${id} no encontrada`);
    }
    return consultation;
  }

  async update(id: string, updateConsultationInternalDto: UpdateConsultationInternalDto) {
    try {
      const existingConsultation = await this.findOne(id);
      const updatedConsultation = Object.assign(existingConsultation, updateConsultationInternalDto);

      await this.consultationInternalRepository.save(updatedConsultation);
      return { message: `Consulta interna actualizada exitosamente`, updatedConsultation };

    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async remove(id: string) {
    const consultation = await this.findOne(id);
    await this.consultationInternalRepository.remove(consultation);
    return { message: `Consulta interna eliminada correctamente` };
  }

  async findAllByUser(userId: string) {
    try {
      const consultations = await this.consultationInternalRepository.find({
        where: { user: { id: userId } },
        relations: ['user', 'patient']
      });

      return consultations;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }
}
