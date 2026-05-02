import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import fs from 'fs';
import { Representatives } from '../../representatives.entity';
import { DeleteRepresentativesRequest } from './delete-representatives-request';

@CommandHandler(DeleteRepresentativesRequest)
export class DeleteRepresentativesHandler implements ICommandHandler<DeleteRepresentativesRequest> {
  async execute(cmd: DeleteRepresentativesRequest): Promise<void> {
    const representative = await Representatives.findOneBy({ id: cmd.id });
    if (!representative) throw new NotFoundException('Representative not found');
    if (representative.image && fs.existsSync(representative.image))
      fs.rmSync(representative.image);
    await Representatives.remove(representative);
  }
}