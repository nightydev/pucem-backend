import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Career } from './entities/career.entity';
import { Repository } from 'typeorm';
import { emptyDtoException, handleDBExceptions } from 'src/common/utils';

@Injectable()
export class CareersService {

  private readonly logger = new Logger(CareersService.name);

  constructor(
    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>
  ) { }

  async create(createCareerDto: CreateCareerDto) {
    try {
      const career = this.careerRepository.create(createCareerDto);
      await this.careerRepository.save(career);

      return { message: `Career created successfully`, career };

    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findOne(id: string) {
    const career = await this.careerRepository.findOne({ where: { id } });
    if (!career) {
      throw new NotFoundException(`Career with id ${id} not found`);
    }

    return career;
  }

  async findAll() {
    const careers = await this.careerRepository.find();

    return careers;

  }

  async update(id: string, updateCareerDto: UpdateCareerDto) {
    emptyDtoException(updateCareerDto);

    const { careerName } = updateCareerDto;
    const career = await this.findOne(id);

    career.careerName = careerName;

    await this.careerRepository.save(career);

    return { message: `Career updated successfully`, career };
  }

  async remove(id: string) {
    const career = await this.findOne(id);
    await this.careerRepository.remove(career);

    return { message: `Career with ID ${id} deleted successfully` };
  }
}
