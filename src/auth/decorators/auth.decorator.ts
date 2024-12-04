import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from 'src/users/entities/user.entity';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';

export function Auth(role: Role) {
  return applyDecorators(
    RoleProtected(role),
    UseGuards(AuthGuard(), UserRoleGuard)
  );
}
