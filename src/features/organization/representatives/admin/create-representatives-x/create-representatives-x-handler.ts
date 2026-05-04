import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Representatives } from '../../representatives.entity';
import { CreateRepresentativesXCommand } from './create-representatives-x-command';
import { CreateRepresentativesXResponse } from './create-representatives-x-response';

@CommandHandler(CreateRepresentativesXCommand)
export class CreateRepresentativesXHandler implements ICommandHandler<CreateRepresentativesXCommand> {
  async execute(cmd: CreateRepresentativesXCommand): Promise<CreateRepresentativesXResponse> {
    const existing = await Representatives.findOneBy({ email: cmd.email });
    if (existing) throw new BadRequestException('Representative with this email already exists');
    const representative = Representatives.create({
      fullName: cmd.fullName,
      image: cmd.image.path,
      email: cmd.email,
      phoneNumber: cmd.phoneNumber,
      resume: cmd.resume,
    });
    await Representatives.save(representative);
    return plainToInstance(CreateRepresentativesXResponse, representative, { excludeExtraneousValues: true });
  }
}