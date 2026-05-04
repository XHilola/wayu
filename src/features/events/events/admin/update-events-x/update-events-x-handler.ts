import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { Events } from '../../events.entity';
import { UpdateEventsXCommand } from './update-events-x-command';
import { UpdateEventsXResponse } from './update-events-x-response';

@CommandHandler(UpdateEventsXCommand)
export class UpdateEventsXHandler implements ICommandHandler<UpdateEventsXCommand> {
  async execute(cmd: UpdateEventsXCommand): Promise<UpdateEventsXResponse> {
    const event = await Events.findOneBy({ id: cmd.id });
    if (!event) throw new NotFoundException('Event not found');
    if (cmd.categoryId)
      event.categoryId = cmd.categoryId;
    if (cmd.title)
      event.title = cmd.title;
    if (cmd.content)
      event.content= cmd.content;
    if (cmd.date)
      event.date = cmd.date;
    if (cmd.address)
      event.address= cmd.address;
    if (cmd.image) {
      if (event.image && fs.existsSync(event.image))
        fs.rmSync(event.image);
      event.image = cmd.image.path;
    }
    await Events.save(event);
    return plainToInstance(UpdateEventsXResponse, event, { excludeExtraneousValues: true });
  }
}