import { PartialType } from '@nestjs/swagger';
import { CreateNeurologicaDto } from './create-neurologica.dto';

export class UpdateNeurologicaDto extends PartialType(CreateNeurologicaDto) {}
