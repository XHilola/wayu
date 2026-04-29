import { GetOneStaticInfoRequest } from './get-one-static-info-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneStaticInfoResponse } from './get-one-static-info-response';
import { plainToInstance } from 'class-transformer';
import { StaticInfo } from '../../staticInfo.entity';

@Injectable()
@QueryHandler(GetOneStaticInfoRequest)
export class GetOneStaticInfoHandler implements IQueryHandler<GetOneStaticInfoRequest> {
  async execute(req: GetOneStaticInfoRequest): Promise<GetOneStaticInfoResponse> {
    const staticInfo = await StaticInfo.findOneBy({ id: req.id });
    if (!staticInfo) throw new NotFoundException('Static info not found');
    return plainToInstance(GetOneStaticInfoResponse, staticInfo, { excludeExtraneousValues: true });
  }
}
