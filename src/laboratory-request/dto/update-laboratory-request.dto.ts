import { PartialType } from '@nestjs/swagger';
import { CreateLaboratoryRequestDto } from './create-laboratory-request.dto';

export class UpdateLaboratoryRequestDto extends PartialType(CreateLaboratoryRequestDto) {}
