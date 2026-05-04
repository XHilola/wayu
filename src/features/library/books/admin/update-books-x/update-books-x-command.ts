import { Command } from '@nestjs/cqrs';
import { UpdateBooksXResponse } from './update-books-x-response';

export class UpdateBooksXCommand extends Command<UpdateBooksXResponse> {
  constructor(
    public id: number,
    public authorId?: number,
    public categoryId?: number,
    public title?: string,
    public image?: Express.Multer.File,
    public file?: Express.Multer.File,
    public pages?: number,
    public year?: number,
    public description?: string,
  ) {
    super();
  }
}