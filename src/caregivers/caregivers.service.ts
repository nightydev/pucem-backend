import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCaregiverDto } from './dto/create-caregiver.dto';
import { UpdateCaregiverDto } from './dto/update-caregiver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Caregiver } from './entities/caregiver.entity';
import { Repository } from 'typeorm';
import { emptyDtoException, handleDBExceptions } from 'src/common/utils';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CaregiversService {

  private readonly logger = new Logger(CaregiversService.name);

  constructor(
    @InjectRepository(Caregiver)
    private readonly caregiverRepository: Repository<Caregiver>
  ) { }

  async create(createCaregiverDto: CreateCaregiverDto) {
    try {
      const caregiver = this.caregiverRepository.create(createCaregiverDto);
      await this.caregiverRepository.save(caregiver);

      return { message: `Caregiver created successfully`, caregiver };

    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    const offset = (page - 1) * limit;

    const caregivers = await this.caregiverRepository.find({
      take: limit,
      skip: offset
    });

    return caregivers;
  }

  async findOne(id: string) {
    const caregiver = await this.caregiverRepository.findOne({ where: { id } });
    if (!caregiver) {
      throw new NotFoundException(`Caregiver with id ${id} not found`);
    }

    return caregiver;
  }

  async update(id: string, updateCaregiverDto: UpdateCaregiverDto) {
    emptyDtoException(updateCaregiverDto);

    const caregiver = await this.findOne(id);
    const newCaregiver = {
      ...caregiver,
      ...updateCaregiverDto
    }

    await this.caregiverRepository.save(newCaregiver);

    return { message: `Caregiver updated successfully`, newCaregiver };
  }

  async remove(id: string) {
    const caregiver = await this.findOne(id);
    await this.caregiverRepository.remove(caregiver);

    return { message: `Caregiver with ID ${id} deleted successfully` };
  }
}
