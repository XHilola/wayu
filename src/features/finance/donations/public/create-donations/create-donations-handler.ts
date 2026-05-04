import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Donations } from '../../donations.entity';
import { CreateDonationsRequest } from './create-donations-request';
import { CreateDonationsResponse } from './create-donations-response';

@Injectable()
@CommandHandler(CreateDonationsRequest)
export class CreateDonationsHandler implements ICommandHandler<CreateDonationsRequest> {
  async execute(cmd: CreateDonationsRequest): Promise<CreateDonationsResponse> {
    const donation = Donations.create(cmd);
    await Donations.save(donation);
    return plainToInstance(CreateDonationsResponse, donation, { excludeExtraneousValues: true });
  }
}