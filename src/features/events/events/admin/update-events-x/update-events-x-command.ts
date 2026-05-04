import { Command } from '@nestjs/cqrs';
import { UpdateEventsXResponse } from './update-events-x-response';

export class UpdateEventsXCommand extends Command<UpdateEventsXResponse> {
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