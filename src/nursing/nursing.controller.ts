import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NursingService } from './nursing.service';
import { CreateNursingFormDto } from './dto/create-nursing-form.dto';
import { UpdateNursingFormDto } from './dto/update-nursing-form.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Nursing Forms')
@Controller('nursing-forms')
export class NursingController {
  constructor(private readonly nursingService: NursingService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un formulario de enfermería' })
  @ApiBody({ type: CreateNursingFormDto })
  create(@Body() createNursingFormDto: CreateNursingFormDto) {
    return this.nursingService.create(createNursingFormDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los formularios de enfermería' })
  findAll() {
    return this.nursingService.findAll();
  }

  @Get(':userId')
  @ApiOperation({
    summary: 'Obtener un formulario de enfermería por ID de usuario',
  })
  @ApiParam({ name: 'userId', type: String, description: 'ID del usuario' })
  findOne(@Param('userId') userId: string) {
    return this.nursingService.findOne(userId);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Actualizar un formulario de enfermería' })
  @ApiParam({ name: 'userId', type: String, description: 'ID del usuario' })
  @ApiBody({ type: UpdateNursingFormDto })
  update(
    @Param('userId') userId: string,
    @Body() updateNursingFormDto: UpdateNursingFormDto,
  ) {
    return this.nursingService.update(userId, updateNursingFormDto);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Eliminar un formulario de enfermería' })
  @ApiParam({ name: 'userId', type: String, description: 'ID del usuario' })
  remove(@Param('userId') userId: string) {
    return this.nursingService.remove(userId);
  }
}
