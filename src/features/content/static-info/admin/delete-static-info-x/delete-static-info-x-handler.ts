import { DeleteStaticInfoXRequest } from './delete-static-info-x-request';
import { StaticInfo } from '../../staticInfo.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(DeleteStaticInfoXRequest)
export class DeleteStaticInfoXHandler implements ICommandHandler<DeleteStaticInfoXRequest> {
  async execute(req: DeleteStaticInfoXRequest): Promise<void> {
    const staticInfo = await StaticInfo.findOneBy({ id: req.id });
    if (!staticInfo)
      throw new NotFoundException('Static info not found');

    await StaticInfo.remove(staticInfo);

  }
}