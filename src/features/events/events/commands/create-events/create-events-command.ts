import { Command } from '@nestjs/cqrs';
import { CreateEventsResponse } from './create-events-response';

export class CreateEventsCommand extends Command<CreateEventsResponse> {
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