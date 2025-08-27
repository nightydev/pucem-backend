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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiProduces,
} from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';

import { NeurologicaService } from './neurologica.service';
import { CreateNeurologicaDto } from './dto/create-neurologica.dto';
import { UpdateNeurologicaDto } from './dto/update-neurologica.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/users/entities/user.entity';

// ⬇️ mismo servicio de PDF que usas en otros módulos
import { PdfService } from '../common/services/pdf.service';

@ApiTags('Neurológica')
@Controller('neurologica')
export class NeurologicaController {
  private readonly logger = new Logger(NeurologicaController.name);

  constructor(
    private readonly neurologicaService: NeurologicaService,
    private readonly pdfService: PdfService, // ⬅️ inyectado
  ) {}

  @Post()
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Crear nueva evaluación neurológica' })
  @ApiResponse({ status: 201, description: 'Evaluación neurológica creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  @ApiBody({ type: CreateNeurologicaDto })
  create(@Body() dto: CreateNeurologicaDto) {
    return this.neurologicaService.create(dto);
  }

  @Get()
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Obtener todas las evaluaciones neurológicas' })
  @ApiResponse({ status: 200, description: 'Lista de evaluaciones neurológicas obtenida exitosamente.' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Límite de elementos por página', example: 10 })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.neurologicaService.findAll(paginationDto);
  }

  @Get('by-ci/:ci')
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Obtener evaluaciones neurológicas por cédula' })
  @ApiResponse({ status: 200, description: 'Evaluaciones neurológicas encontradas por cédula.' })
  @ApiParam({ name: 'ci', description: 'Cédula de identidad del paciente', example: '1234567890' })
  findByCI(@Param('ci') ci: string) {
    return this.neurologicaService.findByCI(ci);
  }

  // ⬇️ DESCARGA DE TODAS (igual patrón que Nursing/Lab/Internal)
  @Get('download')
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Download all neurologic evaluations as PDF' })
  @ApiProduces('application/pdf')
  async downloadNeurologicas(@Res() res: ExpressResponse) {
    try {
      this.logger.log('Iniciando descarga de evaluaciones neurológicas');

      const { neurologicas } = await this.neurologicaService.findAll({
        limit: 1000,
        page: 1,
      });
      this.logger.log(`Encontradas ${neurologicas.length} evaluaciones`);

      const buffer = await this.pdfService.generatePdf(
        neurologicas,
        'Evaluaciones Neurológicas',
      );
      this.logger.log('PDF generado correctamente');

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=neurologicas.pdf',
      });

      return res.send(buffer);
    } catch (error: any) {
      this.logger.error('Error al generar PDF:', error);
      return res.status(500).json({
        message: 'Error al generar PDF',
        error: error?.message ?? String(error),
      });
    }
  }

  @Get(':id')
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Obtener evaluación neurológica por ID' })
  @ApiResponse({ status: 200, description: 'Evaluación neurológica encontrada.' })
  @ApiResponse({ status: 404, description: 'Evaluación neurológica no encontrada.' })
  @ApiParam({ name: 'id', description: 'ID único de la evaluación neurológica', format: 'uuid' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.neurologicaService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Actualizar evaluación neurológica' })
  @ApiResponse({ status: 200, description: 'Evaluación neurológica actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Evaluación neurológica no encontrada.' })
  @ApiParam({ name: 'id', description: 'ID único de la evaluación neurológica', format: 'uuid' })
  @ApiBody({ type: UpdateNeurologicaDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateNeurologicaDto,
  ) {
    return this.neurologicaService.update(id, dto);
  }

  @Delete(':id')
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Eliminar evaluación neurológica' })
  @ApiResponse({ status: 200, description: 'Evaluación neurológica eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Evaluación neurológica no encontrada.' })
  @ApiParam({ name: 'id', description: 'ID único de la evaluación neurológica', format: 'uuid' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.neurologicaService.remove(id);
  }
}
