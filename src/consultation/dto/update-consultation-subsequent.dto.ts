import { PartialType } from '@nestjs/swagger';
import { CreateConsultationSubsequentDto } from './create-consultation-subsequent.dto';

export class UpdateConsultationSubsequentDto extends PartialType(CreateConsultationSubsequentDto) { }
