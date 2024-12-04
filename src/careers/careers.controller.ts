import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CareersService } from './careers.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/users/entities/user.entity';

@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) { }

  @Post()
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Create a career' })
  @ApiBody({ type: CreateCareerDto })
  create(@Body() createCareerDto: CreateCareerDto) {
    return this.careersService.create(createCareerDto);
  }

  @Get()
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Obtain all careers' })
  findAll() {
    return this.careersService.findAll();
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Update a career' })
  @ApiParam({ name: 'id', type: String, description: 'Career ID to be updated (UUID)' })
  @ApiBody({ type: UpdateCareerDto })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCareerDto: UpdateCareerDto) {
    return this.careersService.update(id, updateCareerDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Remove a career' })
  @ApiParam({ name: 'id', type: String, description: 'Career ID to be removed (UUID)' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.careersService.remove(id);
  }
}
