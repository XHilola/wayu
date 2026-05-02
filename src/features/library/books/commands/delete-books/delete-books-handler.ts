import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import fs from 'fs';
import { Books } from '../../books.entity';
import { DeleteBooksRequest } from './delete-books-request';

@CommandHandler(DeleteBooksRequest)
export class DeleteBooksHandler implements ICommandHandler<DeleteBooksRequest> {
  async execute(cmd: DeleteBooksRequest): Promise<void> {
    const book = await Books.findOneBy({ id: cmd.id });
    if (!book) throw new NotFoundException('Book not found');
    if (book.image && fs.existsSync(book.image)) fs.rmSync(book.image);
    if (book.file && fs.existsSync(book.file)) fs.rmSync(book.file);
    await Books.remove(book);
  }
}