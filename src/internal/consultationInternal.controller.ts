import { 
    Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe 
  } from '@nestjs/common';
  import { ConsultationInternalService } from './consultationInternal.service';
  import { CreateConsultationInternalDto } from './dto/create-consultation-internal.dto';
  import { UpdateConsultationInternalDto } from './dto/update-consultation-internal.dto';
  import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Consultations Internal')
  @Controller('consultations-internal')
  export class ConsultationInternalController {
    constructor(private readonly consultationInternalService: ConsultationInternalService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear una consulta interna' })
    @ApiBody({ type: CreateConsultationInternalDto })
    create(@Body() createConsultationInternalDto: CreateConsultationInternalDto) {
      return this.consultationInternalService.create(createConsultationInternalDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Obtener todas las consultas internas' })
    findAll() {
      return this.consultationInternalService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obtener una consulta interna por ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID de la consulta interna' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
      return this.consultationInternalService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una consulta interna' })
    @ApiParam({ name: 'id', type: String, description: 'ID de la consulta interna a actualizar' })
    @ApiBody({ type: UpdateConsultationInternalDto })
    update(
      @Param('id', ParseUUIDPipe) id: string, 
      @Body() updateConsultationInternalDto: UpdateConsultationInternalDto
    ) {
      return this.consultationInternalService.update(id, updateConsultationInternalDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una consulta interna' })
    @ApiParam({ name: 'id', type: String, description: 'ID de la consulta interna a eliminar' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
      return this.consultationInternalService.remove(id);
    }
  
    @Get('user/:userId')
    @ApiOperation({ summary: 'Obtener todas las consultas internas de un usuario específico' })
    @ApiParam({ name: 'userId', type: String, description: 'ID del usuario' })
    findAllByUser(@Param('userId', ParseUUIDPipe) userId: string) {
      return this.consultationInternalService.findAllByUser(userId);
    }
  }
  