import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Donations } from '../../donations.entity';
import { UpdateDonationsRequest } from './update-donations-request';
import { UpdateDonationsResponse } from './update-donations-response';

@Injectable()
@CommandHandler(UpdateDonationsRequest)
export class UpdateDonationsHandler implements ICommandHandler<UpdateDonationsRequest> {
  async execute(cmd: UpdateDonationsRequest): Promise<UpdateDonationsResponse> {
    const donation = await Donations.findOneBy({ id: cmd.id });
    if (!donation) throw new NotFoundException('Donation not found');
    donation.amount = cmd.amount;
    donation.fullName = cmd.fullName;
    donation.date = cmd.date;
    donation.paidBy = cmd.paidBy;
    await Donations.save(donation);
    return plainToInstance(UpdateDonationsResponse, donation, { excludeExtraneousValues: true });
  }
}