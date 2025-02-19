import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { CreateConsultationInitialDto } from './dto/create-consultation-initial.dto';
import { CreateConsultationSubsequentDto } from './dto/create-consultation-subsequent.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/entities/role.entity';

@Controller('consultations')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) { }

  @Post('initial')
  @ApiOperation({ summary: 'Create a consultation initial' })
  @ApiBody({ type: CreateConsultationInitialDto })
  createInitial(@Body() createConsultationInitialDto: CreateConsultationInitialDto) {
    return this.consultationService.createInitial(createConsultationInitialDto);
  }

  @Post('subsequent')
  @ApiOperation({ summary: 'Create a consultation subsequent based in a initial' })
  @ApiBody({ type: CreateConsultationSubsequentDto })
  createSubsequent(@Body() createConsultationSubsequentDto: CreateConsultationSubsequentDto) {
    return this.consultationService.createSubsequent(createConsultationSubsequentDto);
  }

  @Get('lastsubsequent/:id')
  @ApiOperation({ summary: 'Obtain the last subsequent based in a initial ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the consultation initial to be searched its last subsequent one, lol so hard' })
  findLastSubsequent(@Param('id', ParseUUIDPipe) id: string) {
    return this.consultationService.findLastSubsequent(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultationService.remove(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener todas las consultas de un usuario específico' })
  @ApiParam({ name: 'userId', type: String, description: 'ID del usuario' })
  findAllByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.consultationService.findAllByUser(userId);
  }
}
