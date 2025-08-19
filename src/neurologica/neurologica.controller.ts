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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { NeurologicaService } from './neurologica.service';
import { CreateNeurologicaDto } from './dto/create-neurologica.dto';
import { UpdateNeurologicaDto } from './dto/update-neurologica.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/users/entities/user.entity';

@ApiTags('Neurológica')
@Controller('neurologica')
export class NeurologicaController {
  constructor(private readonly neurologicaService: NeurologicaService) {}

  @Post()
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Crear nueva evaluación neurológica' })
  @ApiResponse({ 
    status: 201, 
    description: 'Evaluación neurológica creada exitosamente.' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de entrada inválidos.' 
  })
  @ApiBody({ type: CreateNeurologicaDto })
  create(@Body() createNeurologicaDto: CreateNeurologicaDto) {
    return this.neurologicaService.create(createNeurologicaDto);
  }

  @Get()
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Obtener todas las evaluaciones neurológicas' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de evaluaciones neurológicas obtenida exitosamente.' 
  })
  @ApiQuery({ 
    name: 'page', 
    required: false, 
    description: 'Número de página',
    example: 1 
  })
  @ApiQuery({ 
    name: 'limit', 
    required: false, 
    description: 'Límite de elementos por página',
    example: 10 
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.neurologicaService.findAll(paginationDto);
  }

  @Get('by-ci/:ci')
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Obtener evaluaciones neurológicas por cédula' })
  @ApiResponse({ 
    status: 200, 
    description: 'Evaluaciones neurológicas encontradas por cédula.' 
  })
  @ApiParam({ 
    name: 'ci', 
    description: 'Cédula de identidad del paciente',
    example: '1234567890' 
  })
  findByCI(@Param('ci') ci: string) {
    return this.neurologicaService.findByCI(ci);
  }

  @Get(':id')
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Obtener evaluación neurológica por ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Evaluación neurológica encontrada.' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Evaluación neurológica no encontrada.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único de la evaluación neurológica',
    format: 'uuid' 
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.neurologicaService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Actualizar evaluación neurológica' })
  @ApiResponse({ 
    status: 200, 
    description: 'Evaluación neurológica actualizada exitosamente.' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Evaluación neurológica no encontrada.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único de la evaluación neurológica',
    format: 'uuid' 
  })
  @ApiBody({ type: UpdateNeurologicaDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNeurologicaDto: UpdateNeurologicaDto,
  ) {
    return this.neurologicaService.update(id, updateNeurologicaDto);
  }

  @Delete(':id')
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Eliminar evaluación neurológica' })
  @ApiResponse({ 
    status: 200, 
    description: 'Evaluación neurológica eliminada exitosamente.' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Evaluación neurológica no encontrada.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único de la evaluación neurológica',
    format: 'uuid' 
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.neurologicaService.remove(id);
  }

  @Get('download')
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Descargar PDF de evaluación neurológica' })
  @ApiResponse({ 
    status: 200, 
    description: 'PDF generado exitosamente.' 
  })
  async downloadPDF() {
    // TODO: Implementar generación de PDF
    return { message: 'Funcionalidad de PDF en desarrollo' };
  }
}
