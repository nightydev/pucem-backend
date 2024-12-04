import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Role } from './entities/user.entity';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('user')
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateUserDto })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('admin')
  @ApiOperation({ summary: 'Create a admin' })
  @ApiBody({ type: CreateAdminDto })
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.usersService.createAdmin(createAdminDto);
  }

  @Get('role/:role')
  @ApiOperation({ summary: 'Obtain all users/careers' })
  @ApiParam({
    name: 'role',
    description: 'The role of the user to filter by',
    type: String
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of results per page',
    required: false,
    type: Number,
    default: 10,
  })
  @ApiQuery({
    name: 'offset',
    description: 'Number of rows to skip',
    required: false,
    type: Number,
    default: 0,
  })
  findAll(@Query() paginationDto: PaginationDto, @Param('role') role: Role) {
    return this.usersService.findAll(paginationDto, role)
  }

}
