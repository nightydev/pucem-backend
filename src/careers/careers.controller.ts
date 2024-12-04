import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CareersService } from './careers.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) { }

  @Post()
  @ApiOperation({ summary: 'Create a career' })
  @ApiBody({ type: CreateCareerDto })
  create(@Body() createCareerDto: CreateCareerDto) {
    return this.careersService.create(createCareerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtain all careers' })
  findAll() {
    return this.careersService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a career' })
  @ApiParam({ name: 'id', type: String, description: 'Career ID to be updated (UUID)' })
  @ApiBody({ type: UpdateCareerDto })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCareerDto: UpdateCareerDto) {
    return this.careersService.update(id, updateCareerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a career' })
  @ApiParam({ name: 'id', type: String, description: 'Career ID to be removed (UUID)' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.careersService.remove(id);
  }
}
