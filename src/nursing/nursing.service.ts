import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NursingForm } from './entities/nursing-form.entity';
import { CreateNursingFormDto } from './dto/create-nursing-form.dto';
import { UpdateNursingFormDto } from './dto/update-nursing-form.dto';

@Injectable()
export class NursingService {
  constructor(
    @InjectRepository(NursingForm)
    private readonly nursingFormRepository: Repository<NursingForm>,
  ) {}

  async create(
    createNursingFormDto: CreateNursingFormDto,
  ): Promise<NursingForm> {
    const nursingForm = this.nursingFormRepository.create(createNursingFormDto);
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
