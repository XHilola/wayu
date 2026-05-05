import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../enums/roles.enum';


export const RoleKey=process.env.ROLE_KEY;

export const Roles = (...roles: RolesEnum[]) => SetMetadata(RoleKey, roles);