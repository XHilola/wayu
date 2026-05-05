import { Command } from '@nestjs/cqrs';
import { CreateAdminResponse } from './create-admin-response';
import { loginType } from '../../../../core/enums/loginType.enum';
import { RolesEnum } from '../../../../core/enums/roles.enum';

export class CreateAdminCommand extends Command<CreateAdminResponse> {
  constructor(
    public fullName: string,
    public login: string,
    public password: string,
    public loginType: loginType,
    public role: RolesEnum,
    public birthDate?: Date,
  ) { super(); }
}