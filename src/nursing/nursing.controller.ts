import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseUUIDPipe,
  Res,
  Version,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { NursingService } from './nursing.service';
import { CreateNursingFormDto } from './dto/create-nursing-form.dto';
import { UpdateNursingFormDto } from './dto/update-nursing-form.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { PdfService } from '../common/services/pdf.service';

@Controller('nursing')
export class NursingController {
  [x: string]: any;
  private readonly logger = new Logger(NursingController.name);

  constructor(
    private readonly nursingService: NursingService,
    private readonly pdfService: PdfService,
  ) {}

  @Post()
  create(@Body() createNursingFormDto: CreateNursingFormDto) {
    return this.nursingService.create(createNursingFormDto);
  }

  @Get()
  findAll() {
    return this.nursingService.findAll();
  }

  @Get('download')
  @Version('1')
  @ApiOperation({ summary: 'Download all nursing forms as PDF' })
  async downloadForms(@Res() res: Response) {
    try {
      this.logger.log('Iniciando descarga de formularios de enfermería');
      const forms = await this.nursingService.findAll();
      this.logger.log(`Encontrados ${forms.length} formularios`);

      const buffer = await this.pdfService.generatePdf(
        forms,
        'Formularios de Enfermería',
      );
      this.logger.log('PDF generado correctamente');

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=nursing-forms.pdf',
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

// nursing.controller.ts
@Get('download/:id')
@Version('1')
@ApiOperation({ summary: 'Download one nursing form as PDF' })
async downloadOneForm(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
  const form = await this.nursingService.findOne(id);
  const buffer = await this.pdfService.generatePdf([form], 'Formulario de Enfermería');

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename=nursing-${id}.pdf`,
  });
  return res.send(buffer);
}


  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.nursingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNursingFormDto: UpdateNursingFormDto,
  ) {
    return this.nursingService.update(id, updateNursingFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nursingService.remove(id);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary:
      'Obtener todos los formularios de enfermería de un usuario específico',
  })
  @ApiParam({ name: 'userId', type: String, description: 'ID del usuario' })
  findAllByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.nursingService.findAllByUser(userId);
  }
}
