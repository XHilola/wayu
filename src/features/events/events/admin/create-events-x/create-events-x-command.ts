import { Command } from '@nestjs/cqrs';
import { CreateEventsXResponse } from './create-events-x-response';

export class CreateEventsXCommand extends Command<CreateEventsXResponse> {
  constructor(
    public categoryId: number,
    public title: string,
    public content: string,
    public image: Express.Multer.File,
    public date: string,
    public address: string,
  ) {
    super();
  }
}