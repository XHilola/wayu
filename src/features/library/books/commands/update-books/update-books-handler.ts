import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { Books } from '../../books.entity';
import { UpdateBooksCommand } from './update-books-command';
import { UpdateBooksResponse } from './update-books-response';

@CommandHandler(UpdateBooksCommand)
export class UpdateBooksHandler implements ICommandHandler<UpdateBooksCommand> {
  async execute(cmd: UpdateBooksCommand): Promise<UpdateBooksResponse> {
    const book = await Books.findOneBy({ id: cmd.id });
    if (!book) throw new NotFoundException('Book not found');
    if (cmd.authorId)   book.authorId   = cmd.authorId;
    if (cmd.categoryId) book.categoryId = cmd.categoryId;
    if (cmd.title)      book.title      = cmd.title;
    if (cmd.description !== undefined) book.description = cmd.description;
    if (cmd.pages)      book.pages      = cmd.pages;
    if (cmd.year)       book.year       = cmd.year;
    if (cmd.image) {
      if (book.image && fs.existsSync(book.image)) fs.rmSync(book.image);
      book.image = cmd.image.path;
    }
    if (cmd.file) {
      if (book.file && fs.existsSync(book.file)) fs.rmSync(book.file);
      book.file = cmd.file.path;
    }
    await Books.save(book);
    return plainToInstance(UpdateBooksResponse, book, { excludeExtraneousValues: true });
  }
}