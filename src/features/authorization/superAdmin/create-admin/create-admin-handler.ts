import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { CreateAdminCommand } from './create-admin-command';
import { CreateAdminResponse } from './create-admin-response';
import argon2 from 'argon2';
import { Auth } from '../../user.entity';

@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler implements ICommandHandler<CreateAdminCommand> {
  async execute(cmd: CreateAdminCommand): Promise<CreateAdminResponse> {
    const exists = await Auth.findOneBy({ login: cmd.login });
    if (exists) throw new BadRequestException('Login already taken');

    const password = await argon2.hash(cmd.password);
    const admin = Auth.create({
      fullName: cmd.fullName,
      login: cmd.login,
      password,
      loginType: cmd.loginType,
      role: cmd.role,
      birthDate: cmd.birthDate,
      isActive: true,
    });

    await Auth.save(admin);
    return plainToInstance(CreateAdminResponse, admin, { excludeExtraneousValues: true });
  }
}