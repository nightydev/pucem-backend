import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { handleDBExceptions, emptyDtoException } from 'src/common/utils';

@Injectable()
export class GroupsService {
  private readonly logger = new Logger(GroupsService.name);

  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    try {
      const group = this.groupRepository.create(createGroupDto);
      await this.groupRepository.save(group);
      return { message: 'Group created successfully', group };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    const offset = (page - 1) * limit;

    const [groups, total] = await this.groupRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return { groups, total };
  }

  async findOne(id: string) {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }
    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    emptyDtoException(updateGroupDto);

    const group = await this.findOne(id);
    const updatedGroup = { ...group, ...updateGroupDto };

    await this.groupRepository.save(updatedGroup);
    return { message: 'Group updated successfully', updatedGroup };
  }

  async remove(id: string) {
    const group = await this.findOne(id);
    await this.groupRepository.remove(group);
    return { message: `Group with ID ${id} deleted successfully` };
  }
}
