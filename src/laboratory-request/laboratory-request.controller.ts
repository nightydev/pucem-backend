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
  Res,
  Logger,
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
import { Response } from 'express';
import { PdfService } from '../common/services/pdf.service';

@ApiTags('Laboratory Requests')
@Controller('laboratory-request')
export class LaboratoryRequestController {
  private readonly logger = new Logger(LaboratoryRequestController.name);

  constructor(
    private readonly laboratoryRequestService: LaboratoryRequestService,
    private readonly pdfService: PdfService,
  ) {}

  @Get('download')
  @ApiOperation({ summary: 'Download all laboratory requests as PDF' })
  async downloadRequests(@Res() res: Response) {
    try {
      this.logger.log('Iniciando descarga de solicitudes de laboratorio');
      const { requests } = await this.laboratoryRequestService.findAll({
        limit: 1000,
        page: 1,
      });
      this.logger.log(`Encontradas ${requests.length} solicitudes`);

      const buffer = await this.pdfService.generatePdf(
        requests,
        'Solicitudes de Laboratorio',
      );
      this.logger.log('PDF generado correctamente');

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=laboratory-requests.pdf',
      });

      res.send(buffer);
    } catch (error) {
      this.logger.error('Error al generar PDF:', error);
      res.status(500).json({
        message: 'Error al generar PDF',
        error: error.message,
      });
    }
  }

// laboratory-request.controller.ts
@Get('download/:id')
@ApiOperation({ summary: 'Download one lab request as PDF' })
async downloadOneRequest(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
  const one = await this.laboratoryRequestService.findOne(id);
  const buffer = await this.pdfService.generatePdf([one], 'Solicitud de Laboratorio');
  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename=laboratorio-${id}.pdf`,
  });
  return res.send(buffer);
}


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

  @Get('user/:userId')
  @Auth(Role.USER)
  @ApiOperation({
    summary:
      'Obtener todas las solicitudes de laboratorio de un usuario específico',
  })
  @ApiParam({ name: 'userId', type: String, description: 'ID del usuario' })
  findAllByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.laboratoryRequestService.findAllByUser(userId);
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
