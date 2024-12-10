import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { CaregiversService } from './caregivers.service';
import { CreateCaregiverDto } from './dto/create-caregiver.dto';
import { UpdateCaregiverDto } from './dto/update-caregiver.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/users/entities/user.entity';

@Controller('caregivers')
export class CaregiversController {
  constructor(private readonly caregiversService: CaregiversService) { }

  @Post()
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Create a caregiver' })
  @ApiBody({ type: CreateCaregiverDto })
  create(@Body() createCaregiverDto: CreateCaregiverDto) {
    return this.caregiversService.create(createCaregiverDto);
  }

  @Get()
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Obtain all caregivers' })
  @ApiQuery({
    name: 'limit',
    description: 'Number of results per page',
    required: false,
    type: Number,
    default: 10,
  })
  @ApiQuery({
    name: 'offset',
    description: 'What page do you need',
    required: false,
    type: Number,
    default: 1,
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.caregiversService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Obtain one caregiver' })
  @ApiParam({
    name: 'id',
    description: 'The id of the caregiver to obtain',
    type: String
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.caregiversService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Update a caregiver' })
  @ApiParam({ name: 'id', type: String, description: 'Caregiver ID to be updated (UUID)' })
  @ApiBody({ type: UpdateCaregiverDto })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCaregiverDto: UpdateCaregiverDto) {
    return this.caregiversService.update(id, updateCaregiverDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Remove a caregiver' })
  @ApiParam({ name: 'id', type: String, description: 'Caregiver ID to be removed (UUID)' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.caregiversService.remove(id);
  }
}
