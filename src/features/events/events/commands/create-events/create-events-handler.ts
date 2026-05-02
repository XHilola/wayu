import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Events } from '../../events.entity';
import { CreateEventsCommand } from './create-events-command';
import { CreateEventsResponse } from './create-events-response';

@CommandHandler(CreateEventsCommand)
export class CreateEventsHandler implements ICommandHandler<CreateEventsCommand> {
  async execute(cmd: CreateEventsCommand): Promise<CreateEventsResponse> {
    const event = Events.create({
      categoryId: cmd.categoryId,
      title: cmd.title,
      content: cmd.content,
      image: cmd.image.path,
      date: cmd.date,
      address: cmd.address,
    });
    await Events.save(event);
    return plainToInstance(CreateEventsResponse, event, { excludeExtraneousValues: true });
  }
}