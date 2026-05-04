import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneBooksXRequest } from './getOne-books-x-request';
import { GetOneBooksXResponse } from './getOne-books-x-response';
import { Books } from '../../books.entity';

@QueryHandler(GetOneBooksXRequest)
export class GetOneBooksXHandler implements IQueryHandler<GetOneBooksXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneBooksXRequest): Promise<GetOneBooksXResponse> {
    const book = await Books.findOne({
      where: { id: query.id },
      relations: ['author', 'category'],
    });
    if (!book) throw new NotFoundException('Book not found');
    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneBooksXResponse, book, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${book.image}`;
    res.file  = `${baseUrl}/${book.file}`;
    return res;
  }
}