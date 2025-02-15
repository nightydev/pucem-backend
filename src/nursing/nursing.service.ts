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
    private readonly patientsService: PatientsService
  ) { }

  async create(
    createNursingFormDto: CreateNursingFormDto,
  ): Promise<NursingForm> {

    const { userId, patientId, ...restForm } = createNursingFormDto;

    const user: User = await this.userService.findOne(userId);
    const patient: Patient = await this.patientsService.findOne(patientId);

    const form = {
      ...restForm,
      user,
      patient
    };

    const nursingForm = this.nursingFormRepository.create(form);
    return await this.nursingFormRepository.save(nursingForm);
  }

  async findAll(): Promise<NursingForm[]> {
    return await this.nursingFormRepository.find();
  }

  async findOne(id: string): Promise<NursingForm> {
    const nursingForm = await this.nursingFormRepository.findOne({
      where: { id },
    });
    if (!nursingForm) {
      throw new NotFoundException(`NursingForm with ID ${id} not found`);
    }
    return nursingForm;
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
}
