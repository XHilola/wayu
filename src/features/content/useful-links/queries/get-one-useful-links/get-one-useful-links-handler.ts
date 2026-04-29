import { GetOneUsefulLinksRequest } from './get-one-useful-links-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneUsefulLinksResponse } from './get-one-useful-links-response';
import { plainToInstance } from 'class-transformer';
import { UsefulLinks } from '../../usefulLinks.entity';

@Injectable()
@QueryHandler(GetOneUsefulLinksRequest)
export class GetOneUsefulLinksHandler implements IQueryHandler<GetOneUsefulLinksRequest> {
  async execute(req: GetOneUsefulLinksRequest): Promise<GetOneUsefulLinksResponse> {
    const usefulLink = await UsefulLinks.findOneBy({ id: req.id });
    if (!usefulLink) throw new NotFoundException('Useful link not found');
    return plainToInstance(GetOneUsefulLinksResponse, usefulLink, { excludeExtraneousValues: true });
  }
}
