import { Command } from '@nestjs/cqrs';
import { UpdateEventsResponse } from './update-events-response';

export class UpdateEventsCommand extends Command<UpdateEventsResponse> {
  constructor(
    public id: number,
    public categoryId?: number,
    public title?: string,
    public content?: string,
    public image?: Express.Multer.File,
    public date?: string,
    public address?: string,
  ) {
    super();
  }
}