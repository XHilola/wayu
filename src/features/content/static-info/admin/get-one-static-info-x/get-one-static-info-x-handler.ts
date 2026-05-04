import { GetOneStaticInfoXRequest } from './get-one-static-info-x-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneStaticInfoXResponse } from './get-one-static-info-x-response';
import { plainToInstance } from 'class-transformer';
import { StaticInfo } from '../../staticInfo.entity';

@Injectable()
@QueryHandler(GetOneStaticInfoXRequest)
export class GetOneStaticInfoXHandler implements IQueryHandler<GetOneStaticInfoXRequest> {
  async execute(req: GetOneStaticInfoXRequest): Promise<GetOneStaticInfoXResponse> {
    const staticInfo = await StaticInfo.findOneBy({ id: req.id });
    if (!staticInfo) throw new NotFoundException('Static info not found');
    return plainToInstance(GetOneStaticInfoXResponse, staticInfo, { excludeExtraneousValues: true });
  }
}
