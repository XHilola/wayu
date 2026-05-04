import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { Representatives } from '../../representatives.entity';
import { UpdateRepresentativesXCommand } from './update-representatives-x-command';
import { UpdateRepresentativesXResponse } from './update-representatives-x-response';

@CommandHandler(UpdateRepresentativesXCommand)
export class UpdateRepresentativesXHandler implements ICommandHandler<UpdateRepresentativesXCommand> {
  async execute(cmd: UpdateRepresentativesXCommand): Promise<UpdateRepresentativesXResponse> {
    const representative = await Representatives.findOneBy({ id: cmd.id });
    if (!representative) throw new NotFoundException('Representative not found');
    if (cmd.fullName)    representative.fullName    = cmd.fullName;
    if (cmd.email)       representative.email       = cmd.email;
    if (cmd.phoneNumber) representative.phoneNumber = cmd.phoneNumber;
    if (cmd.resume)      representative.resume      = cmd.resume;
    if (cmd.image) {
      if (representative.image && fs.existsSync(representative.image))
        fs.rmSync(representative.image);
      representative.image = cmd.image.path;
    }
    await Representatives.save(representative);
    return plainToInstance(UpdateRepresentativesXResponse, representative, { excludeExtraneousValues: true });
  }
}