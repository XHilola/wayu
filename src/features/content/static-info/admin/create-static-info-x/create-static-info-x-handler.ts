import { CreateStaticInfoXRequest } from './create-static-info-x-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateStaticInfoXResponse } from './create-static-info-x-response';
import { plainToInstance } from 'class-transformer';
import { StaticInfo } from '../../staticInfo.entity';

@Injectable()
@CommandHandler(CreateStaticInfoXRequest)
export class CreateStaticInfoXHandler implements ICommandHandler<CreateStaticInfoXRequest> {
  async execute(req: CreateStaticInfoXRequest): Promise<CreateStaticInfoXResponse> {
    const staticInfo = await StaticInfo.findOneBy({ id: req.id });
    if (staticInfo)
      throw new NotFoundException('Static info already exists');

    const sInfo= StaticInfo.create(req)

    await StaticInfo.save(sInfo);
    return plainToInstance(CreateStaticInfoXResponse, sInfo, {
      excludeExtraneousValues: true,
    });
  }
}
