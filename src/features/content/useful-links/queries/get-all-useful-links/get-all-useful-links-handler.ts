import { GetAllUsefulLinksRequest } from './get-all-useful-links-request';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsefulLinksResponse } from './get-all-useful-links-response';
import { plainToInstance } from 'class-transformer';
import { UsefulLinks } from '../../usefulLinks.entity';

@Injectable()
@QueryHandler(GetAllUsefulLinksRequest)
export class GetAllUsefulLinksHandler implements IQueryHandler<GetAllUsefulLinksRequest> {
  async execute(): Promise<GetAllUsefulLinksResponse[]> {
    const usefulLinks = await UsefulLinks.find();
    return plainToInstance(GetAllUsefulLinksResponse, usefulLinks, { excludeExtraneousValues: true });
  }
}
