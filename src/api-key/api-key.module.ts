import { Module } from '@nestjs/common';
import { ApiKeyService } from '@/api-key/api-key.service';
import { ApiKeyController } from '@/api-key/api-key.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ApiKeyService],
  controllers: [ApiKeyController],
})
export class ApiKeyModule {}
