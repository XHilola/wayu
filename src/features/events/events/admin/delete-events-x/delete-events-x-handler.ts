import { DeleteEventsXRequest } from './delete-events-x-request';
import { Events } from '../../events.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(DeleteEventsXRequest)
export class DeleteEventsXHandler implements ICommandHandler<DeleteEventsXRequest> {
  async execute(req: DeleteEventsXRequest): Promise<void> {
    const event = await Events.findOneBy({ id: req.id });
    if (!event)
      throw new NotFoundException('Event not found');
    await Events.remove(event);
  }
}
