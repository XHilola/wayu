import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleKey } from '../decors/roles.decorator';
import { RolesEnum } from '../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(RoleKey, [context.getHandler(), context.getClass()]);
        if (!requiredRoles)
            return true;

        const {user} = context.switchToHttp().getRequest();
        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenException('Access denied');
        }

        return true;
    }
}