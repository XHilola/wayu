import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Donations } from '../../donations.entity';
import { GetAllDonationsRequest } from './getAll-donations-request';
import { GetAllDonationsResponse } from './getAll-donations-response';

@Injectable()
@QueryHandler(GetAllDonationsRequest)
export class GetAllDonationsHandler implements IQueryHandler<GetAllDonationsRequest> {
  async execute(query: GetAllDonationsRequest): Promise<GetAllDonationsResponse[]> {
    const donations = await Donations.find();
    return plainToInstance(GetAllDonationsResponse, donations, { excludeExtraneousValues: true });
  }
}