import { Command } from '@nestjs/cqrs';
import { CreateNewsXResponse } from './create-news-x-response';

export class CreateNewsXCommand extends Command<CreateNewsXResponse> {
  constructor(
    public categoryId: number,
    public title: string,
    public image: Express.Multer.File,
    public date: Date,
    public content: string,
    public countryId?: number,
    public tagIds?: number[],
  ) {
    super();
  }
}