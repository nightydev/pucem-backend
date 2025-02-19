import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { NursingService } from './nursing.service';
import { CreateNursingFormDto } from './dto/create-nursing-form.dto';
import { UpdateNursingFormDto } from './dto/update-nursing-form.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('nursing')
export class NursingController {
  constructor(private readonly nursingService: NursingService) { }

  @Post()
  create(@Body() createNursingFormDto: CreateNursingFormDto) {
    return this.nursingService.create(createNursingFormDto);
  }

  @Get()
  findAll() {
    return this.nursingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
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
  @ApiOperation({ summary: 'Obtener todos los formularios de enfermería de un usuario específico' })
  @ApiParam({ name: 'userId', type: String, description: 'ID del usuario' })
  findAllByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.nursingService.findAllByUser(userId);
  }
}
