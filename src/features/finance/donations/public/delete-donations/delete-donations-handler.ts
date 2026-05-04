import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Donations } from '../../donations.entity';
import { DeleteDonationsRequest } from './delete-donations-request';

@Injectable()
@CommandHandler(DeleteDonationsRequest)
export class DeleteDonationsHandler implements ICommandHandler<DeleteDonationsRequest> {
  async execute(cmd: DeleteDonationsRequest): Promise<void> {
    const donation = await Donations.findOneBy({ id: cmd.id });
    if (!donation)
      throw new NotFoundException('Donation not found');

    await Donations.remove(donation);
  }
}