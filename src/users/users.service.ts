import * as bcrypt from 'bcrypt'
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CareersService } from 'src/careers/careers.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { arrayMaxSize } from 'class-validator';

@Injectable()
export class UsersService {

  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly careerService: CareersService
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { career, password, ...restUser } = createUserDto;
      const chosenCareer = await this.careerService.findOne(career);

      const user = this.userRepository.create({
        ...restUser,
        password: bcrypt.hashSync(password, 10),
        career: chosenCareer,
        role: Role.USER
      });

      await this.userRepository.save(user);

      return { message: `User created successfully` };

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    try {
      const { password, ...restAdmin } = createAdminDto;
      const admin = this.userRepository.create({
        ...restAdmin,
        password: bcrypt.hashSync(password, 10),
        role: Role.ADMIN
      });

      await this.userRepository.save(admin);

      return { message: `Admin created successfully` };

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto, role: Role) {
    const { limit = 10, offset = 0 } = paginationDto;

    switch (role) {
      case Role.USER:
        const users = await this.userRepository.find({
          select: ['id', 'document', 'fullName', 'email', 'address'],
          where: { role: Role.USER, isActive: true },
          take: limit,
          skip: offset,
          relations: {
            career: true,
            team: true
          }
        });
        return users;

      case Role.ADMIN:
        const admins = await this.userRepository.find({
          select: ['id', 'document', 'fullName', 'email'],
          where: { role: Role.ADMIN, isActive: true },
          take: limit,
          skip: offset,
        });
        return admins;

      default:
        throw new BadRequestException('Invalid role')
    }
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['career'] });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string) {
    this.emptyDtoException(updateUserDto);

    const { career, ...restUser } = updateUserDto;
    const user = await this.findOne(id);

    if (career) {
      const newCareer = await this.careerService.findOne(career);
      const newUser = {
        ...user,
        ...restUser,
        career: newCareer
      };

      return await this.userRepository.save(newUser);
    }

  }

  async updateAdmin(updateAdminDto: UpdateAdminDto, id: string) {
    this.emptyDtoException(updateAdminDto);

    const admin = await this.findOne(id);
    const newAdmin = {
      ...admin,
      ...updateAdminDto
    };

    return await this.userRepository.save(newAdmin);
  }

  async softDelete(id: string) {
    await this.userRepository.update(id, {
      isActive: false
    });

    return { message: `User soft deleted` };
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

  private emptyDtoException(dto: any) {
    if (!dto || Object.keys(dto).length === 0) {
      throw new BadRequestException('Send data to update');
    }
  }
}
