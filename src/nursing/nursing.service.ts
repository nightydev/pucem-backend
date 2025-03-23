import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NursingForm } from './entities/nursing-form.entity';
import { CreateNursingFormDto } from './dto/create-nursing-form.dto';
import { UpdateNursingFormDto } from './dto/update-nursing-form.dto';
import { UsersService } from 'src/users/users.service';
import { PatientsService } from 'src/patients/patients.service';
import { User } from 'src/users/entities/user.entity';
import { Patient } from 'src/patients/entities/patient.entity';

@Injectable()
export class NursingService {
  constructor(
    @InjectRepository(NursingForm)
    private readonly nursingFormRepository: Repository<NursingForm>,
    private readonly userService: UsersService,
    private readonly patientsService: PatientsService,
  ) {}

  async create(
    createNursingFormDto: CreateNursingFormDto,
  ): Promise<NursingForm> {
    try {
      const { userId, patientId, ...restForm } = createNursingFormDto;

      // Verificar que el usuario existe
      const user: User = await this.userService.findOne(userId);
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
      }

      // Verificar que el paciente existe
      const patient: Patient = await this.patientsService.findOne(patientId);
      if (!patient) {
        throw new NotFoundException(
          `Paciente con ID ${patientId} no encontrado`,
        );
      }

      // Crear el formulario con las relaciones
      const nursingForm = this.nursingFormRepository.create({
        ...restForm,
        user,
        patient,
      });

      // Guardar y retornar el formulario
      return await this.nursingFormRepository.save(nursingForm);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Error al crear el formulario de enfermería: ${error.message}`,
      );
    }
  }

// En NursingFormService.ts
async findAll(): Promise<any[]> {
  const nursingForms = await this.nursingFormRepository.find({
    relations: ['user', 'patient'],
    order: { fecha: 'DESC' },
  });

  return nursingForms.map((form) => ({
    id: form.id,
    fecha: form.fecha,
    nanda_dominio: form.nanda_dominio,
    nanda_clase: form.nanda_clase,
    nanda_etiqueta_diagnostica: form.nanda_etiqueta_diagnostica,
    nanda_factor_relacionado: form.nanda_factor_relacionado,
    nanda_planteamiento_del_diagnostico: form.nanda_planteamiento_del_diagnostico,
    noc_resultado_noc: form.noc_resultado_noc,
    noc_dominio: form.noc_dominio,
    noc_clase: form.noc_clase,
    noc_indicador: form.noc_indicador,
    noc_rango: form.noc_rango,
    noc_diana_inicial: form.noc_diana_inicial,
    noc_diana_esperada: form.noc_diana_esperada,
    noc_evaluacion: form.noc_evaluacion,
    nic_intervencion: form.nic_intervencion,
    nic_clase: form.nic_clase,
    nic_actividades: form.nic_actividades,

    user: {
      id: form.user.id,
      name: form.user.name,
      lastName: form.user.lastName,
      document: form.user.document,
    },
    patient: {
      id: form.patient.id,
      name: form.patient.name,
      lastName: form.patient.lastName,
      document: form.user.document,
    },
  }));
}

async findOne(id: string): Promise<any> {
  const nursingForm = await this.nursingFormRepository.findOne({
    where: { id },
    relations: ['user', 'patient'],
  });

  if (!nursingForm) {
    throw new NotFoundException(`NursingForm with ID ${id} not found`);
  }

  return {
    id: nursingForm.id,
    fecha: nursingForm.fecha,
    nanda_dominio: nursingForm.nanda_dominio,
    nanda_clase: nursingForm.nanda_clase,
    nanda_etiqueta_diagnostica: nursingForm.nanda_etiqueta_diagnostica,
    nanda_factor_relacionado: nursingForm.nanda_factor_relacionado,
    nanda_planteamiento_del_diagnostico: nursingForm.nanda_planteamiento_del_diagnostico,
    noc_resultado_noc: nursingForm.noc_resultado_noc,
    noc_dominio: nursingForm.noc_dominio,
    noc_clase: nursingForm.noc_clase,
    noc_indicador: nursingForm.noc_indicador,
    noc_rango: nursingForm.noc_rango,
    noc_diana_inicial: nursingForm.noc_diana_inicial,
    noc_diana_esperada: nursingForm.noc_diana_esperada,
    noc_evaluacion: nursingForm.noc_evaluacion,
    nic_intervencion: nursingForm.nic_intervencion,
    nic_clase: nursingForm.nic_clase,
    nic_actividades: nursingForm.nic_actividades,

    user: {
      id: nursingForm.user.id,
      name: nursingForm.user.name,
      lastName: nursingForm.user.lastName,
      document: nursingForm.user.document,
    },
    patient: {
      id: nursingForm.patient.id,
      name: nursingForm.patient.name,
      lastName: nursingForm.patient.lastName,
      document: nursingForm.user.document,
    },
  };
}


  async update(
    id: string,
    updateNursingFormDto: UpdateNursingFormDto,
  ): Promise<NursingForm> {
    const nursingForm = await this.findOne(id);
    this.nursingFormRepository.merge(nursingForm, updateNursingFormDto);
    return await this.nursingFormRepository.save(nursingForm);
  }

  async remove(id: string): Promise<void> {
    const nursingForm = await this.findOne(id);
    await this.nursingFormRepository.remove(nursingForm);
  }

  async findAllByUser(userId: string) {
    try {
      const forms = await this.nursingFormRepository.find({
        where: { user: { id: userId } },
        relations: ['user', 'patient'],
      });

      return forms;
    } catch (error) {
      throw new NotFoundException(
        `No se encontraron formularios para el usuario con ID ${userId}`,
      );
    }
  }
}
