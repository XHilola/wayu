import { Command } from '@nestjs/cqrs';
import { CreateNewsResponse } from './create-news-response';

export class CreateNewsCommand extends Command<CreateNewsResponse> {
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