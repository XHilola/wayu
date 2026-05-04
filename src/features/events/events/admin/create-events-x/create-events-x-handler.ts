import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Events } from '../../events.entity';
import { CreateEventsXCommand } from './create-events-x-command';
import { CreateEventsXResponse } from './create-events-x-response';

@CommandHandler(CreateEventsXCommand)
export class CreateEventsXHandler implements ICommandHandler<CreateEventsXCommand> {
  async execute(cmd: CreateEventsXCommand): Promise<CreateEventsXResponse> {
    const event = Events.create({
      categoryId: cmd.categoryId,
      title: cmd.title,
      content: cmd.content,
      image: cmd.image.path,
      date: cmd.date,
      address: cmd.address,
    });
    await Events.save(event);
    return plainToInstance(CreateEventsXResponse, event, { excludeExtraneousValues: true });
  }
}