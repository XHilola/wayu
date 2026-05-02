import { Command } from '@nestjs/cqrs';
import { CreateBooksResponse } from './create-books-response';

export class CreateBooksCommand extends Command<CreateBooksResponse> {
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
