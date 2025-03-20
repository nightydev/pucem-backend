import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Res,
  Logger,
} from '@nestjs/common';
import { ConsultationInternalService } from './consultationInternal.service';
import { CreateConsultationInternalDto } from './dto/create-consultation-internal.dto';
import { UpdateConsultationInternalDto } from './dto/update-consultation-internal.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PdfService } from '../common/services/pdf.service';

@ApiTags('Consultations Internal')
@Controller('consultations-internal')
export class ConsultationInternalController {
  private readonly logger = new Logger(ConsultationInternalController.name);

  constructor(
    private readonly consultationInternalService: ConsultationInternalService,
    private readonly pdfService: PdfService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una Interconsulta' })
  @ApiBody({ type: CreateConsultationInternalDto })
  create(@Body() createConsultationInternalDto: CreateConsultationInternalDto) {
    return this.consultationInternalService.create(
      createConsultationInternalDto,
    );
  }

  @Get('download')
  @ApiOperation({ summary: 'Download all internal consultations as PDF' })
  async downloadConsultations(@Res() res: Response) {
    try {
      this.logger.log('Iniciando descarga de consultas internas');
      const consultations = await this.consultationInternalService.findAll();
      this.logger.log(`Encontradas ${consultations.length} consultas`);

      const buffer = await this.pdfService.generatePdf(
        consultations,
        'Interconsulta',
      );
      this.logger.log('PDF generado correctamente');

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=internal-consultations.pdf',
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

  @Get()
  @ApiOperation({ summary: 'Obtener todas las consultas internas' })
  findAll() {
    return this.consultationInternalService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Obtener todas las consultas internas de un usuario específico',
  })
  @ApiParam({ name: 'userId', type: String, description: 'ID del usuario' })
  findAllByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.consultationInternalService.findAllByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una Interconsulta por ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID de la Interconsulta',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.consultationInternalService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una Interconsulta' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID de la Interconsulta a actualizar',
  })
  @ApiBody({ type: UpdateConsultationInternalDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateConsultationInternalDto: UpdateConsultationInternalDto,
  ) {
    return this.consultationInternalService.update(
      id,
      updateConsultationInternalDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una Interconsulta' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID de la Interconsulta a eliminar',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.consultationInternalService.remove(id);
  }
}
