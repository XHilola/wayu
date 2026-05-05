import { Body, Controller, Post, UseGuards, } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { LoginResponse } from './admin/login-response';
import { LoginRequest } from './admin/login-request';
import { LoginCommand } from './admin/login-command';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decors/roles.decorator';
import { CreateAdminResponse } from './superAdmin/create-admin/create-admin-response';
import { CreateAdminRequest } from './superAdmin/create-admin/create-admin-request';
import { CreateAdminCommand } from './superAdmin/create-admin/create-admin-command';
import { RolesEnum } from '../../core/enums/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('login')
  @ApiCreatedResponse({ type: LoginResponse })
  async login(@Body() payload: LoginRequest) {
    return this.commandBus.execute(new LoginCommand(payload.login, payload.password));
  }

  @Post('admin/create')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RolesEnum.superAdmin)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateAdminResponse })
  async createAdmin(@Body() payload: CreateAdminRequest) {
    return this.commandBus.execute(
      new CreateAdminCommand(payload.fullName, payload.login, payload.password, payload.loginType, payload.role, payload.birthDate)
    );
  }
}