import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CareersService } from 'src/careers/careers.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { emptyDtoException, handleDBExceptions } from 'src/common/utils';
import { TeamsService } from 'src/teams/teams.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly careerService: CareersService,
    private readonly teamsService: TeamsService
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { career, password, ...restUser } = createUserDto;
      const chosenCareer = await this.careerService.findOne(career);

      const user = this.userRepository.create({
        ...restUser,
        password: bcrypt.hashSync(password, 10),
        career: chosenCareer,
        role: Role.USER,
      });

      await this.userRepository.save(user);

      return { message: `User created successfully`, user };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    try {
      const { career, password, ...restAdmin } = createAdminDto;
      const chosenCareer = await this.careerService.findOne(career);

      const admin = this.userRepository.create({
        ...restAdmin,
        password: bcrypt.hashSync(password, 10),
        career: chosenCareer,
        role: Role.ADMIN,
      });

      await this.userRepository.save(admin);

      return { message: `Admin created successfully`, admin };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findAll(paginationDto: PaginationDto, role: Role) {
    const { limit = 10, page = 1 } = paginationDto;
    const offset = (page - 1) * limit;

    switch (role) {
      case Role.USER:
        const [users, totalUsers] = await this.userRepository.findAndCount({
          select: ['id', 'document', 'name', 'lastName', 'email', 'address'],
          where: { role: Role.USER, isActive: true },
          take: limit,
          skip: offset,
          relations: {
            career: true,
            team: true,
          },
        });
        return { users, total: totalUsers };

      case Role.ADMIN:
        const [admins, totalAdmins] = await this.userRepository.findAndCount({
          select: ['id', 'document', 'name', 'lastName', 'email'],
          where: { role: Role.ADMIN, isActive: true },
          take: limit,
          skip: offset,
          relations: {
            career: true,
          },
        });
        return { admins, total: totalAdmins };

      default:
        throw new BadRequestException('Invalid role');
    }
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['career'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string) {
    emptyDtoException(updateUserDto);

    const { career, password, team, ...restUser } = updateUserDto;

    const user = await this.findOne(id);

    const newTeam = await this.teamsService.findOne(team);

    let newUser: any;
    if (career) {
      const newCareer = await this.careerService.findOne(career);
      newUser = {
        ...user,
        ...restUser,
        career: newCareer,
        team: newTeam
      };
    } else {
      newUser = {
        ...user,
        ...restUser,
      };
    }

    if (password) {
      newUser.password = bcrypt.hashSync(password, 10);
    }

    await this.userRepository.save(newUser);

    delete newUser.password;
    delete newUser.resetPasswordToken;

    return { message: `User updated successfully`, newUser };
  }

  async updateAdmin(updateAdminDto: UpdateAdminDto, id: string) {
    emptyDtoException(updateAdminDto);

    const { career, password, ...restAdmin } = updateAdminDto;

    const admin = await this.findOne(id);
    let newAdmin: any;
    if (career) {
      const newCareer = await this.careerService.findOne(career);
      newAdmin = {
        ...admin,
        ...restAdmin,
        career: newCareer,
      };
    } else {
      newAdmin = {
        ...admin,
        ...restAdmin,
      };
    }

    if (password) {
      newAdmin.password = bcrypt.hashSync(password, 10);
    }

    await this.userRepository.save(newAdmin);

    delete newAdmin.password;
    delete newAdmin.resetPasswordToken;
    delete newAdmin.address;
    delete newAdmin.role;
    delete newAdmin.team;

    return { message: `Admin updated successfully`, newAdmin };
  }

  async softDelete(id: string) {
    await this.userRepository.update(id, {
      isActive: false,
    });

    return { message: `User with ID ${id} soft deleted` };
  }
}
