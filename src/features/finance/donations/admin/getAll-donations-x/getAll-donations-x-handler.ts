import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Donations } from '../../donations.entity';
import { GetAllDonationsXRequest } from './getAll-donations-x-request';
import { GetAllDonationsXResponse } from './getAll-donations-x-response';

@Injectable()
@QueryHandler(GetAllDonationsXRequest)
export class GetAllDonationsXHandler implements IQueryHandler<GetAllDonationsXRequest> {
  async execute(query: GetAllDonationsXRequest): Promise<GetAllDonationsXResponse[]> {
    const donations = await Donations.find();
    return plainToInstance(GetAllDonationsXResponse, donations, { excludeExtraneousValues: true });
  }
}