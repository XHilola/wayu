import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Donations } from '../../donations.entity';
import { GetOneDonationsRequest } from './getOne-donations-request';
import { GetOneDonationsResponse } from './getOne-donations-response';

@Injectable()
@QueryHandler(GetOneDonationsRequest)
export class GetOneDonationsHandler implements IQueryHandler<GetOneDonationsRequest> {
  async execute(query: GetOneDonationsRequest): Promise<GetOneDonationsResponse> {
    const donation = await Donations.findOneBy({ id: query.id });
    if (!donation) throw new NotFoundException('Donation not found');
    return plainToInstance(GetOneDonationsResponse, donation, { excludeExtraneousValues: true });
  }
}