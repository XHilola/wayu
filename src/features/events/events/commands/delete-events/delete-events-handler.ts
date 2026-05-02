import { DeleteEventsRequest } from './delete-events-request';
import { Events } from '../../events.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(DeleteEventsRequest)
export class DeleteEventsHandler implements ICommandHandler<DeleteEventsRequest> {
  async execute(req: DeleteEventsRequest): Promise<void> {
    const event = await Events.findOneBy({ id: req.id });
    if (!event)
      throw new NotFoundException('Event not found');
    await Events.remove(event);
  }
}
