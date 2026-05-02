import { Command } from '@nestjs/cqrs';
import { UpdateBooksResponse } from './update-books-response';

export class UpdateBooksCommand extends Command<UpdateBooksResponse> {
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