import { DeleteStaticInfoRequest } from './delete-static-info-request';
import { StaticInfo } from '../../staticInfo.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(DeleteStaticInfoRequest)
export class DeleteStaticInfoHandler implements ICommandHandler<DeleteStaticInfoRequest> {
  async execute(req: DeleteStaticInfoRequest): Promise<void> {
    const staticInfo = await StaticInfo.findOneBy({ id: req.id });
    if (!staticInfo)
      throw new NotFoundException('Static info not found');

    await StaticInfo.remove(staticInfo);

  }
}