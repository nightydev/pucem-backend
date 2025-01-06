import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/users/entities/user.entity';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Create a group' })
  @ApiBody({ type: CreateGroupDto })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Obtain all groups' })
  @ApiQuery({
    name: 'limit',
    description: 'Number of results per page',
    required: false,
    type: Number,
    default: 10,
  })
  @ApiQuery({
    name: 'page',
    description: 'What page do you need',
    required: false,
    type: Number,
    default: 1,
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.groupsService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Obtain one group' })
  @ApiParam({
    name: 'id',
    description: 'The id of the group to obtain',
    type: String,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.groupsService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Update a group' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Group ID to be updated (UUID)',
  })
  @ApiBody({ type: UpdateGroupDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Remove a group' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Group ID to be removed (UUID)',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.groupsService.remove(id);
  }
}
