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
import { LaboratoryRequestService } from './laboratory-request.service';
import { CreateLaboratoryRequestDto } from './dto/create-laboratory-request.dto';
import { UpdateLaboratoryRequestDto } from './dto/update-laboratory-request.dto';
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

@ApiTags('Laboratory Requests')
@Controller('laboratory-request')
export class LaboratoryRequestController {
  constructor(
    private readonly laboratoryRequestService: LaboratoryRequestService,
  ) { }

  @Post()
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Create a request' })
  @ApiBody({ type: CreateLaboratoryRequestDto })
  create(@Body() createLaboratoryRequestDto: CreateLaboratoryRequestDto) {
    return this.laboratoryRequestService.create(createLaboratoryRequestDto);
  }

  @Get()
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Obtain all requests' })
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
    return this.laboratoryRequestService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Obtain one request' })
  @ApiParam({
    name: 'id',
    description: 'The id of the request to obtain',
    type: String,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.laboratoryRequestService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Update a request' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Request ID to be updated (UUID)',
  })
  @ApiBody({ type: UpdateLaboratoryRequestDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLaboratoryRequestDto: UpdateLaboratoryRequestDto,
  ) {
    return this.laboratoryRequestService.update(id, updateLaboratoryRequestDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Remove a request' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Reuqest ID to be removed (UUID)',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.laboratoryRequestService.remove(id);
  }
}
