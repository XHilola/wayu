import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { LoginCommand } from './login-command';
import { LoginResponse } from './login-response';
import { Auth } from '../user.entity';
import { RolesEnum } from '../../../core/enums/roles.enum';
import argon2 from 'argon2';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(private readonly jwtService: JwtService) {}

  async execute(cmd: LoginCommand): Promise<LoginResponse> {
    const user = await Auth.findOneBy({ login: cmd.login });
    if (!user)
      throw new BadRequestException('Invalid credentials');

    if (user.role === RolesEnum.user)
      throw new UnauthorizedException('Access denied');

    if (!user.password)
      throw new BadRequestException('Invalid credentials');

    const isMatch = await argon2.verify(user.password,cmd.password);
    if (!isMatch)
      throw new UnauthorizedException('Invalid credentials');

    if (!user.isActive)
      throw new UnauthorizedException('Account is not active');

    const payload = { id: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return plainToInstance(LoginResponse,  accessToken , { excludeExtraneousValues: true });
  }
}