import { Command } from '@nestjs/cqrs';
import { CreateBooksXResponse } from './create-books-x-response';

export class CreateBooksXCommand extends Command<CreateBooksXResponse> {
  constructor(
    public authorId: number,
    public categoryId: number,
    public title: string,
    public pages: number,
    public year: number,
    public image?: Express.Multer.File,
    public file?: Express.Multer.File,
    public description?: string,
  ) {
    super();
  }
}
