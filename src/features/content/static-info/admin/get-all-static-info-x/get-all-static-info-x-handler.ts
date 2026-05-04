import { GetAllStaticInfoXRequest } from './get-all-static-info-x-request';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { SocialLinks } from '../../../social-links/socialLinks.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllStaticInfoXResponse } from './get-all-static-info-x-response';


@Injectable()
@QueryHandler(GetAllStaticInfoXRequest)
export class GetAllStaticInfoXHandler implements IQueryHandler<GetAllStaticInfoXRequest> {
  async execute(): Promise<GetAllStaticInfoXResponse[]> {
    const staticInfo = await SocialLinks.find();
    return plainToInstance(GetAllStaticInfoXResponse, staticInfo, {
      excludeExtraneousValues: true,
    });
  }
}
