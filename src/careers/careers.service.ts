import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Career } from './entities/career.entity';
import { Repository } from 'typeorm';

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

      return career;

    } catch (error) {
      this.handleDBExceptions(error);
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
    if (!updateCareerDto || Object.keys(updateCareerDto).length === 0) {
      throw new BadRequestException('Send data to update');
    }

    const { careerName } = updateCareerDto;
    const career = await this.findOne(id);

    career.careerName = careerName;

    return this.careerRepository.save(career);
  }

  async remove(id: string) {
    const career = await this.findOne(id);
    await this.careerRepository.remove(career);

    return { message: `Career with id ${id} deleted successfully` };
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
