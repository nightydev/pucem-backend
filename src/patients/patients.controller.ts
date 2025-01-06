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
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
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

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Create a patient' })
  @ApiBody({ type: CreatePatientDto })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Obtain all patients' })
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
    return this.patientsService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Obtain one patient' })
  @ApiParam({
    name: 'id',
    description: 'The id of the patient to obtain',
    type: String,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.patientsService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Update a patient' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Patient ID to be updated (UUID)',
  })
  @ApiBody({ type: UpdatePatientDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Remove a patient' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Patient ID to be removed (UUID)',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.patientsService.remove(id);
  }
}
