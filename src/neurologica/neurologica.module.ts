import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NeurologicaService } from './neurologica.service';
import { NeurologicaController } from './neurologica.controller';
import { NeurologicaTestController } from './neurologica-test.controller';
import { Neurologica } from './entities/neurologica.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [NeurologicaController, NeurologicaTestController],
  providers: [NeurologicaService],
  imports: [
    TypeOrmModule.forFeature([Neurologica]),
    AuthModule,
  ],
  exports: [NeurologicaService],
})
export class NeurologicaModule {}
