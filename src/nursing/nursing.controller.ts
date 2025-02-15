import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { NursingService } from './nursing.service';
import { CreateNursingFormDto } from './dto/create-nursing-form.dto';
import { UpdateNursingFormDto } from './dto/update-nursing-form.dto';

@Controller('nursing')
export class NursingController {
  constructor(private readonly nursingService: NursingService) {}

  @Post()
  create(@Body() createNursingFormDto: CreateNursingFormDto) {
    return this.nursingService.create(createNursingFormDto);
  }

  @Get()
  findAll() {
    return this.nursingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nursingService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateNursingFormDto: UpdateNursingFormDto,
  ) {
    return this.nursingService.update(id, updateNursingFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nursingService.remove(id);
  }
}
