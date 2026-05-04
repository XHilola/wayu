import { Command } from '@nestjs/cqrs';
import { UpdateNewsXResponse } from './update-news-x-response';

export class UpdateNewsXCommand extends Command<UpdateNewsXResponse> {
  constructor(
    public id: number,
    public categoryId?: number,
    public countryId?: number,
    public title?: string,
    public image?: Express.Multer.File,
    public date?: Date,
    public content?: string,
    public tagIds?: number[],
  ) {
    super();
  }
}