import { UpdateStaticInfoRequest } from './update-static-info-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateStaticInfoResponse } from './update-static-info-response';
import { plainToInstance } from 'class-transformer';
import { StaticInfo } from '../../staticInfo.entity';

@Injectable()
@CommandHandler(UpdateStaticInfoRequest)
export class UpdateStaticInfoHandler implements ICommandHandler<UpdateStaticInfoRequest> {
  async execute(req: UpdateStaticInfoRequest): Promise<UpdateStaticInfoResponse> {
    const staticInfo = await StaticInfo.findOneBy({ id: req.id });
    if (!staticInfo) throw new NotFoundException('Static info not found');

    if (req.appStoreLink   !== undefined) staticInfo.appStoreLink   = req.appStoreLink;
    if (req.playMarketLink !== undefined) staticInfo.playMarketLink = req.playMarketLink;
    if (req.aboutUs        !== undefined) staticInfo.aboutUs        = req.aboutUs;

    await StaticInfo.save(staticInfo);
    return plainToInstance(UpdateStaticInfoResponse, staticInfo, { excludeExtraneousValues: true });
  }
}
