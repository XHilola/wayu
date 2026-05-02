import { CreateStaticInfoRequest } from './create-static-info-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateStaticInfoResponse } from './create-static-info-response';
import { plainToInstance } from 'class-transformer';
import { StaticInfo } from '../../staticInfo.entity';

@Injectable()
@CommandHandler(CreateStaticInfoRequest)
export class CreateStaticInfoHandler implements ICommandHandler<CreateStaticInfoRequest> {
  async execute(req: CreateStaticInfoRequest): Promise<CreateStaticInfoResponse> {
    const staticInfo = await StaticInfo.findOneBy({ id: req.id });
    if (staticInfo)
      throw new NotFoundException('Static info already exists');

    const sInfo= StaticInfo.create(req)

    await StaticInfo.save(sInfo);
    return plainToInstance(CreateStaticInfoResponse, sInfo, {
      excludeExtraneousValues: true,
    });
  }
}
