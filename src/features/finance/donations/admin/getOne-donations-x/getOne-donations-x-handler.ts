import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Donations } from '../../donations.entity';
import { GetOneDonationsXRequest } from './getOne-donations-x-request';
import { GetOneDonationsXResponse } from './getOne-donations-x-response';

@Injectable()
@QueryHandler(GetOneDonationsXRequest)
export class GetOneDonationsXHandler implements IQueryHandler<GetOneDonationsXRequest> {
  async execute(query: GetOneDonationsXRequest): Promise<GetOneDonationsXResponse> {
    const donation = await Donations.findOneBy({ id: query.id });
    if (!donation) throw new NotFoundException('Donation not found');
    return plainToInstance(GetOneDonationsXResponse, donation, { excludeExtraneousValues: true });
  }
}