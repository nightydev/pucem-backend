import { PartialType } from '@nestjs/swagger';
import { CreateConsultationInitialDto } from './create-consultation-initial.dto';

export class UpdateConsultationInitialDto extends PartialType(CreateConsultationInitialDto) { }
