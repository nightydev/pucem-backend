import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Neurológica Test')
@Controller('neurologica-test')
export class NeurologicaTestController {
  @Get()
  @ApiOperation({ summary: 'Test endpoint' })
  test() {
    return { message: 'Neurológica module is working!' };
  }
}
