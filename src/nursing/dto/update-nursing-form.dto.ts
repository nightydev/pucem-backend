import { PartialType } from '@nestjs/mapped-types';
import { CreateNursingFormDto } from './create-nursing-form.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateNursingFormDto extends PartialType(CreateNursingFormDto) {
  @ApiProperty({
    description: 'ID del formulario de enfermería a actualizar',
    example: '9e97b908-d029-11ed-afa1-0242ac120002',
  })
  @IsUUID()
  id: string;
}
