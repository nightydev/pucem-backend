import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultationInternalDto } from './create-consultation-internal.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateConsultationInternalDto extends PartialType(CreateConsultationInternalDto) {

  @ApiProperty({ description: `ID de la Interconsulta a actualizar`, example: '9e97b908-d029-11ed-afa1-0242ac120002' })
  @IsUUID()
  id: string;
}
