import { Command } from '@nestjs/cqrs';

export class DeleteDonationsRequest extends Command<void> {
  id!: number;
}