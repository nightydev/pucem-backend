import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/users/entities/user.entity';

export const META_ROLES = 'role'

export const RoleProtected = (role: Role) => {

  return SetMetadata(META_ROLES, role);

};
