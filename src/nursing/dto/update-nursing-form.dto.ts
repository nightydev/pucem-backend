import { PartialType } from '@nestjs/mapped-types';
import { CreateNursingFormDto } from './create-nursing-form.dto';

export class UpdateNursingFormDto extends PartialType(CreateNursingFormDto) {}
