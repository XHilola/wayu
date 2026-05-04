import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import fs from 'fs';
import { Books } from '../../books.entity';
import { DeleteBooksXRequest } from './delete-books-x-request';

@CommandHandler(DeleteBooksXRequest)
export class DeleteBooksXHandler implements ICommandHandler<DeleteBooksXRequest> {
  async execute(cmd: DeleteBooksXRequest): Promise<void> {
    const book = await Books.findOneBy({ id: cmd.id });
    if (!book) throw new NotFoundException('Book not found');
    if (book.image && fs.existsSync(book.image)) fs.rmSync(book.image);
    if (book.file && fs.existsSync(book.file)) fs.rmSync(book.file);
    await Books.remove(book);
  }
}