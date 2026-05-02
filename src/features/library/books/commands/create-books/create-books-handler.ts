import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Books } from '../../books.entity';
import { CreateBooksCommand } from './create-books-command';
import { CreateBooksResponse } from './create-books-response';

@CommandHandler(CreateBooksCommand)
export class CreateBooksHandler implements ICommandHandler<CreateBooksCommand> {
  async execute(cmd: CreateBooksCommand): Promise<CreateBooksResponse> {
    const existing = await Books.findOneBy({ title: cmd.title });
    if (existing) throw new BadRequestException('Book with this title already exists');
    const book = Books.create({
      authorId: cmd.authorId,
      categoryId: cmd.categoryId,
      title: cmd.title,
      pages: cmd.pages,
      year: cmd.year,
      //@ts-ignore
      image: cmd.image.path,
      //@ts-ignore
      file: cmd.file.path,
      description: cmd.description,
    });
    await Books.save(book);
    return plainToInstance(CreateBooksResponse, book, { excludeExtraneousValues: true });
  }
}