import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Representatives } from '../../representatives.entity';
import { CreateRepresentativesCommand } from './create-representatives-command';
import { CreateRepresentativesResponse } from './create-representatives-response';

@CommandHandler(CreateRepresentativesCommand)
export class CreateRepresentativesHandler implements ICommandHandler<CreateRepresentativesCommand> {
  async execute(cmd: CreateRepresentativesCommand): Promise<CreateRepresentativesResponse> {
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
    return plainToInstance(CreateRepresentativesResponse, representative, { excludeExtraneousValues: true });
  }
}