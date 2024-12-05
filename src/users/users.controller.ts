import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Role } from './entities/user.entity';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('user')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateUserDto })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('admin')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Create a admin' })
  @ApiBody({ type: CreateAdminDto })
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.usersService.createAdmin(createAdminDto);
  }

  @Get('role/:role')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Obtain all users/careers' })
  @ApiParam({
    name: 'role',
    description: 'The role of the user to filter by (user/admin)',
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
  findAll(
    @Query() paginationDto: PaginationDto,
    @Param('role') role: Role
  ) {
    return this.usersService.findAll(paginationDto, role)
  }

  @Patch('user/:id')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', type: String, description: 'User ID to be updated (UUID)' })
  @ApiBody({ type: UpdateUserDto })
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.usersService.updateUser(updateUserDto, id);
  }

  @Patch('admin/:id')
  @Auth(Role.ADMIN)
  @ApiOperation({ summary: 'Update a admin' })
  @ApiParam({ name: 'id', type: String, description: 'Admin ID to be updated (UUID)' })
  @ApiBody({ type: UpdateAdminDto })
  updateAdmin(
    @Body() updateAdminDto: UpdateAdminDto,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.usersService.updateAdmin(updateAdminDto, id);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a user/admin' })
  @ApiParam({ name: 'id', type: String, description: 'User/admin ID to be soft deleted (UUID)' })
  async softDelete(@Param('id') id: string) {
    return this.usersService.softDelete(id);
  }

}
