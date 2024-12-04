import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';
import { Role } from 'src/users/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const rol: Role = this.reflector.get(META_ROLES, context.getHandler())

    if (!rol) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new BadRequestException('User not found')
    }

    if (rol === user.role) {
      return true;
    }


    throw new ForbiddenException(`User ${user.fullName} need a valid role: [${rol}]`);
  }
}
