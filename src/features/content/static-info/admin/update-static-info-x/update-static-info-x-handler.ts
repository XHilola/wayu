import { UpdateStaticInfoXRequest } from './update-static-info-x-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateStaticInfoXResponse } from './update-static-info-x-response';
import { plainToInstance } from 'class-transformer';
import { StaticInfo } from '../../staticInfo.entity';

@Injectable()
@CommandHandler(UpdateStaticInfoXRequest)
export class UpdateStaticInfoXHandler implements ICommandHandler<UpdateStaticInfoXRequest> {
  async execute(req: UpdateStaticInfoXRequest): Promise<UpdateStaticInfoXResponse> {
    const staticInfo = await StaticInfo.findOneBy({ id: req.id });
    if (!staticInfo) throw new NotFoundException('Static info not found');

    if (req.appStoreLink   !== undefined) staticInfo.appStoreLink   = req.appStoreLink;
    if (req.playMarketLink !== undefined) staticInfo.playMarketLink = req.playMarketLink;
    if (req.aboutUs        !== undefined) staticInfo.aboutUs        = req.aboutUs;

    await StaticInfo.save(staticInfo);
    return plainToInstance(UpdateStaticInfoXResponse, staticInfo, { excludeExtraneousValues: true });
  }
}
