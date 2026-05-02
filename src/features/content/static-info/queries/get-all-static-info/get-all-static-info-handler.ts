import { GetAllStaticInfoRequest } from './get-all-static-info-request';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { SocialLinks } from '../../../social-links/socialLinks.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllStaticInfoResponse } from './get-all-static-info-response';


@Injectable()
@QueryHandler(GetAllStaticInfoRequest)
export class GetAllStaticInfoHandler implements IQueryHandler<GetAllStaticInfoRequest> {
  async execute(): Promise<GetAllStaticInfoResponse[]> {
    const staticInfo = await SocialLinks.find();
    return plainToInstance(GetAllStaticInfoResponse, staticInfo, {
      excludeExtraneousValues: true,
    });
  }
}
