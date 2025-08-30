import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiKeyService } from '@/api-key/api-key.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate a new API Key for Body Map' })
  @ApiResponse({
    status: 201,
    description: 'API Key generated successfully.',
  })
  async generateApiKey(): Promise<{ message: string; token: string }> {
    return await this.apiKeyService.generateApiKey();
  }
}
